import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Button, Row, Col } from 'react-bootstrap';
import axios from "axios";
import API from "../util/API";
import qs from "qs";
import { useCookies } from "react-cookie";

const RegisterForm = (props) => {
    let navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["access_token, access_level"]);

    const [userData, setUserData] = useState({
        company: "",
        username: "",
        password: "",
        password_confirmed: false,
        address_street: "",
        address_number: "",
        address_zip: "",
        address_city: "",
        access_lvl: 0
    })

    const userDataChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value = target.value;

        if (name == "password-confirm") {
            setUserData({ ...userData, password_confirmed: checkPassword(value) });
        } else {
            setUserData({ ...userData, [name]: value });
        }
    }

    const checkPassword = (password) => {
        return password == userData.password;
    }

    const signUp = () => {
        for (let key in userData) {
            if (userData[key] === "") {
                return;
            }
        }

        axios({
            url: "/signup",
            baseURL: API.baseUrl,
            headers: {
                Authorization: `Bearer ${cookies.access_token}`
            },
            data: qs.stringify({
                username: "",
                password: "",
                company: "",
                address: "",
                access_lvl: 0
            })
        }).then((res) => console.log(res));
    }

    return (
        <div>
            <h1>{props.title}</h1>
            <Form className="text-start">
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Username" onChange={userDataChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control name="company" type="text" placeholder="Company Name" onChange={userDataChange} />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} xs="9">
                        <Form.Label>Street</Form.Label>
                        <Form.Control name="address_street" type="text" placeholder="Street" onChange={userDataChange}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} xs="3">
                        <Form.Label>Number</Form.Label>
                        <Form.Control name="address_number" type="text" placeholder="No." onChange={userDataChange}></Form.Control>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} xs="6">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control name="address_zip" type="text" placeholder="Zip Code" onChange={userDataChange}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} xs="6">
                        <Form.Label>City</Form.Label>
                        <Form.Control name="address_city" type="text" placeholder="City" onChange={userDataChange}></Form.Control>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>User Type</Form.Label>
                    <Form.Select name="type" value={userData.type} onChange={userDataChange}>
                        <option value="2">Manufacturer</option>
                        <option value="0">Wholesaler/Repackager</option>
                        <option value="1">Dispenser</option>
                        <option value="3">Authority</option>
                    </Form.Select>
                </Form.Group>
                <div className="divider-horizontal my-4"></div>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" onChange={userDataChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control name="password-confirm" type="password" placeholder="Confirm Password" onChange={userDataChange} />
                    <Form.Text>Passwords {(userData.password_confirmed ? "" : "do not")} match!</Form.Text>
                </Form.Group>
            </Form>
            <Button variant="primary" type="submit" onClick={signUp} style={{ float: "right" }}>
                Register
            </Button>
        </div>
    );
}

export default RegisterForm;