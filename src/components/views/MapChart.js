import React, { memo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCylindricalStereographic } from 'd3-geo-projection';
import geo from '../util/map.json';

const MapChart = ({ setTooltipContent }) => {
    return (
        <React.Fragment>
            <ComposableMap projection={geoCylindricalStereographic()} width={960} height={500} data-tip="">
                <Geographies geography={geo}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onMouseEnter={() => {
                                    setTooltipContent(`${geo.properties.name}`);
                                }}
                                onMouseLeave={() => {
                                    setTooltipContent("");
                                }}
                                style={{
                                    default: {
                                        fill: "#D6D6DA",
                                        outline: "none"
                                    },
                                    hover: {
                                        fill: "#F53",
                                        outline: "none"
                                    },
                                    pressed: {
                                        fill: "#E42",
                                        outline: "none"
                                    }
                                }} />
                        ))
                    }
                </Geographies>
            </ComposableMap>
        </React.Fragment>
    );
}

export default memo(MapChart);