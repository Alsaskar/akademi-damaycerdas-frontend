import { Toast, ProgressBar } from "react-bootstrap";

const ToastAlert = ({ title, message, onClose = () => {}, show, bg, progress }) => {
    return (
        <Toast onClose={onClose} show={show} delay={5000} autohide style={{ position: 'fixed', top: 20, right: 20, zIndex: 1100 }} bg={bg}>
            <Toast.Header>
                <strong className="me-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
                {message}
                <ProgressBar
                    now={progress}
                    style={{ marginTop: '10px', height: '5px' }}
                    animated
                />
            </Toast.Body>
        </Toast>
    )
}

export default ToastAlert;