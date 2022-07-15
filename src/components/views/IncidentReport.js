import React, { useEffect, useState } from "react";
import { utcToZonedTime, toDate, format } from "date-fns-tz";
import { Accordion } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";
import IncidentList from "./IncidentList";
import exampleIncidents from "../util/exampleIncidents.json";
import exampleIncidentSummary from "../util/exampleIncidentsSummary.json";
import groupSort, { getGlobalDefaultState } from "../util/IncidentGroups";
import GroupedListView from "./GroupedListView";
import IncidentAccordion from "./IncidentAccordion";

const selectedStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    color: "#00ACC1"
}

const IncidentReport = ({ country, incidentCount }) => {
    const [cookies] = useCookies(["access_token"]);
    const [globalOptions, setGlobalOptions] = useState({
        pagination: {
            current: 0,
            interval: 5,
            total: 0
        }
    });
    const [incidents, setIncidents] = useState(exampleIncidents);
    const [incidentSummary, setIncidentSummary] = useState(exampleIncidentSummary);

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



        axios({
            url: `http://localhost:8000/incidents?scope=${country}&${query}`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${cookies.access_token}`
            }
        }).then((res) => {
            console.log(res);
            //setIncidents({ country, incidents: res.data, show: true })
        });


    }


    return (
        <GroupedListView
            buttons={globalOptions}
            title={"Incident Report " + country}
            selectHandler={globalOptionsSelect}
            paginationHandler={paginationHandler}
            paginationConfig={globalOptions.pagination}
        >
            {incidents.length > 0 ? (
                <IncidentAccordion items={incidents}></IncidentAccordion>
            ) : (
                "No known incidents."
            )}

        </GroupedListView>
    );
}

export default IncidentReport;