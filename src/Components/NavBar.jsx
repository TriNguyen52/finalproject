import peeking from "./../assets/peeking.7c0ab599.gif";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="nav-container">
      {/* Logo Section */}
      <div className="nav-logo">
        <img src={peeking} alt="Logo" className="logo-image" />
        <h1 className="nav-title">Hip-Hop Revolution</h1>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create an Event</Link></li>
          <li><Link to="/gallery">Event Gallery</Link></li>
        </ul>
      </nav>

      {/* Search Bar */}
      <div className="nav-search">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </header>
  );
};

export default NavBar;
