import React, { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../providers/SettingsProvider';
import { useHistory } from 'react-router-dom';
import { Card, Button, CardHeader, CardBody, FormGroup, Label, Input } from 'reactstrap';
import './SettingsTenant.css';

const SettingsTenant = () => {
  const { getAllProperties, getPropertyByUser, addUserProperty } = useContext(SettingsContext);

  const history = useHistory();

  const loggedInUser = JSON.parse(sessionStorage.userProfile);

  const [activeProperties, setActiveProperties] = useState([]);
  const [currentPropertyIds, setCurrentPropertyIds] = useState([]);

  const getProperties = async () => {
    const res = await getAllProperties();
    setActiveProperties(res);
  }

  const getCurrentUserProperties = async () => {
    const res = await getPropertyByUser(loggedInUser.id);
    setCurrentPropertyIds(res.map(property => property.propertyId));
  }

  const handleCheckbox = (e) => {
    const stateToChange = [...currentPropertyIds];
    const checkedItem = e.target.value;

    if (e.target.checked) {
      stateToChange.push(parseInt(checkedItem));
    } else {
      const index = stateToChange.indexOf(parseInt(checkedItem));
      stateToChange.splice(index, 1);
    }

    setCurrentPropertyIds(stateToChange);
  }

  const handleSave = async (e) => {
    e.preventDefault();

    if (currentPropertyIds.length === 0) {
      alert('You must be associated with at least one property');
    } else {
      await addUserProperty(loggedInUser.id, currentPropertyIds).then(() => {
        history.push('/')
      })
    }
  }

  useEffect(() => {
    getProperties();
    getCurrentUserProperties();
  }, [])

  return (
    <div className="tenantProperties-container">
      <Card>
        <CardHeader>Add or Remove Property Associations <em>(must have at least 1 association)</em></CardHeader>
        <CardBody>
          {activeProperties.length === 0 ? <h4>Uh-oh there are no properties...</h4> : activeProperties.map(property => (
            <FormGroup check key={property.id}>
              <Label check>
                <Input type="checkbox" checked={currentPropertyIds.includes(property.id)} value={property.id} onChange={handleCheckbox} />{''}
                {property.name}
              </Label>
            </FormGroup>
          ))}
        </CardBody>
        <Button color="warning" onClick={handleSave}>Save</Button>
      </Card>
    </div>
  )
}

export default SettingsTenant;