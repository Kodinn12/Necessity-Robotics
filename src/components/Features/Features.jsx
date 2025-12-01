// src/components/Features/Features.jsx
import React from 'react';
import { FaRobot, FaHeadset, FaCogs } from 'react-icons/fa';
import './Features.css';

const Features = () => {
  const works = [
    {
      title: "Stereo Vision Callibration",
      icon: <FaRobot className="feature-icon" />,
      description: "Callibration of diy Stereo Vision Camera",
      ytLink: "https://youtube/ywyFoPa10wM?si=2ka8ZAlED2AuHGhb"
    },
    {
      title: "Depth Mapping",
      icon: <FaHeadset className="feature-icon" />,
      description: "Advanced depth perception for accurate mapping",
      ytLink: "https://youtube/cgecZxkIC50?si=XYZfnnKUeKFNkBkD"
    },
    {
      title: "Point clouds mapping ",
      icon: <FaCogs className="feature-icon" />,
      description: "Precise movement and path planning",
      ytLink: "https://youtube/0udeioey7uY?si=r6pUXvzhuyhJsz_r"
    }
  ];

  // Convert different YouTube URL formats to an embeddable URL
  const getEmbedUrl = (url) => {
    if (!url) return '';
    try {
      const u = new URL(url);
      // Handle youtu.be/<id>
      if (u.hostname.includes('youtu.be')) {
        const id = u.pathname.slice(1);
        return `https://www.youtube.com/embed/${id}`;
      }
      // Handle youtube.com/watch?v=<id> and other variants
      if (u.hostname.includes('youtube.com')) {
        const id = u.searchParams.get('v');
        if (id) return `https://www.youtube.com/embed/${id}`;
        // Fallback: if already /embed/<id>
        if (u.pathname.startsWith('/embed/')) return url;
      }
      // As a last resort, try to match a 11-char video id pattern
      const m = url.match(/[\/?=]([A-Za-z0-9_-]{11})(?:[&#?]|$)/);
      if (m && m[1]) return `https://www.youtube.com/embed/${m[1]}`;
    } catch (_) {
      // ignore parse errors and fall through
    }
    return url;
  };

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
                    src={getEmbedUrl(work.ytLink)}
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