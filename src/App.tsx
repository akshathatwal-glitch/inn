import React from 'react';
import Index from './components/Index';
import AboutSection from './components/AboutSection';
import FeaturedVideoSection from './components/FeaturedVideoSection';
import PhilosophySection from './components/PhilosophySection';
import ServicesSection from './components/ServicesSection';
import { SettingsProvider } from './hooks/useSettings';
import './index.css';

function App() {
  return (
    <SettingsProvider>
      <div className="bg-black min-h-screen text-white font-sans antialiased selection:bg-white/20 selection:text-white">
        <Index />
        <AboutSection />
        <ServicesSection />
        <PhilosophySection />
        <FeaturedVideoSection />
      </div>
    </SettingsProvider>
  );
}

export default App;

