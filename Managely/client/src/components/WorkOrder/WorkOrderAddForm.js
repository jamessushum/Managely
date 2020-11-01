import React, { useContext, useEffect, useState } from 'react';
import { WorkOrderContext } from '../../providers/WorkOrderProvider';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './WorkOrderAddForm.css'

const WorkOrderAddForm = () => {
  const history = useHistory();
  const loggedInUser = JSON.parse(sessionStorage.userProfile);

  const { getSeverity, getPropertyByUser, addNewWorkOrder } = useContext(WorkOrderContext);
  const [severities, setSeverities] = useState([]);
  const [properties, setProperties] = useState([]);
  const [newWorkOrder, setNewWorkOrder] = useState({
    subject: "",
    description: "",
    createDateTime: "",
    severityId: "",
    statusId: "",
    userProfileId: "",
    propertyId: ""
  });

  const [imageLocation, setImageLocation] = useState("");

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

  const handleFieldChange = (e) => {
    const stateToChange = { ...newWorkOrder };
    stateToChange[e.target.id] = e.target.value;
    setNewWorkOrder(stateToChange);
  }

  const handleImageField = async (e) => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'flyingboar')
    const res = await fetch('https://api.cloudinary.com/v1_1/diswqnkzl/image/upload', {
      method: "POST",
      body: data
    })
    const file = await res.json()
    setImageLocation(file.secure_url)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const workOrder = {
      subject: newWorkOrder.subject,
      description: newWorkOrder.description,
      createDateTime: new Date(),
      imageLocation: imageLocation,
      severityId: parseInt(newWorkOrder.severityId),
      statusId: 1,
      userProfileId: loggedInUser.id,
      propertyId: parseInt(newWorkOrder.propertyId)
    }

    if (newWorkOrder.subject === "" || newWorkOrder.description === "" || newWorkOrder.severityId === "" || newWorkOrder.propertyId === "") {
      alert('Please fill out all required fields')
    } else {
      addNewWorkOrder(workOrder).then(() => {
        history.push('/')
      })
    }
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
          <Label for="subject">Subject <small>(required)</small></Label>
          <Input type="text" id="subject" onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description <small>(required)</small></Label>
          <Input type="textarea" rows="3" id="description" onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="severityId">Severity <small>(required)</small></Label>
          <Input type="select" id="severityId" defaultValue="" onChange={handleFieldChange}>
            <option value="" disabled>Select Severity Level</option>
            {severities.map(type => <option key={type.id} value={type.id}>{type.type}</option>)}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="propertyId">Property <small>(required)</small></Label>
          <Input type="select" id="propertyId" defaultValue="" onChange={handleFieldChange}>
            <option value="" disabled>Select Property</option>
            {properties.map(property => <option key={property.id} value={property.id}>{property.name}</option>)}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="imageLocation">Image <small>(optional)</small></Label>
          <Input type="file" id="imageLocation" onChange={handleImageField} />
        </FormGroup>
        <div className="newWorkOrder-btn-container">
          <Button color="success" onClick={handleFormSubmit}>Create</Button>
          <Button onClick={() => history.push('/')}>Cancel</Button>
        </div>
      </Form>
    </div>
  )
}

export default WorkOrderAddForm;