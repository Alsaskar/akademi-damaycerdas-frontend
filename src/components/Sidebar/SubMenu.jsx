import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Submenu = ({ label, icon, id, submenuName, children, disabled = false }) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(
    !disabled && submenuName.some((path) => pathname.slice(1).startsWith(path)),
  );

  if (disabled) {
    return (
      <>
        <div
          className="item rounded"
          style={{ opacity: 0.4, cursor: 'not-allowed' }}
          title="Aktifkan akun Anda terlebih dahulu"
        >
          {icon}
          <span>{label}</span>
          <i className="bi bi-chevron-left submenu-indicator" />
        </div>
        {/* Children tetap dirender tapi di-disable semua */}
        <Collapse in={false}>
          <div className="border rounded px-1 pt-1" id={id}>
            {children}
          </div>
        </Collapse>
      </>
    );
  }

  return (
    <>
      <div
        className={`item rounded`}
        onClick={() => setOpen(!open)}
        aria-controls={id}
        aria-expanded={open}
      >
        {icon}
        <span>{label}</span>
        <i
          className={`bi bi-chevron-left submenu-indicator ${open ? 'open' : ''
            }`}
        ></i>
      </div>
      <Collapse in={open} className="submenu-items">
        <div className="border rounded px-1 pt-1" id={id}>
          {children}
        </div>
      </Collapse>
    </>
  );
}

export default Submenu