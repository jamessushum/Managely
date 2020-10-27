using Managely.Models;
using System.Collections.Generic;

namespace Managely.Repositories
{
    public interface IUserTypeRepository
    {
        List<UserType> GetAllUserTypes();
    }
}