import React, { useContext, useState, useEffect } from 'react';
import { PropertyContext } from '../../providers/PropertyProvider';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, } from 'reactstrap';

const PropertyInfoEditModal = ({ editModal, editToggle, editPropertyId }) => {
  const { getPropertyDetails, getPropertyTypes } = useContext(PropertyContext);

  const [property, setProperty] = useState({
    id: "",
    name: "",
    address: "",
    propertyTypeId: "",
  });

  const [propertyTypes, setPropertyTypes] = useState([]);

  const getPropertyInfo = async () => {
    const res = await getPropertyDetails(editPropertyId);
    setProperty({
      id: res.id,
      name: res.name,
      address: res.address,
      propertyTypeId: res.propertyTypeId
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
          <Button color="primary" onClick={editToggle}>Save</Button>{' '}
          <Button color="secondary" onClick={editToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default PropertyInfoEditModal;
