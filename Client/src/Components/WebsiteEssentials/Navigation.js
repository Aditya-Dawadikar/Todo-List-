import React from 'react';

import { Navbar, Container, Nav, Badge } from 'react-bootstrap'

const Navigation = () => {
    return <div>
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home" className='text-light'>Todo app</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className='text-light'>Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>;
};

export default Navigation;
