import React, { useState } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const CustomNavbar = (props) => {
    const navigate = useNavigate();

    const logout = () => {
        Cookies.remove("access_token");
        Cookies.remove("access_lvl");

        navigate("/");
    }

    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand>Pharma Track&Trace</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Link to="/search" className={"me-2" + (Cookies.get("access_lvl") === "4" ? "" : " d-none")}>
                        <Button variant="outline-dark">
                            Search
                        </Button>
                    </Link>
                    <Link to="/incidents" className={"me-2" + (Cookies.get("access_lvl") === "4" ? "" : " d-none")}>
                        <Button variant="outline-dark">
                            Incidents
                        </Button>
                    </Link>
                    <Link to="/register" className={"me-2" + (Cookies.get("access_lvl") === "4" ? "" : " d-none")}>
                        <Button variant="outline-dark">
                            Register User
                        </Button>
                    </Link>
                    {Cookies.get("access_token") ? (
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