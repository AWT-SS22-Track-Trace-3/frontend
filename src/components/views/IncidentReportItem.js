import React from "react";

const IncidentReportItem = ({ incident }) => {
    return (
        <div>
            {"type: " + incident.type}
        </div>
    );
}

export default IncidentReportItem;