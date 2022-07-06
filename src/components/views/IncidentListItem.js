import React, { useState } from "react";
import { Badge, Card } from "react-bootstrap";
import ProductListItem from "./ProductListItem";
import { formatAddress } from "../util/CustomFormatter";

const IncidentListItem = (props) => {
    const [product, setProduct] = useState({});

    /*

    const formatAddress = (address) => {
        if (address.format == "EU") {
            return (
                <span>
                    {address.street + " " + address.number},
                    {" " + address.zip_code + " " + address.city},
                    {" " + address.country}
                </span>
            )
        } else {
            return (
                <span>
                    {address.number + " " + address.street},
                    {" " + address.city + " " + address.zip_code},
                    {" " + address.country}
                </span>
            )
        }
    }

    */

    return (
        <Card className="mb-2">
            <Card.Body>
                <div className="d-flex justify-content-center">
                    <div className="text-start me-4">
                        <p>Type: <span style={{ fontWeight: 500 }}>{props.data.type}</span></p>
                        <p>Description: <span style={{ fontWeight: 500 }}>{props.data.description}</span></p>
                        <p>Reported at: <span style={{ fontWeight: 500 }}>{props.data.reporter.timestamp}</span></p>
                    </div>
                    <div className="text-start">
                        <p><Badge bg="warning" style={{ color: "black" }}>Target</Badge></p>
                        <p>Company: <span style={{ fontWeight: 500 }}>{props.data.assigned_company.company}</span></p>
                        <p>Address: <span style={{ fontWeight: 500 }}>{formatAddress(props.data.assigned_company.address)}</span></p>
                    </div>
                </div>
                <ProductListItem item={props.data.product} noReport></ProductListItem>
            </Card.Body>
        </Card >
    );
}

export default IncidentListItem;