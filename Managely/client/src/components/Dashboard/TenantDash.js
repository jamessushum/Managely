import React, { useContext, useEffect, useState } from 'react';
import { WorkOrderContext } from '../../providers/WorkOrderProvider';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import PropertyOpenWorkOrders from '../Properties/PropertyOpenWorkOrders';
import Pagination from '../../components/Pagination/Pagination';
import './TenantDash.css';
import { Table } from 'reactstrap';

const TenantDash = () => {
  const history = useHistory();
  const loggedInUser = JSON.parse(sessionStorage.userProfile);

  const { getTenantOpenWorkOrders } = useContext(WorkOrderContext);

  // State for tenant's open work orders component
  const [openWorkOrders, setOpenWorkOrders] = useState([]);

  // State for tenant's open work orders pagination
  const [currentPageOpenWO, setCurrentPageOpenWO] = useState(1);
  const [itemsPerPageOpenWO] = useState(5);

  const getOpenWorkOrders = async () => {
    const res = await getTenantOpenWorkOrders(loggedInUser.id);
    setOpenWorkOrders(res);
  }

  useEffect(() => {
    getOpenWorkOrders();
  }, [])

  // Get current tenant's open work orders - for pagination
  const indexOfLastPostOpenWO = currentPageOpenWO * itemsPerPageOpenWO;
  const indexOfFirstPostOpenWO = indexOfLastPostOpenWO - itemsPerPageOpenWO;
  const currentOpenWorkOrders = openWorkOrders.slice(indexOfFirstPostOpenWO, indexOfLastPostOpenWO);

  // Change page - for tenant's open work orders pagination
  const paginateOpenWO = (pageNumber) => setCurrentPageOpenWO(pageNumber);

  return (
    <div className="tenantDash-container">
      <div className="tenantDash-banner">
        <div>tenant welcome banner</div>
        <div className="tenantDash-banner-addBtn">
          <Button color="success" onClick={() => history.push('/workorder/new')}>Create New Work Order</Button>
        </div>
      </div>
      <div className="tenantDash-openWO">
        <div className="tenantDash-openWO-table">
          <h4>Open Work Orders</h4>
          <Table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Status</th>
                <th>Severity</th>
                <th>Requested By</th>
                <th>Date Created</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {/* Reusing PropertyOpenWorkOrders component to generate table */}
              <PropertyOpenWorkOrders workOrders={currentOpenWorkOrders} />
            </tbody>
          </Table>
          <Pagination itemsPerPage={itemsPerPageOpenWO} totalItems={openWorkOrders.length} paginate={paginateOpenWO} />
        </div>
      </div>
      <div className="tenantDash-closedWO">
        closed work orders list
      </div>
    </div>
  )
}

export default TenantDash;