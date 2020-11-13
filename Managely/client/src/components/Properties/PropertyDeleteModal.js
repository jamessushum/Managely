import React, { useContext } from 'react';
import { PropertyContext } from '../../providers/PropertyProvider';
import { useHistory } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const PropertyDeleteModal = ({ propertyDeleteModal, propertyDeleteToggle, propertyDetails }) => {
  const { updateProperty } = useContext(PropertyContext);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const property = {
      id: propertyDetails.id,
      name: propertyDetails.name,
      address: propertyDetails.address,
      imageLocation: propertyDetails.imageLocation,
      propertyTypeId: propertyDetails.propertyTypeId,
      isActive: false
    }

    updateProperty(property).then(() => {
      history.push('/properties');
    })
  }

  return (
    <div>
      <Modal isOpen={propertyDeleteModal} toggle={propertyDeleteToggle}>
        <ModalHeader toggle={propertyDeleteToggle}>Deactivate Property</ModalHeader>
        <ModalBody>
          Are you sure you want deactivate <b>{propertyDetails.name}</b>?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleSubmit}>Deactivate</Button>{' '}
          <Button color="secondary" onClick={propertyDeleteToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default PropertyDeleteModal;