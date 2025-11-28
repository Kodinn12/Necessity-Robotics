// src/components/Header/Header.jsx
import React, { useState } from 'react';
import { FaBars, FaTimes, FaRobot } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src="/NR-logo.png" alt="NR Logo" className="logo-image" />
          <span className="shimmer-text">Necessity Robotics</span>
        </div>
        
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <button className="cta-button">Get Started</button>
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  );
};

export default Header;