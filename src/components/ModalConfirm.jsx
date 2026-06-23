"use client";
import { Modal, Button } from "react-bootstrap";

const ModalConfirm = ({ show, onClose, onConfirm, title, message, description }) => {
  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}

      <Modal.Body>
        <h5 className="text-center">{message}</h5>
        <div className="text-center">{description}</div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" className="btn-sm" onClick={onClose}>
          Tidak
        </Button>
        <Button variant="danger" className="btn-sm" onClick={onConfirm}>
          Ya
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;