import React, { useContext, useEffect, useState } from 'react';
import { PropertyContext } from '../../providers/PropertyProvider';
import PropertyInfo from './PropertyInfo';
import PropertyTenantList from './PropertyTenantList';
import PropertyOpenWorkOrders from './PropertyOpenWorkOrders';
import Pagination from '../../components/Pagination/Pagination';
import './PropertyDetails.css';
import { Table } from 'reactstrap';

const PropertyDetails = ({ ...props }) => {
  const propertyId = props.match.params.id;

  const { getPropertyDetails, getPropertyTenants, getPropertyOpenWorkOrders } = useContext(PropertyContext);

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

  // State for tenant list pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4)

  // State for open work orders list pagination
  const [currentPageOpenWO, setcurrentPageOpenWO] = useState(1);
  const [itemsPerPageOpenWO] = useState(1);

  // State for property open work orders
  const [openWorkOrders, setOpenWorkOrders] = useState([]);

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
    console.log(res);
    setOpenWorkOrders(res);
  }

  useEffect(() => {
    propertyDetails();
    getAllPropertyTenants();
    getOpenWorkOrders();
  }, [])

  // Get current tenants - for pagination
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentTenants = propertyTenants.slice(indexOfFirstPost, indexOfLastPost);

  // Get current open work orders - for pagination
  const indexOfLastPostOpenWO = currentPageOpenWO * itemsPerPageOpenWO;
  const indexOfFirstPostOpenWO = indexOfLastPostOpenWO - itemsPerPageOpenWO;
  const currentOpenWorkOrders = openWorkOrders.slice(indexOfFirstPostOpenWO, indexOfLastPostOpenWO);

  // Change page - for tenant list pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change page - for open work orders list pagination
  const paginateOpenWO = (pageNumber => setcurrentPageOpenWO(pageNumber));

  return (
    <div className="propertyDetails-main-container">
      <div className="propertyDetails-info">
        <h4>Property Info</h4>
        <PropertyInfo property={details} />
      </div>
      <div className="propertyDetails-tenants">
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
      <div className="propertyDetails-outstanding last-row">
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
      <div className="propertyDetails-completed last-row">
        completed work orders
      </div>
    </div>
  )
}

export default PropertyDetails;