import React, { useContext, useEffect, useState } from 'react';
import { WorkOrderContext } from '../../providers/WorkOrderProvider';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './WorkOrderAddForm.css'

const WorkOrderAddForm = () => {
  const history = useHistory();
  const loggedInUser = JSON.parse(sessionStorage.userProfile);

  const { getSeverity, getPropertyByUser } = useContext(WorkOrderContext);
  const [severities, setSeverities] = useState([]);
  const [properties, setProperties] = useState([]);

  const getSeverities = async () => {
    const res = await getSeverity();
    setSeverities(res);
  }

  const getUserProperties = async () => {
    const res = await getPropertyByUser(loggedInUser.id);
    const propertyNames = res.map(property => {
      return (
        {
          id: property.property.id,
          name: property.property.name
        }
      )
    });
    setProperties(propertyNames);
  }

  useEffect(() => {
    getSeverities();
    getUserProperties();
  }, [])

  return (
    <div className="newWorkOrder-container">
      <Form className="newWorkOrder-form">
        <h4>Create a New Work Order</h4>
        <FormGroup>
          <Label for="subject">Subject</Label>
          <Input type="text" id="subject" />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="textarea" rows="3" id="description" />
        </FormGroup>
        <FormGroup>
          <Label for="severityId">Severity</Label>
          <Input type="select" id="severityId" defaultValue="">
            <option value="" disabled>Select Severity Level</option>
            {severities.map(type => <option key={type.id} value={type.id}>{type.type}</option>)}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="propertyId">Property</Label>
          <Input type="select" id="propertyId" defaultValue="">
            <option value="" disabled>Select Property</option>
            {properties.map(property => <option key={property.id} value={property.id}>{property.name}</option>)}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="imageLocation">Image</Label>
          <Input type="file" id="imageLocation" />
        </FormGroup>
        <div>
          <Button color="success">Create</Button>
          <Button onClick={() => history.push('/')}>Cancel</Button>
        </div>
      </Form>
    </div>
  )
}

export default WorkOrderAddForm;