import React, { useState } from "react";
import { Alert } from "react-bootstrap"

const Footer = () => {
    const footerStyle = {
        height: "60px",
        position: "absolute",
        bottom: "0px",
        right: "0px"
    }

    const [session, setSession] = useState({
        status: false,
        userId: ""
    });

    const setSessionStatus = (status) => {
        setSession({ status });
    }

    return (
        <Alert variant={session.status ? "success" : "danger"} className="m-4" style={footerStyle}>Currently not logged in!</Alert>
    );
}

export default Footer;