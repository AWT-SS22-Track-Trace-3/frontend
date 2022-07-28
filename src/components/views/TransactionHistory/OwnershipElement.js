import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import TimelineIcon from "../TimelineIcon";
import TimelineDates from "../TimelineDates";
import { Badge } from "react-bootstrap";
import { formatAddress, getDateFromISOString } from "../../util/CustomFormatter";
import { UserTypes } from "../../util/typeMapper";

const OwnershipElement = ({ item }) => {
    return (
        <VerticalTimelineElement
            style={{ margin: "2em 0" }}
            icon={<TimelineIcon type={item.owner.type} />}
            date={<TimelineDates
                checkin={item.checkin_date}
                checkout={item.checkout_date}
                received={item.date_received}
                shipped={item.date_shipped} />}
        >
            <div className="text-start">
                <h5>
                    {item.owner.company}
                    <span className="user-type">
                        &nbsp;- {UserTypes[item.owner.type]}
                    </span>
                </h5>
                <div className="address">
                    <p className="mb-0 mt-1">{formatAddress(item.owner.address)}</p>
                </div>
                <div className="card-info">
                    <p className="mb-0 mt-1">Transaction date: {getDateFromISOString(item.transaction_date)}</p>
                </div>
            </div>
        </VerticalTimelineElement>
    );
}

export default OwnershipElement;