import React from 'react';
import { Progress } from 'reactstrap';

const WorkOrderProgressBar = ({ workOrderStatus }) => {

  const progress = () => {
    if (workOrderStatus === 'Open') {
      return <Progress animated value="15">Open</Progress>
    } else if (workOrderStatus === 'Received') {
      return <Progress animated color="danger" value="30">Received</Progress>
    } else if (workOrderStatus === 'In Progress') {
      return <Progress animated color="warning" value="55">In Progress</Progress>
    } else if (workOrderStatus === 'Completed') {
      return <Progress animated color="success" value="100">Completed</Progress>
    } else {
      return <Progress animated value="0" />
    }
  }

  const res = progress();

  return (
    <div>
      {res}
    </div>
  )
}

export default WorkOrderProgressBar;