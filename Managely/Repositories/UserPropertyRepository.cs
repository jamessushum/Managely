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
    }
}
