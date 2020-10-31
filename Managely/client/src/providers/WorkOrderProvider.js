import React, { useContext, createContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const WorkOrderContext = createContext();

export function WorkOrderProvider(props) {
  const workOrderApiUrl = '/api/workorder';

  const { getToken } = useContext(UserProfileContext);

  const getWorkOrderById = async (workOrderId) => {
    const token = await getToken();
    const res = await fetch(`${workOrderApiUrl}/${workOrderId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const val = await res.json();
    return val;
  }

  return (
    <WorkOrderContext.Provider value={{ getWorkOrderById }}>
      {props.children}
    </WorkOrderContext.Provider>
  )
}