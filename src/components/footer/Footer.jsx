// src/components/footer/Footer.jsx
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaRobot } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <div className="logo">
              <FaRobot className="logo-icon" />
              <span>Necessity Robotics</span>
            </div>
            {/* ... rest of your footer content ... */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;