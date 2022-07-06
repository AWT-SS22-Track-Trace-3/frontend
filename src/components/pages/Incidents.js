import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import ReactTooltip from "react-tooltip";
import MapChart from "../views/MapChart";
import IncidentReport from "../views/IncidentReport";
import axios from "axios";

const Incidents = (props) => {
    const [cookies, setCookie] = useCookies(["access_token"]);
    const [tooltip, setTooltip] = useState("");
    const [incidents, setIncidents] = useState({
        country: "",
        incidents: []
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
                setIncidents({ country, incidents: res.data })
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
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <IncidentReport data={incidents}></IncidentReport>
                </Col>
            </Row>
        </Container >
    );
}

export default Incidents;