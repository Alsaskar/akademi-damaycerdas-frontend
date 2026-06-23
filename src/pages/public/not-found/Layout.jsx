import { Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="not-found single-page">
      <div className="background"></div>
      <div className="container">
        <div className="d-flex align-items-center justify-content-center vh-100 w-100 flex-column py-3">
          <div className="card fade-up-custom" style={{ width: '500px' }}>
            <div className="card-body">
              <Link
                className="title text-white"
                to="/"
                style={{ textDecoration: 'none' }}
              >
                <div className="d-flex align-items-center justify-content-center">
                  <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="img-fluid me-3"
                    style={{ height: '50px' }}
                  />
                  <h3 className="mb-0">Breath Pilates</h3>
                </div>
              </Link>
              <hr />
              <div style={{ textAlign: 'center' }}>
                <h1 className="fw-bold">404</h1>
                <h5 className="fw-bold">Page Not Found</h5>
                <p className="my-4">
                  Sorry, the page you are looking for does not exist.
                </p>
                <Link to="/" className="btn btn-primary-custom">
                  Back To Home
                </Link>
              </div>
            </div>
          </div>

          <div
            className="mt-3 text-center text-light fade-up-custom "
            style={{ opacity: 0 }}
          >
            &copy; {new Date().getFullYear()}{' '}
            <Link to="/" style={{ textDecoration: 'none', color: '#F8F9FA' }}>
              Breath Pilates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
