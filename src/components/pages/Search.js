import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import CustomQueryBuilder from "../views/CustomQueryBuilder";
import data from "../util/init-products.json";
import ProductList from "../views/ProductList";
import axios from "axios";
import { useCookies } from "react-cookie";
import ReportModal from "../views/ReportPopover";

const Search = () => {

    const [cookies] = useCookies(["access_token"]);
    const [report, setReport] = useState({
        show: false,
        product: "",
    });
    const [sample, setSample] = useState({});
    const [results, setResults] = useState([]);

    const handleSearch = (query) => {
        console.log(query);

        axios({
            url: "http://localhost:8000/search",
            method: "POST",
            headers: {
                Authorization: `Bearer ${cookies.access_token}`
            },
            data: { query }
        }).then(res => {
            console.log(res);
            setResults(res.data);
        });

        //axios.get("http://localhost:8000/test/42", { headers: { "Authorization": `Bearer ${cookies.access_token}` } }).then((res) => console.log(res));
    }

    const showReport = (product) => {
        setReport({
            show: true,
            product
        });
    }

    const hideReport = () => {
        setReport({
            ...report,
            show: false
        });
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
                    {
                        results.length > 0 ? (
                            <ProductList
                                products={results}
                                reportHandler={showReport}
                            ></ProductList>
                        ) : (<></>)
                    }
                </Col>
            </Row>
            <ReportModal show={report.show} onHide={() => hideReport()} product={report.product}></ReportModal>
        </Container>
    )
}

export default Search;