import React, { useContext, useEffect, useState } from 'react';
import { PropertyContext } from '../../providers/PropertyProvider';
import PropertyInfo from './PropertyInfo';
import './PropertyDetails.css';

const PropertyDetails = ({ ...props }) => {
  const propertyId = props.match.params.id;

  const { getPropertyDetails } = useContext(PropertyContext);

  const [details, setDetails] = useState({
    name: "",
    address: "",
    imageLocation: "",
    type: "",
  });

  const propertyDetails = async () => {
    const res = await getPropertyDetails(propertyId);
    console.log(res);
    setDetails({
      name: res.name,
      address: res.address,
      imageLocation: res.imageLocation,
      type: res.propertyType.type
    });
  }

  useEffect(() => {
    propertyDetails();
  }, [])

  return (
    <div className="propertyDetails-main-container">
      <div className="propertyDetails-top-container">
        <div className="propertyDetails-details-container">
          <PropertyInfo property={details} />
        </div>
        <div className="propertyDetails-tenants-container">
          Tenants list
        </div>
      </div>
      <div className="propertyDetails-bottom-container">

      </div>
    </div>
  )
}

export default PropertyDetails;