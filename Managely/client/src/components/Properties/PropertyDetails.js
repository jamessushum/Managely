import React from 'react';
import './PropertyDetails.css';

const PropertyDetails = ({ ...props }) => {
  const propertyId = props.match.params.id;

  return (
    <div className="propertyDetails-main-container">
      <div className="propertyDetails-top-container">
        <div className="propertyDetails-details-container">
          Property details
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