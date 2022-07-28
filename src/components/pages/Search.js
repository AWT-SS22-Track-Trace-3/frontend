import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import CustomQueryBuilder from "../views/CustomQueryBuilder";
import ProductList from "../views/ProductList";
import ReportModal from "../views/ReportPopover";
import requestMaker from "../util/RequestMaker";
import requestProvider from "../util/API";

const Search = () => {
    const [report, setReport] = useState({
        show: false,
        product: "",
    });
    const [results, setResults] = useState([]);

    const handleSearch = (query) => {
        requestMaker(requestProvider().searchProducts({ query: JSON.parse(query) })).make()
            .then(res => setResults(res.data));
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
            {
                results.length > 0 ? (
                    <Row className="mt-4">
                        <Col>
                            <h2>Results</h2>

                            <ProductList
                                products={results}
                                reportHandler={showReport}
                            ></ProductList>
                        </Col>
                    </Row>
                ) : (<></>)
            }
            <ReportModal show={report.show} onHide={() => hideReport()} product={report.product}></ReportModal>
        </Container>
    )
}

export default Search;