import { Modal, Button, Spinner } from "react-bootstrap";
import ToastAlert from "@/components/ToastAlert";
import { useToast } from "@/hooks/useToast";
import { useAttendance } from "../hooks/useAttendance";

const ModalConfirmAttendance = ({ sessionId, show, handleClose, onSuccess }) => {
    const { showToast, message, success, progress, show: showToastMessage, hide } = useToast()
    const { loading, addAttendance } = useAttendance()

    const _handleDelete = async () => {
        const res = await addAttendance(sessionId)

        showToastMessage(res.message, res.success)

        if (res.success) {
            onSuccess();
            handleClose();
        }
    }

    return (
        <>
            <ToastAlert
                title={success ? 'Success!' : 'Oppss...'}
                message={message}
                onClose={hide}
                show={showToast}
                bg={success ? 'success' : 'danger'}
                progress={progress}
            />

            <Modal show={show} onHide={handleClose} backdrop="static">

                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi Absen</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h5 align="center">Anda yakin ingin hadir di sesi ini ?</h5>
                    <div align="center">Anda akan melakukan absensi pada sesi ini</div>

                </Modal.Body>
                <Modal.Footer>
                    {loading ?
                        <Button variant="danger" type="button" size="sm" disabled>
                            <Spinner animation="border" size="sm" />
                        </Button>
                        : <Button variant="danger" type="submit" size="sm" onClick={_handleDelete}>Ya</Button>}
                        
                    <Button variant="secondary" size="sm" onClick={handleClose}>Tidak</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default ModalConfirmAttendance;