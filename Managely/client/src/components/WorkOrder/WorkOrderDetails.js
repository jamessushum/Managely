import React, { useContext, useEffect, useState } from 'react';
import { WorkOrderContext } from '../../providers/WorkOrderProvider';
import WorkOrderInfo from './WorkOrderInfo';
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

  const getWorkOrder = async () => {
    const res = await getWorkOrderById(workOrderId);
    console.log(res);
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
  }

  useEffect(() => {
    getWorkOrder();
  }, [])

  return (
    <div className="workOrderDetails-container">
      <div className="workOrderDetails-progressBar">
        progress bar
      </div>
      <div className="workOrderDetails-info">
        <WorkOrderInfo workOrder={workOrderInfo} />
      </div>
      <div className="workOrderDetails-comments-container">
        comments container
      </div>
    </div>
  )
}

export default WorkOrderDetails;