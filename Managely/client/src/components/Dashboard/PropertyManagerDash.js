import React, { useState, useContext, useEffect } from 'react';
import { WorkOrderContext } from '../../providers/WorkOrderProvider';
import AllOpenWorkOrders from './AllOpenWorkOrders';
import AllClosedWorkOrders from './AllClosedWorkOrders';
import Pagination from '../Pagination/Pagination';
import './PropertyManagerDash.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Table } from 'reactstrap';
import classnames from 'classnames';

const PropertyManagerDash = () => {
  const loggedInUser = JSON.parse(sessionStorage.userProfile);

  const { getAllOpenWorkOrders, getAllClosedWorkOrders } = useContext(WorkOrderContext);

  const [allOpenWorkOders, setAllOpenWorkOrders] = useState([]);

  const [allClosedWorkOrders, setAllClosedWorkOrders] = useState([]);

  // State for PMs open work orders pagination
  const [currentPageOpenWO, setCurrentPageOpenWO] = useState(1);
  const [itemsPerPageOpenWO] = useState(5);

  // State for PMs completed work orders pagination
  const [currentPageCompletedWO, setCurrentPageCompletedWO] = useState(1);
  const [itemsPerPageCompletedWO] = useState(5);

  const getOpenWO = async () => {
    const res = await getAllOpenWorkOrders(loggedInUser.id);
    setAllOpenWorkOrders(res);
  }

  const getClosedWO = async () => {
    const res = await getAllClosedWorkOrders(loggedInUser.id);
    setAllClosedWorkOrders(res);
  }

  useEffect(() => {
    getOpenWO();
    getClosedWO();
  }, [])

  const [activeTab, setActiveTab] = useState('1')

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  // Get current PMs open work orders - for pagination
  const indexOfLastPostOpenWO = currentPageOpenWO * itemsPerPageOpenWO;
  const indexOfFirstPostOpenWO = indexOfLastPostOpenWO - itemsPerPageOpenWO;
  const currentOpenWorkOrders = allOpenWorkOders.slice(indexOfFirstPostOpenWO, indexOfLastPostOpenWO);

  // Get current PMs completed work orders - for pagination
  const indexOfLastPostCompletedWO = currentPageCompletedWO * itemsPerPageCompletedWO;
  const indexOfFirstPostCompletedWO = indexOfLastPostCompletedWO - itemsPerPageCompletedWO;
  const currentCompletedWorkOrders = allClosedWorkOrders.slice(indexOfFirstPostCompletedWO, indexOfLastPostCompletedWO);

  // Change page - for PMs open work orders pagination
  const paginateOpenWO = (pageNumber) => setCurrentPageOpenWO(pageNumber);

  // Change page - for PMs completed work orders pagination
  const paginateCompletedWO = (pageNumber) => setCurrentPageCompletedWO(pageNumber);

  return (
    <div className="propertyManagerDash-container">
      <div className="propertyManagerDash-banner">
        <h4>Welcome, {loggedInUser.fullName} 🍱</h4>
      </div>
      <div className="propertyManagerDash-WO">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >
              <span>All Open Work Orders</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              <span>All Closed Work Orders</span>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="propertyManagerDash-openWO-table">
              <Table striped>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Severity</th>
                    <th>Requested By</th>
                    <th>Property</th>
                    <th>Date Created</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <AllOpenWorkOrders workOrders={currentOpenWorkOrders} />
                </tbody>
              </Table>
              <Pagination itemsPerPage={itemsPerPageOpenWO} totalItems={allOpenWorkOders.length} paginate={paginateOpenWO} currentPage={currentPageOpenWO} />
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="propertyManagerDash-closedWO-table">
              <Table striped>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Severity</th>
                    <th>Requested By</th>
                    <th>Property</th>
                    <th>Date Created</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <AllClosedWorkOrders workOrders={currentCompletedWorkOrders} />
                </tbody>
              </Table>
              <Pagination itemsPerPage={itemsPerPageCompletedWO} totalItems={allClosedWorkOrders.length} paginate={paginateCompletedWO} currentPage={currentPageCompletedWO} />
            </div>
          </TabPane>
        </TabContent>
      </div>
    </div>
  )
}

export default PropertyManagerDash;