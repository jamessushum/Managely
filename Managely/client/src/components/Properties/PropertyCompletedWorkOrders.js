import React from 'react';
import { FaEye } from "react-icons/fa";

const PropertyCompletedWorkOrders = ({ workOrders }) => {

  return (
    <>
      {workOrders.length === 0 ? <tr><td><h6>No completed work orders</h6></td></tr> : workOrders.map(order => (
        <tr key={order.id}>
          <td>{order.subject}</td>
          <td>{order.status.type}</td>
          <td>{order.severity.type}</td>
          <td>{order.userProfile.fullName}</td>
          <td>{order.createDateTime}</td>
          <td><FaEye /></td>
        </tr>
      ))}
    </>
  )
}

export default PropertyCompletedWorkOrders;