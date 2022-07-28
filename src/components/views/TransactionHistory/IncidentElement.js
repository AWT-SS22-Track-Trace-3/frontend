import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import TimelineDates from "../TimelineDates";
import TimelineIcon from "../TimelineIcon";
import { formatAddress } from "../../util/CustomFormatter";

const IncidentElement = ({ item }) => {
    return (
        <VerticalTimelineElement
            style={{ margin: "2em 0" }}
            icon={<TimelineIcon type="reported" />}
            date={<TimelineDates
                date={item.reporter.timestamp} />}
        >
            <h5 className="text-start">Incident: {item.incident_type}</h5>
            <Container className="text-start p-0">
                <Row className="m-0">
                    <Col md="6" className="p-0 card-info">
                        <p className="mt-1">{item.description}</p>
                    </Col>
                    <Col md="6" className="p-0 card-info">
                        <p className="mt-1">{item.reporter.user.company}</p>
                        <p className="mt-0">{formatAddress(item.reporter.user.address)}</p>
                    </Col>
                </Row>
            </Container>
        </VerticalTimelineElement>
    );
}

export default IncidentElement;