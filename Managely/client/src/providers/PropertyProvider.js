import React, { useContext, createContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const PropertyContext = createContext();

export function PropertyProvider(props) {
  const propertyApiUrl = '/api/property';
  const { getToken } = useContext(UserProfileContext);

  const getAllProperties = async () => {
    const res = await fetch(propertyApiUrl, {
      method: "GET"
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
