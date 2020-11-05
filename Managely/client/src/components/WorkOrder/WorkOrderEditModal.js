import React, { useEffect, useState, useContext } from 'react';
import { WorkOrderContext } from '../../providers/WorkOrderProvider';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const WorkOrderEditModal = ({ editModal, editToggle, workOrderToEditId, formFeedback, setFormFeedback, getUpdatedWorkOrder }) => {

  const { getSeverity, getStatus, getWorkOrderById, updateWorkOrder } = useContext(WorkOrderContext);

  const [workOrder, setWorkOrder] = useState({
    id: "",
    subject: "",
    description: "",
    createDateTime: "",
    imageLocation: "",
    severityId: "",
    statusId: "",
    userProfileId: "",
    propertyId: ""
  })

  const [severities, setSeverities] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const getWorkOrder = async () => {
    const res = await getWorkOrderById(workOrderToEditId);
    setWorkOrder({
      id: res.id,
      subject: res.subject,
      description: res.description,
      createDateTime: res.createDateTime,
      imageLocation: res.imageLocation,
      severityId: res.severityId,
      statusId: res.statusId,
      userProfileId: res.userProfileId,
      propertyId: res.propertyId
    })
  }

  const getSeverities = async () => {
    const res = await getSeverity();
    setSeverities(res);
  }

  const getStatuses = async () => {
    const res = await getStatus();
    setStatuses(res);
  }

  const handleFieldChange = (e) => {
    const stateToChange = { ...workOrder };
    stateToChange[e.target.id] = e.target.value;
    setWorkOrder(stateToChange);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedWorkOrder = {
      id: workOrder.id,
      subject: workOrder.subject,
      description: workOrder.description,
      createDateTime: workOrder.createDateTime,
      imageLocation: workOrder.imageLocation,
      severityId: parseInt(workOrder.severityId),
      statusId: parseInt(workOrder.statusId),
      userProfileId: workOrder.userProfileId,
      propertyId: workOrder.propertyId
    }

    if (workOrder.subject === "" || workOrder.description === "") {
      setFormFeedback(true);
    } else {
      updateWorkOrder(updatedWorkOrder).then(() => {
        editToggle();
        getUpdatedWorkOrder();
      })
    }
  }

  useEffect(() => {
    getWorkOrder();
    getSeverities();
    getStatuses();
  }, [editModal])

  return (
    <div>
      <Modal isOpen={editModal} toggle={editToggle}>
        <ModalHeader toggle={editToggle}>Update Work Order</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="subject">Subject</Label>
            <Input type="text" id="subject" value={workOrder.subject} onChange={handleFieldChange} invalid={formFeedback} />
            <FormFeedback>Required fields</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="textarea" id="description" value={workOrder.description} onChange={handleFieldChange} invalid={formFeedback} />
            <FormFeedback>Required fields</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="severityId">Severity</Label>
            <Input type="select" id="severityId" value={workOrder.severityId} onChange={handleFieldChange}>
              {severities.map(type => <option key={type.id} value={type.id}>{type.type}</option>)}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="statusId">Status</Label>
            <Input type="select" id="statusId" value={workOrder.statusId} onChange={handleFieldChange}>
              {statuses.map(type => <option key={type.id} value={type.id}>{type.type}</option>)}
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={handleSubmit}>Update</Button>{' '}
          <Button color="secondary" onClick={editToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default WorkOrderEditModal;