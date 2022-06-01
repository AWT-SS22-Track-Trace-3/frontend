import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import QueryBuilder from "../views/QueryBuilder";
import ReactQueryBuilder from "../views/ReactQueryBuilder";

const Search = () => {
    return (
        <Container fluid="lg">
            <Row>
                <Col>
                    <QueryBuilder></QueryBuilder>
                    <ReactQueryBuilder></ReactQueryBuilder>
                </Col>
            </Row>
        </Container>
    )
}

export default Search;