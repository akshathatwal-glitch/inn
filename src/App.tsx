import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import AboutSection from './components/AboutSection';
import FeaturedVideoSection from './components/FeaturedVideoSection';
import PhilosophySection from './components/PhilosophySection';
import ServicesSection from './components/ServicesSection';
import AboutBento from './components/ui/about-bento';
import DynamicFormattingPage from './pages/DynamicFormattingPage';
import CognitiveSimplificationPage from './pages/CognitiveSimplificationPage';
import SensoryModePage from './pages/SensoryModePage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import LibraryPage from './pages/LibraryPage';
import { SettingsProvider } from './hooks/useSettings';
import { ModalProvider } from './hooks/useModal';
import './index.css';

function MainLayout() {
  return (
    <>
      <Index />
      <AboutBento />
      <div id="solution"><ServicesSection /></div>
      <div id="impact"><PhilosophySection /></div>
      <div id="contact"><FeaturedVideoSection /></div>
    </>
  );
}

function App() {
  return (
    <SettingsProvider>
      <ModalProvider>
        <BrowserRouter>
          <div className="bg-black min-h-screen text-white font-sans antialiased selection:bg-white/20 selection:text-white">
            <Routes>
              {/* Landing */}
              <Route path="/" element={<MainLayout />} />

              {/* App Pages */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/feature/formatting" element={<DynamicFormattingPage />} />
              <Route path="/feature/simplification" element={<CognitiveSimplificationPage />} />
              <Route path="/feature/sensory" element={<SensoryModePage />} />
              <Route path="/feature/profile" element={<ProfilePage />} />
              <Route path="/feature/library" element={<LibraryPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ModalProvider>
    </SettingsProvider>
  );
}

export default App;
