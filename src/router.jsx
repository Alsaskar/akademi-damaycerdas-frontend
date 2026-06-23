import { createBrowserRouter } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import PublicRoute from './components/PublicRoute';
import NotFound from './pages/public/not-found';
import Home from './pages/public/home';
import MemberRoutes from './routes/MemberRoutes';
import ForgotPassword from './pages/public/forgot-password';
import ResetPassword from './pages/public/reset-password';

const router = createBrowserRouter([
  // Public Route
  {
    path: '/',
    element: (
      <PublicRoute>
        <Home />
      </PublicRoute>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <PublicRoute>
        <ResetPassword />
      </PublicRoute>
    ),
  },

  // Protected Route
  { path: '/admin/*', element: <AdminRoutes /> },
  { path: '/member/*', element: <MemberRoutes /> },

  // Route 404 - Page not found
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
