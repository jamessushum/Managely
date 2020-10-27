import React, { useContext, createContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const PropertyContext = createContext();

export function PropertyProvider(props) {
  const propertyApiUrl = '/api/property';
  const { getToken } = useContext(UserProfileContext);

  const getAllProperties = async () => {
    const token = await getToken();
    const res = await fetch(propertyApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const value = await res.json();
    return value;
  }

  return (
    <PropertyContext.Provider value={{ getAllProperties }}>
      {props.children}
    </PropertyContext.Provider>
  )
}
