using Managely.Models;
using System.Collections.Generic;

namespace Managely.Repositories
{
    public interface IPropertyRepository
    {
        List<Property> GetAllProperties();

        public Property GetPropertyById(int propertyId);

        void Add(Property property);

        void Update(Property property);
    }
}