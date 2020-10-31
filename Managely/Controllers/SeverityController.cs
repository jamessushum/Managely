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
    public class SeverityController : ControllerBase
    {
        private readonly ISeverityRepository _severityRepository;

        public SeverityController(ISeverityRepository severityRepository)
        {
            _severityRepository = severityRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_severityRepository.GetAll());
        }
    }
}
