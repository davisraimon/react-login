import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from '@material-ui/core/TextField';
import { FormGroup,Link } from '@material-ui/core';
import { Button,Alert } from "react-bootstrap";
import './Login.css'
import { useHistory } from "react-router-dom";
import {Auth,Amplify} from "aws-amplify"
import '../config/config'
import config from "../config/config";
import { useAppContext } from "../libs/contextLibs";
import LoaderButton from '../components/LoaderButton'




export default function Login() {
  const { userHasAuthenticated } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [issignin, setsignin] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState("");
  const [verification,setVerification] = useState(false);
  const history = useHistory();
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState({value:"",iserror:false});
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

  function fadeAlert(){
    window.setTimeout(()=>setError({value:"",iserror:false}),4000)
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setisLoading(true)
    if(!issignin){
      try {
        await Auth.signIn(email, password);
        userHasAuthenticated(true);
        history.push("/main")
        setisLoading(false)
      } catch (e) {
        dealError(e)
      }
    }else{
      try {
        if(password.length<10){throw new validationError("Password requires minimum 10 characters")}
        if(password!==confirmpassword){throw new validationError("Password does not match")}
        
        await Auth.signUp({
          username: email,
          password: password,
        });
      setisLoading(false)  
      setVerification(true)
      } catch (e) {
        dealError(e)
      }
    }
  }
  async function handleVerification(event){
    setisLoading(true)
    try {
      await Auth.confirmSignUp(email, code);  
      await Auth.signIn(email, password);
      setisLoading(false)
      history.push("/main");
    } catch(e){
      dealError(e)    
    }
  }
  function dealError(e){
    console.log(e);   
    setError({value:e.message,iserror:true})
    fadeAlert()
    setisLoading(false)
  }
  class validationError extends Error{
    constructor(msg){
      super(msg)
      this.name="Validation Error"
    }
  }

    return (
      <div className="Login">
      <form onSubmit={handleSubmit}>
      {!verification?
        <div>
         {/*Avatar Placement  */}
        <FormGroup className='py-2'>
          <TextField
            disabled={isLoading}
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
            disabled={isLoading}
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            variant="outlined"
            label="Password"
          />
        </FormGroup>
        {issignin&&<FormGroup className='py-2'>
          <TextField
            disabled={isLoading}
            value={confirmpassword}
            onChange={e => setConfirmPassword(e.target.value)}
            type="password"
            variant="outlined"
            label="Confirm Password"
          />
        </FormGroup>}
        <div className="py-2">
        <Button className="btn btn-warning" block disabled={!validateForm()} type="submit">
        {!issignin?"SignIn":"SignUp"}
        </Button>
        <div className="py-2 text-center">
          <label className="py-2" >{issignin?"Already have an account?":"Don't have an account?"}</label>
          <Link className="mx-1" href="#" onClick={e => setsignin(!issignin)}>{issignin?"SignIn":"SignUp"}</Link>
        </div>
        </div>
        {error.iserror&&<Alert variant="danger" fade>{error.value}</Alert> }
        </div>
        :
        <div className="login">
        <FormGroup className="py-2">
        <TextField
              value={code}
              onChange={e => setCode(e.target.value)}
              type="number"
              variant="outlined"
              label="Enter the verification code"
            />
        </FormGroup>   
        <Button block className="btn btn-warning" onClick={handleVerification}>verify</Button>
        
        </div>
        } 
        {isLoading&&<LoaderButton></LoaderButton>} 
      </form>
      
    </div>
      
    );
  }

