import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from '@material-ui/core/TextField';
import { FormGroup } from '@material-ui/core';
import { Button } from "react-bootstrap";
import './Login.css'
import { useHistory } from "react-router-dom";
import {Auth,Amplify} from "aws-amplify"
import '../config/config'
import config from "../config/config";

const sample_user = 'admin@example.com Admin@12345'



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  useEffect(() => {
    
    Amplify.configure({
      Auth: {
          region: config.cognito.REGION,
          userPoolId: config.cognito.USER_POOL_ID,
          userPoolWebClientId: config.cognito.APP_CLIENT_ID
      }
    }); 

  });

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await Auth.signIn(email, password);
      history.push("/main")
    } catch (e) {
      console.log(e);
      
      alert(e.message);
    }
  }

    return (
      
      <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup >
          <TextField
            autoFocus
            type="email"
            value={email}
            variant="outlined"
            label="Email"
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup className='py-2'>
          <TextField
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            variant="outlined"
            label="Password"
          />
        </FormGroup>
        <div className='py-2'>
        <Button className="btn btn-warning" block disabled={!validateForm()} type="submit">
          Login
        </Button>
        </div>
      </form>
    </div>
      
    );
  }

