import React, { useEffect } from "react";
import $ from 'jquery';
import 'jQuery-QueryBuilder';
import '../styles/queryBuilder.css'

const QueryBuilder = () => {
    /*
    var rules = {

    };
    */

    var filters = [
        {
            id: "name",
            label: "Product Name",
            type: "string",
            operators: ["equal"]
        },
        {
            id: "serial",
            label: "Serial Number",
            type: "string",
            operators: ["equal"]
        },
        {
            id: "lot",
            label: "Lot Number",
            type: "string",
            operators: ["equal"]
        },
        {
            id: 'expiry',
            label: 'Expiration Date',
            type: 'date',
            validation: {
                format: 'DD.MM.YYYY'
            },
            plugin: 'datepicker',
            plugin_config: {
                format: 'dd.mm.yyyy',
                todayBtn: 'linked',
                todayHighlight: true,
                autoclose: true
            },
            operators: ["equal", "greater_or_equal", "less_or_equal"]
        },
        {
            id: "productCode",
            label: "PC/NDC",
            type: "string",
            operators: ["equal"]
        },
        {
            id: "sni",
            label: "SNI",
            type: "string",
            operators: ["equal"]
        }
    ];

    useEffect(() => {
        $('#builder').queryBuilder({
            filters
        });

    }, []);

    useEffect(() => {
        $('#builder .form-control').addClass("form-select");
        $('#builder .hide').addClass("d-none");
    });

    return (
        <React.Fragment>
            <h1>Search Product Database</h1>
            <div id="builder"></div>
        </React.Fragment>
    )
}

export default QueryBuilder;