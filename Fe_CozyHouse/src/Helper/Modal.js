import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalNotice = (props) => {
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
        <Modal.Body className="text-center">{props.message}</Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="info">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalNotice;
