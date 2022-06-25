import React from "react";
import { Image } from "react-bootstrap";
import manufacturer from "../../img/manufacturer.png";

const TimelineIcon = (props) => {
    return (
        <Image src={require("../../img/" + props.type + ".png")} roundedCircle={true}></Image>
    );
}

export default TimelineIcon;