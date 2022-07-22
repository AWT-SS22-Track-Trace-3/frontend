import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import TimelineIcon from "../TimelineIcon";
import TimelineDates from "../TimelineDates";
import { Badge } from "react-bootstrap";
import { ShipmentMethods, UserTypes } from "../../util/typeMapper";

const ShipmentElement = ({ item }) => {
    return (
        <VerticalTimelineElement
            style={{ margin: "2em 0" }}
            icon={<TimelineIcon type="postal_service" />}
            date={<TimelineDates
                delivered={item.date_delivered}
                shipped={item.date_shipped} />}
        >
            <div className="text-start">
                <h5>
                    {item.owner.company}
                    <span className="user-type">
                        &nbsp;- {UserTypes[item.owner.type]}
                    </span>
                </h5>
                <div className="card-info d-flex">
                    <p className="mb-0 mt-1 me-4">Shipment Method: {ShipmentMethods[item.shipment_method]}</p>
                    <p className="mb-0 mt-1">Tracking Number: {item.tracking_number}</p>
                </div>
            </div>
        </VerticalTimelineElement>
    );
}

export default ShipmentElement;