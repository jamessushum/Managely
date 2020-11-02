import React, { useContext, useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { PropertyContext } from '../../providers/PropertyProvider';
import './PropertyList.css'
import { Table, Button } from 'reactstrap';

const PropertyList = () => {
  const { getAllProperties } = useContext(PropertyContext);

  const [activeProperties, setActiveProperties] = useState([]);

  const getActiveProperties = async () => {
    const res = await getAllProperties();
    setActiveProperties(res);
  }

  useEffect(() => {
    getActiveProperties();
  }, [])

  return (
    <>
      <div className="propertyList-btn-container">
        <Button color="success">Add Property</Button>
      </div>
      <div className="propertyList-table">
        <h4>Properties Under Management</h4>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Property Name</th>
              <th>Property Address</th>
              <th>Property Type</th>
              <th></th>
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