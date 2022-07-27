import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getGlobalDefaultState } from "../util/IncidentGroups";
import GroupedListView from "./GroupedListView";
import IncidentAccordion from "./IncidentAccordion";
import requestMaker from "../util/RequestMaker";
import requestProvider from "../util/API";

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

        setGlobalOptions(updatedOptions);
        fetchIncidentSummary(getFilteredOptions(updatedOptions));
    }

    const getFilteredOptions = (options) => {
        let filtered = {};
        Object.keys(options).map((key) => {
            if (options[key].items)
                filtered[key] = options[key].items.filter((x) => x.selected).map((item) => item.value);
            return null;
        });

        return filtered;
    }

    const paginationHandler = (requestedPage) => {
        setGlobalOptions({ ...globalOptions, pagination: { ...globalOptions.pagination, current: requestedPage } })
    }

    const fetchIncidentSummary = (options) => {

        let optionKeys = Object.keys(options);

        let query = optionKeys.map((key) => (`${key}=${options[key]}`)).join("&");

        requestMaker(requestProvider().getIncidentSummary(country, query), cookies.access_token).make()
            .then(res => setIncidents({ country, incidents: res.data, show: true }))
    }

    const fetchIncidents = (filterValue) => {
        let filterType = getFilteredOptions(globalOptions)["group"][0];
        let query = `filter_type=${filterType}&filter_value=${filterValue}`

        requestMaker(requestProvider().getIncidents(country, query), cookies.access_token).make()
            .then(res => {
                let newIncidents = incidents.incidents;
                let index = newIncidents.findIndex((x) => x["_id"]["raw"] === filterValue)

                newIncidents[index].items = res.data

                setIncidents({ ...incidents, incidents: newIncidents })
            })
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