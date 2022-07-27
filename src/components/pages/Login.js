import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import LoginForm from "../views/LoginForm";
import RegisterForm from "../views/RegisterForm";


const Login = (props) => {
    let navigate = useNavigate();

    useEffect(() => {
        if (props.mode === "login" && Cookies.get("access_token")) navigate("/search");
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
