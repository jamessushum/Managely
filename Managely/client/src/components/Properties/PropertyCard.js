import React from 'react';
import { useHistory } from 'react-router-dom';
import './PropertyCard.css'
import { FaBuilding } from 'react-icons/fa';
import { Button } from 'reactstrap';

const PropertyCard = ({ property }) => {
  const history = useHistory();

  return (
    <>
      <tr>
        <th scope="row" className="property-row-img-container">
          {property.imageLocation === null || property.imageLocation === "" ? <FaBuilding className="property-row-image" /> : <img src={property.imageLocation} alt="property-img" />}
        </th>
        <td>{property.name}</td>
        <td>{property.address}</td>
        <td>{property.propertyType.type}</td>
        <td><Button color="info" onClick={() => history.push(`/properties/details/${property.id}`)}>Details</Button></td>
      </tr>
    </>
  )
}

export default PropertyCard;