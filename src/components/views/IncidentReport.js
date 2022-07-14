import React, { useState } from "react";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import IncidentList from "./IncidentList";

const buttons = [
    {
        title: "Group",
        items: [
            {
                'title': "Company",
                "value": "company",
                "sortType": "alphabet"
            },
            {
                'title': "Incident Type",
                "value": "type",
                "sortType": "alphabet"
            },
            {
                'title': "Time (Day)",
                "value": "day",
                "sortType": "day"
            },
            {
                'title': "Time (Month)",
                "value": "month",
                "sortType": "month"
            },
            {
                'title': "Time (Year)",
                "value": "year",
                "sortType": "month"
            }
        ]
    },
    {
        title: "Sort",
        items: [
            {
                'title': "Ascending",
                "value": "asc"
            },
            {
                'title': "Descending",
                "value": "dsc"
            }
        ]
    }
]

const selectedStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    color: "#00ACC1"
}

const IncidentReport = (props) => {
    const [globalOptions, setGlobalOptions] = useState({
        sort: "dsc",
        group: "day"
    });

    const isSelected = (name, value) => (globalOptions[name] === value)

    const optionsChange = (name, value) => {

        setGlobalOptions({ ...globalOptions, [name]: value })
    }

    return (
        <div>
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5 className="m-0">Incident report for {props.data.country}</h5>
                    <div className="d-flex">
                        {buttons.map((button) => (
                            <DropdownButton key={button.title} title={button.title} className="ms-2">
                                {button.items.map((item, i) => {
                                    const name = button.title.toLowerCase();

                                    return (
                                        <Dropdown.Item
                                            key={i}
                                            value={item.value}
                                            style={isSelected(name, item.value) ? selectedStyle : {}}
                                            onClick={() => optionsChange(name, item.value)}
                                        >

                                            {item.title}
                                        </Dropdown.Item>
                                    )
                                })}
                            </DropdownButton>
                        ))}
                    </div>
                </Card.Header>
                <Card.Body>
                    {props.data.incidents.length > 0 ? (
                        <IncidentList data={props.data.incidents}></IncidentList>
                    ) : (
                        "No known incidents."
                    )}

                </Card.Body>
            </Card>
        </div>
    );
}

export default IncidentReport;