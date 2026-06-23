import { Modal, Button, Col, Row, Form } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from 'yup'
import ToastAlert from '@/components/ToastAlert';
import { useToast } from '@/hooks/useToast';
import { useMember } from '../hooks/useMember';

export const validationSchema = Yup.object({

    firstname: Yup.string()
        .required('Nama depan wajib diisi'),

    lastname: Yup.string()
        .required('Nama belakang wajib diisi'),

    username: Yup.string()
        .required('Username wajib diisi')
        .min(4, 'Username minimal 4 karakter'),

    email: Yup.string()
        .email('Format email tidak valid')
        .required('Email wajib diisi'),

    username: Yup.string()
        .required('KKD wajib diisi'),

    password: Yup.string()
        .required('Password wajib diisi')
        .min(6, 'Password minimal 6 karakter'),

    c_password: Yup.string()
        .required('Konfirmasi password wajib diisi')
        .oneOf(
            [Yup.ref('password')],
            'Konfirmasi password tidak sesuai'
        ),

    phone: Yup.string()
        .required('Nomor HP wajib diisi')
        .matches(/^62\d+$/, 'Nomor HP harus diawali 62'),

    address: Yup.string()
        .required('Alamat wajib diisi'),
});

const ModalAddMember = ({
    show,
    handleClose = () => { },
    onSuccess = () => { }
}) => {

    const {
        showToast,
        message,
        success,
        progress,
        show: showToastMessage,
        hide,
    } = useToast();

    const { addMember } = useMember();

    const _handleSubmit = async (
        values,
        { setSubmitting, resetForm }
    ) => {

        const payload = {
            firstname: values.firstname,
            lastname: values.lastname,
            username: values.username,
            email: values.email,
            kkd: values.kkd,
            password: values.password,

            phone: values.phone,
            address: values.address,
        };

        const res = await addMember(payload);

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
                    <Modal.Title>Daftarkan Member Baru </Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        username: '',
                        email: '',
                        kkd: '',
                        password: '',
                        c_password: '',
                        phone: '',
                        address: ''
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
                                    <Col md={6}>
                                        <Form.Group className='mb-2'>
                                            <Form.Label>Nama Depan</Form.Label>
                                            <Form.Control
                                                name="firstname"
                                                value={values.firstname}
                                                onChange={handleChange}
                                                isInvalid={touched.firstname && errors.firstname}
                                                placeholder='Masukkan Nama Depan'
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.firstname}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className='mb-2'>
                                            <Form.Label>Nama Belakang</Form.Label>
                                            <Form.Control
                                                name="lastname"
                                                value={values.lastname}
                                                onChange={handleChange}
                                                isInvalid={touched.lastname && errors.lastname}
                                                placeholder='Masukkan Nama Belakang'
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.lastname}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='mt-1'>
                                    <Col md={6}>
                                        <Form.Group className='mb-2'>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                name="username"
                                                value={values.username}
                                                onChange={handleChange}
                                                isInvalid={touched.username && errors.username}
                                                placeholder='Masukkan Username'
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.username}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className='mb-2'>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                isInvalid={touched.email && errors.email}
                                                placeholder='Masukkan Email'
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='mt-1'>
                                    <Col md={6}>
                                        <Form.Group className='mb-2'>
                                            <Form.Label>KKD</Form.Label>
                                            <Form.Control
                                                type="kkd"
                                                name="kkd"
                                                value={values.kkd}
                                                onChange={handleChange}
                                                isInvalid={touched.kkd && errors.kkd}
                                                placeholder='Masukkan KKD'
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.kkd}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className='mb-2'>
                                            <Form.Label>No HP</Form.Label>
                                            <Form.Control
                                                name="phone"
                                                value={values.phone}
                                                onChange={(e) => {
                                                    let value = e.target.value.replace(/\D/g, '');

                                                    if (!value.startsWith('62')) {
                                                        value = '62' + value.replace(/^0+/, '');
                                                    }

                                                    setFieldValue('phone', value);
                                                }}
                                                isInvalid={touched.phone && errors.phone}
                                                placeholder='Masukkan Nomor HP'
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.phone}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className='mt-1'>
                                    <Col md={6}>
                                        <Form.Group className='mb-2'>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                isInvalid={touched.password && errors.password}
                                                placeholder='Masukkan Password'
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className='mb-2'>
                                            <Form.Label>Konfirmasi Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="c_password"
                                                value={values.c_password}
                                                onChange={handleChange}
                                                isInvalid={touched.c_password && errors.c_password}
                                                placeholder='Konfirmasi Password'
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.c_password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className='mt-1'>
                                    <Form.Label>Alamat</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="address"
                                        value={values.address}
                                        onChange={handleChange}
                                        isInvalid={touched.address && errors.address}
                                        placeholder='Masukkan Alamat'
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.address}
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

export default ModalAddMember;
