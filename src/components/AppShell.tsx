import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Type, Brain, Eye, BookOpen, User,
  Globe, ArrowUpRight, Menu, X, ArrowLeft
} from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: 'Overview' },
  { to: '/feature/formatting', icon: Type, label: 'Text Formatting', badge: 'Core' },
  { to: '/feature/simplification', icon: Brain, label: 'AI Simplification', badge: 'AI' },
  { to: '/feature/sensory', icon: Eye, label: 'Focus Mode', badge: 'Zen' },
  { to: '/feature/library', icon: BookOpen, label: 'Content Library', badge: 'Read' },
  { to: '/feature/profile', icon: User, label: 'Learner Profile', badge: 'Custom' },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { settings } = useSettings();
  const [mobileOpen, setMobileOpen] = useState(false);

  const profileInitial = settings.studentName ? settings.studentName[0].toUpperCase() : 'L';

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between overflow-y-auto">
      <div>
        {/* Logo & Brand matching landing page */}
        <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-serif text-xl tracking-tight">
              Adapt<em className="italic text-white/70">Learn</em>
            </span>
          </Link>
        </div>

        {/* Back to Home Link */}
        <div className="px-4 pt-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium text-white/50 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Landing Page</span>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="px-3 py-4 space-y-1.5">
          <div className="px-3 py-2 flex items-center justify-between">
            <span className="text-white/30 text-[10px] uppercase tracking-widest font-semibold">Workspace</span>
            <span className="text-[10px] text-white/20 font-mono">v1.2</span>
          </div>

          {navItems.map(({ to, icon: Icon, label, badge }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-white text-black font-medium shadow-[0_0_25px_rgba(255,255,255,0.2)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-black' : 'text-white/50 group-hover:text-white'}`} />
                  <span className="text-sm tracking-tight">{label}</span>
                </div>
                
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono transition-colors ${
                  isActive 
                    ? 'bg-black/10 text-black/80 font-bold' 
                    : 'bg-white/5 text-white/30 group-hover:text-white/60 group-hover:bg-white/10'
                }`}>
                  {badge}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Pill */}
      <div className="p-4 border-t border-white/10">
        <Link to="/feature/profile" onClick={() => setMobileOpen(false)}>
          <div className="liquid-glass rounded-2xl p-3 border border-white/10 hover:border-white/25 transition-all flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-bold text-sm shadow-[0_0_12px_rgba(255,255,255,0.3)] shrink-0">
              {profileInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate group-hover:text-white transition-colors">{settings.studentName}</p>
              <p className="text-white/40 text-[10px] truncate capitalize font-mono">
                {settings.profile ? `${settings.profile} active` : 'Standard mode'}
              </p>
            </div>
            <div className="liquid-glass rounded-full p-1.5 group-hover:bg-white/20 transition-colors shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 text-white/50 group-hover:text-white" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative flex selection:bg-white/20 selection:text-white overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.04)_0%,_transparent_70%)] pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none z-0"></div>

      {/* Desktop Sidebar */}
      <aside className="app-sidebar hidden lg:flex flex-col border-r border-white/10 z-40 bg-black/60 backdrop-blur-2xl">
        <SidebarContent />
      </aside>

      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-black/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <Globe className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-white font-serif text-lg">Adapt<em className="italic text-white/70">Learn</em></span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-xl bg-white/5 border border-white/15 text-white hover:bg-white/10 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-[280px] max-w-[85vw] bg-black border-r border-white/10 z-50 flex flex-col p-2 shadow-2xl"
            >
              <div className="flex justify-end p-2">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area with mobile top padding */}
      <main className="app-main flex-1 w-full relative z-10 pt-16 lg:pt-0 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
