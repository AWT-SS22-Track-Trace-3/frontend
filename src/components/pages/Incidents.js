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
        incidents: [],
        show: false
    });

    const onClickHandler = (country, incidentCount) => {
        if (incidentCount > 0) {
            axios({
                url: `http://localhost:8000/incidents?scope=${country}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${cookies.access_token}`
                }
            }).then((res) => {
                console.log(res);
                setIncidents({ country, incidents: res.data, show: true })
            });
        }
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
                onHide={() => setIncidents({...incidents, show: false})}
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <IncidentReport data={incidents}></IncidentReport>
                </Modal.Body>
            </Modal>
        </Container >
    );
}

export default Incidents;