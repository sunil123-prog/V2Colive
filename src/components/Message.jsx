import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastMessage = ({ show, onClose, message, variant }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast bg={variant} onClose={onClose} show={show} delay={3000} autohide>
        <Toast.Body className="text-white fw-bold">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
