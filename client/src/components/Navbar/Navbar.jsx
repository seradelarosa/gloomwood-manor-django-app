import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <h1 className="navbar-title">Gloomwood Manor</h1>
      <div className="navbar-container">
        <button className="hamburger-button" onClick={toggleMenu}>
          <span className="hamburger-icon"></span>
          <span className="hamburger-icon"></span>
          <span className="hamburger-icon"></span>
        </button>
        <nav className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/requests-list" onClick={() => setIsMenuOpen(false)}>Requests</Link>
          <Link to="/guests-list" onClick={() => setIsMenuOpen(false)}>Guests</Link>
          <Link to="/ghosts-list" onClick={() => setIsMenuOpen(false)}>Ghosts</Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
