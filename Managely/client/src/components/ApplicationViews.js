import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import { PropertyProvider } from '../providers/PropertyProvider';

const ApplicationViews = () => {

  return (
    <>
      <Route exact path="/login" render={props => <Login />} />

      <PropertyProvider>
        <Route exact path="/register" render={props => <Register />} />
      </PropertyProvider>
    </>
  )
}

export default ApplicationViews;