import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav,Navbar,Button,Form,FormControl } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLibs";



export default function Main(){
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();

  async function handleLogout(){
    userHasAuthenticated(false)
    history.push('/')
  } 
    return (
      <div>
          <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">Alpha</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="#home">Inventory</Nav.Link>
          <Nav.Link href="#link">Resources</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
            <Button onClick={handleLogout} className="mx-2">log Out</Button>
          </Form>
        </Navbar.Collapse>
        </Navbar>        
      </div>
      
    );
  }


