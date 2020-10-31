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
    public class StatusRepository : BaseRepository, IStatusRepository
    {
        public StatusRepository(IConfiguration configuration) : base(configuration) { }

        public List<Status> GetAll()
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
	                                        Status";

                    var reader = cmd.ExecuteReader();

                    List<Status> statuses = new List<Status>();

                    while (reader.Read())
                    {
                        statuses.Add(new Status()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Type = DbUtils.GetString(reader, "Type")
                        });
                    }

                    reader.Close();

                    return statuses;
                }
            }
        }
    }
}
