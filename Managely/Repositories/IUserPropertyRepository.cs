using Managely.Models;
using System.Collections.Generic;

namespace Managely.Repositories
{
    public interface IUserPropertyRepository
    {
        void AddUserProperty(UserProperty userProperty);

        public List<UserProperty> GetPropertyTenants(int propertyId);
    }
}