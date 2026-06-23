import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form, Spinner } from 'react-bootstrap';
import ToastAlert from '@/components/ToastAlert';
import { useToast } from '@/hooks/useToast';
import { useState } from 'react';
import { useUser } from '@/modules/user/hooks/useUser';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    oldPass: Yup.string().required('Password lama wajib diisi'),
    newPass: Yup.string().min(8, 'Minimal 8 karakter').required('Password baru wajib diisi'),
    confirm_new_pass: Yup.string()
        .oneOf(
            [Yup.ref('newPass')],
            'Konfirmasi password tidak sesuai'
        )
        .required('Konfirmasi password wajib diisi'),
});

const Layout = () => {
    const { changePassword } = useUser()
    const navigate = useNavigate()
    const { showToast, message, success, progress, show: showToastMessage, hide } = useToast()
    const [loading, setLoading] = useState(false);

    const _handleSubmit = async (values, { resetForm }) => {
        try {
            setLoading(true);

            const result = await changePassword({
                oldPass: values.oldPass,
                newPass: values.newPass,
                confirm_new_pass: values.confirm_new_pass
            });

            if (result.success) {
                showToastMessage(
                    result.message,
                    true
                );

                resetForm();
            } else {
                showToastMessage(
                    result.message,
                    false
                );

            }
        } catch (err) {
            showToastMessage(err?.message, false);
        } finally {
            setLoading(false);
        }
    };

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

            <div
                className="d-inline-flex align-items-center gap-2 text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/member/dashboard")}
            >
                <i className="bi bi-arrow-left-circle-fill fs-5"></i>
                <span className="fw-semibold">Kembali ke Dashboard</span>
            </div><hr />

            <h4>Ganti Password</h4>
            <div>Ganti password Anda sekarang</div><hr />

            <div className="card">
                <div className="card-body">
                    <Formik
                        initialValues={{
                            oldPass: '',
                            newPass: '',
                            confirm_new_pass: '',
                        }}
                        onSubmit={_handleSubmit}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                    >
                        {({ errors, touched, handleSubmit, handleChange, values }) => (
                            <form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <div className="input-wrapper">
                                        <Form.Label htmlFor="oldPass">Kata Sandi Lama</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Kata Sandi Lama"
                                            onChange={handleChange}
                                            id="oldPass"
                                            value={values.oldPass}
                                            isInvalid={touched.oldPass && errors.oldPass ? true : false}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.oldPass}
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <div className="input-wrapper">
                                        <Form.Label htmlFor="newPass">Kata Sandi Baru</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Kata Sandi Baru"
                                            onChange={handleChange}
                                            id="newPass"
                                            value={values.newPass}
                                            isInvalid={touched.newPass && errors.newPass ? true : false}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.newPass}
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <div className="input-wrapper">
                                        <Form.Label htmlFor="confirm_new_pass">
                                            Konfirmasi Kata Sandi Baru
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Konfirmasi Kata Sandi Baru"
                                            onChange={handleChange}
                                            id="confirm_new_pass"
                                            value={values.confirm_new_pass}
                                            isInvalid={touched.confirm_new_pass && errors.confirm_new_pass ? true : false
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirm_new_pass}
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <div className="row">
                                    <div className="col-md-3">
                                        <button
                                            type="submit"
                                            className="btn w-100 btn-success"
                                            disabled={loading}
                                        >
                                            {loading && (
                                                <Spinner
                                                    animation="border"
                                                    size="sm"
                                                />
                                            )}
                                            Simpan
                                        </button>
                                    </div>
                                </div>

                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Layout;