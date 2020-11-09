# Managely

> Manage your rental properties easily.

Managely is a property management platform designed and built to simplify the process of managing tenant work orders.

Feel free to reach out for a live demo!

### Features

- Separate portals for tenants and property managers with an intuitive and user friendly interface
- Tenant ability to create new work orders, view and comment on outstanding and completed work orders, and associate/dissociate from properties
- Ability for property managers to view, update, delete and comment on tenant work orders, update tenant details, and add new properties to manage

## Usage

### Registration

1. Navigate to the registration page, either from the navigation bar or login form
2. Select registration type: tenant or property manager
3. Fill out required input fields (tenants must select the properties they're associated with)
4. Upon submitting the registration form, the user is then prompted to login

### Login

1. Navigate to the login page, either from the navigation bar or registration form
2. Enter an existing email and password
3. Upon submitting the login form, the user is re-directed to the corresponding dashboard (tenant or property manager)

### Dashboard

1. Tenant dashboard displays all their open and closed work orders with affordance to view work order details and create new work orders
2. Property manager dashboard displays all the open and closed tenant work orders for all properties with affordance to view work order details

### Create New Work Order

_Note: This is a tenant only feature_

1. Navigate to the create new work order form through the affordance found in tenant's dashboard
2. Fill out required input fields (tenant can only create work orders for properties they belong to)
3. Tenant is re-directed to the dashboard upon submitting the create new order form

### Tenant Property Association/Dissociation

_Note: This is a tenant only feature_

1. Tenant is able to associate or dissociate themselves from properties in the Settings link found on the nav bar
2. Check or uncheck properties (tenant must be associated with at least 1 property)
3. Upon saving changes, user is directed back to the dashboard

### View Work Order Details

1. Click affordance in work order to view details 
2. Work order details displays all relevant information and comments on the work order
3. Affordance to update and delete work order are visible if logged-in as property manager
4. Tenant and property manager are able to add comments to the work order

### Add Work Order Comments

1. Navigate to the comment input field in work order details
2. Enter desired message and or image if applicable
3. Upon clicking the send affordance, the new message will be displayed in the comments section (latest appearing first)

### Updating Work Order

_Note: This is a property manager only feature_

1. Click the update affordance in work order details
2. Modal with editable input fields will be displayed 
3. User is directed back to work order details after submitting changes

### Deleting Work Order

_Note: This is a property manager only feature_

1. Click the delete affordance in work order details
2. Modal with warning message will be displayed (changes are irreversible and will also delete corresponding comments)
3. User is directed back to property details after deleting work order

### View Properties

_Note: This is a property manager only feature_

1. Navigate to list of properties through nav bar link
2. List of properties under management are displayed with affordance to view details and add a new property

### Add New Property

_Note: This is a property manager only feature_

1. Click affordance to add new property in property list page
2. Modal with new property input fields will be displayed
3. Fill out required fields and submit, user is then directed back to the property list 

### View Property Details

_Note: This is a property manager only feature_

1. Click the details affordance found in each property
2. The property details page displays property info, list of tenants associated with property and open/closed work orders for that property

### Update Property Details

_Note: This is a property manager only feature_

1. Click the update affordance in property details
2. Modal with editable property fields will be displayed
3. User is directed back to property details after submitting changes

### Updating Tenant Details

_Note: This is a property manager only feature_

1. Click the details affordance found on each tenant in tenant list
2. Modal with editable tenant fields will be displayed
3. User is directed back to property details after submitting changes

## Technologies Used

- React
- ASP.NET
- SQL Server
- HTML
- CSS
- React Bootstrap
- Moment.js
- Cloudinary
- Firebase Authentication