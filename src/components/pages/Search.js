import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import CustomQueryBuilder from "../views/CustomQueryBuilder";
import data from "../util/init-products.json";
import ProductList from "../views/ProductList";

const Search = () => {
    return (
        <Container fluid="lg" className="mt-4">
            <Row>
                <Col>
                    <h2>Search Product Database</h2>
                    <CustomQueryBuilder></CustomQueryBuilder>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h2>Results</h2>
                    <ProductList products={data}></ProductList>
                </Col>
            </Row>
        </Container>
    )
}

export default Search;