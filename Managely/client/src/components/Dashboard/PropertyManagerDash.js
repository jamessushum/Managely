import React from 'react';
import './PropertyManagerDash.css';

const PropertyManagerDash = () => {
  const loggedInUser = JSON.parse(sessionStorage.userProfile);
  console.log(loggedInUser)

  return (
    <div className="propertyManagerDash-container">
      <div className="propertyManagerDash-banner">
        <h4>Welcome, {loggedInUser.fullName} 🚀</h4>
      </div>
      <div className="propertyManagerDash-openWO"></div>
      <div className="propertyManagerDash-closedWO"></div>
    </div>
  )
}

export default PropertyManagerDash;