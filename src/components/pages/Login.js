import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { Col, Container, Row, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import LoginForm from "../views/LoginForm";
import RegisterForm from "../views/RegisterForm";


const Login = () => {
    let navigate = useNavigate();

    const [userId, setUserId] = useState({
        userId: ""
    })

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
                <Col md={{ span: 4, offset: 1 }} className="d-flex flex-column">
                    <LoginForm title="Login"></LoginForm>
                </Col>
                <Col md="1" className="d-flex justify-content-center">
                    <div style={dividerStyle} className="px-0 mx-4"></div>
                </Col>
                <Col md={{ span: 4, offset: 0 }} className="d-flex flex-column">
                    <RegisterForm title="Register"></RegisterForm>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Alert key="id-alert" variant="success" show={!userId}>Logged in with user ID: {userId}</Alert>
                </Col>
            </Row>
        </Container >
    );
}

export default Login;
