import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import CustomQueryBuilder from "../views/CustomQueryBuilder";
import data from "../util/init-products.json";
import ProductList from "../views/ProductList";
import axios from "axios";
import { useCookies } from "react-cookie";

const Search = () => {

    const [cookies] = useCookies(["access_token"]);

    const handleSearch = (query) => {
        console.log(query);

        axios.get("http://localhost:8000/test/42", { headers: { "Authorization": `Bearer ${cookies.access_token}` } }).then((res) => console.log(res));
    }

    return (
        <Container fluid="lg" className="mt-4">
            <Row>
                <Col>
                    <h2>Search Product Database</h2>
                    <CustomQueryBuilder searchHandler={handleSearch}></CustomQueryBuilder>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h2>Results</h2>
                    <ProductList products={data.filter(x => x.name.includes("Metformin"))}></ProductList>
                </Col>
            </Row>
        </Container>
    )
}

export default Search;