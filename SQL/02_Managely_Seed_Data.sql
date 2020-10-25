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