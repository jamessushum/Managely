import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import { FaBuilding } from 'react-icons/fa';

const PropertyInfo = ({ property }) => {

  return (
    <div>
      <Card className="mb-3">
        <div className="row no-gutters">
          <div className="propertyInfo-img-container col-md-4">
            {property.imageLocation === null || property.imageLocation === "" ? <FaBuilding className="propertyInfo-icon" /> : <CardImg src={property.imageLocation} alt="property-img" width="100%" height="100%" />}
          </div>
          <CardBody className="col-md-8">
            <CardTitle className="font-weight-bold">Property Name</CardTitle>
            <CardText>{property.name}</CardText>
            <CardTitle className="font-weight-bold">Property Address</CardTitle>
            <CardText>{property.address}</CardText>
            <CardTitle className="font-weight-bold">Property Type</CardTitle>
            <CardText>{property.type}</CardText>
          </CardBody>
        </div>
      </Card>
    </div>
  )
}

export default PropertyInfo;

