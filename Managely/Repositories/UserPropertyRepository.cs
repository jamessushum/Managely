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
	                                        UserProperty (UserProfileId, PropertyId, PropertyUnitNumber)
                                        OUTPUT INSERTED.Id
                                        VALUES (@UserProfileId, @PropertyId, @PropertyUnitNumber)";

                    DbUtils.AddParameter(cmd, "@UserProfileId", userProperty.UserProfileId);
                    DbUtils.AddParameter(cmd, "@PropertyId", userProperty.PropertyId);
                    DbUtils.AddParameter(cmd, "@PropertyUnitNumber", userProperty.PropertyUnitNumber);

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

        public List<UserProperty> GetPropertyByUser(int userProfileId)
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
	                                        up.UserProfileId = @userProfileId AND p.IsActive = 1";

                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);

                    var reader = cmd.ExecuteReader();

                    List<UserProperty> userProperties = new List<UserProperty>();

                    while (reader.Read())
                    {
                        userProperties.Add(new UserProperty()
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

                    return userProperties;
                }
            }
        }

        public void RemoveUserProperty(int propertyId, int userProfileId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM
	                                        UserProperty
                                        WHERE
	                                        PropertyId = @propertyId AND UserProfileId = @userProfileId";

                    DbUtils.AddParameter(cmd, "@propertyId", propertyId);
                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(UserProperty userProperty)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE
	                                        UserProperty
                                        SET
	                                        UserProfileId = @userProfileId,
	                                        PropertyId = @propertyId,
	                                        PropertyUnitNumber = @propertyUnitNumber
                                        WHERE
	                                        Id = @id";

                    DbUtils.AddParameter(cmd, "@userProfileId", userProperty.UserProfileId);
                    DbUtils.AddParameter(cmd, "@propertyId", userProperty.PropertyId);
                    DbUtils.AddParameter(cmd, "@propertyUnitNumber", userProperty.PropertyUnitNumber);
                    DbUtils.AddParameter(cmd, "@id", userProperty.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public UserProperty GetByUserProfileAndPropertyId(int userProfileId, int propertyId)
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
	                                        up.UserProfileId = @userProfileId AND up.PropertyId = @propertyId";

                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);
                    DbUtils.AddParameter(cmd, "@propertyId", propertyId);

                    var reader = cmd.ExecuteReader();

                    UserProperty userProperty = null;

                    if (reader.Read())
                    {
                        userProperty = new UserProperty()
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
                        };
                    }

                    reader.Close();

                    return userProperty;
                }
            }
        }
    }
}
