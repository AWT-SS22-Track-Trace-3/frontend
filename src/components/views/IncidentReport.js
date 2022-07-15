import React, { useEffect, useState } from "react";
import { utcToZonedTime, toDate, format } from "date-fns-tz";
import { Accordion } from "react-bootstrap";
import IncidentList from "./IncidentList";
import groupSort, { getGlobalDefaultState } from "../util/IncidentGroups";
import GroupedListView from "./GroupedListView";

const selectedStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    color: "#00ACC1"
}

const IncidentReport = ({ country, incidentCount }) => {
    const [globalOptions, setGlobalOptions] = useState({
        pagination: {
            current: 0,
            interval: 5,
            total: 0
        }
    });
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        const defaultOptions = getGlobalDefaultState();
        setGlobalOptions({ ...globalOptions, ...defaultOptions })

        if (country && incidentCount > 0) {
            fetchIncidents(country, getFilteredOptions(defaultOptions));
        }
    }, []);

    const globalOptionsSelect = (key, value) => {
        let newItems = globalOptions[key].items.map((item) => ({
            ...item,
            selected: (item.value === value || false)
        }));

        const updatedOptions = { ...globalOptions, [key]: { ...globalOptions[key], items: newItems } };

        setGlobalOptions(updatedOptions);
        fetchIncidents(country, getFilteredOptions(updatedOptions));
    }

    const getFilteredOptions = (options) => {
        let filtered = {};
        Object.keys(options).map((key) => {
            filtered[key] = options[key].items.filter((x) => x.selected).map((item) => item.value);
        });

        return filtered;
    }

    const paginationHandler = (requestedPage) => {
        setGlobalOptions({ ...globalOptions, pagination: { ...globalOptions.pagination, current: requestedPage } })
        console.log(requestedPage);
    }

    const fetchIncidents = (country, options) => {

        let optionKeys = Object.keys(options);

        let query = optionKeys.map((key) => (`${key}=${options[key]}`)).join("&");

        console.log(`http://localhost:8000/incidents?scope=${country}&${query}`);

        /*
    
        axios({
            url: `http://localhost:8000/incidents?scope=${country}&${query}`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${cookies.access_token}`
            }
        }).then((res) => {
            console.log(res);
            setIncidents({ country, incidents: res.data, show: true })
        });
    
        */
    }


    return (
        <GroupedListView
            buttons={globalOptions}
            title={"Incident Report for " + country}
            selectHandler={globalOptionsSelect}
            paginationHandler={paginationHandler}
            paginationConfig={globalOptions.pagination}
        >
            {incidents.length > 0 ? (
                <Accordion flush>
                    <Accordion.Item>
                        <Accordion.Header>
                            {
                                //format(toDate(props.data.incidents[0].reporter.timestamp), "dd.MM.yyyy")
                                "Imaginary Date"
                            }
                        </Accordion.Header>
                        <Accordion.Body>

                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            ) : (
                "No known incidents."
            )}

        </GroupedListView>
    );
}

export default IncidentReport;