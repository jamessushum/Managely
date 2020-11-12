import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const PropertyDeleteModal = ({ propertyDeleteModal, propertyDeleteToggle, propertyDetails }) => {

  return (
    <div>
      <Modal isOpen={propertyDeleteModal} toggle={propertyDeleteToggle}>
        <ModalHeader toggle={propertyDeleteToggle}>Deactivate Property</ModalHeader>
        <ModalBody>
          Are you sure you want deactivate <b>{propertyDetails.name}</b>?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={propertyDeleteToggle}>Deactivate</Button>{' '}
          <Button color="secondary" onClick={propertyDeleteToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default PropertyDeleteModal;