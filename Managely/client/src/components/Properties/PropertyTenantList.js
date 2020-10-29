import React from 'react';

const PropertyTenantList = ({ tenants }) => {

  return (
    <div>
      <ul className="list-group mb-4">
        {tenants.map(tenant => (
          <li key={tenant.userProfile.id} className="list-group-item">
            {tenant.userProfile.fullName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PropertyTenantList;