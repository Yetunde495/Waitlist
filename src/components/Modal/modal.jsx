import React from "react";
import { useState } from "react";
import { Container, Modal } from "react-bootstrap";
import "./modal.css";

export function DisplayModal({ children, onclose }) {
  const [show, setShow] = useState(true);
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
        onclose();
      }}
      centered
      dialogClassName="modal-w7"
      className="modal"
    >
      <Modal.Header closeButton>
        <p className="m-header">Get a Lovly App Link</p>
      </Modal.Header>
      <Modal.Body>
        <div>{children}</div>
      </Modal.Body>
    </Modal>
  );
}
