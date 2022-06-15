import React from "react";
import { Badge } from "react-bootstrap";

const TimelineDates = (props) => {
    return (
        <div className="d-flex">
            <span className={"me-4 " + (props.checkin ? "" : "d-none")}>
                <Badge bg="success" className="me-1">Checkin</Badge>
                <p className="d-inline">{props.checkin}</p>
            </span>
            <span>
                <Badge bg="danger" className="me-1">Checkout</Badge>
                <p className="d-inline">{props.checkout}</p>
            </span>
        </div>
    );
}

export default TimelineDates;