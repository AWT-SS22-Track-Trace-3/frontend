import React from "react";
import { Form, Modal, Button } from "react-bootstrap";

const ReportModal = (props) => {
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
                        <Form.Control type="text" name="type"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="type"></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ReportModal;