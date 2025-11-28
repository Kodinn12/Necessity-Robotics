// src/pages/Home.jsx
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Galaxy from '../components/ui/Galaxy/Galaxy';

const Home = () => {
  const galaxyRef = useRef();

  const handleMouseMove = (e) => {
    if (galaxyRef.current) {
      galaxyRef.current.updateMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    }
  };

  const handleMouseLeave = () => {
    if (galaxyRef.current) {
      galaxyRef.current.handleMouseLeave();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="home-page"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Galaxy 
        ref={galaxyRef}
        mouseRepulsion={true}
        mouseinteraction="true"
        density={1.5}
        glowIntensity={0.5}
        saturation={0.8}
        hueShift={240}
      />
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Home;