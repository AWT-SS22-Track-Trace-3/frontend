import React from "react";
import { Accordion, Badge, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductListItem = (props) => {
    return (
        <Card className="text-start">
            <Card.Body>
                <Card.Title>{props.item.name}</Card.Title>
                <Accordion>
                    <Accordion.Item>
                        <Accordion.Header>
                            <span className="me-4">
                                <Badge bg="warning" text="dark" className="me-2">PC</Badge>
                                {props.item.productCode}
                            </span>
                            <span>
                                <Badge bg="info" className="me-2">SN</Badge>
                                {props.item.serialNumber}
                            </span>
                        </Accordion.Header>
                        <Accordion.Body className="text-start">
                            <p>Manufacturer: <span style={{ fontWeight: 500 }}>{props.item.manufacturer}</span></p>
                            <p>Seller: <span style={{ fontWeight: 500 }}>{props.item.seller}</span></p>
                            <p>Expiry: <span style={{ fontWeight: 500 }}>{props.item.expiry}</span></p>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion >
                <Link to="/">
                    <Button className="mt-2">Transaction History</Button>
                </Link>
            </Card.Body >
        </Card >
    );
}

export default ProductListItem;