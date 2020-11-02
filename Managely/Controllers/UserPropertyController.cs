﻿using System;
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
            if (selectedPropertyIds != null)
            {
                foreach (int propertyId in selectedPropertyIds)
                {
                    _userPropertyRepository.AddUserProperty(new UserProperty()
                    {
                        UserProfileId = userProfileId,
                        PropertyId = propertyId
                    });
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

            if (userProperties.Count == 0)
            {
                return NotFound();
            }

            return Ok(userProperties);
        }
    }
}
