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
    public class WorkOrderRepository : BaseRepository, IWorkOrderRepository
    {
        public WorkOrderRepository(IConfiguration configuration) : base(configuration) { }

        public List<WorkOrder> GetOpenWorkOrders(int propertyId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
											w.Id AS WorkOrderId,
											w.Subject AS WorkOrderSubject,
											w.Description AS WorkOrderDescription,
											w.CreateDateTime AS WorkOrderCreateDateTime,
											w.ImageLocation AS WorkOrderImageLocation,
											w.SeverityId AS WorkOrderSeverityId,
											w.StatusId AS WorkOrderStatusId,
											w.UserProfileId AS WorkOrderUserProfileId,
											w.PropertyId AS WorkOrderPropertyId,
											se.Type AS WorkOrderSeverity,
											st.Type AS WorkOrderStatus,
											up.FirebaseUserId AS WorkOrderUserFirebaseUserId,
											up.FirstName AS WorkOrderUserFirstName,
											up.LastName AS WorkOrderUserLastName,
											up.Email AS WorkOrderUserEmail,
											up.Company AS WorkOrderUserCompany,
											up.ImageLocation AS WorkOrderUserImageLocation,
											up.CreateDateTime AS WorkOrderUserCreateDateTime,
											up.IsActive AS WorkOrderUserIsActive,
											up.UserTypeId AS WorkOrderUserTypeId,
											p.Name AS WorkOrderPropertyName,
											p.Address AS WorkOrderPropertyAddress,
											p.ImageLocation AS WorkOrderPropertyImageLocation,
											p.IsActive AS WorkOrderPropertyIsActive,
											p.PropertyTypeId AS WorkOrderPropertyTypeId
										FROM
											WorkOrder w
											LEFT JOIN Severity se ON w.SeverityId = se.Id
											LEFT JOIN Status st ON w.StatusId = st.Id
											LEFT JOIN UserProfile up ON w.UserProfileId = up.Id
											LEFT JOIN Property p ON w.PropertyId = p.Id
										WHERE
											w.StatusId != 4 AND w.PropertyId = @propertyId
										ORDER BY
											w.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@propertyId", propertyId);

                    var reader = cmd.ExecuteReader();

                    List<WorkOrder> workOrders = new List<WorkOrder>();

                    while (reader.Read())
                    {
                        workOrders.Add(new WorkOrder()
                        {
                            Id = DbUtils.GetInt(reader, "WorkOrderId"),
                            Subject = DbUtils.GetString(reader, "WorkOrderSubject"),
                            Description = DbUtils.GetString(reader, "WorkOrderDescription"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "WorkOrderCreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "WorkOrderImageLocation"),
                            SeverityId = DbUtils.GetInt(reader, "WorkOrderSeverityId"),
                            Severity = new Severity()
                            {
                                Id = DbUtils.GetInt(reader, "WorkOrderSeverityId"),
                                Type = DbUtils.GetString(reader, "WorkOrderSeverity")
                            },
                            StatusId = DbUtils.GetInt(reader, "WorkOrderStatusId"),
                            Status = new Status()
                            {
                                Id = DbUtils.GetInt(reader, "WorkOrderStatusId"),
                                Type = DbUtils.GetString(reader, "WorkOrderStatus")
                            },
                            UserProfileId = DbUtils.GetInt(reader, "WorkOrderUserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "WorkOrderUserProfileId"),
                                FirebaseUserId = DbUtils.GetString(reader, "WorkOrderUserFirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "WorkOrderUserFirstName"),
                                LastName = DbUtils.GetString(reader, "WorkOrderUserLastName"),
                                Email = DbUtils.GetString(reader, "WorkOrderUserEmail"),
                                Company = DbUtils.GetString(reader, "WorkOrderUserCompany"),
                                ImageLocation = DbUtils.GetString(reader, "WorkOrderUserImageLocation"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "WorkOrderUserCreateDateTime"),
                                IsActive = DbUtils.GetBool(reader, "WorkOrderUserIsActive"),
                                UserTypeId = DbUtils.GetInt(reader, "WorkOrderUserTypeId")
                            },
                            PropertyId = DbUtils.GetInt(reader, "WorkOrderPropertyId"),
                            Property = new Property()
                            {
                                Id = DbUtils.GetInt(reader, "WorkOrderPropertyId"),
                                Name = DbUtils.GetString(reader, "WorkOrderPropertyName"),
                                Address = DbUtils.GetString(reader, "WorkOrderPropertyAddress"),
                                ImageLocation = DbUtils.GetString(reader, "WorkOrderPropertyImageLocation"),
                                IsActive = DbUtils.GetBool(reader, "WorkOrderPropertyIsActive"),
                                PropertyTypeId = DbUtils.GetInt(reader, "WorkOrderPropertyTypeId")
                            }
                        });
                    }

                    reader.Close();

                    return workOrders;
                }
            }
        }

        public List<WorkOrder> GetCompletedWorkOrders(int propertyId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
	                                        w.Id AS WorkOrderId,
	                                        w.Subject AS WorkOrderSubject,
	                                        w.Description AS WorkOrderDescription,
	                                        w.CreateDateTime AS WorkOrderCreateDateTime,
	                                        w.ImageLocation AS WorkOrderImageLocation,
	                                        w.SeverityId AS WorkOrderSeverityId,
	                                        w.StatusId AS WorkOrderStatusId,
	                                        w.UserProfileId AS WorkOrderUserProfileId,
	                                        w.PropertyId AS WorkOrderPropertyId,
	                                        se.Type AS WorkOrderSeverity,
	                                        st.Type AS WorkOrderStatus,
	                                        up.FirebaseUserId AS WorkOrderUserFirebaseUserId,
	                                        up.FirstName AS WorkOrderUserFirstName,
	                                        up.LastName AS WorkOrderUserLastName,
	                                        up.Email AS WorkOrderUserEmail,
	                                        up.Company AS WorkOrderUserCompany,
	                                        up.ImageLocation AS WorkOrderUserImageLocation,
	                                        up.CreateDateTime AS WorkOrderUserCreateDateTime,
	                                        up.IsActive AS WorkOrderUserIsActive,
	                                        up.UserTypeId AS WorkOrderUserTypeId,
	                                        p.Name AS WorkOrderPropertyName,
	                                        p.Address AS WorkOrderPropertyAddress,
	                                        p.ImageLocation AS WorkOrderPropertyImageLocation,
	                                        p.IsActive AS WorkOrderPropertyIsActive,
	                                        p.PropertyTypeId AS WorkOrderPropertyTypeId
                                        FROM
	                                        WorkOrder w
	                                        LEFT JOIN Severity se ON w.SeverityId = se.Id
	                                        LEFT JOIN Status st ON w.StatusId = st.Id
	                                        LEFT JOIN UserProfile up ON w.UserProfileId = up.Id
	                                        LEFT JOIN Property p ON w.PropertyId = p.Id
                                        WHERE
	                                        w.StatusId = 4 AND w.PropertyId = @propertyId
                                        ORDER BY
	                                        w.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@propertyId", propertyId);

                    var reader = cmd.ExecuteReader();

                    List<WorkOrder> workOrders = new List<WorkOrder>();

                    while (reader.Read())
                    {
                        workOrders.Add(new WorkOrder()
                        {
                            Id = DbUtils.GetInt(reader, "WorkOrderId"),
                            Subject = DbUtils.GetString(reader, "WorkOrderSubject"),
                            Description = DbUtils.GetString(reader, "WorkOrderDescription"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "WorkOrderCreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "WorkOrderImageLocation"),
                            SeverityId = DbUtils.GetInt(reader, "WorkOrderSeverityId"),
                            Severity = new Severity()
                            {
                                Id = DbUtils.GetInt(reader, "WorkOrderSeverityId"),
                                Type = DbUtils.GetString(reader, "WorkOrderSeverity")
                            },
                            StatusId = DbUtils.GetInt(reader, "WorkOrderStatusId"),
                            Status = new Status()
                            {
                                Id = DbUtils.GetInt(reader, "WorkOrderStatusId"),
                                Type = DbUtils.GetString(reader, "WorkOrderStatus")
                            },
                            UserProfileId = DbUtils.GetInt(reader, "WorkOrderUserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "WorkOrderUserProfileId"),
                                FirebaseUserId = DbUtils.GetString(reader, "WorkOrderUserFirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "WorkOrderUserFirstName"),
                                LastName = DbUtils.GetString(reader, "WorkOrderUserLastName"),
                                Email = DbUtils.GetString(reader, "WorkOrderUserEmail"),
                                Company = DbUtils.GetString(reader, "WorkOrderUserCompany"),
                                ImageLocation = DbUtils.GetString(reader, "WorkOrderUserImageLocation"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "WorkOrderUserCreateDateTime"),
                                IsActive = DbUtils.GetBool(reader, "WorkOrderUserIsActive"),
                                UserTypeId = DbUtils.GetInt(reader, "WorkOrderUserTypeId")
                            },
                            PropertyId = DbUtils.GetInt(reader, "WorkOrderPropertyId"),
                            Property = new Property()
                            {
                                Id = DbUtils.GetInt(reader, "WorkOrderPropertyId"),
                                Name = DbUtils.GetString(reader, "WorkOrderPropertyName"),
                                Address = DbUtils.GetString(reader, "WorkOrderPropertyAddress"),
                                ImageLocation = DbUtils.GetString(reader, "WorkOrderPropertyImageLocation"),
                                IsActive = DbUtils.GetBool(reader, "WorkOrderPropertyIsActive"),
                                PropertyTypeId = DbUtils.GetInt(reader, "WorkOrderPropertyTypeId")
                            }
                        });
                    }

                    reader.Close();

                    return workOrders;
                }
            }
        }

        public WorkOrder GetById(int workOrderId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
	                                        w.Id AS WorkOrderId,
	                                        w.Subject AS WorkOrderSubject,
	                                        w.Description AS WorkOrderDescription,
	                                        w.CreateDateTime AS WorkOrderCreateDateTime,
	                                        w.ImageLocation AS WorkOrderImageLocation,
	                                        w.SeverityId AS WorkOrderSeverityId,
	                                        w.StatusId AS WorkOrderStatusId,
	                                        w.UserProfileId AS WorkOrderUserProfileId,
	                                        w.PropertyId AS WorkOrderPropertyId,
	                                        se.Type AS WorkOrderSeverity,
	                                        st.Type AS WorkOrderStatus,
	                                        up.FirebaseUserId AS WorkOrderUserFirebaseUserId,
	                                        up.FirstName AS WorkOrderUserFirstName,
	                                        up.LastName AS WorkOrderUserLastName,
	                                        up.Email AS WorkOrderUserEmail,
	                                        up.Company AS WorkOrderUserCompany,
	                                        up.ImageLocation AS WorkOrderUserImageLocation,
	                                        up.CreateDateTime AS WorkOrderUserCreateDateTime,
	                                        up.IsActive AS WorkOrderUserIsActive,
	                                        up.UserTypeId AS WorkOrderUserTypeId,
	                                        p.Name AS WorkOrderPropertyName,
	                                        p.Address AS WorkOrderPropertyAddress,
	                                        p.ImageLocation AS WorkOrderPropertyImageLocation,
	                                        p.IsActive AS WorkOrderPropertyIsActive,
	                                        p.PropertyTypeId AS WorkOrderPropertyTypeId
                                        FROM
	                                        WorkOrder w
	                                        LEFT JOIN Severity se ON w.SeverityId = se.Id
	                                        LEFT JOIN Status st ON w.StatusId = st.Id
	                                        LEFT JOIN UserProfile up ON w.UserProfileId = up.Id
	                                        LEFT JOIN Property p ON w.PropertyId = p.Id
                                        WHERE
	                                        w.Id = @workOrderId";

                    DbUtils.AddParameter(cmd, "@workOrderId", workOrderId);

                    var reader = cmd.ExecuteReader();

                    WorkOrder workOrder = null;

                    if (reader.Read())
                    {
                        workOrder = new WorkOrder()
                        {
                            Id = DbUtils.GetInt(reader, "WorkOrderId"),
                            Subject = DbUtils.GetString(reader, "WorkOrderSubject"),
                            Description = DbUtils.GetString(reader, "WorkOrderDescription"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "WorkOrderCreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "WorkOrderImageLocation"),
                            SeverityId = DbUtils.GetInt(reader, "WorkOrderSeverityId"),
                            Severity = new Severity()
                            {
                                Id = DbUtils.GetInt(reader, "WorkOrderSeverityId"),
                                Type = DbUtils.GetString(reader, "WorkOrderSeverity")
                            },
                            StatusId = DbUtils.GetInt(reader, "WorkOrderStatusId"),
                            Status = new Status()
                            {
                                Id = DbUtils.GetInt(reader, "WorkOrderStatusId"),
                                Type = DbUtils.GetString(reader, "WorkOrderStatus")
                            },
                            UserProfileId = DbUtils.GetInt(reader, "WorkOrderUserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "WorkOrderUserProfileId"),
                                FirebaseUserId = DbUtils.GetString(reader, "WorkOrderUserFirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "WorkOrderUserFirstName"),
                                LastName = DbUtils.GetString(reader, "WorkOrderUserLastName"),
                                Email = DbUtils.GetString(reader, "WorkOrderUserEmail"),
                                Company = DbUtils.GetString(reader, "WorkOrderUserCompany"),
                                ImageLocation = DbUtils.GetString(reader, "WorkOrderUserImageLocation"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "WorkOrderUserCreateDateTime"),
                                IsActive = DbUtils.GetBool(reader, "WorkOrderUserIsActive"),
                                UserTypeId = DbUtils.GetInt(reader, "WorkOrderUserTypeId")
                            },
                            PropertyId = DbUtils.GetInt(reader, "WorkOrderPropertyId"),
                            Property = new Property()
                            {
                                Id = DbUtils.GetInt(reader, "WorkOrderPropertyId"),
                                Name = DbUtils.GetString(reader, "WorkOrderPropertyName"),
                                Address = DbUtils.GetString(reader, "WorkOrderPropertyAddress"),
                                ImageLocation = DbUtils.GetString(reader, "WorkOrderPropertyImageLocation"),
                                IsActive = DbUtils.GetBool(reader, "WorkOrderPropertyIsActive"),
                                PropertyTypeId = DbUtils.GetInt(reader, "WorkOrderPropertyTypeId")
                            }
                        };
                    }

                    reader.Close();

                    return workOrder;
                }
            }
        }

        public void Update(WorkOrder workOrder)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE
	                                        WorkOrder
                                        SET
	                                        Subject = @subject,
	                                        Description = @description,
	                                        CreateDateTime = @createDateTime,
	                                        ImageLocation = @imageLocation,
	                                        SeverityId = @severityId,
	                                        StatusId = @statusId,
	                                        UserProfileId = @userProfileId,
	                                        PropertyId = @propertyId
                                        WHERE
	                                        Id = @workOrderId";

                    DbUtils.AddParameter(cmd, "@subject", workOrder.Subject);
                    DbUtils.AddParameter(cmd, "@description", workOrder.Description);
                    DbUtils.AddParameter(cmd, "@createDateTime", workOrder.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@imageLocation", workOrder.ImageLocation);
                    DbUtils.AddParameter(cmd, "@severityId", workOrder.SeverityId);
                    DbUtils.AddParameter(cmd, "@statusId", workOrder.StatusId);
                    DbUtils.AddParameter(cmd, "@userProfileId", workOrder.UserProfileId);
                    DbUtils.AddParameter(cmd, "@propertyId", workOrder.PropertyId);
                    DbUtils.AddParameter(cmd, "@workOrderId", workOrder.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
