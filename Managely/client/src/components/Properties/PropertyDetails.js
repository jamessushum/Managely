import React, { useContext, useEffect, useState } from 'react';
import { PropertyContext } from '../../providers/PropertyProvider';
import PropertyInfo from './PropertyInfo';
import PropertyTenantList from './PropertyTenantList';
import Pagination from '../../components/Pagination/Pagination';
import './PropertyDetails.css';

const PropertyDetails = ({ ...props }) => {
  const propertyId = props.match.params.id;

  const { getPropertyDetails, getPropertyTenants } = useContext(PropertyContext);

  const [details, setDetails] = useState({
    id: "",
    name: "",
    address: "",
    imageLocation: "",
    type: "",
  });

  const [propertyTenants, setPropertyTenants] = useState([]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5)

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
    console.log(res);
    setPropertyTenants(res);
  }

  useEffect(() => {
    propertyDetails();
    getAllPropertyTenants();
  }, [])

  // Get current tenants - for pagination
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentTenants = propertyTenants.slice(indexOfFirstPost, indexOfLastPost);

  // Change page - for pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="propertyDetails-main-container">
      <div className="propertyDetails-info child">
        <PropertyInfo property={details} />
      </div>
      <div className="propertyDetails-tenants child">
        <PropertyTenantList tenants={currentTenants} />
        <Pagination itemsPerPage={itemsPerPage} totalItems={propertyTenants.length} paginate={paginate} />
      </div>
      <div className="propertyDetails-outstanding child last-row">
        outstanding work orders
      </div>
      <div className="propertyDetails-completed child last-row">
        completed work orders
      </div>
    </div>
  )
}

export default PropertyDetails;