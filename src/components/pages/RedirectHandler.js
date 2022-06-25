import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const RedirectHandler = () => {
    const [cookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.access_token) {
            navigate("/search");
        } else {
            navigate("/login");
        }
    }, [cookies]);

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