import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
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
    const [incidents, setIncidents] = useState({
        country: "",
        incidents: [],
        show: false
    });

    useEffect(() => {
        const defaultOptions = getGlobalDefaultState();
        setGlobalOptions({ ...globalOptions, ...defaultOptions })

        if (country && incidentCount > 0) {
            fetchIncidentSummary(getFilteredOptions(defaultOptions));
        }
    }, []);

    const globalOptionsSelect = (key, value) => {
        let newItems = globalOptions[key].items.map((item) => ({
            ...item,
            selected: (item.value === value || false)
        }));

        const updatedOptions = { ...globalOptions, [key]: { ...globalOptions[key], items: newItems } };

        console.log(updatedOptions)

        setGlobalOptions(updatedOptions);
        fetchIncidentSummary(getFilteredOptions(updatedOptions));
    }

    const getFilteredOptions = (options) => {
        let filtered = {};
        Object.keys(options).map((key) => {
            if (options[key].items)
                filtered[key] = options[key].items.filter((x) => x.selected).map((item) => item.value);
        });

        return filtered;
    }

    const paginationHandler = (requestedPage) => {
        setGlobalOptions({ ...globalOptions, pagination: { ...globalOptions.pagination, current: requestedPage } })
        console.log(requestedPage);
    }

    const fetchIncidentSummary = (options) => {

        let optionKeys = Object.keys(options);

        let query = optionKeys.map((key) => (`${key}=${options[key]}`)).join("&");

        //console.log(`http://localhost:8000/incidents/${country}?${query}`);

        axios({
            url: `http://localhost:8000/incidents/summary/${country}?${query}`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${cookies.access_token}`
            }
        }).then((res) => {
            console.log(res.data)
            setIncidents({ country, incidents: res.data, show: true })
        });
    }

    const fetchIncidents = (filterValue) => {
        let filterType = getFilteredOptions(globalOptions)["group"][0];

        axios({
            url: `http://localhost:8000/incidents/${country}?filter_type=${filterType}&filter_value=${filterValue}`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${cookies.access_token}`
            }
        }).then((res) => {
            console.log(res.data)

            let newIncidents = incidents.incidents;
            let index = newIncidents.findIndex((x) => x["_id"]["raw"] === filterValue)

            newIncidents[index].items = res.data

            setIncidents({ ...incidents, incidents: newIncidents })
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
            {incidents.incidents.length > 0 ? (
                <IncidentAccordion items={incidents.incidents} openHandler={fetchIncidents}></IncidentAccordion>
            ) : (
                "No known incidents."
            )}

        </GroupedListView>
    );
}

export default IncidentReport;