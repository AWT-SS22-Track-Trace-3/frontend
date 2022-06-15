import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

const LoginForm = (props) => {
    let navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        loginId: ""
    })

    const loginDataChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value = target.value;

        setLoginData({ ...loginData, [name]: value });
    }

    const signIn = () => {
        console.log(loginData.loginId);
        navigate("/search");
    }

    return (
        <div>
            <h1>{props.title}</h1>
            <Form className="text-end">
                <Form.Group className="mb-3" controlId="formLoginId">
                    <Form.Control name="loginId" type="text" placeholder="Enter ID" onChange={loginDataChange} />
                </Form.Group>
            </Form>
            <Button variant="primary" type="submit" onClick={signIn} style={{ float: "right" }}>
                Login
            </Button>
        </div>
    );
}

export default LoginForm;