import { React, useState } from 'react';
import { formatQuery, QueryBuilder } from 'react-querybuilder';
import { bootstrapControlClassnames, bootstrapControlElements } from '@react-querybuilder/bootstrap';
import { Button } from 'react-bootstrap';
import CustomValueEditor from '../util/CustomValueEditor';
import 'bootstrap/scss/bootstrap.scss';
import 'react-querybuilder/dist/query-builder.scss';

const CustomQueryBuilder = (props) => {
    const fields: Field[] = [
        {
            name: 'name',
            label: 'Product Name',
            operator: "="
        },
        {
            name: 'serial',
            label: 'Serial Number',
            operator: "="
        },
        {
            name: 'lot',
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
            <Button onClick={() => props.searchHandler(query)}>Search</Button>
            {/*<p>{formatQuery(query, "mongodb")}</p>*/}
        </div>
    );
}

export default CustomQueryBuilder;