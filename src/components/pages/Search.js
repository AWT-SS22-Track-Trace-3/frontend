import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import CustomQueryBuilder from "../views/CustomQueryBuilder";

const Search = () => {
    return (
        <Container fluid="lg">
            <Row>
                <Col>
                    <h2>Search Product Database</h2>
                    <CustomQueryBuilder></CustomQueryBuilder>
                </Col>
            </Row>
        </Container>
    )
}

export default Search;