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

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var property = _propertyRepository.GetPropertyById(id);

            if (property == null)
            {
                return NotFound();
            }

            if (property.IsActive == false)
            {
                return NotFound();
            }

            return Ok(property);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(Property property)
        {
            _propertyRepository.Add(property);

            return CreatedAtAction(nameof(Get), new { id = property.Id }, property);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, Property property)
        {
            if (id != property.Id)
            {
                return BadRequest();
            }

            _propertyRepository.Update(property);

            return NoContent();
        }
    }
}
