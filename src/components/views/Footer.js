import React, { useState } from "react";
import { Alert } from "react-bootstrap"
import { useCookies } from "react-cookie";

const Footer = () => {
    const footerStyle = {
        height: "60px",
        position: "relative"
    }

    const [cookies, setCookie] = useCookies(["access_token", "access_level"]);

    return (
        <div className="p-4">
            <Alert variant={cookies.access_token ? "success" : "danger"} className="m-0" style={footerStyle}>{(cookies.access_token ? "Logged in with access level " + cookies.access_level : "Currently not logged in!")}</Alert>
        </div>
    );
}

export default Footer;