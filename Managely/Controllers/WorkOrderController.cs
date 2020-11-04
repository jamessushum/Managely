using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        private readonly IUserProfileRepository _userProfileRepository;

        public WorkOrderController(IWorkOrderRepository workOrderRepository, IUserProfileRepository userProfileRepository)
        {
            _workOrderRepository = workOrderRepository;
            _userProfileRepository = userProfileRepository;
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

        [HttpPost]
        public IActionResult Post(WorkOrder workOrder)
        {
            _workOrderRepository.Add(workOrder);

            return CreatedAtAction(nameof(GetById), new { workOrderId = workOrder.Id }, workOrder);
        }

        [HttpDelete("{workOrderId}")]
        public IActionResult Delete(int workOrderId)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.UserType.Type != "Property Manager")
            {
                return Unauthorized();
            }

            _workOrderRepository.Delete(workOrderId);

            return NoContent();
        }

        [HttpGet("{user}/{userProfileId}/{status}")]
        public IActionResult GetUserWorkOrders(string user, int userProfileId, string status)
        {
            if (user == "tenant" && status == "open")
            {
                var tenantOpenWorkOrders = _workOrderRepository.GetTenantOpenWorkOrders(userProfileId);

                return Ok(tenantOpenWorkOrders);
            }

            if (user == "tenant" && status == "closed")
            {
                var tenantClosedWorkOrders = _workOrderRepository.GetTenantCompletedWorkOrders(userProfileId);

                return Ok(tenantClosedWorkOrders);
            }

            if (user == "propertymanager" && status == "open")
            {
                var allOpenWorkOrders = _workOrderRepository.GetAllOpen();

                return Ok(allOpenWorkOrders);
            }

            if (user == "propertymanager" && status == "closed")
            {
                var allClosedWorkOrders = _workOrderRepository.GetAllCompleted();

                return Ok(allClosedWorkOrders);
            }

            return NotFound();
        }

        // Method to get logged-in user by the firebaseId
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
