import { Modal, Button, Col, Row, Form } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import ToastAlert from '@/components/ToastAlert';
import { useToast } from '@/hooks/useToast';
import { useMember } from '../hooks/useMember';
import { useEffect, useState } from 'react';

export const validationSchema = Yup.object({
    photo: Yup.mixed()
        .required('Foto profil wajib diupload'),
});

const ModalUploadFotoProfil = ({ memberId, show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToast, message, success, progress, show: showToastMessage, hide } = useToast();
    const { uploadFotoProfil } = useMember();

    const [preview, setPreview] = useState(null);

    const _handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append('photo', values.photo);

        const res = await uploadFotoProfil(memberId, formData);

        showToastMessage(res.message, res.success);

        if (res.success) {
            resetForm();
            onSuccess();
            handleClose();
        }

        setSubmitting(false);
    };

    useEffect(() => {
        if (!show) {
            setPreview(null);
        }
    }, [show]);

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
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Foto Anda {memberId}</Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        photo: null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={_handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Modal.Body>

                                {preview ? (
                                    <div className="text-center mb-4">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="rounded-circle border shadow-sm"
                                            style={{
                                                width: '160px',
                                                height: '160px',
                                                objectFit: 'cover'
                                            }}
                                        />

                                        <div className="text-muted mt-2 small">
                                            Preview Foto Profil
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="border rounded text-center p-4 mb-4"
                                        style={{
                                            borderStyle: 'dashed',
                                            background: '#f8f9fa'
                                        }}
                                    >
                                        <i
                                            className="bi bi-image"
                                            style={{
                                                fontSize: '40px',
                                                color: '#6c757d'
                                            }}
                                        />

                                        <div className="text-muted mt-2">
                                            Belum ada foto dipilih
                                        </div>
                                    </div>
                                )}

                                <Form.Group className='mt-1'>
                                    <Form.Label>Upload Foto Profil</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setFieldValue("photo", file);
                                                setPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                        isInvalid={touched.photo && errors.photo}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.photo}
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Modal.Body>

                            <Modal.Footer>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? 'Menyimpan...'
                                        : 'Upload'}
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

export default ModalUploadFotoProfil;
