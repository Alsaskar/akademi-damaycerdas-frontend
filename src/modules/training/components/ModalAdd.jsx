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
    status: Yup.string().required('Status wajib dipilih')
});

const ModalAddTraining = ({ show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToast, message, success, progress, show: showToastMessage, hide } = useToast();
    const { addTraining } = useTraining()

    const _handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const payload = {
            title: values.title,
            description: values.description,
            trainer_name: values.trainer_name,
            status: values.status
        };

        const res = await addTraining(payload);

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
                    <Modal.Title>Tambahkan Training Baru </Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        trainer_name: '',
                        status: 'draft'
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

                                <Row className="g-3">
                                    <Col md={12}>
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
                                </Row>

                                <Row className="mt-3">
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
                                            </Form.Select>
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

                                {/* <hr />

                                <h6 className="fw-bold mb-2">
                                    Jadwal Training
                                </h6>

                                <Row className="g-3">

                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Tanggal Training</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="training_date"
                                                value={values.training_date}
                                                onChange={handleChange}
                                                isInvalid={
                                                    touched.training_date &&
                                                    errors.training_date
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.training_date}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Jam Mulai</Form.Label>
                                            <Form.Control
                                                type="time"
                                                name="start_time"
                                                value={values.start_time}
                                                onChange={handleChange}
                                                isInvalid={
                                                    touched.start_time &&
                                                    errors.start_time
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.start_time}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Jam Selesai</Form.Label>
                                            <Form.Control
                                                type="time"
                                                name="end_time"
                                                value={values.end_time}
                                                onChange={handleChange}
                                                isInvalid={touched.end_time && errors.end_time}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.end_time}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                </Row>

                                <hr /> */}

                                {/* <h6 className="fw-bold mb-2">
                                    Link Training
                                </h6>

                                <Row className="g-3">

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Zoom Link</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name="zoom_link"
                                                value={values.zoom_link}
                                                onChange={handleChange}
                                                placeholder="https://..."
                                                isInvalid={touched.zoom_link && errors.zoom_link}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.zoom_link}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Youtube Link</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name="youtube_link"
                                                value={values.youtube_link}
                                                onChange={handleChange}
                                                placeholder="https://..."
                                                isInvalid={touched.youtube_link && errors.youtube_link}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.youtube_link}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                </Row>

                                <hr /> */}

                                {/* <h6 className="fw-bold mb-2">
                                    Pengaturan Absensi
                                </h6>

                                <Row className="g-3">

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Buka Absensi</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="attendance_open_before"
                                                value={values.attendance_open_before}
                                                onChange={handleChange}
                                                isInvalid={touched.attendance_open_before && errors.attendance_open_before}
                                                placeholder='Kapan Absen akan dibuka'
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.attendance_open_before}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Tutup Absensi</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="attendance_close_after"
                                                value={values.attendance_close_after}
                                                onChange={handleChange}
                                                isInvalid={touched.attendance_close_after && errors.attendance_close_after}
                                                placeholder='Kapan Absen akan ditutup'
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.attendance_close_after}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                </Row> */}

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

export default ModalAddTraining;
