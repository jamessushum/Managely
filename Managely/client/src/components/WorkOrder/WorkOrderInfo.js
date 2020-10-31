import React from 'react';
import { Button } from 'reactstrap';

const WorkOrderInfo = ({ workOrder, editToggle }) => {

  return (
    <div className="card">
      <h4 className="card-header">
        Work Order Details
        <Button className="ml-3" size="sm" onClick={() => editToggle()}>Update</Button>
        <Button className="ml-2" color="danger" size="sm">Delete</Button>
      </h4>
      <div className="card-body">
        <h5 className="card-title">{workOrder.subject}</h5>
        <p className="card-text">{workOrder.description}</p>
        <p className="card-text"><b>Requested by:</b> {workOrder.userFullName} {workOrder.userCompany === null || workOrder.userCompany === "" ? null : `from ${workOrder.userCompany}`}</p>
        <p className="card-text"><b>Property:</b> {workOrder.propertyName}</p>
        <p className="card-text"><b>Date Created:</b> {workOrder.createDateTime}</p>
        <p className="card-text"><b>Severity:</b> {workOrder.severity}</p>
        <p className="card-text"><b>Status:</b> {workOrder.status}</p>
        <p className="card-text"><b>Images:</b> {workOrder.imageLocation === null || workOrder.imageLocation === "" ? 'N/A' : workOrder.imageLocation}</p>
      </div>
    </div>
  )
}

export default WorkOrderInfo;