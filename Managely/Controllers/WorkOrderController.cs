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
    public class WorkOrderController : ControllerBase
    {
        private readonly IWorkOrderRepository _workOrderRepository;

        public WorkOrderController(IWorkOrderRepository workOrderRepository)
        {
            _workOrderRepository = workOrderRepository;
        }

        [HttpGet("{propertyId}/{status}")]
        public IActionResult GetOpenWorkOrders(int propertyId, string status)
        {
            if (status == "open")
            {
                var openWorkOrders = _workOrderRepository.GetOpenWorkOrders(propertyId);

                return Ok(openWorkOrders);
            }

            if (status == "completed")
            {
                var completedWorkOrders = _workOrderRepository.GetCompletedWorkOrders(propertyId);

                return Ok(completedWorkOrders);
            }

            return NotFound();
        }

        [HttpGet("{workOrderId}")]
        public IActionResult GetById(int workOrderId)
        {
            var workOrder = _workOrderRepository.GetById(workOrderId);

            if (workOrder == null)
            {
                return NotFound();
            }

            return Ok(workOrder);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, WorkOrder workOrder)
        {
            if (id != workOrder.Id)
            {
                return BadRequest();
            }

            _workOrderRepository.Update(workOrder);

            return NoContent();
        }
    }
}
