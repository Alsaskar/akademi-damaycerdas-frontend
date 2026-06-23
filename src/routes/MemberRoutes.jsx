import ProtectedRoute from '@/components/ProtectedRoute';
import { SidebarProvider } from '@/context/SidebarContext/SidebarProvider';
import ChangePasswordMember from '@/pages/protected/member/change-password';
import DashboardMember from '@/pages/protected/member/dashboard';
import DetailSesiTraining from '@/pages/protected/member/detail-sesi-training';
import DetailTrainingMember from '@/pages/protected/member/detail-training';
import Library from '@/pages/protected/member/library';
import DetailLibrary from '@/pages/protected/member/library/detail';
import MyProfil from '@/pages/protected/member/my-profil';
import TrainingOwn from '@/pages/protected/member/training-own';
import NotFound from '@/pages/public/not-found';
import { Route, Routes } from 'react-router-dom';

const MemberRoutes = () => {
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
            <ProtectedRoute allowedRoles={['member']}>
              <DashboardMember />
            </ProtectedRoute>
          }
        />

        <Route
          path="/training-own"
          element={
            <ProtectedRoute allowedRoles={['member']}>
              <TrainingOwn />
            </ProtectedRoute>
          }
        />

        <Route
          path="/library"
          element={
            <ProtectedRoute allowedRoles={['member']}>
              <Library />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detail-library/:slug"
          element={
            <ProtectedRoute allowedRoles={['member']}>
              <DetailLibrary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['member']}>
              <MyProfil />
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute allowedRoles={['member']}>
              <ChangePasswordMember />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detail-training/:slug"
          element={
            <ProtectedRoute allowedRoles={['member']}>
              <DetailTrainingMember />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detail-sesi/:slug"
          element={
            <ProtectedRoute allowedRoles={['member']}>
              <DetailSesiTraining />
            </ProtectedRoute>
          }
        />

      </Routes>
    </SidebarProvider>
  );
};

export default MemberRoutes;
