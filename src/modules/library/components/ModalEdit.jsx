import { Modal, Button, Col, Row, Form } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import ToastAlert from '@/components/ToastAlert';
import { useToast } from '@/hooks/useToast';
import { useEffect, useRef, useState } from 'react';
import { useLibrary } from '../hooks/useLibrary';
import { useLibraryCategory } from '../hooks/useCategory';

const ALLOWED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
];

export const validationSchema = Yup.object({
    title: Yup.string()
        .required("Judul dokumen wajib diisi"),

    description: Yup.string()
        .required("Deskripsi wajib diisi"),

    categoryId: Yup.string()
        .required("Kategori wajib dipilih"),

    status: Yup.string()
        .required("Status wajib dipilih"),
});

const ModalEditLibrary = ({ data, show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToast, message, success, progress, show: showToastMessage, hide } = useToast();
    const { editLibrary } = useLibrary()
    const { fetchLibraryCategory } = useLibraryCategory()
    const [categories, setCategories] = useState([])
    const fileInputRef = useRef(null);

    const _handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();

        const payload = {
            title: values.title,
            description: values.description,
            categoryId: values.categoryId,
            status: values.status
        }

        const res = await editLibrary(data.id, payload);

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

    const _fetchData = async () => {
        const res = await fetchLibraryCategory();

        if (res) {
            setCategories(res.data)
        }
    }

    useEffect(() => {
        if (show) {
            _fetchData()
        }
    }, [show])

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
                    <Modal.Title>Edit Dokumen </Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        title: data.title || "",
                        description: data.description || "",
                        categoryId: data.categoryId || "",
                        status: data.status || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={_handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (

                        <form onSubmit={handleSubmit}>
                            <Modal.Body>

                                <div className='alert alert-warning'>Anda hanya bisa mengedit informasi dokumen saja</div>

                                <Row className="g-3">

                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label>Judul Dokumen</Form.Label>

                                            <Form.Control
                                                name="title"
                                                value={values.title}
                                                onChange={handleChange}
                                                isInvalid={touched.title && errors.title}
                                                placeholder="Masukkan Judul Dokumen"
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {errors.title}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label>Deskripsi</Form.Label>

                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                name="description"
                                                value={values.description}
                                                onChange={handleChange}
                                                isInvalid={touched.description && errors.description}
                                                placeholder="Masukkan deskripsi dokumen"
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                {errors.description}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Kategori</Form.Label>

                                            <Form.Select
                                                name="categoryId"
                                                value={values.categoryId}
                                                onChange={handleChange}
                                                isInvalid={touched.categoryId && errors.categoryId}
                                            >
                                                <option value="">Pilih Kategori</option>

                                                {categories.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.nama_kategori}
                                                    </option>
                                                ))}
                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.categoryId}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Status</Form.Label>

                                            <Form.Select
                                                name="status"
                                                value={values.status}
                                                onChange={handleChange}
                                                isInvalid={touched.status && errors.status}
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="published">Published</option>
                                                <option value="archived">Archived</option>
                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                {errors.status}
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

export default ModalEditLibrary;
