import React, { useContext, useEffect, useState } from 'react';
import { PropertyContext } from '../../providers/PropertyProvider';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment';

const PropertyTenantEditModal = ({ tenantEditModal, tenantEditToggle, tenantToEditFirebaseId, propertyId, getAllPropertyTenants }) => {
  const { getUserProfile, getTenantPropertyUnit, updateUserProfile, updateUserProperty } = useContext(PropertyContext);

  const [tenant, setTenant] = useState({
    id: "",
    firebaseUserId: "",
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    imageLocation: "",
    createDateTime: "",
    isActive: "",
    userTypeId: ""
  });

  const [userProperty, setUserProperty] = useState({
    id: "",
    userProfileId: "",
    propertyId: "",
    propertyUnitNumber: ""
  });

  const getTenant = async () => {
    const res = await getUserProfile(tenantToEditFirebaseId);
    setTenant({
      id: res.id,
      firebaseUserId: res.firebaseUserId,
      firstName: res.firstName,
      lastName: res.lastName,
      email: res.email,
      company: res.company,
      imageLocation: res.imageLocation,
      createDateTime: res.createDateTime,
      isActive: res.isActive,
      userTypeId: res.userTypeId
    });
    getTenantUnitNum(res)
  }

  const getTenantUnitNum = async (resp) => {
    const res = await getTenantPropertyUnit(resp.id, propertyId);
    setUserProperty({
      id: res.id,
      userProfileId: res.userProfileId,
      propertyId: res.propertyId,
      propertyUnitNumber: res.propertyUnitNumber
    })
  }

  const handleFieldChange = (e) => {
    const stateToChange = { ...tenant };
    stateToChange[e.target.id] = e.target.value;
    setTenant(stateToChange);
  }

  const handleSingleFieldChange = (e) => {
    const stateToChange = { ...userProperty };
    stateToChange[e.target.id] = e.target.value;
    setUserProperty(stateToChange);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUserProfile = {
      id: tenant.id,
      firebaseUserId: tenant.firebaseUserId,
      firstName: tenant.firstName,
      lastName: tenant.lastName,
      email: tenant.email,
      company: tenant.company,
      imageLocation: tenant.imageLocation,
      createDateTime: tenant.createDateTime,
      isActive: tenant.isActive,
      userTypeId: tenant.userTypeId
    }

    const updatedUserProperty = {
      id: userProperty.id,
      userProfileId: userProperty.userProfileId,
      propertyId: userProperty.propertyId,
      propertyUnitNumber: userProperty.propertyUnitNumber
    }

    if (tenant.firstName === "" || tenant.lastName === "") {
      alert('First and last name fields must be filled out');
    } else {
      updateUserProfile(updatedUserProfile).then(() => {
        updateUserProperty(updatedUserProperty).then(() => {
          tenantEditToggle();
          getAllPropertyTenants();
        })
      })
    }
  }

  useEffect(() => {
    if (tenantToEditFirebaseId === "") {
      return
    } else {
      getTenant();
    }
  }, [tenantToEditFirebaseId, tenantEditModal])

  return (
    <div>
      <Modal isOpen={tenantEditModal} toggle={tenantEditToggle}>
        <ModalHeader toggle={tenantEditToggle}>Tenant Details</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input id="firstName" value={tenant.firstName} onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input id="lastName" value={tenant.lastName} onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" readOnly value={tenant.email} />
          </FormGroup>
          <FormGroup>
            <Label for="company">Company</Label>
            <Input id="company" value={tenant.company || ""} onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup>
            <Label for="createDateTime">Date Joined</Label>
            <Input id="createDateTime" readOnly value={moment.utc(tenant.createDateTime).local().format("LL")} />
          </FormGroup>
          <FormGroup>
            <Label for="propertyUnitNumber">Unit #</Label>
            <Input id="propertyUnitNumber" value={userProperty.propertyUnitNumber || ""} onChange={handleSingleFieldChange} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={handleSubmit}>Save Changes</Button>{' '}
          <Button color="secondary" onClick={tenantEditToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default PropertyTenantEditModal;