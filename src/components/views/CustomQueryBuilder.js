import { React, useState } from 'react';
import { formatQuery, QueryBuilder } from 'react-querybuilder';
import { bootstrapControlClassnames, bootstrapControlElements } from '@react-querybuilder/bootstrap';
import { Button } from 'react-bootstrap';
import CustomValueEditor from '../util/CustomValueEditor';
import 'bootstrap/scss/bootstrap.scss';
import 'react-querybuilder/dist/query-builder.scss';

const CustomQueryBuilder = (props) => {
    const fields = [
        {
            name: 'name',
            label: 'Product Name',
            operator: "="
        },
        {
            name: 'serial_number',
            label: 'Serial Number',
            operator: "="
        },
        {
            name: 'batch_number',
            label: 'Lot Number',
            operator: "="
        },
        {
            name: 'code',
            label: 'PC/NDC',
            operator: "="
        },
        {
            name: 'sni',
            label: 'SNI',
            operator: "="
        },
        {
            name: 'expiry',
            label: 'Expiration Date',
            datatype: "date",
            operators: [
                { name: "=", label: "on" },
                { name: "<=", label: "before" },
                { name: ">=", label: "after" }
            ]
        },
    ];

    const [query, setQuery] = useState({
        "combinator": "and",
        "not": false,
        "rules": [
            {
                "field": "name",
                "operator": "=",
                "value": ""
            }
        ]
    });

    return (
        <div>
            <QueryBuilder
                fields={fields}
                query={query}
                onQueryChange={q => setQuery(q)}
                controlElements={{ ...bootstrapControlElements, valueEditor: CustomValueEditor }}
                controlClassnames={bootstrapControlClassnames}
            ></QueryBuilder>
            <Button className="mt-2 float-end" onClick={() => props.searchHandler(formatQuery(query, "mongodb"))}>Search</Button>
        </div>
    );
}

export default CustomQueryBuilder;