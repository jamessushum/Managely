using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Managely.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Managely.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyTypeController : ControllerBase
    {
        private readonly IPropertyTypeRepository _propertyTypeRepository;

        public PropertyTypeController(IPropertyTypeRepository propertyTypeRepository)
        {
            _propertyTypeRepository = propertyTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_propertyTypeRepository.GetAll());
        }
    }
}
