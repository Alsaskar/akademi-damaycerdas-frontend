import { Modal, Button, Col, Row, Form } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import ToastAlert from '@/components/ToastAlert';
import { useToast } from '@/hooks/useToast';
import { useRef } from 'react';
import { useMateriTraining } from '../hooks/useMateri';

const ALLOWED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
];

export const validationSchema = Yup.object({
    title: Yup.string()
        .required("Judul materi wajib diisi"),

    file: Yup.mixed()
        .required("File materi wajib dipilih")
        .test(
            "fileSize",
            "Ukuran file maksimal 20 MB",
            value => {
                if (!value) return true;
                return value.size <= 20 * 1024 * 1024;
            }
        )
        .test(
            "fileFormat",
            "Format file harus PDF, DOC, DOCX, PPT atau PPTX",
            value => !value || ALLOWED_FILE_TYPES.includes(value.type)
        )
});

const ModalAddMateri = ({ trainingSessionId, show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToast, message, success, progress, show: showToastMessage, hide } = useToast();
    const { addMateriTraining } = useMateriTraining()
    const fileInputRef = useRef(null);

    const _handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();

        formData.append("trainingSessionId", trainingSessionId);
        formData.append("title", values.title);
        formData.append("file", values.file);

        const res = await addMateriTraining(formData);

        showToastMessage(res.message, res.success);

        if (res.success) {
            resetForm();

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            onSuccess();
            handleClose();
        }

        setSubmitting(false);
    };

    return (
        <>
            <ToastAlert
                title={success ? 'Success!' : 'Oops...'}
                message={message}
                onClose={hide}
                show={showToast}
                bg={success ? 'success' : 'danger'}
                progress={progress}
            />

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tambahkan Materi </Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        title: '',
                        file: null
                    }}
                    validationSchema={validationSchema}
                    onSubmit={_handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (

                        <form onSubmit={handleSubmit}>
                            <Modal.Body>

                                <Row className="g-3">
                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label>
                                                Judul Materi
                                            </Form.Label>

                                            <Form.Control
                                                name="title"
                                                value={values.title}
                                                onChange={handleChange}
                                                isInvalid={touched.title && errors.title}
                                                placeholder="Contoh: Slide Presentasi Facebook Ads"
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {errors.title}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label>
                                                File Materi
                                            </Form.Label>

                                            <Form.Control
                                                ref={fileInputRef}
                                                type="file"
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        "file",
                                                        e.currentTarget.files[0]
                                                    );
                                                }}
                                                isInvalid={touched.file && errors.file}
                                            />

                                            <Form.Text muted>
                                                Format yang didukung:
                                                PDF, DOC, DOCX, PPT, PPTX
                                            </Form.Text>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.file}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                            </Modal.Body>

                            <Modal.Footer>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? 'Menyimpan...'
                                        : 'Simpan'}
                                </Button>

                                <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                >
                                    Batal
                                </Button>
                            </Modal.Footer>
                        </form>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

export default ModalAddMateri;
