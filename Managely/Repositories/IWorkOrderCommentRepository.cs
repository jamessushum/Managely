using Managely.Models;

namespace Managely.Repositories
{
    public interface IWorkOrderCommentRepository
    {
        void Add(WorkOrderComment workOrderComment);

        WorkOrderComment GetById(int workOrderCommentId);
    }
}