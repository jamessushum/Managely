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
    public class SeverityRepository : BaseRepository, ISeverityRepository
    {
        public SeverityRepository(IConfiguration configuration) : base(configuration) { }

        public List<Severity> GetAll()
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
	                                        Severity";

                    var reader = cmd.ExecuteReader();

                    List<Severity> severities = new List<Severity>();

                    while (reader.Read())
                    {
                        severities.Add(new Severity()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Type = DbUtils.GetString(reader, "Type")
                        });
                    }

                    reader.Close();

                    return severities;
                }
            }
        }
    }
}
