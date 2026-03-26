import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Eventify
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/events/new" className="nav-link nav-btn">Add Event</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;