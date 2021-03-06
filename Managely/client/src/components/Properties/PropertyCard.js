import React from 'react';
import { useHistory } from 'react-router-dom';
import './PropertyCard.css'
import { Button } from 'reactstrap';
import DefaultImage from './Img/default-property-image.jpg'
import { FaEye } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const history = useHistory();

  return (
    <>
      <tr>
        <th scope="row" className="property-row-img-container">
          {property.imageLocation === null || property.imageLocation === "" ? <img src={DefaultImage} alt="default" className="property-card-image" /> : <img src={property.imageLocation} alt="property-img" className="property-card-image" />}
        </th>
        <td>{property.name}</td>
        <td>{property.address}</td>
        <td>{property.propertyType.type}</td>
        <td><Button outline color="secondary" onClick={() => history.push(`/properties/details/${property.id}`)}><FaEye /></Button></td>
      </tr>
    </>
  )
}

export default PropertyCard;