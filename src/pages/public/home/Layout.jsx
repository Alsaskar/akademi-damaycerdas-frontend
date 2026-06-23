import { Formik } from 'formik'
import * as Yup from 'yup'
import { Form, Spinner, Button } from 'react-bootstrap'
import ToastAlert from '@/components/ToastAlert'
import { useEffect, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '@/context/AuthContext'

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username tidak boleh kosong"),
  password: Yup.string().required("Password tidak boleh kosong"),
});

const Layout = () => {
  const { login, user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [showToast, setShowToast] = useState(false)
  const [progressToast, setProgressToast] = useState(100);
  const [messageAlert, setMessageAlert] = useState('')
  const [toastTrigger, setToastTrigger] = useState(0);

  useEffect(() => {
    if (toastTrigger > 0) {
      setShowToast(true);
      setProgressToast(100);

      let interval = setInterval(() => {
        setProgressToast((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setTimeout(() => {
              setShowToast(false);
            }, 500);
            return 0;
          }
          return prev - 2;
        });
      }, 100);
    }
  }, [toastTrigger]);

  const handleLogin = async (values, { setSubmitting, resetForm }) => {
    try {
      // panggil API login lo
      const getUser = await login(values.username, values.password);

      if (getUser) {
        window.location.href = `/${getUser.role}/dashboard`;
      }
    } catch (err) {
      setMessageAlert(err.response.data.message)
      setToastTrigger(prev => prev + 1); // selalu naik → useEffect jalan lagi

      // kosongkan form
      resetForm({
        values: {
          username: values.username || "",
          password: ''
        }
      })

      document.getElementById('username').focus()
    } finally {
      setSubmitting(false); // buat tombol balik normal
    }
  }

  return (
    <>
      <ToastAlert
        title="Oppss..."
        message={messageAlert}
        onClose={() => setShowToast(false)}
        show={showToast}
        bg="danger"
        progress={progressToast}
      />

      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}
      >
        <div className="row mt-4 justify-content-center w-100">
          <div className="col-md-5 col-lg-4">
            <div
              className="card border-0"
              style={{
                borderRadius: '25px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                overflow: 'hidden'
              }}
            >
              <div className="card-body p-5">

                <center>
                  <img
                    src="/images/logo-damaycerdas.jpeg"
                    alt="Logo TVRI"
                    className="img-fluid"
                    style={{
                      height: '140px',
                      borderRadius: '20px'
                    }}
                  />
                </center><hr />

                <h3
                  align="center"
                  className="mt-2 fw-bold"
                  style={{ color: '#2c3e50' }}
                >
                  Akademi Damay Cerdas
                </h3>

                <p
                  className="text-center text-muted mb-4"
                  style={{ fontSize: '14px' }}
                >
                  Sistem Informasi Akademi dan Dashboard Management
                </p>

                <h5
                  className="mb-4 fw-semibold"
                  style={{ color: '#495057' }}
                >
                  Masuk Dashboard
                </h5>

                <Formik
                  initialValues={{
                    username: "",
                    password: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    touched,
                    errors,
                    isSubmitting
                  }) => (
                    <form action="" onSubmit={handleSubmit}>

                      <Form.Group className="mb-3">
                        <div
                          className="input-group"
                          style={{
                            borderRadius: '14px',
                            overflow: 'hidden',
                            border: '1px solid #e9ecef',
                            transition: '0.2s',
                            background: '#fff'
                          }}
                        >
                          <span
                            className="input-group-text"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              paddingLeft: '14px',
                              paddingRight: '10px',
                              color: '#6c757d'
                            }}
                          >
                            <i className="bi bi-person"></i>
                          </span>

                          <Form.Control
                            type="username"
                            placeholder="Username"
                            onChange={handleChange}
                            id="username"
                            value={values.username}
                            isInvalid={touched.username && errors.username ? true : false}
                            style={{
                              height: '52px',
                              border: 'none',
                              boxShadow: 'none',
                              fontSize: '15px'
                            }}
                          />
                        </div>

                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <div
                          className="input-group"
                          style={{
                            borderRadius: '14px',
                            overflow: 'hidden',
                            border: '1px solid #e9ecef',
                            transition: '0.2s',
                            background: '#fff'
                          }}
                        >
                          <span
                            className="input-group-text"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              paddingLeft: '14px',
                              paddingRight: '10px',
                              color: '#6c757d'
                            }}
                          >
                            <i className="bi bi-lock"></i>
                          </span>

                          <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            id="password"
                            value={values.password}
                            isInvalid={touched.password && errors.password ? true : false}
                            style={{
                              height: '52px',
                              border: 'none',
                              boxShadow: 'none',
                              fontSize: '15px'
                            }}
                          />
                        </div>

                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <div className="text-end mb-4">
                        <Link
                          to="/forgot-password"
                          style={{
                            textDecoration: 'none',
                            fontSize: '14px',
                            color: '#6c757d',
                            fontWeight: '500'
                          }}
                        >
                          Lupa Password?
                        </Link>
                      </div>

                      {isSubmitting ? (
                        <button
                          type="button"
                          className="btn btn-primary w-100"
                          disabled={true}
                          style={{
                            height: '50px',
                            borderRadius: '12px',
                            fontWeight: '600'
                          }}
                        >
                          <Spinner animation="border" size="sm" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-primary w-100"
                          style={{
                            height: '50px',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '16px'
                          }}
                        >
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Masuk
                        </button>
                      )}

                    </form>
                  )}
                </Formik>
              </div>
            </div>

            <div className="mt-4 mb-4 text-center text-muted">
              © 2026{" "}
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: '#495057',
                  fontWeight: '600'
                }}
              >
                Akademi Damay Cerdas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout;