import { Link } from 'react-router-dom';
import './style.css';

export default function Brand() {
  return (
    <div className="brand d-flex align-items-center justify-content-center">
      <Link to="/">
        {/* <img src="/images/logo.png" alt="Logo" className="logo img-fluid" /> */}
        <span className="title">Akademi Damaycerdas</span>
      </Link>
    </div>
  );
}
