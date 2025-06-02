
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import InitiativesSection from '../components/InitiativesSection';
import EcosystemMap from '../components/EcosystemMap';
import StartupStories from '../components/StartupStories';
import NewsEvents from '../components/NewsEvents';
import JoinMovement from '../components/JoinMovement';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const Index = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      <ParticleBackground />
      <Header />
      
      <motion.div style={{ opacity }}>
        <HeroSection />
      </motion.div>
      
      <div className="relative z-10">
        <AboutSection />
        <ServicesSection />
        <InitiativesSection />
        <EcosystemMap />
        <StartupStories />
        <NewsEvents />
        <JoinMovement />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
