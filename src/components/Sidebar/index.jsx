import { useSidebarContext } from '@/context/SidebarContext/useSidebarContext';
import './style.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalConfirm from '../ModalConfirm';
import AdminMenu from './Menus/AdminMenu';
import Brand from '../Brand';
import MemberMenu from './Menus/MemberMenu';

export default function Sidebar() {
  const { isShowSidebar, setIsShowSidebar } = useSidebarContext();
  const { logout, user } = useContext(AuthContext);
  const isMobile = useMediaQuery('(max-width: 767.98px)');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (isMobile) {
      document.body.style.overflowY = isShowSidebar ? 'hidden' : 'auto';
    }
  }, [isMobile, isShowSidebar]);

  const handleLogout = async () => {
    try {
      await logout();
      setShowModal(false);

      // navigate('/', { replace: true });
    } catch (err) {
      console.error('Logout gagal:', err);
    }
  };

  return (
    <>
      <ModalConfirm
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleLogout}
        title="Keluar Sistem"
        message="Yakin ingin keluar?"
        description="Anda akan keluar dari sistem"
      />

      <div
        className={`sidebar-wrapper flex-shrink-0 ${isShowSidebar ? 'show' : ''}`}
      >
        <div
          className={`backdrop fade d-md-none ${isShowSidebar ? 'show' : ''}`}
          onClick={() => setIsShowSidebar(false)}
        ></div>
        <i
          className={`bi bi-x-lg d-md-none close-icon ${
            isShowSidebar ? 'show' : ''
          }`}
          onClick={() => setIsShowSidebar(false)}
        ></i>
        <div
          className={`sidebar-content border-end p-3 ${
            !isShowSidebar ? 'shadow' : ''
          }`}
        >
          <div className="d-md-block d-none">
            <Brand />
          </div>
          <p className="d-md-none d-block fw-bold">Menu</p>
          <hr />
          <div className="sidebar-menu">
            {pathname.split('/')[1] === 'admin' && <AdminMenu />}
            {pathname.split('/')[1] === 'member' && <MemberMenu />}
            <div className="bottom w-100">
              <div>
                <hr className="mb-2" />
                <p>
                  <small className="text-muted">
                    You are logged in as <b>{`${user?.firstname}`}</b>
                  </small>
                </p>
                <button
                  className="btn btn-danger btn-sm w-100"
                  onClick={() => setShowModal(true)}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
