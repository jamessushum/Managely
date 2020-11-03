import React, { useContext, useState, useEffect } from 'react';
import { PropertyContext } from '../../providers/PropertyProvider';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, } from 'reactstrap';

const PropertyInfoEditModal = ({ editModal, editToggle, editPropertyId, propertyDetails }) => {
  const { getPropertyDetails, getPropertyTypes, updateProperty } = useContext(PropertyContext);

  const [property, setProperty] = useState({
    id: "",
    name: "",
    address: "",
    propertyTypeId: "",
    imageLocation: "",
    isActive: ""
  });

  const [propertyTypes, setPropertyTypes] = useState([]);

  const getPropertyInfo = async () => {
    const res = await getPropertyDetails(editPropertyId);
    setProperty({
      id: res.id,
      name: res.name,
      address: res.address,
      propertyTypeId: res.propertyTypeId,
      imageLocation: res.imageLocation,
      isActive: res.isActive
    })
  }

  const getAllPropertyTypes = async () => {
    const res = await getPropertyTypes();
    setPropertyTypes(res);
  }

  const handleFieldChange = (e) => {
    const stateToChange = { ...property };
    stateToChange[e.target.id] = e.target.value;
    setProperty(stateToChange);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProperty = {
      id: property.id,
      name: property.name,
      address: property.address,
      propertyTypeId: parseInt(property.propertyTypeId),
      imageLocation: property.imageLocation,
      isActive: property.isActive
    }

    if (property.name === "" || property.address === "" || property.propertyTypeId === "") {
      alert('Please fill out all input fields')
    } else {
      updateProperty(updatedProperty).then(() => {
        editToggle();
        propertyDetails();
      })
    }
  }

  useEffect(() => {
    getPropertyInfo();
    getAllPropertyTypes();
  }, [editModal])

  return (
    <div>
      <Modal isOpen={editModal} toggle={editToggle}>
        <ModalHeader toggle={editToggle}>Update Property Details</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" value={property.name} onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input id="address" value={property.address} onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="propertyTypeId">Property Type</Label>
            <Input type="select" id="propertyTypeId" value={property.propertyTypeId} onChange={handleFieldChange}>
              {propertyTypes.map(type => <option key={type.id} value={type.id}>{type.type}</option>)}
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Save</Button>{' '}
          <Button color="secondary" onClick={editToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default PropertyInfoEditModal;
