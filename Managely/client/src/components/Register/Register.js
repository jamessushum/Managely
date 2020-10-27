import React, { useState, useContext, useEffect } from 'react';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './Register.css';

const Register = () => {
  const { getUserTypes } = useContext(UserProfileContext);

  const [userTypes, setUserTypes] = useState([]);

  const [userProfile, setUserProfile] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Company: "",
    CreateDateTime: "",
    IsActive: "",
    UserTypeId: "2"
  })

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [imageLocation, setImageLocation] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false)


  const getAllUserTypes = async () => {
    const res = await getUserTypes();
    setUserTypes(res);
  }

  const handleFieldChange = (e) => {
    const stateToChange = { ...userProfile };
    stateToChange[e.target.id] = e.target.value;
    setUserProfile(stateToChange);
  }

  const handleImageField = async (e) => {
    const files = e.target.files
    setIsImageLoading(true)
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'flyingboar')
    const res = await fetch('https://api.cloudinary.com/v1_1/diswqnkzl/image/upload', {
      method: "POST",
      body: data
    })
    const file = await res.json()
    setImageLocation(file.secure_url)
    setIsImageLoading(false)
  }

  useEffect(() => {
    getAllUserTypes();
  }, [])

  return (
    <div className="register-container">
      <Form className="register-form">
        <h3>Register</h3>
        <FormGroup>
          <Label for="UserTypeId">Are you a tenant or property manager?</Label>
          <Input type="select" id="UserTypeId" onChange={handleFieldChange}>
            {userTypes.map(type => <option key={type.id} value={type.id}>{type.type}</option>)}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="FirstName">First Name</Label>
          <Input type="text" id="FirstName" onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="LastName">Last Name</Label>
          <Input type="text" id="LastName" onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="Email">Email</Label>
          <Input type="email" id="Email" onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" id="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input type="password" id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="Company">Company <small>(if applicable)</small></Label>
          <Input type="text" id="Company" onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup>
          <Label for="ImageLocation">Upload Image <small>(optional)</small></Label>
          <Input type="file" id="ImageLocation" onChange={handleImageField} />
        </FormGroup>
        {userProfile.UserTypeId === "2"
          ? <p>Select Property</p>
          : null
        }
      </Form>
    </div>
  )
}

export default Register;