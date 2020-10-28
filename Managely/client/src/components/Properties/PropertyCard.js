import React from 'react';
import './PropertyCard.css'
import { FaBuilding } from 'react-icons/fa';
import { Button } from 'reactstrap';

const PropertyCard = ({ property }) => {

  return (
    <>
      <tr>
        <th scope="row" className="property-row-img-container">
          {property.imageLocation === null || property.imageLocation === "" ? <FaBuilding className="property-row-image" /> : <img src={property.imageLocation} alt="property-img" />}
        </th>
        <td>{property.name}</td>
        <td>{property.address}</td>
        <td>{property.propertyType.type}</td>
        <td><Button color="info">Details</Button></td>
      </tr>
    </>
  )
}

export default PropertyCard;