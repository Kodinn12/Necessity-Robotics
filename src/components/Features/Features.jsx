// src/components/Features/Features.jsx
import React from 'react';
import YouTube from 'react-youtube';
import { FaRobot, FaHeadset, FaCogs } from 'react-icons/fa';
import './Features.css';

const Features = () => {
  const works = [
    {
      title: "Stereo Vision Callibration",
      icon: <FaRobot className="feature-icon" />,
      description: "Callibration of diy Stereo Vision Camera",
      ytLink: "https://youtube/wCXGuflIr-4"
    },
    {
      title: "Depth Mapping",
      icon: <FaHeadset className="feature-icon" />,
      description: "Advanced depth perception for accurate mapping",
      ytLink: "https://youtube/1G43fMI7J0U"
    },
    {
      title: "Point clouds mapping ",
      icon: <FaCogs className="feature-icon" />,
      description: "Precise movement and path planning",
      ytLink: "https://youtube/9ZfODqTzjmY"
    }
  ];

  const getVideoId = (url) => {
    if (!url) return '';
    try {
      const u = new URL(url);
      if (u.hostname.includes('youtu.be')) {
        return u.pathname.slice(1);
      }
      if (u.hostname.includes('youtube.com')) {
        const id = u.searchParams.get('v');
        if (id) return id;
        if (u.pathname.startsWith('/embed/')) return u.pathname.split('/').pop();
      }
    } catch (_) {
      /* noop */
    }
    const m = (url || '').match(/[\/?=]([A-Za-z0-9_-]{11})(?:[&#?]|$)/);
    return m && m[1] ? m[1] : '';
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
                  <YouTube
                    videoId={getVideoId(work.ytLink)}
                    opts={{
                      width: '100%',
                      height: '200',
                      playerVars: {
                        rel: 0,
                        modestbranding: 1,
                      },
                    }}
                    iframeClassName="feature-video"
                  />
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