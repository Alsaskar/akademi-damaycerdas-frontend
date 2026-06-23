import { Formik } from 'formik'
import * as Yup from 'yup'
import { Form, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useUser } from '@/modules/user/hooks/useUser'
import { useToast } from '@/hooks/useToast'
import ToastAlert from '@/components/ToastAlert'

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email tidak valid").required("Email tidak boleh kosong"),
});

const Layout = () => {
  const { showToast, message, success, progress, show: showToastMessage, hide } = useToast();
  const { loading, forgotPassword } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (values, { resetForm }) => {
    const res = await forgotPassword(values.email)

    showToastMessage(res.message, res.success);

    if (res.success) {
      resetForm();
    }
  }

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

      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}
      >
        <div className="row justify-content-center w-100">
          <div className="col-md-5 col-lg-4">

            <div
              className="card border-0"
              style={{
                borderRadius: '25px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.12)'
              }}
            >
              <div className="card-body p-5">

                <div className="text-center mb-4">
                  <i
                    className="bi bi-shield-lock"
                    style={{
                      fontSize: '50px',
                      color: '#0d6efd'
                    }}
                  ></i>

                  <h3 className="mt-3 fw-bold" style={{ color: '#2c3e50' }}>
                    Lupa Password
                  </h3>

                  <p className="text-muted" style={{ fontSize: '14px' }}>
                    Masukkan email kamu untuk menerima link reset password
                  </p>
                </div>

                <Formik
                  initialValues={{ email: '' }}
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

                      <Form.Group className="mb-4">
                        <div
                          className="input-group"
                          style={{
                            borderRadius: '14px',
                            overflow: 'hidden',
                            border: '1px solid #e9ecef',
                            background: '#fff'
                          }}
                        >
                          <span
                            className="input-group-text"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#6c757d'
                            }}
                          >
                            <i className="bi bi-envelope"></i>
                          </span>

                          <Form.Control
                            type="email"
                            placeholder="Masukkan Email Anda"
                            onChange={handleChange}
                            id="email"
                            value={values.email}
                            isInvalid={touched.email && errors.email}
                            style={{
                              height: '52px',
                              border: 'none',
                              boxShadow: 'none'
                            }}
                          />
                        </div>

                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                        style={{
                          height: '50px',
                          borderRadius: '12px',
                          fontWeight: '600'
                        }}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner size="sm" animation="border" />
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send me-2"></i>
                            Kirim Link Reset
                          </>
                        )}
                      </button>

                    </form>
                  )}
                </Formik>

                <div className="text-center mt-4">
                  <Link
                    to="/"
                    style={{
                      textDecoration: 'none',
                      fontSize: '14px',
                      color: '#6c757d',
                      fontWeight: '500'
                    }}
                  >
                    ← Kembali ke login
                  </Link>
                </div>

              </div>
            </div>

            <div className="mt-4 text-center text-muted">
              <small>
                © 2026 Akademi Damay Cerdas
              </small>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Layout;