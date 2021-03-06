﻿using Managely.Models;
using Managely.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Managely.Repositories
{
    public class PropertyTypeRepository : BaseRepository, IPropertyTypeRepository
    {
        public PropertyTypeRepository(IConfiguration configuration) : base(configuration) { }

        public List<PropertyType> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
	                                        Id,
	                                        Type
                                        FROM
	                                        PropertyType";

                    var reader = cmd.ExecuteReader();

                    List<PropertyType> propertyTypes = new List<PropertyType>();

                    while (reader.Read())
                    {
                        propertyTypes.Add(new PropertyType()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Type = DbUtils.GetString(reader, "Type")
                        });
                    }

                    reader.Close();

                    return propertyTypes;
                }
            }
        }
    }
}
