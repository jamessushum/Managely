import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const WorkOrderEditModal = ({ editModal, editToggle, workOrderToEdit }) => {

  return (
    <div>
      <Modal isOpen={editModal} toggle={editToggle}>
        <ModalHeader toggle={editToggle}>Update Work Order</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="subject">Subject</Label>
            <Input type="text" id="subject" />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="textarea" id="description" />
          </FormGroup>
          <FormGroup>
            <Label for="imageLocation">Image</Label>
            <Input type="file" id="imageLocation" />
          </FormGroup>
          <FormGroup>
            <Label for="severityId">Severity</Label>
            <Input type="select" id="severityId" />
          </FormGroup>
          <FormGroup>
            <Label for="statusId">Status</Label>
            <Input type="select" id="statusId" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={editToggle}>Update</Button>{' '}
          <Button color="secondary" onClick={editToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default WorkOrderEditModal;