import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { Button, Row, Col } from 'react-bootstrap';

const RegisterForm = (props) => {
    let navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: "",
        address_street: "",
        address_number: "",
        address_zip: "",
        address_city: "",
        type: "manufacturer"
    })

    const userDataChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value = target.value;

        setUserData({ ...userData, [name]: value });
    }

    const signUp = () => {
        console.log(userData.loginId);
        navigate("/search");
    }

    return (
        <div>
            <h1>{props.title}</h1>
            <Form className="text-end">
                <Form.Group className="mb-3" controlId="formLoginId">
                    <Form.Control name="name" type="text" placeholder="Company Name" onChange={userDataChange} />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} xs="9">
                        <Form.Control name="address_street" type="text" placeholder="Street" onChange={userDataChange}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} xs="3">
                        <Form.Control name="address_number" type="text" placeholder="No." onChange={userDataChange}></Form.Control>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} xs="6">
                        <Form.Control name="address_zip" type="text" placeholder="Zip Code" onChange={userDataChange}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} xs="6">
                        <Form.Control name="address_city" type="text" placeholder="City" onChange={userDataChange}></Form.Control>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formLoginId">
                    <Form.Select name="type" value={userData.type} onChange={userDataChange}>
                        <option value="manufacturer">Manufacturer</option>
                        <option value="wholesaler">Wholesaler</option>
                        <option value="repackager">Repackager</option>
                        <option value="dispenser">Dispenser</option>
                        <option value="authority">Authority</option>
                    </Form.Select>
                </Form.Group>
            </Form>
            <Button variant="primary" type="submit" onClick={signUp} style={{ float: "right" }}>
                Register
            </Button>
        </div>
    );
}

export default RegisterForm;