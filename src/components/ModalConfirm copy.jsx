import { Modal, Button } from 'react-bootstrap';

const ModalConfirm = ({
  show,
  onClose,
  onConfirm,
  title,
  message,
  description,
}) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      className="modal-custom"
      backdrop="static"
    >
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
        <Button variant="danger" onClick={onConfirm}>
          Ya
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Tidak
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
