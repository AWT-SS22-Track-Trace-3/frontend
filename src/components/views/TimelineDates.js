import React from "react";
import { Badge } from "react-bootstrap";

const TimelineDates = (props) => {
    return (
        <div className="d-flex">
            <div className="d-flex flex-column align-items-start">
                <span className={"me-4 " + (props.checkin ? "" : "d-none")}>
                    <Badge bg="success" className="me-1">Checkin</Badge>
                    <p className="d-inline">{props.checkin}</p>
                </span>
                <span className={"me-4 " + (props.checkin ? "" : "d-none")}>
                    <Badge bg="dark" className="me-1">Received</Badge>
                    <p className="d-inline">{props.checkin}</p>
                </span>
            </div>
            <div className="d-flex flex-column align-items-start">
                <span>
                    <Badge bg="danger" className={"me-1 " + (props.checkout ? "" : "d-none")}>Checkout</Badge>
                    <p className="d-inline">{props.checkout}</p>
                </span>
                <span className={"me-4 " + (props.checkin ? "" : "d-none")}>
                    <Badge bg="dark" className="me-1">Shipped</Badge>
                    <p className="d-inline">{props.checkin}</p>
                </span>
            </div>
        </div>
    );
}

export default TimelineDates;