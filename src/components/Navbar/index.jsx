import './style.css';
import { Dropdown } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { useSidebarContext } from '@/context/SidebarContext/useSidebarContext';
import ModalConfirm from '../ModalConfirm';
import Brand from '../Brand';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { isShowSidebar, setIsShowSidebar } = useSidebarContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setShowModal(false);

      // navigate('/login', { replace: true });
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
        className={`navbar-custom p-3 border-bottom ${isShowSidebar ? 'full' : ''}`}
      >
        <div className="d-flex justify-content-between align-items-center h-100">
          <div className="d-flex align-items-center">
            <i
              className="bi bi-list sidebar-toggle"
              onClick={() => setIsShowSidebar(!isShowSidebar)}
            ></i>
            <div className="d-block d-md-none">
              <Brand />
            </div>
          </div>
          <div className="d-flex align-items-center">
            <small className="me-2 name">{`${user?.firstname} ${user?.lastname}`}</small>
            <Dropdown className="dropdown-custom dropdown-item-sm profile">
              <Dropdown.Toggle id="dropdown-basic">
                <i className="bi bi-person-circle desktop"></i>
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.firstname}&background=ffbf8a&size=128&bold=true&color=ffff`}
                  alt="Avatar"
                  className="rounded-circle mobile"
                  width="25"
                  height="25"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu className="shadow-sm">

                {user?.role === 'member' && (
                  <>
                    <Dropdown.Item as={Link} to={`/member/profile`}>
                      <i className="bi bi-person-fill"></i> Profil
                    </Dropdown.Item>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                  </>
                )}


                <Dropdown.Item
                  as="button"
                  className="bg-danger text-white"
                  onClick={() => setShowModal(true)}
                >
                  <i className="bi bi-box-arrow-right"></i> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
}
