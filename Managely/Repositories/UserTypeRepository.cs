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
    public class UserTypeRepository : BaseRepository, IUserTypeRepository
    {
        public UserTypeRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserType> GetAllUserTypes()
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
	                                        UserType
                                        ORDER BY
	                                        Id DESC";

                    var reader = cmd.ExecuteReader();

                    List<UserType> userTypes = new List<UserType>();

                    while (reader.Read())
                    {
                        var userType = new UserType()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Type = DbUtils.GetString(reader, "Type")
                        };

                        userTypes.Add(userType);
                    }

                    reader.Close();

                    return userTypes;
                }
            }
        }
    }
}
