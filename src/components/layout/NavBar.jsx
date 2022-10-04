import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from "../context/AuthContext";
import Button from "react-bootstrap/Button";

function NavBar() {

    const history = useNavigate();
    const [auth, setAuth] = useContext(AuthContext);

    function logout() {
        setAuth(null);
        history("/");
    }

    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <>
                        <Navbar.Brand href="/">JS Frameworks - CA</Navbar.Brand>
                    </>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/" className="btn btn-primary btn-navbar">Home</Link>
                            <Link to="/contact" className="btn btn-primary btn-navbar">Contact</Link>
                            {auth ? (
                                <>
                                    | <Link to="/admin" className="btn btn-primary btn-navbar">Admin</Link> | <Button
                                        onClick={logout} className="btn-navbar">Log out</Button>
                                </>
                            ) : (
                                <Link to="/login" className="btn btn-primary btn-navbar">Login</Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar
