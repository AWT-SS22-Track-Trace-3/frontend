import { React, useState } from 'react';
import { formatQuery, QueryBuilder } from 'react-querybuilder';
import { bootstrapControlClassnames, bootstrapControlElements } from '@react-querybuilder/bootstrap';
import { Button } from 'react-bootstrap';
import CustomValueEditor from '../util/CustomValueEditor';
import 'bootstrap/scss/bootstrap.scss';
import 'react-querybuilder/dist/query-builder.scss';

const CustomQueryBuilder = (props) => {
    const textOperators = [
        { name: '=', label: 'equals' },
        { name: '!=', label: 'does not equal' },
        { name: 'contains', label: 'contains' },
        { name: 'beginsWith', label: 'begins with' },
        { name: 'endsWith', label: 'ends with' },
        { name: 'doesNotContain', label: 'does not contain' },
        { name: 'doesNotBeginWith', label: 'does not begin with' },
        { name: 'doesNotEndWith', label: 'does not end with' },
        { name: 'null', label: 'is null' }
    ]

    const fields = [
        {
            name: 'name',
            label: 'Product Name',
            operators: textOperators
        },
        {
            name: 'serial_number',
            label: 'Serial Number',
            operators: textOperators
        },
        {
            name: 'batch_number',
            label: 'Batch Number',
            operators: textOperators
        },
        {
            name: 'code',
            label: 'PC/NDC',
            operators: textOperators
        },
        {
            name: "marketed_region",
            label: "Marketed Region",
            operators: textOperators
        },
        ,
        {
            name: "used",
            label: "Terminated",
            valueEditorType: "switch"
        },
        ,
        {
            name: "reported",
            label: "Reported",
            valueEditorType: "switch"
        }
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