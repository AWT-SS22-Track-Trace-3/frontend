import React, { useState } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const CustomNavbar = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies();

    const logout = () => {

        removeCookie("access_token");
        removeCookie("access_level");
    }

    const register = () => {

    }

    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand>Pharma Track&Trace</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Link to="/register" className={"me-2" + (cookies.access_level === "4" ? "" : " d-none")}>
                        <Button variant="outline-dark" onClick={register}>
                            Register User
                        </Button>
                    </Link>
                    {cookies.access_token ? (
                        <Button variant="danger" onClick={logout}>
                            Logout
                        </Button>
                    ) : (
                        <Link to="/">
                            <Button variant="success">
                                Login
                            </Button>
                        </Link>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;