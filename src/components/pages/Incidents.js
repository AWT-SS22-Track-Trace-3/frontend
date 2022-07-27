import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import MapChart from "../views/MapChart";
import IncidentReport from "../views/IncidentReport";
import requestMaker from "../util/RequestMaker";
import requestProvider from "../util/API";

const Incidents = (props) => {
    const [tooltip, setTooltip] = useState("");
    const [incidents, setIncidents] = useState({
        country: "",
        incidentCount: 0,
        show: false
    });
    const [mapData, setMapData] = useState([]);

    useEffect(() => {
        console.log("useEffect called")
        getMapData();
    }, [])

    const getMapData = () => {
        requestMaker(requestProvider().getIncidentSummary("all")).make()
            .then(res => setMapData(res.data));
    }

    const onClickHandler = (country, incidentCount) => {
        setIncidents({ ...incidents, country, incidentCount, show: true });
    }

    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <h1>Incident Map</h1>
                    <MapChart setTooltipContent={setTooltip} onClickHandler={onClickHandler} data={mapData}></MapChart>
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