import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';

const ApplicationViews = () => {

  return (
    <>
      <Route exact path="/login" render={props => <Login />} />
      <Route exact path="/register" render={props => <Register />} />
    </>
  )
}

export default ApplicationViews;