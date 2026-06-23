import { useSidebarContext } from '@/context/SidebarContext/useSidebarContext';
import { Link, useLocation } from 'react-router-dom';

const MenuItem = ({ label, href, icon, disabled = false }) => {
  const { setIsShowSidebar } = useSidebarContext();
  const { pathname } = useLocation();

  if (disabled) {
    return (
      <span
        className="item rounded"
        style={{ opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' }}
        title="Aktifkan akun Anda terlebih dahulu"
      >
        {icon}
        <span>{label}</span>
      </span>
    );
  }

  return (
    <Link
      to={href}
      className={`item rounded ${pathname === href ? 'active' : ''}`}
      onClick={() => setIsShowSidebar(false)}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default MenuItem;