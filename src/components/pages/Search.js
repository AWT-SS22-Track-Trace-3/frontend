import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import CustomQueryBuilder from "../views/CustomQueryBuilder";
import data from "../util/exampleProducts.json";
import ProductList from "../views/ProductList";

const Search = () => {
    return (
        <Container fluid="lg">
            <Row>
                <Col>
                    <h2>Search Product Database</h2>
                    <CustomQueryBuilder></CustomQueryBuilder>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Results</h2>
                    <ProductList products={data}></ProductList>
                </Col>
            </Row>
        </Container>
    )
}

export default Search;