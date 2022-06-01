import { React, useCallback } from "react";
import { Query, Builder, BasicConfig, BuilderProps, Utils as QbUtils } from 'react-awesome-query-builder';
import BootstrapConfig from "react-awesome-query-builder/lib/config/bootstrap";
import 'react-awesome-query-builder/lib/css/styles.css';

const ReactQueryBuilder = () => {
    const InitialConfig = BasicConfig;
    const queryValue = { "id": QbUtils.uuid(), "type": "group" };

    console.log(queryValue);

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

    /*

    var state = {
        tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
        config: config
    };

    console.log(state);

    const renderBuilder = (props) => (
        <div className="query-builder-container" style={{ padding: '10px' }}>
            <div className="query-builder">
                <Builder {...props} />
            </div>
        </div>
    );

    */

    const renderBuilder = useCallback((props: BuilderProps) => (
        <div className="query-builder-container" style={{ padding: "10px" }}>
            <div className="query-builder">
                <Builder {...props} />
            </div>
        </div>
    ), []);

    return (
        <div>
            <Query
                {...config}
                renderBuilder={renderBuilder}
                onChange={console.log("changes")}
            />
        </div>
    );
}

export default ReactQueryBuilder;