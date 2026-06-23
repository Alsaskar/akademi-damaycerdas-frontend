import { Modal, Button, Col, Row, Form } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import ToastAlert from '@/components/ToastAlert';
import { useToast } from '@/hooks/useToast';
import { useTraining } from '../hooks/useTraining';

export const validationSchema = Yup.object({
    title: Yup.string().required('Judul training wajib diisi'),
    description: Yup.string().required('Deskripsi training wajib diisi'),
    trainer_name: Yup.string().required('Nama trainer wajib diisi'),
});

const ModalEditTraining = ({ data, show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToast, message, success, progress, show: showToastMessage, hide } = useToast();
    const { editTraining } = useTraining()

    const _handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const payload = {
            title: values.title,
            description: values.description,
            trainer_name: values.trainer_name,
        };

        const res = await editTraining(data.id, payload);

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
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Data Training </Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        title: data.title,
                        description: data.description,
                        trainer_name: data.trainer_name,
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

                                <Row className="2">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Judul Training</Form.Label>
                                            <Form.Control
                                                name="title"
                                                value={values.title}
                                                onChange={handleChange}
                                                isInvalid={touched.title && errors.title}
                                                placeholder="Masukkan Judul Training"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.title}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Trainer</Form.Label>
                                            <Form.Control
                                                name="trainer_name"
                                                value={values.trainer_name}
                                                onChange={handleChange}
                                                isInvalid={touched.trainer_name && errors.trainer_name}
                                                placeholder="Nama Trainer"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.trainer_name}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mt-3">
                                    <Form.Label>Deskripsi</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        isInvalid={touched.description && errors.description}
                                        placeholder="Masukkan Deskripsi Training"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
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

export default ModalEditTraining;
