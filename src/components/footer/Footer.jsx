// src/components/footer/Footer.jsx
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaRobot } from 'react-icons/fa';
import './Footer.css';
import { FaPhone } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <FaRobot className="logo-icon" />
                <span>Necessity Robotics</span>
              </div>
              {/* ... rest of your footer content ... */}
            </div>

            <div className="footer-links">
              <h4 className="footer-title">Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="https://github.com/Kodinn12/Necessity-Robotics" target="_blank" rel="noopener noreferrer">Project Repo</a></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4 className="footer-title">Contact</h4>
              <ul>
                <li>
                  <FaEnvelope aria-hidden="true" />
                  <a href="mailto:necessityrobotics@gmail.com">necessityrobotics@gmail.com</a>
                </li>
                  <li>
                  <FaEnvelope aria-hidden="true" />
                  <a href="mailto:sumedhbouddh36@gmail.com">sumedhbouddh36@gmail.com</a>
                </li>
                <li>
                  <FaGithub aria-hidden="true" />
                  <a href="https://github.com/Kodinn12" target="_blank" rel="noopener noreferrer">github.com/Kodinn12</a>
                </li>
                  <FaPhone aria-hidden="true" />
                 <a> <span> 7869776865  |  6260034676</span></a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;