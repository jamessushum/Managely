import React, { useContext, useEffect, useState } from 'react';
import { PropertyContext } from '../../providers/PropertyProvider';
import PropertyInfo from './PropertyInfo';
import PropertyTenantList from './PropertyTenantList';
import PropertyOpenWorkOrders from './PropertyOpenWorkOrders';
import PropertyCompletedWorkOrders from './PropertyCompletedWorkOrders';
import Pagination from '../../components/Pagination/Pagination';
import PropertyInfoEditModal from './PropertyInfoEditModal';
import './PropertyDetails.css';
import { Table } from 'reactstrap';

const PropertyDetails = ({ ...props }) => {
  const propertyId = props.match.params.id;

  const { getPropertyDetails, getPropertyTenants, getPropertyOpenWorkOrders, getPropertyCompletedWorkOrders } = useContext(PropertyContext);

  // State for property info component
  const [details, setDetails] = useState({
    id: "",
    name: "",
    address: "",
    imageLocation: "",
    type: "",
  });

  // State for property tenants component
  const [propertyTenants, setPropertyTenants] = useState([]);

  // State for property open work orders component
  const [openWorkOrders, setOpenWorkOrders] = useState([]);

  // State for property completed work orders component
  const [completedWorkOrders, setCompletedWorkOrders] = useState([]);

  // State for tenant list pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4)

  // State for open work orders list pagination
  const [currentPageOpenWO, setCurrentPageOpenWO] = useState(1);
  const [itemsPerPageOpenWO] = useState(3);

  // State for completed work orders list pagination
  const [currentPageCompletedWO, setCurrentPageCompletedWO] = useState(1);
  const [itemsPerPageCompletedWO] = useState(3);

  const propertyDetails = async () => {
    const res = await getPropertyDetails(propertyId);
    setDetails({
      id: res.id,
      name: res.name,
      address: res.address,
      imageLocation: res.imageLocation,
      type: res.propertyType.type
    });
  }

  const getAllPropertyTenants = async () => {
    const res = await getPropertyTenants(propertyId);
    setPropertyTenants(res);
  }

  const getOpenWorkOrders = async () => {
    const res = await getPropertyOpenWorkOrders(propertyId);
    setOpenWorkOrders(res);
  }

  const getCompletedWorkOrders = async () => {
    const res = await getPropertyCompletedWorkOrders(propertyId);
    setCompletedWorkOrders(res);
  }

  useEffect(() => {
    propertyDetails();
    getAllPropertyTenants();
    getOpenWorkOrders();
    getCompletedWorkOrders();
  }, [])

  // Get current tenants - for pagination
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentTenants = propertyTenants.slice(indexOfFirstPost, indexOfLastPost);

  // Get current open work orders - for pagination
  const indexOfLastPostOpenWO = currentPageOpenWO * itemsPerPageOpenWO;
  const indexOfFirstPostOpenWO = indexOfLastPostOpenWO - itemsPerPageOpenWO;
  const currentOpenWorkOrders = openWorkOrders.slice(indexOfFirstPostOpenWO, indexOfLastPostOpenWO);

  // Get current completed work orders - for pagination
  const indexOfLastPostCompletedWO = currentPageCompletedWO * itemsPerPageCompletedWO;
  const indexOfFirstPostCompletedWO = indexOfLastPostCompletedWO - itemsPerPageCompletedWO;
  const currentCompletedWorkOrders = completedWorkOrders.slice(indexOfFirstPostCompletedWO, indexOfLastPostCompletedWO);

  // Change page - for tenant list pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change page - for open work orders list pagination
  const paginateOpenWO = (pageNumber) => setCurrentPageOpenWO(pageNumber);

  // Change page - for completed work orders list pagination
  const paginateCompletedWO = (pageNumber) => setCurrentPageCompletedWO(pageNumber);

  // Property edit modal components ----- Below -----

  const [editModal, setEditModal] = useState(false);

  const editToggle = () => {
    setEditModal(!editModal);
  }

  return (
    <div className="propertyDetails-main-container">
      <div className="propertyDetails-info">
        <PropertyInfoEditModal editModal={editModal} editToggle={editToggle} editPropertyId={propertyId} />
        <PropertyInfo property={details} editToggle={editToggle} />
      </div>
      <div className="propertyDetails-tenants">
        <div className="propertyDetails-tenants-table">
          <h4>Property Tenants</h4>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Unit #</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <PropertyTenantList tenants={currentTenants} />
            </tbody>
          </Table>
          <Pagination itemsPerPage={itemsPerPage} totalItems={propertyTenants.length} paginate={paginate} />
        </div>
      </div>
      <div className="propertyDetails-outstanding last-row">
        <div className="propertyDetails-outstanding-table">
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
              <PropertyOpenWorkOrders workOrders={currentOpenWorkOrders} />
            </tbody>
          </Table>
          <Pagination itemsPerPage={itemsPerPageOpenWO} totalItems={openWorkOrders.length} paginate={paginateOpenWO} />
        </div>
      </div>
      <div className="propertyDetails-completed last-row">
        <div className="propertyDetails-completed-table">
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
              <PropertyCompletedWorkOrders workOrders={currentCompletedWorkOrders} />
            </tbody>
          </Table>
          <Pagination itemsPerPage={itemsPerPageCompletedWO} totalItems={completedWorkOrders.length} paginate={paginateCompletedWO} />
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails;