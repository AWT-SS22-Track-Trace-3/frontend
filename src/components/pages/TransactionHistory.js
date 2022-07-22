import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Accordion } from "react-bootstrap";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../styles/timeline.css';
import TimelineIcon from "../views/TimelineIcon";
import TimelineDates from "../views/TimelineDates";
import ProductListItem from "../views/ProductListItem";
import { formatAddress } from "../util/CustomFormatter";
import { useCookies } from "react-cookie";
import axios from "axios";
import { UserTypes } from "../util/typeMapper";

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
            url: "http://localhost:8000/product/4432889436610395",
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
                        {sample.supply_chain.map((item, index) =>
                            <VerticalTimelineElement
                                icon={<TimelineIcon type={item.owner.type} />}
                                date={<TimelineDates
                                    checkin={item.checkin_date}
                                    checkout={item.checkout_date}
                                    received={item.date_received}
                                    shipped={item.date_shipped} />}
                                key={index}
                            >
                                <div className="text-start">
                                    <h5>
                                        {item.owner.company}
                                        <Badge pill bg="info" text="dark" className="ms-2" style={{ verticalAlign: "bottom" }}>
                                            {UserTypes[item.owner.type]}
                                        </Badge>
                                    </h5>
                                    <div className="address mb-3">
                                        <p className="mb-0 mt-1">{formatAddress(item.owner.address)}</p>
                                    </div>
                                </div>
                            </VerticalTimelineElement>
                        )}
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