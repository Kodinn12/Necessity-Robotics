// src/components/Features/Features.jsx
import React from 'react';
import { FaRobot, FaHeadset, FaCogs } from 'react-icons/fa';
import './Features.css';

const Features = () => {
  const works = [
    {
      title: "Stereo Vision",
      icon: <FaRobot className="feature-icon" />,
      description: "Intelligent systems that learn and adapt to your needs",
      ytLink: "https://www.youtube.com/embed/your-video-id-1"
    },
    {
      title: "Depth Mapping",
      icon: <FaHeadset className="feature-icon" />,
      description: "Advanced depth perception for accurate mapping",
      ytLink: "https://www.youtube.com/embed/your-video-id-2"
    },
    {
      title: "Navigation",
      icon: <FaCogs className="feature-icon" />,
      description: "Precise movement and path planning",
      ytLink: "https://www.youtube.com/embed/your-video-id-3"
    }
  ];

  return (
    <section className="features" id="features">
      <div className="features-container">
        <div className="features-content">
          <h2>Our Works</h2>
          <h3 className="subtitle">Discover Our Capabilities</h3>
          <p className="description">
            Experience cutting-edge robotics solutions that transform industries and improve lives.
          </p>
          
          <div className="features-grid">
            {works.map((work, index) => (
              <div key={index} className="feature-card">
                <div className="card-content">
                  <div className="feature-icon-container">
                    {work.icon}
                  </div>
                  <h4>{work.title}</h4>
                  <p>{work.description}</p>
                </div>
                <div className="video-wrapper">
                  <iframe
                    width="100%"
                    height="200"
                    src={work.ytLink}
                    title={work.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;