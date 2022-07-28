import React from "react";
import { Badge, Accordion } from "react-bootstrap";
import GroupedListView from "./GroupedListView";
import IncidentReportItem from "./IncidentReportItem";

const IncidentAccordion = ({ groupKeyRaw, groupKeyDisplay, items, openHandler }) => {
    return (
        <Accordion flush alwaysOpen>
            {items.map((item, index) => (
                <Accordion.Item eventKey={item["_id"]["raw"] + item.index} key={index}>
                    <Accordion.Header onClick={() => openHandler(item["_id"]["raw"])}>
                        <div className="d-flex justify-content-between px-4" style={{ width: "100%" }}>
                            {item["_id"]["formatted"]}
                            <span>
                                <Badge bg="danger" className="me-2 ms-4">Reports: {item.count}</Badge>
                                {item.unique_companies > 0 ? (
                                    <Badge bg="dark">Companies involved: {(item.unique_companies | 0)}</Badge>
                                ) : (<></>)}
                            </span>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        {item.items ? (
                            item.items.map((x, index) =>
                                <IncidentReportItem key={index} incident={x}></IncidentReportItem>
                            )
                        ) : (<></>)}
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}

export default IncidentAccordion;