import { Modal, Button, Spinner } from "react-bootstrap";
import ToastAlert from "@/components/ToastAlert";
import { useToast } from "@/hooks/useToast";
import { useTraining } from "../hooks/useTraining";

const ModalLeaveParticipant = ({ data, show, handleClose, onSuccess }) => {
    const { showToast, message, success, progress, show: showToastMessage, hide } = useToast()
    const { loading, leaveParticipantTraining } = useTraining()

    const _handleDelete = async () => {
        const trainingId = data.trainingId;
        const memberId = data.memberId

        const res = await leaveParticipantTraining(trainingId, memberId)

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
                    <Modal.Title>Keluarkan Participant</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h5 align="center">Yakin ingin keluarkan <u><i>{data?.member?.user?.firstname} {data?.member?.user?.lastname}</i></u> ?</h5>
                    <div align="center">Anda akan mengeluarkan <b>{data?.member?.user?.firstname} {data?.member?.user?.lastname}</b> keluar dari training ini</div>

                </Modal.Body>
                <Modal.Footer>
                    {loading ?
                        <Button variant="danger" type="button" size="sm" disabled>
                            <Spinner animation="border" size="sm" />
                        </Button>
                        : <Button variant="danger" type="submit" size="sm" onClick={_handleDelete}>Ya, Keluarkan</Button>}
                        
                    <Button variant="secondary" size="sm" onClick={handleClose}>Tidak</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default ModalLeaveParticipant;