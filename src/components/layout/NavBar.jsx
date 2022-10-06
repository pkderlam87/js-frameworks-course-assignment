import React from "react";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import { Icon } from '@iconify/react';
import clothesSweater from '@iconify/icons-icon-park/clothes-sweater';

/**
 * This function will provider the navbar
 * @returns <navbar>
 */

function NavBar() {
    //history constant use useNavigate() function from react-router-dom
    const history = useNavigate();
    //This useContext provider the token for authenticated users
    const [auth, setAuth] = useContext(AuthContext);
    const [showed, setShowed] = useState(false);

    function logout() {
        setAuth(null);
        history("/");
        setShowed(false);
    }

    return (
        <div>
            <Navbar bg="dark" expand="lg" expanded={showed} variant="dark">
                <Container>
                    <Row>
                        <Col>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setShowed(showed ? false : "show")} />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" end className="btn btn-navbar" onClick={() => setShowed(false)}>Home</NavLink>
                                    <NavLink to="/contact" className="btn btn-navbar" onClick={() => setShowed(false)}>Contact</NavLink>
                                    {auth ? (
                                        <>
                                            | <NavLink to="/admin" className="btn btn-navbar" onClick={() => setShowed(false)}>Admin</NavLink> | <Button
                                                onClick={logout} className="btn-navbar">Log out</Button>
                                        </>
                                    ) : (
                                        <NavLink to="/login" className="btn btn-navbar" onClick={() => setShowed(false)}>Login</NavLink>
                                    )}
                                </Nav>
                            </Navbar.Collapse>
                        </Col>
                        <Col>
                            <Navbar.Brand href="/">Clothes Store<Icon icon={clothesSweater} /></Navbar.Brand>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar
