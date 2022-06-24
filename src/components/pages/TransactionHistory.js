import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Accordion } from "react-bootstrap";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../styles/timeline.css';
import TimelineIcon from "../views/TimelineIcon";
import transactions from "../util/exampleTransactions.json";
import data from "../util/init-products.json";
import TimelineDates from "../views/TimelineDates";
import ProductListItem from "../views/ProductListItem";

const TransactionHistory = (props) => {
    const { id } = useParams();

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }

    return (
        <Container fluid="lg" style={containerStyle}>
            <h1>Supply Chain Overview</h1>
            <Row>
                <Col>
                    <ProductListItem item={data[0]} hideLink noMargin></ProductListItem>
                </Col>
                <Col sm={{ span: 12 }} className="d-flex flex-column">
                    <VerticalTimeline animate={false} layout={"1-column-left"} lineColor={"black"}>
                        {transactions.map((item, index) =>
                            <VerticalTimelineElement
                                icon={<TimelineIcon type={item.type} />}
                                date={<TimelineDates checkin={item.checkin_date} checkout={item.checkout_date} />}
                                key={index}
                            >
                                <div className="text-start">
                                    <h4>
                                        {item.name}
                                    </h4>
                                    <div className="address mb-3">
                                        <p className="mb-0 mt-1">{item.address_number} {item.address_street}</p>
                                        <p className="mt-0">{item.address_zip} {item.address_city}</p>
                                    </div>
                                </div>
                            </VerticalTimelineElement>
                        )}
                    </VerticalTimeline>
                </Col>
            </Row>
        </Container >
    );
}

export default TransactionHistory;