import React, { useContext, useEffect, useState } from 'react';
import { PropertyContext } from '../../providers/PropertyProvider';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const PropertyTenantEditModal = ({ tenantEditModal, tenantEditToggle, tenantToEditFirebaseId }) => {
  const { getUserProfile } = useContext(PropertyContext);

  const [tenant, setTenant] = useState({});

  const getTenant = async () => {
    const res = await getUserProfile(tenantToEditFirebaseId);
    console.log(res);
    setTenant(res);
  }

  useEffect(() => {
    if (tenantToEditFirebaseId === "") {
      return
    } else {
      getTenant();
    }
  }, [tenantToEditFirebaseId])

  return (
    <div>
      <Modal isOpen={tenantEditModal} toggle={tenantEditToggle}>
        <ModalHeader toggle={tenantEditToggle}>Tenant Details</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input id="firstName" value={tenant.firstName} />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input id="lastName" value={tenant.lastName} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" readOnly value={tenant.email} />
          </FormGroup>
          <FormGroup>
            <Label for="company">Company</Label>
            <Input id="company" value={tenant.company} />
          </FormGroup>
          <FormGroup>
            <Label for="createDateTime">Date Joined</Label>
            <Input id="createDateTime" readOnly value={tenant.createDateTime} />
          </FormGroup>
          <FormGroup>
            <Label for="propertyUnitNumber">Unit #</Label>
            <Input id="propertyUnitNumber" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={tenantEditToggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={tenantEditToggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default PropertyTenantEditModal;