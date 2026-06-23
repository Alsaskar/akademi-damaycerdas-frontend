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

    file: Yup.mixed()
        .required("File dokumen wajib dipilih")
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

const ModalAddLibrary = ({ show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToast, message, success, progress, show: showToastMessage, hide } = useToast();
    const { addLibrary } = useLibrary()
    const { fetchLibraryCategory } = useLibraryCategory()
    const [categories, setCategories] = useState([])
    const fileInputRef = useRef(null);

    const _handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("categoryId", values.categoryId);
        formData.append("status", values.status);
        formData.append("file", values.file);

        const res = await addLibrary(formData);

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
                    <Modal.Title>Tambahkan Dokumen </Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        categoryId: '',
                        status: 'draft',
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

                                    <Col md={12}>
                                        <Form.Group>
                                            <Form.Label>File Dokumen</Form.Label>

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
                                            <Form.Text muted>Format yang didukung: PDF, DOC, DOCX, PPT, PPTX. Maksimal 20 MB.</Form.Text>

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

export default ModalAddLibrary;
