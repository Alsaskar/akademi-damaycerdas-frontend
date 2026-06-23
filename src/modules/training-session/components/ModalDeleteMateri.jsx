import { Modal, Button, Spinner } from "react-bootstrap";
import ToastAlert from "@/components/ToastAlert";
import { useToast } from "@/hooks/useToast";
import { useMateriTraining } from "../hooks/useMateri";

const ModalDeleteMateri = ({ data, show, handleClose, onSuccess }) => {
    const { showToast, message, success, progress, show: showToastMessage, hide } = useToast()
    const { loading, removeMateriTraining } = useMateriTraining()

    const _handleDelete = async () => {
        const res = await removeMateriTraining(data.id)

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
                    <Modal.Title>Hapus Materi Training</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h5 align="center">Yakin ingin hapus materi <u><i>{data?.title}</i></u> ?</h5>
                    <div align="center">Data akan terhapus secara permanen di sistem</div>

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

export default ModalDeleteMateri;