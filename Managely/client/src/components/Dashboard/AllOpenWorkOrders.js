import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { Button } from 'reactstrap';
import moment from 'moment';

const AllOpenWorkOrders = ({ workOrders }) => {
  const history = useHistory();

  return (
    <>
      {workOrders.length === 0 ? <tr><td><h6>No open work orders</h6></td></tr> : workOrders.map(order => (
        <tr key={order.id}>
          <td>{order.subject}</td>
          <td>{order.status.type}</td>
          <td>{order.severity.type}</td>
          <td>{order.userProfile.fullName}</td>
          <td>{order.property.name}</td>
          <td>{moment.utc(order.createDateTime).local().format("l, LT")}</td>
          <td><Button outline color="secondary" onClick={() => history.push(`/workorder/details/${order.id}`)}><FaEye /></Button></td>
        </tr>
      ))}
    </>
  )
}

export default AllOpenWorkOrders;