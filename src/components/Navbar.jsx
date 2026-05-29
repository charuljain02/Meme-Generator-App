import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';

const Navbar = () => {
    const location = useLocation();

    return (
        <BootstrapNavbar bg="dark" variant="dark" expand="lg" classname="border-bottom border-secondary sticky-top px-3" style={{ backgroundColor: '#121420' }}>
            <Container fluid="">
                <BootstrapNavbar.Brand as={Link} to="/" classname="fw-bold fs-4 text-transparent bg-clip-text" style={{ background: 'linear-gradient(45deg, #00d2ff, #3a7bd5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    🚀 MemeForge Pro
                </BootstrapNavbar.Brand>
                <Nav classname="ms-auto flex-row gap-3">
                    <Nav.Link as={Link} to="/" active={location.pathname === "/"} classname="px-3 py-1 rounded">
                        Gallery
                    </Nav.Link>
                    {location.pathname === '/edit' && (
                        <Nav.Link active classname="px-3 py-1 rounded bg-secondary text-white">
                            Workspace🎨
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;