import React, { useState, useContext } from 'react';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { useHistory, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './Login.css';

const Login = () => {
  const { login } = useContext(UserProfileContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(true);

  const loginSubmit = (e) => {
    e.preventDefault();

    if (email !== "" || password !== "") {
      login(email, password)
        .then(() => history.push('/'))
        .catch(() => setInvalidCredentials(false));
    } else {
      setInvalidCredentials(false);
    }
  };

  return (
    <div className="login-container">
      <Form className="login-form">
        <h3>Managely</h3>
        <h5>Manage your rental properties easily.</h5>
        <div className="alert alert-danger" role="alert" hidden={invalidCredentials}>
          Invalid email or password
        </div>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <Button onClick={loginSubmit}>Sign In</Button>
        <div>
          <em>
            Not registered? <Link to="register">Register</Link>
          </em>
        </div>
      </Form>
    </div>
  )
}

export default Login;