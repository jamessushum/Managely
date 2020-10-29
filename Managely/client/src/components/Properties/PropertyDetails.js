import React, { useContext, useEffect, useState } from 'react';
import { PropertyContext } from '../../providers/PropertyProvider';
import PropertyInfo from './PropertyInfo';
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

  return (
    <div className="propertyDetails-main-container">
      <div className="propertyDetails-info child">
        <PropertyInfo property={details} />
      </div>
      <div className="propertyDetails-tenants child">
        tenants list
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