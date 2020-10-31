using Managely.Models;
using System.Collections.Generic;

namespace Managely.Repositories
{
    public interface ISeverityRepository
    {
        List<Severity> GetAll();
    }
}