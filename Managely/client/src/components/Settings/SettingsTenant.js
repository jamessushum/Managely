import React, { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../providers/SettingsProvider';
import { Card, Button, CardHeader, CardBody, FormGroup, Label, Input } from 'reactstrap';
import './SettingsTenant.css';

const SettingsTenant = () => {
  const { getAllProperties, getPropertyByUser } = useContext(SettingsContext);

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

  useEffect(() => {
    getProperties();
    getCurrentUserProperties();
  }, [])

  return (
    <div className="tenantProperties-container">
      <Card>
        <CardHeader>Add or Remove Properties You're Associated With:</CardHeader>
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
        <Button>Save</Button>
      </Card>
    </div>
  )
}

export default SettingsTenant;