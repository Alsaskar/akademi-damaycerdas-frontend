import { Modal, Button, Spinner } from "react-bootstrap";
import ToastAlert from "@/components/ToastAlert";
import { useToast } from "@/hooks/useToast";
import { useTraining } from "../hooks/useTraining";

const ModalJoinTraining = ({ data, show, handleClose, onSuccess }) => {
    const { showToast, message, success, progress, show: showToastMessage, hide } = useToast()
    const { loading, joinMemberTraining } = useTraining()

    const _handleJoin = async () => {
        const res = await joinMemberTraining({
            trainingId: data.id
        })

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
                    <Modal.Title>Join Training</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h5 align="center">Anda yakin ingin join di training <u><i>{data?.title}</i></u> ?</h5>
                    <div align="center">Join Zoom, Akses Rekaman, Download Materi dengan melakukan join terhadap training tersebut</div>

                </Modal.Body>
                <Modal.Footer>
                    {loading ?
                        <Button variant="primary" type="button" size="sm" disabled>
                            <Spinner animation="border" size="sm" />
                        </Button>
                        : <Button variant="primary" type="submit" size="sm" onClick={_handleJoin}>Join Training</Button>}
                        
                    <Button variant="secondary" size="sm" onClick={handleClose}>Tidak</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default ModalJoinTraining;