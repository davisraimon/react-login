import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav,NavDropdown,Navbar,Button,Form,FormControl } from 'react-bootstrap';



class Main extends React.Component {
  render() {
    return (
      <div>
          <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home">Alpha</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="#home">Inventory</Nav.Link>
          <Nav.Link href="#link">Resources</Nav.Link>
          <NavDropdown title="Other Products" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
        </Navbar>        
      </div>
      
    );
  }
}


export default Main;
