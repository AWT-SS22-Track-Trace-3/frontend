import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../styles/timeline.css';
import ProductListItem from "../views/ProductListItem";
import OwnershipElement from "../views/TransactionHistory/OwnershipElement";
import ShipmentElement from "../views/TransactionHistory/ShipmentElement";
import IncidentElement from "../views/TransactionHistory/IncidentElement";
import TerminationElement from "../views/TransactionHistory/TerminationElement";
import requestMaker from "../util/RequestMaker";
import requestProvider from "../util/API";
import ReportModal from "../views/ReportPopover";

const TransactionHistory = (props) => {
    const { id } = useParams();

    const defaultSample = {
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
    }
    const resetSample = () => setSample(defaultSample)
    const [sample, setSample] = useState(defaultSample);
    const [report, setReport] = useState({
        show: false,
        product: "",
    });

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }

    const sampleData = () => {
        requestMaker(requestProvider().getProduct(id)).make()
            .then(res => {
                if (Array.isArray(res.data))
                    resetSample();
                else
                    setSample(res.data)
            })
    }

    useEffect(() => {
        sampleData();
    }, [])

    const showReport = (product) => {
        setReport({
            show: true,
            product
        });
    }

    const hideReport = () => {
        setReport({
            ...report,
            show: false
        });
    }

    return (
        <Container fluid="lg" style={containerStyle}>
            <h1>Supply Chain Overview</h1>
            {sample.serial_number == "" ? (<div>No such product</div>) : (
                <Row>
                    <Col>
                        <ProductListItem item={sample} hideLink noMargin reportHandler={showReport}></ProductListItem>
                    </Col>
                    <Col sm={{ span: 12 }} className="d-flex flex-column">
                        <VerticalTimeline animate={false} layout={"1-column-left"} lineColor={"black"}>
                            {sample.supply_chain.map((item, index) => {
                                if (item.type === "change_of_ownership")
                                    return (
                                        <OwnershipElement key={index} item={item}></OwnershipElement>
                                    )
                                if (item.type === "shipment")
                                    return (
                                        <ShipmentElement key={index} item={item}></ShipmentElement>
                                    )
                                if (item.type === "incident")
                                    return (
                                        <IncidentElement key={index} item={item}></IncidentElement>
                                    )
                                if (item.type === "termination")
                                    return (
                                        <TerminationElement key={index} item={item}></TerminationElement>
                                    )
                            })}
                        </VerticalTimeline>
                    </Col>
                </Row>
            )}
            <ReportModal show={report.show} onHide={() => hideReport()} product={report.product}></ReportModal>
        </Container >
    );
}

export default TransactionHistory;