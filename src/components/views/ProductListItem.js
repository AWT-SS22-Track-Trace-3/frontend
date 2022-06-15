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
        <Card className="text-start mb-2 product">
            <Card.Body>
                <Card.Title>
                    <Image src={getLocaleImg(props.item)} height="25px" className="me-2" style={{ verticalAlign: "sub" }}></Image>
                    {props.item.name}
                    <div style={{ float: "right" }}>
                        <Link to={"/history/" + props.item.serial_number} className={(props.hideLink ? "d-none" : "")}>
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
                        <Accordion.Body className={"text-start " + (props.vertical ? "" : "d-flex")}>
                            <div>
                                <p>{getLocale(props.item) === "eu" ? "Drug Code" : "National Drug Code"}: <span style={{ fontWeight: 500 }}>{props.item.drug_code}</span></p>
                                <p>{getLocale(props.item) === "eu" ? "Serial Number" : "Standard Numeric Identifier"}: <span style={{ fontWeight: 500 }}>{props.item.serial_number}</span></p>
                                <p>Batch Number: <span style={{ fontWeight: 500 }}>{props.item.batch_number}</span></p>
                                <p>Manufacturer: <span style={{ fontWeight: 500 }}>{props.item.manufacturer_name}</span></p>
                                <p>Marketer: <span style={{ fontWeight: 500 }}>{props.item.marketing_holder_name}</span></p>
                            </div>
                            <div className={(props.vertical ? "" : "ms-5")}>
                                <p>Form: <span style={{ fontWeight: 500 }}>{props.item.form}</span></p>
                                <p>Strength: <span style={{ fontWeight: 500 }}>{props.item.strength}</span></p>
                                <p>Pack Size: <span style={{ fontWeight: 500 }}>{props.item.pack_size}</span></p>
                                <p>Expiration Date: <span style={{ fontWeight: 500 }}>{props.item.expiry_date}</span></p>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion >
            </Card.Body >
        </Card >
    );
}

export default ProductListItem;