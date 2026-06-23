import { AuthContext } from '@/context/AuthContext';
// import NavbarHome from '@/modules/homepage/components/NavbarHome';
import { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();

  // if (loading) {
  //   return (
  //     <div className="d-flex justify-content-center mt-5">
  //       <Spinner animation="border" />
  //     </div>
  //   );
  // }

  if (user) {
    // Jika pengguna sudah login, arahkan ke halaman dashboard
    const role = user?.role;
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  // const shouldShowNavbar = ['/classes', '/'].includes(pathname);

  // Jika belum login, izinkan akses ke halaman ini
  return (
    <>
      {/* {shouldShowNavbar && <NavbarHome />} */}
      {children}
    </>
  );
};

export default PublicRoute;
