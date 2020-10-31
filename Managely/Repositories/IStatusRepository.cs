using Managely.Models;
using System.Collections.Generic;

namespace Managely.Repositories
{
    public interface IStatusRepository
    {
        List<Status> GetAll();
    }
}