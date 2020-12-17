import React from "react";
import { Modal, Button, Alert } from "react-bootstrap";

const ModalNotice = (props) => {
  debugger;
  return (
    <div>
      <Modal
        {...props}
        show
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <Alert variant="success" className="border-0">
            <Alert.Heading>{props.header}</Alert.Heading>
            <p>{props.message}</p>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant={props.variant || "info"}>
            {props.button}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalNotice;
