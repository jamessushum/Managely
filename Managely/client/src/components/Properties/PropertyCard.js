import React from 'react';
import './PropertyCard.css'
import { FaBuilding } from 'react-icons/fa';

const PropertyCard = ({ property }) => {

  return (
    <>
      <tr>
        <th scope="row" className="property-row-img-container"><FaBuilding className="property-row-image" /></th>
        <td>{property.name}</td>
        <td>{property.address}</td>
        <td>{property.propertyType.type}</td>
        <td><button>Details</button></td>
      </tr>
    </>
  )
}

export default PropertyCard;