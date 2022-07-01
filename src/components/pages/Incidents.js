import React, { useEffect, useState } from "react";
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
                    <MapChart setTooltipContent={setTooltip}></MapChart>
                    <ReactTooltip>{tooltip}</ReactTooltip>
                </Col>
            </Row>
        </Container>
    );
}

export default Incidents;