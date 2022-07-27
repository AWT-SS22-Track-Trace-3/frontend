import Cookies from "js-cookie";
import React, { useState } from "react";
import { Alert } from "react-bootstrap"

const Footer = () => {
    const footerStyle = {
        height: "60px",
        position: "relative"
    }

    return (
        <div className="p-4">
            <Alert variant={Cookies.get("access_token") ? "success" : "danger"} className="m-0" style={footerStyle}>{(Cookies.get("access_token") ? "Logged in with access level " + Cookies.get("access_lvl") : "Currently not logged in!")}</Alert>
        </div>
    );
}

export default Footer;