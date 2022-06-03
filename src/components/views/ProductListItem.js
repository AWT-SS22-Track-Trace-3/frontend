import React from "react";
import { Accordion, Badge, Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import us from "../../img/united-states.png";
import eu from "../../img/european-union.png";

const ProductListItem = (props) => {
    return (
        <Card className="text-start">
            <Card.Body>
                <Card.Title>
                    <Image src={eu} height="25px" className="me-2"></Image>
                    {props.item.name}
                </Card.Title>
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
                        <p>Product Code: <span style={{ fontWeight: 500 }}>{props.item.productCode}</span></p>
                        <p>Serial Number: <span style={{ fontWeight: 500 }}>{props.item.serialNumber}</span></p>
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