using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Managely.Models;
using Managely.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Managely.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserPropertyController : ControllerBase
    {
        private readonly IUserPropertyRepository _userPropertyRepository;

        public UserPropertyController(IUserPropertyRepository userPropertyRepository)
        {
            _userPropertyRepository = userPropertyRepository;
        }

        [HttpPost("{userProfileId}")]
        public IActionResult Post(int userProfileId, List<int> selectedPropertyIds)
        {
            // Getting all UserProperty records associated with userProfileId
            var previouslySelectedProperties = _userPropertyRepository.GetPropertyByUser(userProfileId);
            var previouslySelectedPropertyIds = new List<int>();

            // Extracting propertyIds from previously selected properties
            foreach (UserProperty userProperty in previouslySelectedProperties)
            {
                previouslySelectedPropertyIds.Add(userProperty.PropertyId);
            }

            // Execute when list of selected propertyIds from client is NOT empty
            if (selectedPropertyIds != null)
            {
                // Iterating through new list of property ids form client
                foreach (int propertyId in selectedPropertyIds)
                {
                    // Add new UserProperty record when propertyId is not found in list of previously selected propertyIds, eliminates duplicates
                    if (!previouslySelectedPropertyIds.Contains(propertyId))
                    {
                        _userPropertyRepository.AddUserProperty(new UserProperty()
                        {
                            UserProfileId = userProfileId,
                            PropertyId = propertyId
                        });
                    }
                }
                // Iterating through list of previously selected propertyIds 
                foreach (int propertyId in previouslySelectedPropertyIds)
                {
                    // Removing UserProperty record when previous propertyId is not found in new list of propertyIds from client
                    if (!selectedPropertyIds.Contains(propertyId))
                    {
                        _userPropertyRepository.RemoveUserProperty(propertyId, userProfileId);
                    }
                }
            }
            // Executing when new list of propertyIds from client is empty
            else
            {
                // Iterating through list of previously selected propertyIds, meaning user wants to remove all associated properties
                foreach (int propertyId in previouslySelectedPropertyIds)
                {
                    _userPropertyRepository.RemoveUserProperty(propertyId, userProfileId);
                }
            }

            return NoContent();
        }

        [HttpGet("{propertyId}")]
        public IActionResult Get(int propertyId)
        {
            var tenants = _userPropertyRepository.GetPropertyTenants(propertyId);

            return Ok(tenants);
        }

        [HttpGet("{user}/{userProfileId}")]
        public IActionResult GetPropertyByUser(string user, int userProfileId)
        {
            var userProperties = _userPropertyRepository.GetPropertyByUser(userProfileId);

            return Ok(userProperties);
        }
    }
}
