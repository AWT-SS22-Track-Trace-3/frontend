import React, { useEffect, useState } from "react";
import { getGlobalDefaultState } from "../util/IncidentGroups";
import GroupedListView from "./GroupedListView";
import IncidentAccordion from "./IncidentAccordion";
import requestMaker from "../util/RequestMaker";
import requestProvider from "../util/API";

const IncidentReport = ({ country, incidentCount }) => {
    const defaultPagination = {
        pagination: {
            current: 0,
            interval: 10
        }
    }
    const [globalOptions, setGlobalOptions] = useState(defaultPagination);
    const [incidents, setIncidents] = useState({
        country: "",
        incidents: [],
        show: false,
        total: 0
    });

    const resetPagination = () => setGlobalOptions({ ...globalOptions, ...defaultPagination })

    useEffect(() => {
        const defaultOptions = { ...globalOptions, ...getGlobalDefaultState() };
        setGlobalOptions(defaultOptions)

        if (country && incidentCount > 0) {
            fetchIncidentSummary(getFilteredOptions(defaultOptions));
        }
    }, []);

    const globalOptionsSelect = (key, value) => {
        let newItems = globalOptions[key].items.map((item) => ({
            ...item,
            selected: (item.value === value || false)
        }));

        const updatedOptions = { ...globalOptions, ...defaultPagination, [key]: { ...globalOptions[key], items: newItems } };

        setGlobalOptions(updatedOptions);
        fetchIncidentSummary(getFilteredOptions(updatedOptions));
    }

    const parsePagination = (options) => {
        let pagination = {}

        if (options.pagination) {
            pagination["limit"] = options.pagination.interval;
            pagination["offset"] = options.pagination.interval * options.pagination.current;
        }

        return pagination
    }

    const getFilteredOptions = (options) => {
        let filtered = {};
        Object.keys(options).map((key) => {
            if (options[key].items)
                filtered[key] = options[key].items.filter((x) => x.selected).map((item) => item.value);
            return null;
        });

        return { ...filtered, ...parsePagination(options) };
    }

    const paginationHandler = (requestedPage) => {
        let updatedOptions = { ...globalOptions, pagination: { ...globalOptions.pagination, current: requestedPage } };

        fetchIncidentSummary(getFilteredOptions(updatedOptions));

        setGlobalOptions(updatedOptions);
    }

    const fetchIncidentSummary = (options) => {

        let optionKeys = Object.keys(options);

        let query = optionKeys.map((key) => (`${key}=${options[key]}`)).join("&");

        requestMaker(requestProvider().getIncidentSummary(country, query)).make()
            .then(res => setIncidents({ country, incidents: res.data.data, show: true, total: res.data.total.count }))
    }

    const fetchIncidents = (filterValue) => {
        let filterType = getFilteredOptions(globalOptions)["group"][0];
        let query = `filter_type=${filterType}&filter_value=${filterValue}`

        requestMaker(requestProvider().getIncidents(country, query)).make()
            .then(res => {
                let newIncidents = incidents.incidents;
                let index = newIncidents.findIndex((x) => x["_id"]["raw"] === filterValue)

                newIncidents[index].items = res.data.data;

                setIncidents({ ...incidents, incidents: newIncidents })
            })
    }


    return (
        <GroupedListView
            buttons={globalOptions}
            title={`Incident Report ${country} - Total reports: ${incidents.total}`}
            selectHandler={globalOptionsSelect}
            paginationHandler={paginationHandler}
            paginationConfig={{ ...globalOptions.pagination, total: incidents.total }}
        >
            {
                incidents.incidents.length > 0 ? (
                    <IncidentAccordion
                        items={incidents.incidents}
                        openHandler={fetchIncidents}
                    ></IncidentAccordion>
                ) : (
                    "No known incidents."
                )
            }

        </GroupedListView >
    );
}

export default IncidentReport;