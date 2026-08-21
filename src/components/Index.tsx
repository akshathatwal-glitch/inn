import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, X, Brain, Type, Eye, Menu, LayoutDashboard, BookOpen
} from 'lucide-react';
import { useModal } from '../hooks/useModal';

// ── Interactive Thematic Neural Synapse Canvas Backdrop ──────────────────────
function NeuralBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes representing cognitive synaptic pathways
    const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 0.8,
        baseAlpha: Math.random() * 0.4 + 0.2,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connective synaptic filaments
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Interactive mouse repulsion / attraction
        const dxMouse = mouseX - p1.x;
        const dyMouse = mouseY - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 140) {
          p1.x -= (dxMouse / distMouse) * 0.6;
          p1.y -= (dyMouse / distMouse) * 0.6;
        }

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p1.baseAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-black">
      {/* Deep Obsidian Radial Atmospheric Aura */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_rgba(120,119,198,0.03)_40%,_transparent_75%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(52,211,153,0.03)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      {/* Subtle Precision Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      {/* Live Synaptic Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
    </div>
  );
}

// ── Infinite Marquee Ticker ───────────────────────────────────────────────────
function MarqueeBanner() {
  const items = [
    { label: 'Dynamic Text Formatting' },
    { label: 'AI Cognitive Simplification' },
    { label: 'Sensory-Friendly Focus Mode' },
    { label: 'Syllable Phonetic Highlighting' },
    { label: 'Attention Arc Cycles' },
    { label: 'Instant PDF Conversion' },
    { label: 'Neuro-Inclusive Classrooms' },
  ];

  return (
    <div className="relative w-full overflow-hidden py-3 sm:py-3.5 border-y border-white/10 bg-black/80 backdrop-blur-xl z-20">
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-8 sm:gap-12 whitespace-nowrap w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-[11px] sm:text-xs font-mono text-white/50 hover:text-white transition-colors cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="tracking-widest uppercase">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Live Hero Interactive Adaptive Sandbox ──────────────────────────────────
function HeroInteractiveSandbox() {
  const [activePreset, setActivePreset] = useState<'neutral' | 'dyslexic' | 'focused' | 'simplified'>('neutral');

  const presets = [
    { id: 'neutral', label: 'Original' },
    { id: 'dyslexic', label: 'Dyslexia Adaptive' },
    { id: 'focused', label: 'Sensory Focus' },
    { id: 'simplified', label: 'AI Concept Map' },
  ] as const;

  return (
    <div className="w-full max-w-2xl mx-auto my-6 sm:my-8 p-4 sm:p-6 rounded-3xl bg-neutral-950/90 border border-white/15 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] text-left select-none relative overflow-hidden group">
      {/* Top Specimen Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[11px] font-mono text-white/40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/70">LIVE ADAPTATION SPECIMEN</span>
        </div>
        <span>WCAG AAA COMPLIANT</span>
      </div>

      {/* Dynamic Text Specimen Viewport */}
      <div className="min-h-[76px] sm:min-h-[84px] flex items-center">
        <AnimatePresence mode="wait">
          {activePreset === 'neutral' && (
            <motion.p
              key="neutral"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-sm sm:text-base text-white/80 font-sans leading-relaxed"
            >
              Mitochondria synthesize adenosine triphosphate molecules to provide metabolic chemical energy across living cells.
            </motion.p>
          )}

          {activePreset === 'dyslexic' && (
            <motion.p
              key="dyslexic"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-sm sm:text-base text-white/95 font-dyslexic tracking-wide leading-[2.1]"
            >
              <span className="text-amber-200">Mi</span><span className="text-orange-300">to</span><span className="text-amber-200">chon</span><span className="text-orange-300">dria</span>{' '}
              <span className="text-amber-200">syn</span><span className="text-orange-300">the</span><span className="text-amber-200">size</span>{' '}
              <span className="text-amber-200">ATP</span>{' '}
              <span className="text-amber-200">mol</span><span className="text-orange-300">e</span><span className="text-amber-200">cules</span> to supply cellular power.
            </motion.p>
          )}

          {activePreset === 'focused' && (
            <motion.div
              key="focused"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="p-3 rounded-xl bg-black/60 border border-emerald-400/20 text-xs sm:text-sm text-emerald-300 font-mono flex items-center justify-between w-full"
            >
              <span>● Low-stimulus state active — 432Hz ambient soundscape & 15m focus timer running</span>
              <span className="text-white/40 text-xs shrink-0 ml-2">15:00</span>
            </motion.div>
          )}

          {activePreset === 'simplified' && (
            <motion.div
              key="simplified"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="space-y-1.5 w-full text-xs sm:text-sm text-white/90"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span>Mitochondria generate essential chemical power for all cell functions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span>Chemical energy is stored inside ATP molecules</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tactile Mode Switcher */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/10 text-xs font-mono">
        <span className="text-white/40 hidden sm:inline">Try preset:</span>
        <div className="flex gap-1.5 flex-wrap w-full sm:w-auto justify-start sm:justify-end">
          {presets.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePreset(p.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                activePreset === p.id
                  ? 'bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                  : 'bg-white/5 text-white/50 hover:text-white border border-white/10'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { openModal } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen overflow-hidden relative flex flex-col bg-black justify-between">
        {/* Thematic Neural & Synaptic Pathway Canvas Backdrop */}
        <NeuralBackdrop />

        {/* Top Navbar */}
        <nav className="relative z-30 px-4 sm:px-6 py-4 sm:py-6 w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="liquid-glass rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-2xl bg-black/60"
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
              <Link to="/dashboard">
                <motion.div
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                  className="bg-white text-black rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold hover:bg-neutral-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] cursor-pointer"
                >
                  Launch App
                </motion.div>
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
                className="md:hidden mt-3 liquid-glass rounded-3xl p-5 border border-white/15 bg-black/90 backdrop-blur-2xl space-y-3 shadow-2xl"
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

        {/* Center Hero Content */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-10 text-center max-w-5xl mx-auto my-auto">
          
          {/* Subtle System Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] sm:text-xs font-mono mb-4 sm:mb-6 shadow-sm backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Assistive Engine Active // Zero-Latency Client Processing</span>
          </motion.div>

          {/* Editorial Staggered Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white tracking-tight font-serif mb-3 sm:mb-5 max-w-4xl leading-[1.08]"
          >
            Empowering Every Learner's <em className="italic text-white/50">Unique Mind</em>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-2"
          >
            Transforming static, dense curriculum materials into real-time adaptive reading environments for students with Dyslexia, ADHD, and visual differences.
          </motion.p>

          {/* Interactive Live Adaptive Sandbox in the Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <HeroInteractiveSandbox />
          </motion.div>
        </div>

        {/* Infinite Moving Marquee Ticker */}
        <MarqueeBanner />
      </div>
    </>
  );
}
