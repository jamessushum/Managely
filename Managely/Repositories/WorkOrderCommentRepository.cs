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
    public class WorkOrderCommentRepository : BaseRepository, IWorkOrderCommentRepository
    {
        public WorkOrderCommentRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(WorkOrderComment workOrderComment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO
	                                        WorkOrderComment (Content, ImageLocation, CreateDateTime, UserProfileId, WorkOrderId)
                                        OUTPUT INSERTED.Id
                                        VALUES (@content, @imageLocation, @createDateTime, @userProfileId, @workOrderId)";

                    DbUtils.AddParameter(cmd, "@content", workOrderComment.Content);
                    DbUtils.AddParameter(cmd, "@imageLocation", workOrderComment.ImageLocation);
                    DbUtils.AddParameter(cmd, "@createDateTime", workOrderComment.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@userProfileId", workOrderComment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@workOrderId", workOrderComment.WorkOrderId);

                    workOrderComment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public WorkOrderComment GetById(int workOrderCommentId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
	                                        wc.Id AS WorkOrderCommentId,
	                                        wc.Content AS WorkOrderCommentContent,
	                                        wc.ImageLocation AS WorkOrderCommentImageLocation,
	                                        wc.CreateDateTime AS WorkOrderCommentCreateDateTime,
	                                        wc.UserProfileId AS WorkOrderCommentUserProfileId,
	                                        wc.WorkOrderId AS WorkOrderCommentWorkOrderId,
	                                        up.FirebaseUserId AS WorkOrderCommentUserFirebaseUserId,
	                                        up.FirstName AS WorkOrderCommentUserFirstName,
	                                        up.LastName AS WorkOrderCommentUserLastName,
	                                        up.Email AS WorkOrderCommentUserEmail,
	                                        up.Company AS WorkOrderCommentUserCompany,
	                                        up.ImageLocation AS WorkOrderCommentUserImageLocation,
	                                        up.CreateDateTime AS WorkOrderCommentUserCreateDateTime,
	                                        up.IsActive AS WorkOrderCommentUserIsActive,
	                                        up.UserTypeId AS WorkOrderCommentUserTypeId,
	                                        wo.Subject AS WorkOrderCommentWorkOrderSubject,
	                                        wo.Description AS WorkOrderCommentWorkOrderDescription,
	                                        wo.CreateDateTime AS WorkOrderCommentWorkOrderCreateDateTime,
	                                        wo.ImageLocation AS WorkOrderCommentWorkOrderImageLocation,
	                                        wo.SeverityId AS WorkOrderCommentWorkOrderSeverityId,
	                                        wo.StatusId AS WorkOrderCommentWorkOrderStatusId,
	                                        wo.UserProfileId AS WorkOrderCommentWorkOrderUserProfileId,
	                                        wo.PropertyId AS WorkOrderCommentWorkOrderPropertyId
                                        FROM
	                                        WorkOrderComment wc
	                                        LEFT JOIN UserProfile up ON wc.UserProfileId = up.Id
	                                        LEFT JOIN WorkOrder wo ON wc.WorkOrderId = wo.Id
                                        WHERE
	                                        wc.Id = @workOrderCommentId";

                    DbUtils.AddParameter(cmd, "@workOrderCommentId", workOrderCommentId);

                    var reader = cmd.ExecuteReader();

                    WorkOrderComment workOrderComment = null;

                    if (reader.Read())
                    {
                        workOrderComment = new WorkOrderComment()
                        {
                            Id = DbUtils.GetInt(reader, "WorkOrderCommentId"),
                            Content = DbUtils.GetString(reader, "WorkOrderCommentContent"),
                            ImageLocation = DbUtils.GetString(reader, "WorkOrderCommentImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "WorkOrderCommentCreateDateTime"),
                            UserProfileId = DbUtils.GetInt(reader, "WorkOrderCommentUserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "WorkOrderCommentUserProfileId"),
                                FirebaseUserId = DbUtils.GetString(reader, "WorkOrderCommentUserFirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "WorkOrderCommentUserFirstName"),
                                LastName = DbUtils.GetString(reader, "WorkOrderCommentUserLastName"),
                                Email = DbUtils.GetString(reader, "WorkOrderCommentUserEmail"),
                                Company = DbUtils.GetString(reader, "WorkOrderCommentUserCompany"),
                                ImageLocation = DbUtils.GetString(reader, "WorkOrderCommentUserImageLocation"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "WorkOrderCommentUserCreateDateTime"),
                                IsActive = DbUtils.GetBool(reader, "WorkOrderCommentUserIsActive"),
                                UserTypeId = DbUtils.GetInt(reader, "WorkOrderCommentUserTypeId")
                            },
                            WorkOrderId = DbUtils.GetInt(reader, "WorkOrderCommentWorkOrderId"),
                            WorkOrder = new WorkOrder()
                            {
                                Id = DbUtils.GetInt(reader, "WorkOrderCommentWorkOrderId"),
                                Subject = DbUtils.GetString(reader, "WorkOrderCommentWorkOrderSubject"),
                                Description = DbUtils.GetString(reader, "WorkOrderCommentWorkOrderDescription"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "WorkOrderCommentWorkOrderCreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "WorkOrderCommentWorkOrderImageLocation"),
                                SeverityId = DbUtils.GetInt(reader, "WorkOrderCommentWorkOrderSeverityId"),
                                StatusId = DbUtils.GetInt(reader, "WorkOrderCommentWorkOrderStatusId"),
                                UserProfileId = DbUtils.GetInt(reader, "WorkOrderCommentWorkOrderUserProfileId"),
                                PropertyId = DbUtils.GetInt(reader, "WorkOrderCommentWorkOrderPropertyId")
                            }
                        };
                    }

                    reader.Close();

                    return workOrderComment;
                }
            }
        }

        public List<WorkOrderComment> GetAllByWorkOrderId(int workOrderId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
	                                        wc.Id AS WorkOrderCommentId,
	                                        wc.Content AS WorkOrderCommentContent,
	                                        wc.ImageLocation AS WorkOrderCommentImageLocation,
	                                        wc.CreateDateTime AS WorkOrderCommentCreateDateTime,
	                                        wc.UserProfileId AS WorkOrderCommentUserProfileId,
	                                        wc.WorkOrderId AS WorkOrderCommentWorkOrderId,
	                                        up.FirebaseUserId AS WorkOrderCommentUserFirebaseUserId,
	                                        up.FirstName AS WorkOrderCommentUserFirstName,
	                                        up.LastName AS WorkOrderCommentUserLastName,
	                                        up.Email AS WorkOrderCommentUserEmail,
	                                        up.Company AS WorkOrderCommentUserCompany,
	                                        up.ImageLocation AS WorkOrderCommentUserImageLocation,
	                                        up.CreateDateTime AS WorkOrderCommentUserCreateDateTime,
	                                        up.IsActive AS WorkOrderCommentUserIsActive,
	                                        up.UserTypeId AS WorkOrderCommentUserTypeId,
	                                        wo.Subject AS WorkOrderCommentWorkOrderSubject,
	                                        wo.Description AS WorkOrderCommentWorkOrderDescription,
	                                        wo.CreateDateTime AS WorkOrderCommentWorkOrderCreateDateTime,
	                                        wo.ImageLocation AS WorkOrderCommentWorkOrderImageLocation,
	                                        wo.SeverityId AS WorkOrderCommentWorkOrderSeverityId,
	                                        wo.StatusId AS WorkOrderCommentWorkOrderStatusId,
	                                        wo.UserProfileId AS WorkOrderCommentWorkOrderUserProfileId,
	                                        wo.PropertyId AS WorkOrderCommentWorkOrderPropertyId
                                        FROM
	                                        WorkOrderComment wc
	                                        LEFT JOIN UserProfile up ON wc.UserProfileId = up.Id
	                                        LEFT JOIN WorkOrder wo ON wc.WorkOrderId = wo.Id
                                        WHERE
	                                        wc.WorkOrderId = @workOrderId
                                        ORDER BY
	                                        wc.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@workOrderId", workOrderId);

                    var reader = cmd.ExecuteReader();

                    List<WorkOrderComment> workOrderComments = new List<WorkOrderComment>();

                    while (reader.Read())
                    {
                        workOrderComments.Add(new WorkOrderComment()
                        {
                            Id = DbUtils.GetInt(reader, "WorkOrderCommentId"),
                            Content = DbUtils.GetString(reader, "WorkOrderCommentContent"),
                            ImageLocation = DbUtils.GetString(reader, "WorkOrderCommentImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "WorkOrderCommentCreateDateTime"),
                            UserProfileId = DbUtils.GetInt(reader, "WorkOrderCommentUserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "WorkOrderCommentUserProfileId"),
                                FirebaseUserId = DbUtils.GetString(reader, "WorkOrderCommentUserFirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "WorkOrderCommentUserFirstName"),
                                LastName = DbUtils.GetString(reader, "WorkOrderCommentUserLastName"),
                                Email = DbUtils.GetString(reader, "WorkOrderCommentUserEmail"),
                                Company = DbUtils.GetString(reader, "WorkOrderCommentUserCompany"),
                                ImageLocation = DbUtils.GetString(reader, "WorkOrderCommentUserImageLocation"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "WorkOrderCommentUserCreateDateTime"),
                                IsActive = DbUtils.GetBool(reader, "WorkOrderCommentUserIsActive"),
                                UserTypeId = DbUtils.GetInt(reader, "WorkOrderCommentUserTypeId")
                            },
                            WorkOrderId = DbUtils.GetInt(reader, "WorkOrderCommentWorkOrderId"),
                            WorkOrder = new WorkOrder()
                            {
                                Id = DbUtils.GetInt(reader, "WorkOrderCommentWorkOrderId"),
                                Subject = DbUtils.GetString(reader, "WorkOrderCommentWorkOrderSubject"),
                                Description = DbUtils.GetString(reader, "WorkOrderCommentWorkOrderDescription"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "WorkOrderCommentWorkOrderCreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "WorkOrderCommentWorkOrderImageLocation"),
                                SeverityId = DbUtils.GetInt(reader, "WorkOrderCommentWorkOrderSeverityId"),
                                StatusId = DbUtils.GetInt(reader, "WorkOrderCommentWorkOrderStatusId"),
                                UserProfileId = DbUtils.GetInt(reader, "WorkOrderCommentWorkOrderUserProfileId"),
                                PropertyId = DbUtils.GetInt(reader, "WorkOrderCommentWorkOrderPropertyId")
                            }
                        });
                    }

                    reader.Close();

                    return workOrderComments;
                }
            }
        }
    }
}
