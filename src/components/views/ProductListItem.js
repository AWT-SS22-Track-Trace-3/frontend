import React from "react";
import { Accordion, Badge, Card, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import us from "../../img/united-states.png";
import eu from "../../img/european-union.png";

const ProductListItem = (props) => {
    function getLocaleImg(item) {
        if (item.marketed_states.toLowerCase() === "eu") {
            return eu;
        } else {
            return us;
        }
    }

    function getLocale(item) {
        if (item.marketed_states.toLowerCase() === "eu") {
            return "eu";
        } else {
            return "us";
        }
    }

    return (
        <Card className="text-start mb-2">
            <Card.Body>
                <Card.Title>
                    <Image src={getLocaleImg(props.item)} height="25px" className="me-2" style={{ verticalAlign: "sub" }}></Image>
                    {props.item.name}
                    <div style={{ float: "right" }}>
                        <Link to="/">
                            <Button size="sm" variant="link">Transaction History</Button>
                        </Link>
                        <Link to="/">
                            <Button size="sm" variant="link">Report</Button>
                        </Link>
                    </div>
                </Card.Title>
                <Accordion>
                    <Accordion.Item eventKey={props.item.drug_code}>
                        <Accordion.Header>
                            <span className="me-4">
                                <Badge bg="warning" text="dark" className="me-2">
                                    {getLocale(props.item) === "eu" ? "DC" : "NDC"}
                                </Badge>
                                {props.item.drug_code}
                            </span>
                            <span>
                                <Badge bg="info" className="me-2">
                                    {getLocale(props.item) === "eu" ? "S/N" : "SNI"}
                                </Badge>
                                {props.item.serial_number}
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
            </Card.Body >
        </Card >
    );
}

export default ProductListItem;