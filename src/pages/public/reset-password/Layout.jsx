import { Formik } from 'formik'
import * as Yup from 'yup'
import { Form, Spinner } from 'react-bootstrap'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useUser } from '@/modules/user/hooks/useUser'

const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password wajib diisi"),
    confirm_password: Yup.string()
        .required("Konfirmasi wajib diisi")
        .oneOf([Yup.ref('password'), null], "Konfirmasi password tidak cocok"),
});

const Layout = () => {
    const { resetPassword, loading } = useUser()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get("token")

    const [message, setMessage] = useState("")

    const handleSubmit = async (values) => {

        const res = await resetPassword({
            token,
            newPass: values.password,
            confirmPass: values.confirm_password
        })

        setMessage(res.message)

        if (res.success) {
            setTimeout(() => {
                navigate("/")
            }, 1500)
        }
    }

    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center"
                style={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                }}>

                <div className="col-md-5 col-lg-4">

                    <div className="card border-0"
                        style={{
                            borderRadius: '25px',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.12)'
                        }}>

                        <div className="card-body p-5">

                            <h3 className="text-center fw-bold">
                                Reset Password
                            </h3>

                            <p className="text-center text-muted mb-4">
                                Buat password baru untuk akun kamu
                            </p>

                            {message && (
                                <div className="alert alert-info text-center py-2">
                                    {message}
                                </div>
                            )}

                            <Formik
                                initialValues={{
                                    password: '',
                                    confirm_password: ''
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({
                                    values,
                                    handleChange,
                                    handleSubmit,
                                    touched,
                                    errors
                                }) => (
                                    <form onSubmit={handleSubmit}>

                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="password"
                                                placeholder="Password baru"
                                                id="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                isInvalid={touched.password && errors.password}
                                                style={{
                                                    height: '52px',
                                                    borderRadius: '12px'
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Control
                                                type="password"
                                                placeholder="Konfirmasi password"
                                                id="confirm_password"
                                                value={values.confirm_password}
                                                onChange={handleChange}
                                                isInvalid={touched.confirm_password && errors.confirm_password}
                                                style={{
                                                    height: '52px',
                                                    borderRadius: '12px'
                                                }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.confirm_password}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100"
                                            disabled={loading}
                                            style={{
                                                height: '50px',
                                                borderRadius: '12px',
                                                fontWeight: '600'
                                            }}
                                        >
                                            {loading ? (
                                                <Spinner size="sm" animation="border" />
                                            ) : (
                                                <>
                                                    <i className="bi bi-check-circle me-2"></i>
                                                    Reset Password
                                                </>
                                            )}
                                        </button>

                                    </form>
                                )}
                            </Formik>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Layout;