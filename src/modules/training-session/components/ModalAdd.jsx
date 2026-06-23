import { Modal, Button, Col, Row, Form } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import ToastAlert from '@/components/ToastAlert';
import { useToast } from '@/hooks/useToast';
import { useSessionTraining } from '../hooks/useSession';

export const validationSchema = Yup.object({
    judul: Yup.string().required('Judul wajib diisi'),
    session_date: Yup.string().required('Tanggal training wajib diisi'),
    start_time: Yup.string().required('Jam mulai wajib diisi'),
    end_time: Yup.string().required('Jam selesai wajib diisi'),
    zoom_link: Yup.string().required('Zoom link wajib diisi').url('Format URL tidak valid'),
    youtube_link: Yup.string().nullable().url('Format URL tidak valid'),
    attendance_open_before: Yup.number().typeError('Harus berupa angka').required('Wajib diisi').integer('Harus berupa angka bulat').min(0, 'Minimal 0').max(120, 'Maksimal 120 menit'),
    attendance_close_after: Yup.number().typeError('Harus berupa angka').required('Wajib diisi').integer('Harus berupa angka bulat').min(0, 'Minimal 0').max(120, 'Maksimal 120 menit'),
    zoom_id: Yup.string().required('Zoom ID wajib diisi'),
    zoom_passcode: Yup.string().required('Zoom Passcode wajib diisi'),
    order_number: Yup.string().required('Urutan Sesi wajib diisi'),
});

const ModalAddSession = ({ trainingId, show, handleClose = () => { }, onSuccess = () => { } }) => {
    const { showToast, message, success, progress, show: showToastMessage, hide } = useToast();
    const { addSession } = useSessionTraining()

    const _handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const payload = {
            judul: values.judul,
            trainingId: trainingId,
            session_date: values.session_date,
            start_time: values.start_time,
            end_time: values.end_time,
            zoom_link: values.zoom_link,
            youtube_link: values.youtube_link,
            attendance_open_before: values.attendance_open_before,
            attendance_close_after: values.attendance_close_after,
            zoom_id: values.zoom_id,
            zoom_passcode: values.zoom_passcode,
            order_number: values.order_number,
        };

        const res = await addSession(payload);
        
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
                    <Modal.Title>Tambah Sesi Baru</Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        judul: '',
                        session_date: '',
                        start_time: '',
                        end_time: '',
                        zoom_link: '',
                        youtube_link: '',
                        attendance_open_before: '',
                        attendance_close_after: '',
                        zoom_id: '',
                        zoom_passcode: '',
                        order_number: '',
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
                                            <Form.Label>Judul Sesi</Form.Label>
                                            <Form.Control
                                                name="judul"
                                                value={values.judul}
                                                onChange={handleChange}
                                                isInvalid={touched.judul && errors.judul}
                                                placeholder="Masukkan Judul Sesi"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.judul}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="g-3 mt-1">

                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Tanggal Sesi</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="session_date"
                                                value={values.session_date}
                                                onChange={handleChange}
                                                isInvalid={
                                                    touched.session_date &&
                                                    errors.session_date
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.session_date}
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

                                <Row className="g-3 mt-1">

                                    <Col md={4}>
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

                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Zoom ID</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name="zoom_id"
                                                value={values.zoom_id}
                                                onChange={handleChange}
                                                placeholder="Zoom ID"
                                                isInvalid={touched.zoom_id && errors.zoom_id}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.zoom_id}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Zoom Passcode</Form.Label>
                                            <Form.Control
                                                type='text'
                                                name="zoom_passcode"
                                                value={values.zoom_passcode}
                                                onChange={handleChange}
                                                placeholder="Zoom Passcode"
                                                isInvalid={touched.zoom_passcode && errors.zoom_passcode}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.zoom_passcode}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                </Row>

                                <Form.Group className='mt-3'>
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

                                <Row className="g-3 mt-1">

                                    <Col md={4}>
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

                                    <Col md={4}>
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

                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Urutan Sesi</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="order_number"
                                                value={values.order_number}
                                                onChange={handleChange}
                                                isInvalid={touched.order_number && errors.order_number}
                                                placeholder='Nomor Urut Sesi'
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.order_number}
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

export default ModalAddSession;
