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

        public void Add(UserProfile userProfile)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO
                                        UserProfile (FirebaseUserId, FirstName, LastName, Email, Company, ImageLocation, CreateDateTime, IsActive, UserTypeId)
                                        OUTPUT INSERTED.Id
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, @Email, @Company, @ImageLocation, @CreateDateTime, @IsActive, @UserTypeId)";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@Company", userProfile.Company);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@IsActive", userProfile.IsActive);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(UserProfile userProfile)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE
	                                        UserProfile
                                        SET
	                                        FirebaseUserId = @firebaseUserId,
	                                        FirstName = @firstName,
	                                        LastName = @lastName,
	                                        Email = @email,
	                                        Company = @company,
	                                        ImageLocation = @imageLocation,
	                                        CreateDateTime = @createDateTime,
	                                        IsActive = @isActive,
	                                        UserTypeId = @userTypeId
                                        WHERE
	                                        Id = @id";

                    DbUtils.AddParameter(cmd, "@firebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@firstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@lastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@company", userProfile.Company);
                    DbUtils.AddParameter(cmd, "@imageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@createDateTime", userProfile.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@isActive", userProfile.IsActive);
                    DbUtils.AddParameter(cmd, "@userTypeId", userProfile.UserTypeId);
                    DbUtils.AddParameter(cmd, "@id", userProfile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
