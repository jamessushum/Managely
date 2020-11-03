import React, { useContext, createContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const SettingsContext = createContext();

export function SettingsProvider(props) {
  const propertyApiUrl = '/api/property';
  const userPropertyApiUrl = '/api/userproperty';

  const { getToken } = useContext(UserProfileContext);

  const getAllProperties = async () => {
    const token = await getToken();
    const res = await fetch(propertyApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const val = await res.json();
    return val;
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

  const addUserProperty = async (userProfileId, listOfPropertyIds) => {
    const token = await getToken();
    const res = await fetch(`${userPropertyApiUrl}/${userProfileId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(listOfPropertyIds)
    })
    return res
  }

  return (
    <SettingsContext.Provider value={{ getAllProperties, getPropertyByUser, addUserProperty }}>
      {props.children}
    </SettingsContext.Provider>
  )
}