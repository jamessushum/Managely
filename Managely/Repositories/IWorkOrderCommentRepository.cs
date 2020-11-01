using Managely.Models;
using System.Collections.Generic;

namespace Managely.Repositories
{
    public interface IWorkOrderCommentRepository
    {
        void Add(WorkOrderComment workOrderComment);

        WorkOrderComment GetById(int workOrderCommentId);

        List<WorkOrderComment> GetAllByWorkOrderId(int workOrderId);
    }
}