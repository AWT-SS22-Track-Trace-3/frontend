import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../styles/timeline.css';
import TimelineIcon from "../views/TimelineIcon";
import ProductListItem from "../views/ProductListItem";
import { useCookies } from "react-cookie";
import axios from "axios";
import OwnershipElement from "../views/TransactionHistory/OwnershipElement";
import ShipmentElement from "../views/TransactionHistory/ShipmentElement";

const TransactionHistory = (props) => {
    const { id } = useParams();
    const [cookies, setCookie] = useCookies(["access_token, access_level"]);
    const [sample, setSample] = useState({
        "name": "",
        "common_name": "",
        "form": "",
        "strength": "",
        "drug_code": "",
        "pack_size": 0,
        "pack_type": "",
        "serial_number": "",
        "reimbursement_number": "",
        "batch_number": "",
        "expiry_date": "",
        "coding": "",
        "marketed_region": "",
        "manufacturers": [],
        "sellers": [],
        "supply_chain": []
    });

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }

    const sampleData = () => {
        axios({
            url: "http://localhost:8000/product/234567898765367468",
            method: "GET",
            headers: {
                Authorization: `Bearer ${cookies.access_token}`
            }
        }).then((res) => {
            console.log(res.data);
            setSample(res.data)
        });
    }

    useEffect(() => {
        console.log("fetching")
        sampleData();
    }, [])

    return (
        <Container fluid="lg" style={containerStyle}>
            <h1>Supply Chain Overview</h1>
            <Row>
                <Col>
                    <ProductListItem item={sample} hideLink noMargin></ProductListItem>
                </Col>
                <Col sm={{ span: 12 }} className="d-flex flex-column">
                    <VerticalTimeline animate={false} layout={"1-column-left"} lineColor={"black"}>
                        {sample.supply_chain.map((item, index) => {
                            return item.type === "change_of_ownership" ? (
                                <OwnershipElement key={index} item={item}></OwnershipElement>
                            ) : (
                                <ShipmentElement key={index} item={item}></ShipmentElement>
                            )
                        })}
                        {
                            sample.reported ? (
                                <VerticalTimelineElement
                                    icon={<TimelineIcon type={"reported"} />}
                                    className="chain_d-none"
                                ></VerticalTimelineElement>
                            ) : (<></>)
                        }
                        {
                            sample.used ? (
                                <VerticalTimelineElement
                                    icon={<TimelineIcon type={"dispensed"} />}
                                    className="chain_d-none"
                                ></VerticalTimelineElement>
                            ) : (<></>)
                        }
                    </VerticalTimeline>
                </Col>
            </Row>
        </Container >
    );
}

export default TransactionHistory;