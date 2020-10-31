import React, { useContext, useEffect, useState } from 'react';
import { WorkOrderContext } from '../../providers/WorkOrderProvider';
import WorkOrderInfo from './WorkOrderInfo';
import WorkOrderEditModal from './WorkOrderEditModal';
import './WorkOrderDetails.css'

const WorkOrderDetails = ({ ...props }) => {
  const workOrderId = props.match.params.id;

  const { getWorkOrderById } = useContext(WorkOrderContext);

  // State for work order info
  const [workOrderInfo, setWorkOrderInfo] = useState({
    id: "",
    subject: "",
    description: "",
    createDateTime: "",
    severity: "",
    status: "",
    userFullName: "",
    userCompany: "",
    propertyName: "",
    imageLocation: "",
  });

  // State for work order edit modal
  const [editModal, setEditModal] = useState(false);
  const [workOrderToEdit, setWorkOrderToEdit] = useState({
    id: "",
    subject: "",
    description: "",
    createDateTime: "",
    imageLocation: "",
    severityId: "",
    statusId: "",
    userProfileId: "",
    propertyId: ""
  });

  // Toggle work order edit modal
  const editToggle = () => {
    setEditModal(!editModal);
  }

  const getWorkOrder = async () => {
    const res = await getWorkOrderById(workOrderId);
    console.log(res)
    setWorkOrderInfo({
      id: res.id,
      subject: res.subject,
      description: res.description,
      createDateTime: res.createDateTime,
      severity: res.severity.type,
      status: res.status.type,
      userFullName: res.userProfile.fullName,
      userCompany: res.userProfile.company,
      propertyName: res.property.name,
      imageLocation: res.imageLocation
    });
    setWorkOrderToEdit({
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

  useEffect(() => {
    getWorkOrder();
  }, [])

  return (
    <div className="workOrderDetails-container">
      <WorkOrderEditModal editModal={editModal} editToggle={editToggle} workOrderToEdit={workOrderToEdit} />
      <div className="workOrderDetails-progressBar">
        progress bar
      </div>
      <div className="workOrderDetails-info">
        <WorkOrderInfo workOrder={workOrderInfo} editToggle={editToggle} />
      </div>
      <div className="workOrderDetails-comments-container">
        comments container
      </div>
    </div>
  )
}

export default WorkOrderDetails;