import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        loginId: "",
        password: ""
    })

    const loginDataChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value = target.value;

        setLoginData({ ...loginData, [name]: value });
    }

    const signIn = () => {
        console.log(loginData.loginId);
        navigate("/search");
    }

    const containerStyle = {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }

    return (
        <Container fluid="lg" style={containerStyle}>
            <Row>
                <Col md={{ span: 4, offset: 4 }} className="d-flex flex-column">
                    <h1 className="mb-4">Login</h1>
                    <Form className="text-end">
                        <Form.Group className="mb-3" controlId="formLoginId">
                            <Form.Control name="loginId" type="text" placeholder="Enter ID" onChange={loginDataChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLoginId">
                            <Form.Control disabled name="password" type="password" placeholder="Enter Password" onChange={loginDataChange} />
                        </Form.Group>
                    </Form>
                    <Button variant="primary" type="submit" onClick={signIn}>
                        Login
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
