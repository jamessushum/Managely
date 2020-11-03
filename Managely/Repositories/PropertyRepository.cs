using Managely.Models;
using Managely.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Managely.Repositories
{
    public class PropertyRepository : BaseRepository, IPropertyRepository
    {
        public PropertyRepository(IConfiguration configuration) : base(configuration) { }

        public List<Property> GetAllProperties()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
	                                        p.Id AS PropertyId,
	                                        p.Name AS PropertyName,
	                                        p.Address AS PropertyAddress,
	                                        p.ImageLocation AS PropertyImageLocation,
	                                        p.IsActive AS PropertyIsActive,
	                                        pt.Id AS PropertyTypeId,
	                                        pt.Type AS PropertyType
                                        FROM
	                                        Property p
	                                        LEFT JOIN PropertyType pt ON p.PropertyTypeId = pt.Id
                                        WHERE
	                                        p.IsActive = 1
                                        ORDER BY
	                                        p.Name ASC";

                    var reader = cmd.ExecuteReader();

                    List<Property> properties = new List<Property>();

                    while (reader.Read())
                    {
                        properties.Add(new Property()
                        {
                            Id = DbUtils.GetInt(reader, "PropertyId"),
                            Name = DbUtils.GetString(reader, "PropertyName"),
                            Address = DbUtils.GetString(reader, "PropertyAddress"),
                            ImageLocation = DbUtils.GetString(reader, "PropertyImageLocation"),
                            IsActive = DbUtils.GetBool(reader, "PropertyIsActive"),
                            PropertyTypeId = DbUtils.GetInt(reader, "PropertyTypeId"),
                            PropertyType = new PropertyType()
                            {
                                Id = DbUtils.GetInt(reader, "PropertyTypeId"),
                                Type = DbUtils.GetString(reader, "PropertyType")
                            }
                        });
                    }

                    reader.Close();

                    return properties;
                }
            }
        }

        public Property GetPropertyById(int propertyId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
	                                        p.Id AS PropertyId,
	                                        p.Name AS PropertyName,
	                                        p.Address AS PropertyAddress,
	                                        p.ImageLocation AS PropertyImageLocation,
	                                        p.IsActive AS PropertyIsActive,
	                                        pt.Id AS PropertyTypeId,
	                                        pt.Type AS PropertyType
                                        FROM
	                                        Property p
	                                        LEFT JOIN PropertyType pt ON p.PropertyTypeId = pt.Id
                                        WHERE
	                                        p.Id = @propertyId";

                    DbUtils.AddParameter(cmd, "@propertyId", propertyId);

                    var reader = cmd.ExecuteReader();

                    Property property = null;

                    if (reader.Read())
                    {
                        property = new Property()
                        {
                            Id = DbUtils.GetInt(reader, "PropertyId"),
                            Name = DbUtils.GetString(reader, "PropertyName"),
                            Address = DbUtils.GetString(reader, "PropertyAddress"),
                            ImageLocation = DbUtils.GetString(reader, "PropertyImageLocation"),
                            IsActive = DbUtils.GetBool(reader, "PropertyIsActive"),
                            PropertyTypeId = DbUtils.GetInt(reader, "PropertyTypeId"),
                            PropertyType = new PropertyType()
                            {
                                Id = DbUtils.GetInt(reader, "PropertyTypeId"),
                                Type = DbUtils.GetString(reader, "PropertyType")
                            }
                        };
                    }

                    reader.Close();

                    return property;
                }
            }
        }

        public void Add(Property property)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO
	                                        Property (Name, Address, ImageLocation, IsActive, PropertyTypeId)
                                        OUTPUT INSERTED.Id
                                        VALUES (@name, @address, @imageLocation, @isActive, @propertyTypeId)";

                    DbUtils.AddParameter(cmd, "@name", property.Name);
                    DbUtils.AddParameter(cmd, "@address", property.Address);
                    DbUtils.AddParameter(cmd, "@imageLocation", property.ImageLocation);
                    DbUtils.AddParameter(cmd, "@isActive", property.IsActive);
                    DbUtils.AddParameter(cmd, "@propertyTypeId", property.PropertyTypeId);

                    property.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Property property)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE
	                                        Property
                                        SET
	                                        Name = @name,
	                                        Address = @address,
	                                        ImageLocation = @imageLocation,
	                                        IsActive = @isActive,
	                                        PropertyTypeId = @propertyTypeId
                                        WHERE
	                                        Id = @id";

                    DbUtils.AddParameter(cmd, "@name", property.Name);
                    DbUtils.AddParameter(cmd, "@address", property.Address);
                    DbUtils.AddParameter(cmd, "@imageLocation", property.ImageLocation);
                    DbUtils.AddParameter(cmd, "@isActive", property.IsActive);
                    DbUtils.AddParameter(cmd, "@propertyTypeId", property.PropertyTypeId);
                    DbUtils.AddParameter(cmd, "@id", property.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
