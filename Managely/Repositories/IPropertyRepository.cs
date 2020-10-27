using Managely.Models;
using System.Collections.Generic;

namespace Managely.Repositories
{
    public interface IPropertyRepository
    {
        List<Property> GetAllProperties();
    }
}