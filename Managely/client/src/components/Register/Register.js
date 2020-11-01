import React, { useState, useContext, useEffect } from 'react';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { PropertyContext } from '../../providers/PropertyProvider';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './Register.css';

const Register = () => {
  const history = useHistory();
  const { getUserTypes, register, createUserProperty } = useContext(UserProfileContext);
  const { getAllProperties } = useContext(PropertyContext);

  const [userTypes, setUserTypes] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedPropertyIds, setSelectedPropertyIds] = useState([])

  const [userProfile, setUserProfile] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Company: "",
    CreateDateTime: "",
    UserTypeId: "2"
  })

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [imageLocation, setImageLocation] = useState("");

  const getAllUserTypes = async () => {
    const res = await getUserTypes();
    setUserTypes(res);
  }

  const getProperties = async () => {
    const res = await getAllProperties();
    setProperties(res);
  }

  const handleFieldChange = (e) => {
    const stateToChange = { ...userProfile };
    stateToChange[e.target.id] = e.target.value;
    setUserProfile(stateToChange);
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

  const handleCheckboxField = (e) => {
    const stateToChange = [...selectedPropertyIds];
    const checkedProperty = e.target.value;

    if (e.target.checked) {
      stateToChange.push(parseInt(checkedProperty));
    } else {
      const index = stateToChange.indexOf(parseInt(checkedProperty));
      stateToChange.splice(index, 1);
    }

    setSelectedPropertyIds(stateToChange);
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const newUserProfile = {
      firstName: userProfile.FirstName,
      lastName: userProfile.LastName,
      email: userProfile.Email,
      company: userProfile.Company,
      createDateTime: new Date(),
      isActive: true,
      userTypeId: parseInt(userProfile.UserTypeId),
      imageLocation: imageLocation
    }

    if (password && password !== confirmPassword) {
      alert("Passwords don't match.");
    } else if (userProfile.FirstName === "" || userProfile.LastName === "" || userProfile.Email === "" || password === "" || confirmPassword === "" || selectedPropertyIds.length === 0) {
      alert("Please fill out all required fields.");
    } else {
      if (userProfile.UserTypeId === "2") {
        register(newUserProfile, password).then(() => {
          const userProfileId = JSON.parse(sessionStorage.getItem('userProfile')).id;
          createUserProperty(userProfileId, selectedPropertyIds).then(() => {
            history.push('/');
          })
        })
      } else if (userProfile.UserTypeId === "1") {
        register(newUserProfile, password).then(() => {
          history.push('/');
        })
      }
    }
  }

  const loadProperties = userProfile.UserTypeId === "2" ? properties.map(property => {
    return (
      <FormGroup check key={property.id}>
        <Label check>
          <Input type="checkbox" value={property.id} checked={selectedPropertyIds.includes(property.id)} onChange={handleCheckboxField} />{''}
          {property.name}
        </Label>
      </FormGroup>
    )
  }) : null

  useEffect(() => {
    getAllUserTypes();
    getProperties();
  }, [])

  return (
    <div className="register-container">
      <Form className="register-form">
        <h3>Register</h3>
        <FormGroup>
          <Label for="UserTypeId">Are you a tenant or property manager? <small>(required)</small></Label>
          <Input type="select" id="UserTypeId" onChange={handleFieldChange}>
            {userTypes.map(type => <option key={type.id} value={type.id}>{type.type}</option>)}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="FirstName">First Name <small>(required)</small></Label>
          <Input type="text" id="FirstName" maxLength="50" required onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="LastName">Last Name <small>(required)</small></Label>
          <Input type="text" id="LastName" maxLength="50" required onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="Email">Email <small>(required)</small></Label>
          <Input type="email" id="Email" maxLength="555" required onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password <small>(required, min 6 characters)</small></Label>
          <Input type="password" id="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password <small>(required)</small></Label>
          <Input type="password" id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="Company">Company <small>(if applicable)</small></Label>
          <Input type="text" id="Company" maxLength="255" onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="ImageLocation">Upload Image <small>(optional)</small></Label>
          <Input type="file" id="ImageLocation" maxLength="255" onChange={handleImageField} />
        </FormGroup>
        {userProfile.UserTypeId === "2" ? <h6>Select Property <small>(required)</small></h6> : null}
        {loadProperties}
        <div className="register-submitBtn">
          <Button onClick={handleRegisterSubmit}>Create Account</Button>
        </div>
      </Form>
    </div>
  )
}

export default Register;