// src/components/Hero/Hero.jsx
import React, { Suspense } from 'react';
import './Hero.css';

// Lazy load the 3D component
const Robot3D = React.lazy(() => import('../Robot3D/Robot3D'));

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-robot-container">
          <Suspense fallback={<div className="loading-3d">Loading 3D Model...</div>}>
            <Robot3D />
          </Suspense>
        </div>
        <div className="hero-text">
          <h1 className="contrail-one-regular">Welcome to Necessity Robotics</h1>
          <p className="contrail-one-regular"> Developing trainable robotic platforms to asists humans in day life tasks. </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;