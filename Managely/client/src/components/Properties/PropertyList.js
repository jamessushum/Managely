import React, { useContext, useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { PropertyContext } from '../../providers/PropertyProvider';
import PropertyAddModal from './PropertyAddModal';
import './PropertyList.css'
import { Table, Button } from 'reactstrap';

const PropertyList = () => {
  const { getAllProperties } = useContext(PropertyContext);

  const [activeProperties, setActiveProperties] = useState([]);

  // State for add property modal
  const [addPropertyModal, setAddPropertyModal] = useState(false);

  // State for new property
  const [property, setProperty] = useState({
    name: "",
    address: "",
    propertyTypeId: "",
  })

  // State for new property image
  const [imageLocation, setImageLocation] = useState("");

  // Method to toggle add property modal
  const addToggle = () => {
    setAddPropertyModal(!addPropertyModal);
    setProperty({
      name: "",
      address: "",
      propertyTypeId: "",
    });
    setImageLocation("");
  }

  const getActiveProperties = async () => {
    const res = await getAllProperties();
    setActiveProperties(res);
  }

  useEffect(() => {
    getActiveProperties();
  }, [])

  return (
    <>
      <PropertyAddModal addPropertyModal={addPropertyModal} addToggle={addToggle} getActiveProperties={getActiveProperties} property={property} setProperty={setProperty} imageLocation={imageLocation} setImageLocation={setImageLocation} />
      <div className="propertyList-btn-container">
        <Button color="secondary" onClick={addToggle}>Add Property</Button>
      </div>
      <div className="propertyList-table">
        <h4>Properties Under Management</h4>
        <Table striped>
          <thead>
            <tr>
              <th></th>
              <th>Property Name</th>
              <th>Property Address</th>
              <th>Property Type</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {activeProperties.map(property => <PropertyCard key={property.id} property={property} />)}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default PropertyList;