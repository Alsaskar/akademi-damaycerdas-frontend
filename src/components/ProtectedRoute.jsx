import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import SidebarLayout from './SidebarLayout';
import LoadingScreen from './LoadingScreen';
import { useContext } from 'react';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  const { pathname } = useLocation();

  // Tampilkan loading screen/spinner saat sedang mengecek ke server
  if (loading) {
    return <LoadingScreen />;
  }

  // Jika tidak ada user (belum login), lempar ke halaman login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Jika user ada, tapi role tidak sesuai
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <SidebarLayout>{children}</SidebarLayout>;
};

export default ProtectedRoute;
