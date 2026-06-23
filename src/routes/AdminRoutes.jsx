import ProtectedRoute from '@/components/ProtectedRoute';
import { SidebarProvider } from '@/context/SidebarContext/SidebarProvider';
import DashboardAdmin from '@/pages/protected/admin/dashboard';
import DetailSesiTraining from '@/pages/protected/admin/detail-sesi-training';
import DetailTraining from '@/pages/protected/admin/detail-training';
import ManageLibrary from '@/pages/protected/admin/library';
import LibraryCategory from '@/pages/protected/admin/library/category';
import DetailLibrary from '@/pages/protected/admin/library/detail';
import ManageMember from '@/pages/protected/admin/manage-member';
import ManageTraining from '@/pages/protected/admin/manage-training';
import MemberProfil from '@/pages/protected/admin/member-profil';
import NotFound from '@/pages/public/not-found';
import { Route, Routes } from 'react-router-dom';

const AdminRoutes = () => {
  return (
    <SidebarProvider>
      <Routes>
        {/* Ketika mengakses parent path tanpa sub-path, lempar 404 */}
        <Route path="/" element={<NotFound />} />

        {/* Ketika mengakses sub-path yang salah di dalam parent path, lempar 404 */}
        <Route path="*" element={<NotFound />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageMember />
            </ProtectedRoute>
          }
        />

        <Route
          path="/member-profil/:username"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MemberProfil />
            </ProtectedRoute>
          }
        />

        <Route
          path="/training"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageTraining />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detail-training/:slug"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DetailTraining />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detail-sesi/:slug"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DetailSesiTraining />
            </ProtectedRoute>
          }
        />

        <Route
          path="/library"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageLibrary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/library-categories"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <LibraryCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/library-detail/:id"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DetailLibrary />
            </ProtectedRoute>
          }
        />

      </Routes>
    </SidebarProvider>
  );
};

export default AdminRoutes;
