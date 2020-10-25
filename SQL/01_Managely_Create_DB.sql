USE [master]

IF db_id('Managely') IS NULL
  CREATE DATABASE [Managely]
GO

USE [Managely]
GO

DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Property];
DROP TABLE IF EXISTS [PropertyType];
DROP TABLE IF EXISTS [UserProperty];
DROP TABLE IF EXISTS [WorkOrder];
DROP TABLE IF EXISTS [WorkOrderComment];
DROP TABLE IF EXISTS [Severity];
DROP TABLE IF EXISTS [Status];
DROP TABLE IF EXISTS [Todo];
GO

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY,
  [Type] nvarchar(30) NOT NULL
)


CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY,
  [FirebaseUserId] nvarchar(28) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [Company] nvarchar(255),
  [ImageLocation] nvarchar(255),
  [CreateDateTime] datetime NOT NULL,
  [IsActive] bit NOT NULL,
  [UserTypeId] int NOT NULL,

  CONSTRAINT [FK_User_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id]),
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)


CREATE TABLE [Property] (
  [Id] int PRIMARY KEY,
  [Name] nvarchar(255) NOT NULL,
  [Address] nvarchar(255) NOT NULL,
  [ImageLocation] nvarchar(255),
  [IsClosed] bit NOT NULL,
  [PropertyTypeId] int NOT NULL,

  CONSTRAINT [FK_Property_PropertyType] FOREIGN KEY ([PropertyTypeId]) REFERENCES [PropertyType] ([Id])
)


CREATE TABLE [WorkOrder] (
  [Id] int PRIMARY KEY,
  [Name] nvarchar(255) NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [ImageLocation] nvarchar(255),
  [SeverityId] int NOT NULL,
  [StatusId] int NOT NULL,
  [UserProfileId] int NOT NULL,
  [PropertyId] int NOT NULL,

  CONSTRAINT [FK_WorkOrder_Severity] FOREIGN KEY ([SeverityId]) REFERENCES [Severity] ([Id]),
  CONSTRAINT [FK_WorkOrder_Status] FOREIGN KEY ([StatusId]) REFERENCES [Status] ([Id]),
  CONSTRAINT [FK_WorkOrder_User] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_WorkOrder_Property] FOREIGN KEY ([PropertyId]) REFERENCES [Property] ([Id])
)


CREATE TABLE [Severity] (
  [Id] int PRIMARY KEY,
  [Type] nvarchar(30) NOT NULL
)


CREATE TABLE [Status] (
  [Id] int PRIMARY KEY,
  [Type] nvarchar(30) NOT NULL
)


CREATE TABLE [WorkOrderComment] (
  [Id] int PRIMARY KEY,
  [Content] nvarchar(255) NOT NULL,
  [ImageLocation] nvarchar(255),
  [CreateDateTime] datetime NOT NULL,
  [UserProfileId] int NOT NULL,
  [WorkOrderId] int NOT NULL,

  CONSTRAINT [FK_WorkOrderComment_User] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_WorkOrderComment_WorkOrder] FOREIGN KEY ([WorkOrderId]) REFERENCES [WorkOrder] ([Id])
)


CREATE TABLE [PropertyType] (
  [Id] int PRIMARY KEY,
  [Type] nvarchar(30) NOT NULL
)


CREATE TABLE [Todo] (
  [Id] int PRIMARY KEY,
  [Content] nvarchar(255) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [SeverityId] int NOT NULL,
  [UserProfileId] int NOT NULL,

  CONSTRAINT [FK_Todo_Severity] FOREIGN KEY ([SeverityId]) REFERENCES [Severity] ([Id]),
  CONSTRAINT [FK_Todo_User] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)


CREATE TABLE [UserProperty] (
  [Id] int PRIMARY KEY,
  [UserProfileId] int NOT NULL,
  [PropertyId] int NOT NULL,
  [PropertyUnitNumber] nvarchar(255),

  CONSTRAINT [FK_UserProperty_User] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_UserProperty_Property] FOREIGN KEY ([PropertyId]) REFERENCES [Property] ([Id])
)
GO