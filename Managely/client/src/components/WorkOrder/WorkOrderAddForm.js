import React, { useContext, useEffect, useState } from 'react';
import { WorkOrderContext } from '../../providers/WorkOrderProvider';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './WorkOrderAddForm.css'

const WorkOrderAddForm = () => {
  const history = useHistory();
  const loggedInUser = JSON.parse(sessionStorage.userProfile);
  console.log(loggedInUser);


  const { getSeverity } = useContext(WorkOrderContext);
  const [severities, setSeverities] = useState([]);

  const getSeverities = async () => {
    const res = await getSeverity();
    setSeverities(res);
  }

  useEffect(() => {
    getSeverities();
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
          <Input type="select" id="propertyId"></Input>
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