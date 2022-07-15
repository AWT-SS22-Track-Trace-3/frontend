import React from "react";
import { Badge, Accordion } from "react-bootstrap";
import GroupedListView from "./GroupedListView";
import IncidentReportItem from "./IncidentReportItem";

const IncidentAccordion = ({ summaryOnly, items }) => {
    return (
        <Accordion flush>
            {items.map((item, index) => (
                <Accordion.Item eventKey={item.group + item.index} key={index}>
                    <Accordion.Header>
                        {item.group}
                        <span>
                            <Badge bg="danger" className="me-2 ms-4">Reports: {item.count}</Badge>
                            <Badge bg="dark">Companies involved: {item.countCompanies}</Badge>
                        </span>
                    </Accordion.Header>
                    <Accordion.Body>
                        {item.items.map((x, index) =>
                            <IncidentReportItem incident={x}></IncidentReportItem>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}

export default IncidentAccordion;