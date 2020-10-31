import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import './TenantDash.css';

const TenantDash = () => {
  const history = useHistory();

  return (
    <div className="tenantDash-container">
      <div className="tenantDash-banner">
        <div>tenant welcome banner</div>
        <div className="tenantDash-banner-addBtn">
          <Button color="success" onClick={() => history.push('/workorder/new')}>Create New Work Order</Button>
        </div>
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