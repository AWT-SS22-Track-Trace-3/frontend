import React, { memo, useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoCylindricalStereographic } from 'd3-geo-projection';
import { scaleLinear } from "d3-scale";
import { useCookies } from "react-cookie";
import geo from '../util/map.json';
import axios from "axios";
import API from "../util/API";

const MapChart = ({ setTooltipContent, onClickHandler, data }) => {
    const colorScale = scaleLinear()
        .range(["#ffedea", "#ff5233"]);

    /*
useEffect(() => {
    console.log("useEffect called")
    axios({
        url: "http://localhost:8000/incidents/summary/all",
        headers: {
            Authorization: `Bearer ${cookies.access_token}`
        },
        method: "GET"
    }).then((res) => setData(res.data));
}, [])
*/

    return (
        <React.Fragment>
            <ComposableMap projection={geoCylindricalStereographic()} width={960} height={450} data-tip="">
                <Geographies geography={geo}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const cur = data.find(s => s._id === geo.properties["Alpha-2"]);
                            const incidentCount = cur ? cur.count : 0;
                            return <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onMouseEnter={() => {
                                    setTooltipContent(`${geo.properties.name}`);
                                }}
                                onMouseLeave={() => {
                                    setTooltipContent("");
                                }}
                                onClick={() => onClickHandler(geo.properties["Alpha-2"], incidentCount)}
                                fill={cur ? colorScale(incidentCount) : "#D6D6DA"}
                                style={{
                                    default: {
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
                        })
                    }
                </Geographies>
            </ComposableMap>
        </React.Fragment>
    );
}

export default memo(MapChart);