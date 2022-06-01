import React from "react";
import BootstrapConfig from "react-awesome-query-builder/lib/config/bootstrap";
import 'react-awesome-query-builder/lib/css/styles.css';
import { Query, Builder, BasicConfig, Utils as QbUtils } from 'react-awesome-query-builder';

const ReactQueryBuilder = () => {
    const InitialConfig = BootstrapConfig;
    const queryValue = { "id": QbUtils.uuid(), "type": "group" };

    var state = {
        tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
        config: config
    };

    const config = {
        ...InitialConfig,
        fields: {
            qty: {
                label: 'Qty',
                type: 'number',
                fieldSettings: {
                    min: 0,
                },
                valueSources: ['value'],
                preferWidgets: ['number'],
            },
            price: {
                label: 'Price',
                type: 'number',
                valueSources: ['value'],
                fieldSettings: {
                    min: 10,
                    max: 100,
                },
                preferWidgets: ['slider', 'rangeslider'],
            }
        }
    }

    var renderBuilder = (props) => {
        return (
            <div className="query-builder-container" style={{ padding: '10px' }}>
                <div className="query-builder">
                    <Builder {...props} />
                </div>
            </div>
        )
    };

    return (
        <div>
            <Query
                {...config}
                value={this.state.tree}
                onChange={console.log("changes")}
                renderBuilder={renderBuilder}
            ></Query>
        </div>
    );
}

export default ReactQueryBuilder;