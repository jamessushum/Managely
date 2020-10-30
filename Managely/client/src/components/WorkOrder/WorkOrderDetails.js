import React from 'react';
import './WorkOrderDetails.css'

const WorkOrderDetails = ({ ...props }) => {
  const workOrderId = props.match.params.id;

  return (
    <div className="workOrderDetails-container">
      <div className="workOrderDetails-progressBar">
        progress bar
      </div>
      <div className="workOrderDetails-info">
        work order info
      </div>
      <div className="workOrderDetails-comments-container">
        comments container
      </div>
    </div>
  )
}

export default WorkOrderDetails;