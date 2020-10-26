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
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
	                                        up.Id AS UserProfileId,
	                                        up.FirebaseUserId AS UserProfileFirebaseUserId,
	                                        up.FirstName AS UserProfileFirstName,
	                                        up.LastName AS UserProfileLastName,
	                                        up.Email AS UserProfileEmail,
	                                        up.Company AS UserProfileCompany,
	                                        up.ImageLocation AS UserProfileImageLocation,
	                                        up.CreateDateTime AS UserProfileCreateDateTime,
	                                        up.IsActive AS IsActive,
	                                        ut.Id AS UserTypeId,
	                                        ut.Type AS UserProfileType
                                        FROM
	                                        UserProfile up
	                                        LEFT JOIN UserType ut ON up.UserTypeId = ut.Id
                                        WHERE 
	                                        up.FirebaseUserId = @firebaseUserId";

                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "UserProfileId"),
                            FirebaseUserId = DbUtils.GetString(reader, "UserProfileFirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "UserProfileFirstName"),
                            LastName = DbUtils.GetString(reader, "UserProfileLastName"),
                            Email = DbUtils.GetString(reader, "UserProfileEmail"),
                            Company = DbUtils.GetString(reader, "UserProfileCompany"),
                            ImageLocation = DbUtils.GetString(reader, "UserProfileImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileCreateDateTime"),
                            IsActive = DbUtils.GetBool(reader, "IsActive"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Type = DbUtils.GetString(reader, "UserProfileType")
                            }
                        };
                    }

                    reader.Close();

                    return userProfile;
                }
            }
        }
    }
}
