import React, { useContext, useEffect, useState } from 'react';
import { WorkOrderContext } from '../../providers/WorkOrderProvider';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import PropertyOpenWorkOrders from '../Properties/PropertyOpenWorkOrders';
import PropertyCompletedWorkOrders from '../Properties/PropertyCompletedWorkOrders';
import Pagination from '../../components/Pagination/Pagination';
import './TenantDash.css';
import { Table } from 'reactstrap';

const TenantDash = () => {
  const history = useHistory();
  const loggedInUser = JSON.parse(sessionStorage.userProfile);

  const { getTenantOpenWorkOrders, getTenantClosedWorkOrders } = useContext(WorkOrderContext);

  // State for tenant's open work orders component
  const [openWorkOrders, setOpenWorkOrders] = useState([]);

  // State for tenant's completed work orders component
  const [completedWorkOrders, setCompletedWorkOrders] = useState([]);

  // State for tenant's open work orders pagination
  const [currentPageOpenWO, setCurrentPageOpenWO] = useState(1);
  const [itemsPerPageOpenWO] = useState(5);

  // State for tenant's completed work orders pagination
  const [currentPageCompletedWO, setCurrentPageCompletedWO] = useState(1);
  const [itemsPerPageCompletedWO] = useState(5);

  const getOpenWorkOrders = async () => {
    const res = await getTenantOpenWorkOrders(loggedInUser.id);
    setOpenWorkOrders(res);
  }

  const getClosedWorkOrders = async () => {
    const res = await getTenantClosedWorkOrders(loggedInUser.id);
    setCompletedWorkOrders(res);
  }

  useEffect(() => {
    getOpenWorkOrders();
    getClosedWorkOrders();
  }, [])

  // Get current tenant's open work orders - for pagination
  const indexOfLastPostOpenWO = currentPageOpenWO * itemsPerPageOpenWO;
  const indexOfFirstPostOpenWO = indexOfLastPostOpenWO - itemsPerPageOpenWO;
  const currentOpenWorkOrders = openWorkOrders.slice(indexOfFirstPostOpenWO, indexOfLastPostOpenWO);

  // Get current tenant's completed work orders - for pagination
  const indexOfLastPostCompletedWO = currentPageCompletedWO * itemsPerPageCompletedWO;
  const indexOfFirstPostCompletedWO = indexOfLastPostCompletedWO - itemsPerPageCompletedWO;
  const currentCompletedWorkOrders = completedWorkOrders.slice(indexOfFirstPostCompletedWO, indexOfLastPostCompletedWO);

  // Change page - for tenant's open work orders pagination
  const paginateOpenWO = (pageNumber) => setCurrentPageOpenWO(pageNumber);

  // Change page - for tenant's completed work orders pagination
  const paginateCompletedWO = (pageNumber) => setCurrentPageCompletedWO(pageNumber);

  return (
    <div className="tenantDash-container">
      <div className="tenantDash-banner">
        <div><h4>Welcome, {loggedInUser.fullName}!</h4></div>
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
        <div className="tenantDash-closedWO-table">
          <h4>Completed Work Orders</h4>
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
              {/* Reusing PropertyCompletedWorkOrders component to generate table */}
              <PropertyCompletedWorkOrders workOrders={currentCompletedWorkOrders} />
            </tbody>
          </Table>
          <Pagination itemsPerPage={itemsPerPageCompletedWO} totalItems={completedWorkOrders.length} paginate={paginateCompletedWO} />
        </div>
      </div>
    </div>
  )
}

export default TenantDash;