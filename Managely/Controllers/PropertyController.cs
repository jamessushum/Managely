using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Managely.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Managely.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyRepository _propertyRepository;

        public PropertyController(IPropertyRepository propertyRepository)
        {
            _propertyRepository = propertyRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_propertyRepository.GetAllProperties());
        }
    }
}
