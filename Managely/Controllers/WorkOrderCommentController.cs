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
    public class WorkOrderCommentController : ControllerBase
    {
        private readonly IWorkOrderCommentRepository _workOrderCommentRepository;

        public WorkOrderCommentController(IWorkOrderCommentRepository workOrderCommentRepository)
        {
            _workOrderCommentRepository = workOrderCommentRepository;
        }

        [HttpGet("{workOrderCommentId}")]
        public IActionResult GetById(int workOrderCommentId)
        {
            var workOrderComment = _workOrderCommentRepository.GetById(workOrderCommentId);

            if (workOrderComment == null)
            {
                return NotFound();
            }

            return Ok(workOrderComment);
        }

        [HttpPost]
        public IActionResult Post(WorkOrderComment workOrderComment)
        {
            _workOrderCommentRepository.Add(workOrderComment);

            return CreatedAtAction(nameof(GetById), new { workOrderCommentId = workOrderComment.Id }, workOrderComment);
        }
    }
}
