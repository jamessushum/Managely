import React from 'react';
import { FaEye } from "react-icons/fa";

const PropertyTenantList = ({ tenants }) => {

  return (
    <>
      {tenants.length === 0 ? <tr><td><h6>No current tenants</h6></td></tr> : tenants.map(tenant => (
        <tr key={tenant.userProfile.id}>
          <td>{tenant.userProfile.fullName}</td>
          <td>{tenant.userProfile.email}</td>
          {tenant.propertyUnitNumber === null ? <td>Not yet assigned</td> : <td>{tenant.propertyUnitNumber}</td>}
          <td><FaEye /></td>
        </tr>
      ))}
    </>
  )
}

export default PropertyTenantList;