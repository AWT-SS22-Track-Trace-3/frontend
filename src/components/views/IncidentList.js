import React from "react";
import IncidentListItem from "./IncidentListItem";

const IncidentList = (props) => {
    return (<div>
        {props.data.map((item, index) => (
            <IncidentListItem data={item} key={index}></IncidentListItem>
        ))}
    </div>);
}

export default IncidentList;