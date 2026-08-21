import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, ArrowRight, Focus, X, Play, ExternalLink, Sparkles, Brain,
  Type, Eye, ShieldCheck, Zap, Menu, LayoutDashboard, BookOpen
} from 'lucide-react';
import { useModal } from '../hooks/useModal';

// ── Infinite Marquee Ticker ───────────────────────────────────────────────────
function MarqueeBanner() {
  const items = [
    { icon: Type, label: 'OpenDyslexic Typography' },
    { icon: Brain, label: 'AI Cognitive Simplification' },
    { icon: Eye, label: 'Sensory-Friendly Focus Mode' },
    { icon: Zap, label: 'Syllable Phonetic Highlighting' },
    { icon: ShieldCheck, label: 'ADHD Attention Cycles' },
    { icon: Sparkles, label: 'Instant PDF Conversion' },
    { icon: Globe, label: 'Neuro-Inclusive Classrooms' },
  ];

  return (
    <div className="relative w-full overflow-hidden py-3 sm:py-4 border-y border-white/10 bg-black/60 backdrop-blur-xl z-20">
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-6 sm:gap-8 whitespace-nowrap w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-mono text-white/60 hover:text-white transition-colors cursor-default">
            <item.icon className="w-3.5 h-3.5 text-white/80" />
            <span className="tracking-wider uppercase">{item.label}</span>
            <span className="text-white/20 ml-4 sm:ml-6">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Floating Feature Tag ──────────────────────────────────────────────────────
function FloatingBadge({
  icon: Icon, text, delay = 0, initialPos, floatRange = 10
}: {
  icon: React.ElementType; text: string; delay?: number; initialPos: string; floatRange?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.7, 1, 0.7],
        y: [0, -floatRange, 0],
        scale: 1,
      }}
      transition={{
        opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay },
        scale: { duration: 0.6, delay: 0.2 },
      }}
      className={`hidden xl:flex items-center gap-2 px-4 py-2 rounded-full liquid-glass border border-white/15 text-white text-xs font-mono backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.08)] pointer-events-none absolute ${initialPos}`}
    >
      <Icon className="w-3.5 h-3.5 text-white" />
      <span>{text}</span>
    </motion.div>
  );
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openModal } = useModal();
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fadeFrame: number;

    const fadeTo = (targetOpacity: number, duration: number) => {
      const startOpacity = parseFloat(video.style.opacity || '0');
      const startTime = performance.now();

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        video.style.opacity = (startOpacity + (targetOpacity - startOpacity) * progress).toString();

        if (progress < 1) {
          fadeFrame = requestAnimationFrame(animate);
        }
      };

      cancelAnimationFrame(fadeFrame);
      fadeFrame = requestAnimationFrame(animate);
    };

    const onCanPlay = () => {
      video.play();
      fadeTo(1, 500);
    };

    const onTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && parseFloat(video.style.opacity || '1') > 0.5) {
        fadeTo(0, 500);
      }
    };

    const onEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
        fadeTo(1, 500);
      }, 100);
    };

    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);

    return () => {
      cancelAnimationFrame(fadeFrame);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <>
      <div className="min-h-screen overflow-hidden relative flex flex-col bg-black justify-between">
        {/* Background Video */}
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          muted
          autoPlay
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none"
          style={{ opacity: 0 }}
        />

        {/* Ambient Animated Glow Spheres */}
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/5 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-white/5 blur-[100px] sm:blur-[120px] pointer-events-none z-0"
        />

        {/* Top Navbar */}
        <nav className="relative z-30 px-4 sm:px-6 py-4 sm:py-6 w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="liquid-glass rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-2xl bg-black/50"
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all">
                <Globe className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-white font-serif text-base sm:text-lg tracking-tight">
                Adapt<em className="italic text-white/70">Learn</em>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
              <a
                href="#solution"
                className="text-white/70 hover:text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-white/10 transition-all"
              >
                AI Solution
              </a>
              <a
                href="#impact"
                className="text-white/70 hover:text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-white/10 transition-all"
              >
                Impact
              </a>
              <Link
                to="/feature/library"
                className="text-white/70 hover:text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-white/10 transition-all"
              >
                Library
              </Link>
              <Link
                to="/dashboard"
                className="text-white/70 hover:text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-white/10 transition-all flex items-center gap-1.5"
              >
                <span>Workspace</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </Link>
            </div>

            {/* Actions & Mobile Toggle */}
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="bg-white text-black rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:scale-105"
              >
                Launch App
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full liquid-glass border border-white/15 text-white/80 hover:text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

          {/* Mobile Drawer Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                className="md:hidden mt-3 liquid-glass rounded-3xl p-5 border border-white/15 bg-black/85 backdrop-blur-2xl space-y-3 shadow-2xl"
              >
                <div className="space-y-1">
                  <a
                    href="#solution"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    AI Solution
                  </a>
                  <a
                    href="#impact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    Impact Overview
                  </a>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <span>Dashboard Workspace</span>
                    <LayoutDashboard className="w-4 h-4 text-white/50" />
                  </Link>
                  <Link
                    to="/feature/library"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <span>Content Library</span>
                    <BookOpen className="w-4 h-4 text-white/50" />
                  </Link>
                  <Link
                    to="/feature/formatting"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <span>Text Formatting</span>
                    <Type className="w-4 h-4 text-white/50" />
                  </Link>
                  <Link
                    to="/feature/simplification"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <span>AI Cognitive Simplification</span>
                    <Brain className="w-4 h-4 text-white/50" />
                  </Link>
                  <Link
                    to="/feature/sensory"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <span>Sensory Focus Mode</span>
                    <Eye className="w-4 h-4 text-white/50" />
                  </Link>
                </div>

                <div className="pt-3 border-t border-white/10 flex gap-2">
                  <button
                    onClick={() => { setMobileMenuOpen(false); openModal(); }}
                    className="flex-1 py-2.5 rounded-full liquid-glass border border-white/15 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    Interactive Simulator
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Floating Interactive Feature Badges (hidden on small viewports, shown on xl) */}
        <FloatingBadge
          icon={Type}
          text="OpenDyslexic Auto-Formatting"
          delay={0}
          initialPos="top-36 left-12"
          floatRange={14}
        />
        <FloatingBadge
          icon={Brain}
          text="Cognitive Load: -45%"
          delay={1.5}
          initialPos="top-48 right-16"
          floatRange={18}
        />

        {/* Center Hero Content */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 text-center max-w-5xl mx-auto my-auto">
          
          {/* Animated Announcement Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full liquid-glass border border-white/20 text-white/90 text-[11px] sm:text-xs font-mono mb-6 sm:mb-8 shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:border-white/40 transition-all cursor-pointer group max-w-full"
            onClick={openModal}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </motion.div>
            <span className="truncate">Adaptive AI 2.0 Live — Transforming Learning</span>
            <ArrowRight className="w-3 h-3 text-white/50 group-hover:translate-x-1 transition-transform shrink-0" />
          </motion.div>

          {/* Staggered Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white tracking-tight font-serif mb-4 sm:mb-6 max-w-4xl leading-[1.1]"
          >
            Empowering Every Learner's <em className="italic text-white/60">Unique Mind</em>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/80 text-sm sm:text-base md:text-xl leading-relaxed px-2 sm:px-4 max-w-2xl mx-auto mb-8 sm:mb-10"
          >
            AdaptLearn uses real-time AI to instantly convert dense, rigid study materials into personalized, neuro-inclusive learning environments.
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full justify-center px-4"
          >
            <Link
              to="/dashboard"
              className="bg-white text-black rounded-full px-8 py-3.5 sm:px-9 sm:py-4 text-xs sm:text-sm font-semibold hover:bg-gray-200 transition-all flex items-center gap-2.5 w-full sm:w-auto justify-center shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 group"
            >
              <span>Launch Prototype</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={openModal}
              className="liquid-glass rounded-full px-7 py-3.5 sm:px-8 sm:py-4 text-white text-xs sm:text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2.5 w-full sm:w-auto justify-center border border-white/15 hover:border-white/30"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Interactive Simulator</span>
            </button>
          </motion.div>
        </div>

        {/* Bottom Interactive Quick Bar */}
        <div className="relative z-20 flex flex-col items-center gap-3 sm:gap-4 pb-6 sm:pb-8 px-4">
          <div className="flex justify-center gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              onMouseEnter={() => setActiveTooltip('Sensory Focus Mode')}
              onMouseLeave={() => setActiveTooltip(null)}
              className="liquid-glass rounded-full p-3 sm:p-3.5 text-white/80 hover:text-white hover:bg-white/10 transition-all border border-white/10 hover:border-white/30 relative"
            >
              <Focus className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              onMouseEnter={() => setActiveTooltip('AI Concept Deconstruction')}
              onMouseLeave={() => setActiveTooltip(null)}
              className="liquid-glass rounded-full p-3 sm:p-3.5 text-white/80 hover:text-white hover:bg-white/10 transition-all border border-white/10 hover:border-white/30 relative"
            >
              <Brain className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              onMouseEnter={() => setActiveTooltip('OpenDyslexic Typography Engine')}
              onMouseLeave={() => setActiveTooltip(null)}
              className="liquid-glass rounded-full p-3 sm:p-3.5 text-white/80 hover:text-white hover:bg-white/10 transition-all border border-white/10 hover:border-white/30 relative"
            >
              <Globe className="w-4 h-4" />
            </motion.button>
          </div>

          {activeTooltip && (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] sm:text-[11px] font-mono text-white/50 tracking-wider uppercase text-center"
            >
              {activeTooltip}
            </motion.span>
          )}
        </div>

        {/* Infinite Moving Marquee Ticker */}
        <MarqueeBanner />
      </div>
    </>
  );
}
