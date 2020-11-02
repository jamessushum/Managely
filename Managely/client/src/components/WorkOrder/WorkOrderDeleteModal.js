import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { WorkOrderContext } from '../../providers/WorkOrderProvider';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const WorkOrderDeleteModal = ({ deleteModal, deleteToggle, workOrderInfo }) => {
  const { deleteWorkOrder } = useContext(WorkOrderContext);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    deleteWorkOrder(workOrderInfo.id).then(() => {
      history.push(`/properties/details/${workOrderInfo.propertyId}`)
    })
  }

  return (
    <div>
      <Modal isOpen={deleteModal} toggle={deleteToggle}>
        <ModalHeader toggle={deleteToggle}>Delete Work Order</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete <b>{workOrderInfo.subject}</b>?</p>
          <em>These changes are irreversible and will delete all corresponding comments.</em>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleSubmit}>Delete</Button>{' '}
          <Button color="secondary" onClick={deleteToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default WorkOrderDeleteModal;