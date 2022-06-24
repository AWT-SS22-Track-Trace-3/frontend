import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { Col, Container, Row, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LoginForm from "../views/LoginForm";
import RegisterForm from "../views/RegisterForm";


const Login = (props) => {
    let navigate = useNavigate();

    const [cookies] = useCookies(["access_token"]);

    useEffect(() => {
        console.log(!cookies.access_token)
        if (props.mode === "login" && cookies.access_token) navigate("/search");
    });

    const containerStyle = {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }

    const dividerStyle = {
        height: "100%",
        width: "1px",
        backgroundColor: "#e9ecef"
    }

    return (
        <Container fluid="lg" style={containerStyle}>
            <Row>

                {props.mode === "register" ?
                    (
                        <Col md={{ span: 6, offset: 3 }} className="d-flex flex-column">
                            <RegisterForm title="Register"></RegisterForm>
                        </Col>
                    ) : (
                        <Col md={{ span: 6, offset: 3 }} className="d-flex flex-column">
                            <LoginForm title="Login"></LoginForm>
                        </Col>
                    )}

            </Row>
        </Container >
    );
}

export default Login;
