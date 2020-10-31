import React from 'react';
import './TenantDash.css';

const TenantDash = () => {

  return (
    <div className="tenantDash-container">
      <div className="tenantDash-banner">
        tenant welcome banner
      </div>
      <div className="tenantDash-openWO">
        open work orders list
      </div>
      <div className="tenantDash-closedWO">
        closed work orders list
      </div>
    </div>
  )
}

export default TenantDash;