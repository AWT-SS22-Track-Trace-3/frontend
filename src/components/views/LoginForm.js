import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import qs from 'qs';
import requestMaker from "../util/RequestMaker";
import requestProvider from "../util/API";

const LoginForm = (props) => {
    let navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        loginId: "",
        password: ""
    })

    const loginDataChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value = target.value;

        setLoginData({ ...loginData, [name]: value });
    }

    const signIn = () => {
        requestMaker(requestProvider().getToken(qs.stringify({
            username: loginData.loginId,
            password: loginData.password
        }))).make()
            .then(() => navigate("/search"));
    }

    return (
        <div>
            <h1>{props.title}</h1>
            <Form className="text-end">
                <Form.Group className="mb-3" controlId="formLoginId">
                    <Form.Control name="loginId" type="text" placeholder="Enter ID" onChange={loginDataChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLoginId">
                    <Form.Control name="password" type="password" placeholder="Password" onChange={loginDataChange} />
                </Form.Group>
            </Form>
            <Button variant="primary" type="submit" onClick={signIn} style={{ float: "right" }}>
                Login
            </Button>
        </div>
    );
}

export default LoginForm;