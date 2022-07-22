import React from "react";
import { Badge } from "react-bootstrap";
import { formatTimestamp } from "../util/CustomFormatter";

const TimelineDates = (props) => {
    return (
        <div className="d-flex">
            <div className="d-flex flex-column align-items-start">
                <span className={"me-4 " + (props.checkin ? "" : "d-none")}>
                    <Badge bg="success" className="me-1">Checkin</Badge>
                    <p className="d-inline">{formatTimestamp(props.checkin)}</p>
                </span>
                <span className={"me-4 " + (props.shipped ? "" : "d-none")}>
                    <Badge bg="dark" className="me-1">Shipped</Badge>
                    <p className="d-inline">{formatTimestamp(props.shipped)}</p>
                </span>
            </div>
            <div className="d-flex flex-column align-items-start">
                <span>
                    <Badge bg="danger" className={"me-1 " + (props.checkout ? "" : "d-none")}>Checkout</Badge>
                    <p className="d-inline">{formatTimestamp(props.checkout)}</p>
                </span>
                <span className={"me-4 " + (props.delivered ? "" : "d-none")}>
                    <Badge bg="dark" className="me-1">Delivered</Badge>
                    <p className="d-inline">{formatTimestamp(props.delivered)}</p>
                </span>
            </div>
        </div>
    );
}

export default TimelineDates;