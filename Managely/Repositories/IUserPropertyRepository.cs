using Managely.Models;
using System.Collections.Generic;

namespace Managely.Repositories
{
    public interface IUserPropertyRepository
    {
        void AddUserProperty(UserProperty userProperty);

        List<UserProperty> GetPropertyTenants(int propertyId);

        List<UserProperty> GetPropertyByUser(int userProfileId);

        void RemoveUserProperty(int propertyId, int userProfileId);
    }
}