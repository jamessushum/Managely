import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Register = () => {
  const [userType, setUserType] = useState("");

  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="userType">Are you a tenant or property manager?</Label>
          <Input type="select" name="userType" id="userType">
            <option>Tenant</option>
            <option>Property Manager</option>
          </Input>
        </FormGroup>
      </Form>
    </div>
  )
}

export default Register;