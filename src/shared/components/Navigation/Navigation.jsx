import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🍳 Recipe Browser
        </Link>
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className={`nav-link ${isActive('/favorites') ? 'active' : ''}`}
          >
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}

