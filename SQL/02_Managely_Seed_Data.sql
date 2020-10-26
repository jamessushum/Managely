USE [Managely]
GO

set identity_insert [UserType] on
insert into [UserType] ([Id], [Type])
values (1, 'Property Manager'), (2, 'Tenant');
set identity_insert [UserType] off

set identity_insert [Severity] on
insert into [Severity] ([Id], [Type])
values (1, 'Low'), (2, 'Medium'), (3, 'High');
set  identity_insert [Severity] off

set identity_insert [Status] on
insert into [Status] ([Id], [Type])
values (1, 'Open'), (2, 'Received'), (3, 'In Progress'), (4, 'Completed');
set identity_insert [Status] off

set identity_insert [PropertyType] on
insert into [PropertyType] ([Id], [Type])
values (1, 'Single-Family'), (2, 'Multi-Family'), (3, 'Retail'), (4, 'Office'), (5, 'Industrial'), (6, 'Mixed-Use'), (7, 'Other');
set identity_insert [PropertyType] off

set identity_insert [UserProfile] on
insert into [UserProfile] ([Id], [FirebaseUserId], [FirstName], [LastName], [Email], [Company], [ImageLocation], [CreateDateTime], [IsActive], [UserTypeId]) values (1, 'WyZg1pVkGNOM4e8Vl0ZPbKmqRu53', 'Kevin', 'Watson', 'kevin.watson@test.com', NULL, NULL, '2020-10-25', 1, 1);
insert into [UserProfile] ([Id], [FirebaseUserId], [FirstName], [LastName], [Email], [Company], [ImageLocation], [CreateDateTime], [IsActive], [UserTypeId]) values (2, 'Sq1Ae9DVNERsCCUT8zgvK6O0Kur1', 'Simon', 'Wood', 'simon.wood@test.com', NULL, NULL, '2020-10-25', 1, 2);
set identity_insert [UserProfile] off

set identity_insert [Property] on
insert into [Property] ([Id], [Name], [Address], [ImageLocation], [IsActive], [PropertyTypeId]) values (1, '611 Madison St - Gracey Court', '611 Madison St, Clarksville, TN 37040', NULL, 1, 2);
insert into [Property] ([Id], [Name], [Address], [ImageLocation], [IsActive], [PropertyTypeId]) values (2, 'Shops at Dover Glen', '2621-2653 Lakevilla Dr, Nashville, TN 37217', NULL, 1, 3);
set identity_insert [Property] off

set identity_insert [WorkOrder] on
insert into [WorkOrder] ([Id], [Subject], [Description], [CreateDateTime], [ImageLocation], [SeverityId], [StatusId], [UserProfileId], [PropertyId]) values (1, 'Kitchen sink leaking', 'There seems to be a leak under the kitchen sink, it happens when the hot water side of the faucet is turned on.', '2020-10-26', NULL, 3, 1, 2, 1);
set identity_insert [WorkOrder] off

set identity_insert [WorkOrderComment] on
insert into [WorkOrderComment] ([Id], [Content], [ImageLocation], [CreateDateTime], [UserProfileId], [WorkOrderId]) values (1, 'Apologies for the inconvenience, we will have our maintenance crew remedy the issue as soon as possible.', NULL, '2020-10-26', 1, 1);
set identity_insert [WorkOrderComment] off

set identity_insert [Todo] on
insert into [Todo] ([Id], [Content], [CreateDateTime], [SeverityId], [UserProfileId]) values (1, 'Contact maintenance crew to check out kitchen sink leak in unit D2', '2020-10-26', 3, 1);
set identity_insert [Todo] off

set identity_insert [UserProperty] on
insert into [UserProperty] ([Id], [UserProfileId], [PropertyId], [PropertyUnitNumber]) values (1, 2, 1, 'D2');
set identity_insert [UserProperty] off