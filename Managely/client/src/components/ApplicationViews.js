import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../components/Login/Login';

const ApplicationViews = () => {

  return (
    <>
      <Route exact path="/login" render={props => <Login />} />
    </>
  )
}

export default ApplicationViews;