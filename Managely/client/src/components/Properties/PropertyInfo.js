import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg, Button } from 'reactstrap';
import DefaultImage from './Img/default-property-image.jpg'

const PropertyInfo = ({ property }) => {

  return (
    <div className="propertyInfo-container">
      <Card className="mb-3">
        <div className="row no-gutters">
          <div className="propertyInfo-img-container col-md-4">
            {property.imageLocation === null || property.imageLocation === "" ? <CardImg src={DefaultImage} alt="default" width="100%" height="100%" /> : <CardImg src={property.imageLocation} alt="property-img" width="100%" height="100%" />}
          </div>
          <CardBody className="col-md-8">
            <CardTitle className="font-weight-bold">Property Name</CardTitle>
            <CardText>{property.name}</CardText>
            <CardTitle className="font-weight-bold">Property Address</CardTitle>
            <CardText>{property.address}</CardText>
            <CardTitle className="font-weight-bold">Property Type</CardTitle>
            <CardText>{property.type}</CardText>
            <Button size="sm" className="mr-2">Edit</Button>
            <Button size="sm" color="danger">Delete</Button>
          </CardBody>
        </div>
      </Card>
    </div>
  )
}

export default PropertyInfo;

