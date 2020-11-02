using Managely.Models;
using System.Collections.Generic;

namespace Managely.Repositories
{
    public interface IPropertyTypeRepository
    {
        List<PropertyType> GetAll();
    }
}