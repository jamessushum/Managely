import React, { useContext, useState, useEffect } from 'react';
import { PropertyContext } from '../../providers/PropertyProvider';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';

const PropertyAddModal = ({ addPropertyModal, addToggle, getActiveProperties, property, setProperty, imageLocation, setImageLocation }) => {
  const { getPropertyTypes, addNewProperty } = useContext(PropertyContext);

  const [propertyTypes, setPropertyTypes] = useState([]);

  const [isImageLoading, setIsImageLoading] = useState(false);

  const getAllPropertyTypes = async () => {
    const res = await getPropertyTypes();
    setPropertyTypes(res);
  }

  const handleFieldChange = (e) => {
    const stateToChange = { ...property };
    stateToChange[e.target.id] = e.target.value;
    setProperty(stateToChange);
  }

  const handleImageField = async (e) => {
    const files = e.target.files
    setIsImageLoading(true)
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'flyingboar')
    const res = await fetch('https://api.cloudinary.com/v1_1/diswqnkzl/image/upload', {
      method: "POST",
      body: data
    })
    const file = await res.json()
    setImageLocation(file.secure_url)
    setIsImageLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProperty = {
      name: property.name,
      address: property.address,
      imageLocation: imageLocation,
      isActive: true,
      propertyTypeId: parseInt(property.propertyTypeId)
    }

    if (property.name === "" || property.address === "" || property.propertyTypeId === "") {
      alert('Please fill out all requried fields')
    } else {
      addNewProperty(newProperty).then(() => {
        addToggle();
        setProperty({
          name: "",
          address: "",
          propertyTypeId: "",
        });
        setImageLocation("");
        document.getElementById('newProperty-form').reset();
        getActiveProperties();
      })
    }
  }

  useEffect(() => {
    getAllPropertyTypes();
  }, [])

  return (
    <div>
      <Modal isOpen={addPropertyModal} toggle={addToggle}>
        <ModalHeader toggle={addToggle}>Add New Property</ModalHeader>
        <ModalBody>
          <Form id="newProperty-form">
            <FormGroup>
              <Label for="name">Name</Label>
              <Input id="name" onChange={handleFieldChange} />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input id="address" onChange={handleFieldChange} />
            </FormGroup>
            <FormGroup>
              <Label for="propertyTypeId">Property Type</Label>
              <Input type="select" id="propertyTypeId" defaultValue="" onChange={handleFieldChange}>
                <option value="" disabled>Select a property type</option>
                {propertyTypes.map(type => <option key={type.id} value={type.id}>{type.type}</option>)}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="imageLocation">Image</Label>
              <Input type="file" id="imageLocation" onChange={handleImageField} />
              {isImageLoading ? <Spinner size="sm" color="warning" /> : null}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleSubmit}>Add</Button>{' '}
          <Button color="secondary" onClick={addToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default PropertyAddModal;