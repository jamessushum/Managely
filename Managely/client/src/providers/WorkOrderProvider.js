import React, { useContext, createContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const WorkOrderContext = createContext();

export function WorkOrderProvider(props) {
  const workOrderApiUrl = '/api/workorder';
  const severityApiUrl = '/api/severity';
  const statusApiUrl = '/api/status';
  const userPropertyApiUrl = '/api/userproperty';
  const workOrderCommentApiUrl = '/api/workordercomment';

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

  const getSeverity = async () => {
    const token = await getToken();
    const res = await fetch(severityApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const val = await res.json();
    return val;
  }

  const getStatus = async () => {
    const token = await getToken();
    const res = await fetch(statusApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const val = await res.json();
    return val;
  }

  const updateWorkOrder = async (workOrder) => {
    const token = await getToken();
    const res = await fetch(`${workOrderApiUrl}/${workOrder.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(workOrder)
    });
    return res
  }

  const getPropertyByUser = async (userProfileId) => {
    const token = await getToken();
    const res = await fetch(`${userPropertyApiUrl}/user/${userProfileId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const val = await res.json();
    return val;
  }

  const addNewWorkOrder = async (workOrder) => {
    const token = await getToken();
    const res = await fetch(workOrderApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(workOrder)
    });
    const val = await res.json();
    return val;
  }

  const addWorkOrderComment = async (workOrderComment) => {
    const token = await getToken();
    const res = await fetch(workOrderCommentApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(workOrderComment)
    });
    const val = await res.json();
    return val;
  }

  const getWorkOrderComments = async (workOrderId) => {
    const token = await getToken();
    const res = await fetch(`${workOrderCommentApiUrl}/all/${workOrderId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    const val = await res.json();
    return val;
  }

  return (
    <WorkOrderContext.Provider value={{ getWorkOrderById, getSeverity, getStatus, updateWorkOrder, getPropertyByUser, addNewWorkOrder, addWorkOrderComment, getWorkOrderComments }}>
      {props.children}
    </WorkOrderContext.Provider>
  )
}