import React, { useContext, createContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const PropertyContext = createContext();

export function PropertyProvider(props) {
  const propertyApiUrl = '/api/property';
  const userPropertyApiUrl = '/api/userproperty';
  const workOrderApiUrl = '/api/workorder';

  const { getToken } = useContext(UserProfileContext);

  const getAllProperties = async () => {
    const res = await fetch(propertyApiUrl, {
      method: "GET"
    });
    const value = await res.json();
    return value;
  }

  const getPropertyDetails = async (propertyId) => {
    const token = await getToken();
    const res = await fetch(`${propertyApiUrl}/${propertyId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const val = await res.json();
    return val;
  }

  const getPropertyTenants = async (propertyId) => {
    const token = await getToken();
    const res = await fetch(`${userPropertyApiUrl}/${propertyId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const val = await res.json();
    return val;
  }

  const getPropertyOpenWorkOrders = async (propertyId) => {
    const token = await getToken();
    const res = await fetch(`${workOrderApiUrl}/${propertyId}/open`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const val = await res.json();
    return val;
  }

  return (
    <PropertyContext.Provider value={{ getAllProperties, getPropertyDetails, getPropertyTenants, getPropertyOpenWorkOrders }}>
      {props.children}
    </PropertyContext.Provider>
  )
}
