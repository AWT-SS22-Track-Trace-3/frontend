import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const TransactionHistory = (props) => {
    const { id } = useParams();

    const containerStyle = {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }

    return (
        <Container fluid="lg" style={containerStyle}>
            <Row>
                <Col md={{ span: 4, offset: 2 }} className="d-flex flex-column">
                    <h1>{id}</h1>
                </Col>
            </Row>
        </Container >
    );
}

export default TransactionHistory;