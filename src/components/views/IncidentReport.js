import React from "react";
import { Card } from "react-bootstrap";
import IncidentList from "./IncidentList";

const IncidentReport = (props) => {
    return (
        <div>
            <Card>
                <Card.Header as="h5">Incident report for {props.data.country}</Card.Header>
                <Card.Body>
                    {props.data.incidents.length > 0 ? (
                        <IncidentList data={props.data.incidents}></IncidentList>
                    ) : (
                        "No known incidents."
                    )}

                </Card.Body>
            </Card>
        </div>
    );
}

export default IncidentReport;