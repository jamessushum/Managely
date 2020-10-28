import React, { useContext, useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { PropertyContext } from '../../providers/PropertyProvider';
import './PropertyList.css'
import { Table } from 'reactstrap';

const PropertyList = () => {
  const { getAllProperties } = useContext(PropertyContext);

  const [activeProperties, setActiveProperties] = useState([]);

  const getActiveProperties = async () => {
    const res = await getAllProperties();
    console.log(res);
    setActiveProperties(res);
  }

  useEffect(() => {
    getActiveProperties();
  }, [])

  return (
    <>
      <Table className="propertyList-table">
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
    </>
  )
}

export default PropertyList;