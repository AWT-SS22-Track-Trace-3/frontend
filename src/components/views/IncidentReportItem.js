import React from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatAddress, formatTimestamp } from "../util/CustomFormatter";

const IncidentReportItem = ({ incident }) => {
    return (
        <Container id="incident_container">
            <Row>
                <Col>
                    <div><Badge bg="secondary">Type</Badge> {incident.type}</div>
                    <div><Badge bg="secondary">Description</Badge> {incident.description}</div>
                    <div><Badge bg="secondary">Time of report</Badge> {formatTimestamp(incident.reporter.timestamp)}</div>
                    <div><Badge bg="secondary">Product</Badge> <Link to={`/history/${incident.product.serial_number}`}>{incident.product.serial_number}</Link></div>
                </Col>
                <Col>
                    <div><Badge bg="secondary">Owner</Badge> {incident.assigned_company.company}</div>
                    <div><Badge bg="secondary">Address of owner</Badge> {formatAddress(incident.assigned_company.address)}</div>
                </Col>
            </Row>
            <div className="divider-horizontal my-2"></div>
        </Container>
    );
}

export default IncidentReportItem;