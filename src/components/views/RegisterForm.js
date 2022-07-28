import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Button, Row, Col } from 'react-bootstrap';
import { getNames, getCode } from "country-list";
import requestMaker from "../util/RequestMaker";
import requestProvider from "../util/API";

const RegisterForm = (props) => {
    const [userData, setUserData] = useState({
        company: "",
        username: "",
        password: "",
        password_confirmed: false,
        address: {
            street: "",
            number: "",
            zip: "",
            city: "",
            country: "DE",
        },
        country: "DE",
        type: ""
    })

    const userDataChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value = target.value;

        if (name === "password-confirm") {
            setUserData({ ...userData, password_confirmed: checkPassword(value) });
        } else if (name === "company") {
            setUserData({ ...userData, company: value, username: generateUsername(value) });
        } else if (name.split("_").length === 2) {
            let split = name.split("_");
            let split_post = split[1];

            setUserData({ ...userData, address: { ...userData.address, [split_post]: value } });
        } else {
            setUserData({ ...userData, [name]: value });
        }
    }

    const generateUsername = (company = "") => company.toLowerCase().replaceAll(" ", "_");

    const checkPassword = (password) => {
        return password === userData.password;
    }

    const signUp = () => {
        for (let key in userData) {
            if (userData[key] === "") return;
        }

        if (!userData.password_confirmed) return;

        let body = {
            username: userData.username,
            password: userData.password,
            company: userData.company,
            address: { ...userData.address, zip_code: userData.address.zip },
            country: userData.country,
            type: userData.type
        }

        requestMaker(requestProvider().createUser(body)).make();
    }

    return (
        <div>
            <h1>{props.title}</h1>
            <Form className="text-start">
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Username" disabled value={userData.username} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control name="company" type="text" placeholder="Company Name" onChange={userDataChange} />
                </Form.Group>
                <Row>
                    <Form.Group as={Col} xs={8}>
                        <Form.Label>Street</Form.Label>
                        <Form.Control name="address_street" type="text" placeholder="Address" onChange={userDataChange}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} xs={4}>
                        <Form.Label>Number</Form.Label>
                        <Form.Control name="address_number" type="text" placeholder="Number" onChange={userDataChange}></Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control name="address_zip" type="text" placeholder="Zip Code" onChange={userDataChange}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>City</Form.Label>
                        <Form.Control name="address_city" type="text" placeholder="City" onChange={userDataChange}></Form.Control>
                    </Form.Group>
                </Row>
                <Form.Group>
                    <Form.Label>Country</Form.Label>
                    <Form.Select name="address_country" value={userData.address.country} onChange={userDataChange}>
                        {getNames().sort().map((item, index) =>
                            <option value={getCode(item)} key={index}>{item}</option>
                        )}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>User Type</Form.Label>
                    <Form.Select name="type" value={userData.type} onChange={userDataChange}>
                        <option value="manufacturer">Manufacturer</option>
                        <option value="wholesaler">Wholesaler</option>
                        <option value="repackager">Repackager</option>
                        <option value="dispenser">Dispenser</option>
                        <option value="authority">Authority</option>
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