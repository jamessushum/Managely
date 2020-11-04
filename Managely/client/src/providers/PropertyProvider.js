import React, { useContext, createContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const PropertyContext = createContext();

export function PropertyProvider(props) {
  const propertyApiUrl = '/api/property';
  const userPropertyApiUrl = '/api/userproperty';
  const workOrderApiUrl = '/api/workorder';
  const propertyTypeApiUrl = '/api/propertytype';
  const userProfileApiUrl = '/api/userprofile';

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

  const getPropertyCompletedWorkOrders = async (propertyId) => {
    const token = await getToken();
    const res = await fetch(`${workOrderApiUrl}/${propertyId}/completed`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const val = await res.json();
    return val;
  }

  const addNewProperty = async (property) => {
    const token = await getToken();
    const res = await fetch(propertyApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(property)
    });
    const val = await res.json();
    return val;
  }

  const getPropertyTypes = async () => {
    const token = await getToken();
    const res = await fetch(propertyTypeApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const val = await res.json();
    return val;
  }

  const updateProperty = async (property) => {
    const token = await getToken();
    const res = await fetch(`${propertyApiUrl}/${property.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(property)
    });
    return res;
  }

  const getUserProfile = async (firebaseUserId) => {
    const token = await getToken();
    const res = await fetch(`${userProfileApiUrl}/${firebaseUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const val = await res.json();
    return val;
  }

  const getTenantPropertyUnit = async (userProfileId, propertyId) => {
    const token = await getToken();
    const res = await fetch(`${userPropertyApiUrl}/tenant/${userProfileId}/${propertyId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const val = await res.json();
    return val;
  }

  const updateUserProfile = async (userProfile) => {
    const token = await getToken();
    const res = await fetch(`${userProfileApiUrl}/${userProfile.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userProfile)
    });
    return res;
  }

  const updateUserProperty = async (userProperty) => {
    const token = await getToken();
    const res = await fetch(`${userPropertyApiUrl}/${userProperty.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userProperty)
    });
    return res;
  }

  return (
    <PropertyContext.Provider value={{ getAllProperties, getPropertyDetails, getPropertyTenants, getPropertyOpenWorkOrders, getPropertyCompletedWorkOrders, addNewProperty, getPropertyTypes, updateProperty, getUserProfile, getTenantPropertyUnit, updateUserProfile, updateUserProperty }}>
      {props.children}
    </PropertyContext.Provider>
  )
}
