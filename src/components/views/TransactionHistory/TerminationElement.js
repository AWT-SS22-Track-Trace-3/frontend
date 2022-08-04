import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import TimelineDates from "../TimelineDates";
import TimelineIcon from "../TimelineIcon";
import { formatAddress } from "../../util/CustomFormatter";

const IncidentElement = ({ item }) => {
    return (
        <VerticalTimelineElement
            style={{ margin: "2em 0" }}
            icon={<TimelineIcon type="dispensed" />}
            date={<TimelineDates
                date={item.transaction_date} />}
        >
            <div className="text-start card-info">
                <h5>Product terminated</h5>
                <p className="mt-1">{item.owner.company}</p>
                <p className="mt-0">{formatAddress(item.owner.address)}</p>
            </div>
        </VerticalTimelineElement>
    );
}

export default IncidentElement;