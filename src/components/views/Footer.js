import React, { useState } from "react";
import { Alert } from "react-bootstrap"

const Footer = () => {
    const footerStyle = {
        height: "60px",
        position: "relative"
    }

    const [session, setSession] = useState({
        status: false,
        userId: ""
    });

    const setSessionStatus = (status) => {
        setSession({ status });
    }

    return (
        <div className="p-4">
            <Alert variant={session.status ? "success" : "danger"} className="m-0" style={footerStyle}>Currently not logged in!</Alert>
        </div>
    );
}

export default Footer;