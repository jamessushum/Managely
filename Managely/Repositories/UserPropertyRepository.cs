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
    public class UserPropertyRepository : BaseRepository, IUserPropertyRepository
    {
        public UserPropertyRepository(IConfiguration configuration) : base(configuration) { }

        public void AddUserProperty(UserProperty userProperty)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO
	                                        UserProperty (UserProfileId, PropertyId)
                                        OUTPUT INSERTED.Id
                                        VALUES (@UserProfileId, @PropertyId)";

                    DbUtils.AddParameter(cmd, "@UserProfileId", userProperty.UserProfileId);
                    DbUtils.AddParameter(cmd, "@PropertyId", userProperty.PropertyId);

                    userProperty.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<UserProperty> GetPropertyTenants(int propertyId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
	                                        up.Id AS UserPropertyId,
	                                        up.PropertyUnitNumber AS UserPropertyUnitNumber,
	                                        u.Id AS UserProfileId,
	                                        u.FirebaseUserId AS UserProfileFirebaseUserId,
	                                        u.FirstName AS UserProfileFirstName,
	                                        u.LastName AS UserProfileLastName,
	                                        u.Email AS UserProfileEmail,
	                                        u.Company AS UserProfileCompany,
	                                        u.ImageLocation AS UserProfileImageLocation,
	                                        u.CreateDateTime AS UserProfileCreateDateTime,
	                                        u.IsActive AS UserProfileIsActive,
	                                        u.UserTypeId AS UserProfileUserTypeId,
	                                        p.Id AS PropertyId,
	                                        p.Name AS PropertyName,
	                                        p.Address AS PropertyAddress,
	                                        p.ImageLocation AS PropertyImageLocation,
	                                        p.IsActive AS PropertyIsActive,
	                                        p.PropertyTypeId
                                        FROM
	                                        UserProperty up
	                                        LEFT JOIN UserProfile u ON up.UserProfileId = u.Id
	                                        LEFT JOIN Property p ON up.PropertyId = p.Id
                                        WHERE
	                                        up.PropertyId = @propertyId
                                        ORDER BY
	                                        u.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@propertyId", propertyId);

                    var reader = cmd.ExecuteReader();

                    List<UserProperty> propertyTenants = new List<UserProperty>();

                    while (reader.Read())
                    {
                        propertyTenants.Add(new UserProperty()
                        {
                            Id = DbUtils.GetInt(reader, "UserPropertyId"),
                            PropertyUnitNumber = DbUtils.GetString(reader, "UserPropertyUnitNumber"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirebaseUserId = DbUtils.GetString(reader, "UserProfileFirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "UserProfileFirstName"),
                                LastName = DbUtils.GetString(reader, "UserProfileLastName"),
                                Email = DbUtils.GetString(reader, "UserProfileEmail"),
                                Company = DbUtils.GetString(reader, "UserProfileCompany"),
                                ImageLocation = DbUtils.GetString(reader, "UserProfileImageLocation"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileCreateDateTime"),
                                IsActive = DbUtils.GetBool(reader, "UserProfileIsActive"),
                                UserTypeId = DbUtils.GetInt(reader, "UserProfileUserTypeId")
                            },
                            PropertyId = DbUtils.GetInt(reader, "PropertyId"),
                            Property = new Property()
                            {
                                Id = DbUtils.GetInt(reader, "PropertyId"),
                                Name = DbUtils.GetString(reader, "PropertyName"),
                                Address = DbUtils.GetString(reader, "PropertyAddress"),
                                ImageLocation = DbUtils.GetString(reader, "PropertyImageLocation"),
                                IsActive = DbUtils.GetBool(reader, "PropertyIsActive"),
                                PropertyTypeId = DbUtils.GetInt(reader, "PropertyTypeId")
                            }
                        });
                    }

                    reader.Close();

                    return propertyTenants;
                }
            }
        }
    }
}
