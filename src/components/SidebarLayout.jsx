import FooterDashboard from './FooterDashboard';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function SidebarLayout({ children }) {
  return (
    <div className="d-md-flex">
      <Sidebar />
      <div className="flex-fill position-relative min-vh-100 w-100 overflow-hidden">
        <Navbar />
        <div
          className="container-fluid px-3 mt-md-3 mt-4"
          style={{
            paddingBottom: '65px',
            paddingTop: '50px', // sesuai dengan tinggi navbar
          }}
        >
          {children}
        </div>
        <div className="position-absolute bottom-0 start-0 w-100">
          <FooterDashboard />
        </div>
      </div>
    </div>
  );
}
