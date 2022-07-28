import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get("access_token")) {
            navigate("/search");
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Welcome to Pharma Track&Trace</h1>
                </Col>
            </Row>
        </Container>
    );
}

export default RedirectHandler;