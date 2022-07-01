import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import MapChart from "../views/MapChart";

const Incidents = (props) => {
    const [tooltip, setTooltip] = useState("");

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>Incident Map</h1>
                    <div data-tip="hi" data-for="hello">
                        <MapChart setTooltipContent={setTooltip}></MapChart>
                    </div>
                    <ReactTooltip id="hello" />
                </Col>
            </Row>
        </Container>
    );
}

export default Incidents;