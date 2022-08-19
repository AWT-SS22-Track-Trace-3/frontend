import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import requestMaker from "../util/RequestMaker";
import requestProvider from "../util/API";

const ReportModal = (props) => {
    const [status, setStatus] = useState({
        description: "",
        type: "",
        chain_step: 0
    })

    const report = () => {

        requestMaker(requestProvider().postIncident({ ...status, product: props.product })).make().then(res => console.log(res));

        props.onHide();
    }

    const formChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setStatus({ ...status, [name]: value })
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Report Incident
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Product: {props.product}
                </p>
                <Form>
                    <Form.Group>
                        <Form.Label>Type</Form.Label>
                        <Form.Control type="text" name="type" onChange={formChange} value={status.type}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" onChange={formChange} value={status.description}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Chain Step</Form.Label>
                        <Form.Control type="number" name="chain_step" min="0" onChange={formChange} value={status.chain_step}></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => report()}>Report</Button>
                <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ReportModal;