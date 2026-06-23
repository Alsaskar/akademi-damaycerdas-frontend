import { Modal, Button, Col, Row, Form } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import ToastAlert from '@/components/ToastAlert';
import { useToast } from '@/hooks/useToast';
import { useLibraryCategory } from '../hooks/useCategory';

export const validationSchema = Yup.object({
    nama_kategori: Yup.string().required('Kategori wajib diisi'),
});

const ModalEditCategory = ({ data, show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToast, message, success, progress, show: showToastMessage, hide } = useToast();

    const { editLibraryCategory } = useLibraryCategory();

    const _handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const payload = {
            nama_kategori: values.nama_kategori,
        };

        const res = await editLibraryCategory(data.id, payload);

        showToastMessage(res.message, res.success);

        if (res.success) {
            resetForm();
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
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Kategori </Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        nama_kategori: data?.nama_kategori || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={_handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <Modal.Body>

                                <Form.Group>
                                    <Form.Label>Kategori</Form.Label>
                                    <Form.Control
                                        name="nama_kategori"
                                        value={values.nama_kategori}
                                        onChange={handleChange}
                                        isInvalid={touched.nama_kategori && errors.nama_kategori}
                                        placeholder='Masukkan Kategori Baru'
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nama_kategori}
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

export default ModalEditCategory;
