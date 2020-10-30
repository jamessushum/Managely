using Managely.Models;
using System.Collections.Generic;

namespace Managely.Repositories
{
    public interface IWorkOrderRepository
    {
        List<WorkOrder> GetOpenWorkOrders(int propertyId);

        List<WorkOrder> GetCompletedWorkOrders(int propertyId);
    }
}