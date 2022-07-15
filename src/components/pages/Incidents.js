import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import ReactTooltip from "react-tooltip";
import MapChart from "../views/MapChart";
import IncidentReport from "../views/IncidentReport";
import axios from "axios";

const Incidents = (props) => {
    const [cookies] = useCookies(["access_token"]);
    const [tooltip, setTooltip] = useState("");
    const [incidents, setIncidents] = useState({
        country: "",
        incidentCount: 0,
        show: false
    });

    const onClickHandler = (country, incidentCount) => {
        setIncidents({ ...incidents, country, incidentCount, show: true });
    }

    /*

        {
            group: "day",
            sort: "asc"
        }

    */

    const optionsChange = (options) => {
        setIncidents({ ...incidents, options })
    }

    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <h1>Incident Map</h1>
                    <MapChart setTooltipContent={setTooltip} onClickHandler={onClickHandler}></MapChart>
                    <ReactTooltip>{tooltip}</ReactTooltip>
                </Col>
            </Row>
            <Modal
                fullscreen
                show={incidents.show}
                onHide={() => setIncidents({ ...incidents, show: false })}
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <IncidentReport country={incidents.country} incidentCount={incidents.incidentCount}></IncidentReport>
                </Modal.Body>
            </Modal>
        </Container >
    );
}

export default Incidents;