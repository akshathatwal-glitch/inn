import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, CheckCircle2, Clock, Sliders, Zap,
  BookOpen, Layers, ShieldCheck, Eye, ArrowRight
} from 'lucide-react';
import AppShell from '../components/AppShell';
import { useSettings, LearnerProfile } from '../hooks/useSettings';

interface ProfileOption {
  id: LearnerProfile;
  label: string;
  tag: string;
  icon: React.ElementType;
  desc: string;
  presets: string[];
  accent: string; // single tailwind text-color class for the active dot/check
}

const profiles: ProfileOption[] = [
  {
    id: 'dyslexia',
    label: 'Dyslexia',
    tag: 'Typography Engine',
    icon: BookOpen,
    desc: 'Optimises letterform recognition with OpenDyslexic typeface, phonetic syllable segmentation, and warm reading overlays.',
    accent: 'text-amber-300',
    presets: ['OpenDyslexic typography', 'Syllable phoneme coloring', 'Warm cream overlay', '2.0× line height'],
  },
  {
    id: 'adhd',
    label: 'ADHD',
    tag: 'Attention Engine',
    icon: Zap,
    desc: 'Suppresses extraneous stimulus and structures focused study through short, rhythmic Pomodoro intervals.',
    accent: 'text-sky-300',
    presets: ['Sensory mode active', '15m Pomodoro cycles', 'Sky contrast overlay', 'Reading ruler focus beam'],
  },
  {
    id: 'visual',
    label: 'Visual Processing',
    tag: 'Clarity Engine',
    icon: Eye,
    desc: 'Enhances font scale and stabilises line tracking to prevent cognitive visual fatigue and pattern shifting.',
    accent: 'text-emerald-300',
    presets: ['20px base font scale', 'Mint calm overlay', 'Dynamic cursor ruler', '2.2× vertical spacing'],
  },
  {
    id: 'multiple',
    label: 'Multi-Profile',
    tag: 'Comprehensive',
    icon: Layers,
    desc: 'Full multi-modal configuration stacking every assistive layer for complex, overlapping neurodivergent profiles.',
    accent: 'text-white',
    presets: ['OpenDyslexic + Syllables', 'Low-stimulation environment', '15m intervals', 'Full accessibility ruler'],
  },
];

const timerOptions = [5, 10, 15, 20, 25, 30, 45];

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.07 } } },
  item: {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  },
};

export default function ProfilePage() {
  const { settings, updateSetting, applyProfile } = useSettings();
  const [saved, setSaved] = useState(false);

  const handleSelectProfile = (id: LearnerProfile) => {
    applyProfile(id);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const profileInitial = settings.studentName ? settings.studentName[0].toUpperCase() : 'L';

  return (
    <AppShell>
      <div className="py-6 sm:py-10 md:py-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-8 sm:space-y-12">

        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-white/10"
        >
          <div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-3">
              ● Learner Identity
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl text-white tracking-tight font-serif leading-tight">
              Your <em className="italic text-white/50">Profile</em>.
            </h1>
          </div>

          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="liquid-glass rounded-full px-5 py-2.5 border border-white/15 text-white text-xs font-mono flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Presets applied</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8">

          {/* ── Left Column ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="xl:col-span-8 space-y-7 sm:space-y-8"
          >

            {/* Student name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3.5">
                  {/* Avatar */}
                  <div className="w-11 h-11 rounded-2xl liquid-glass border border-white/15 flex items-center justify-center text-white font-bold text-base font-serif shrink-0">
                    {profileInitial}
                  </div>
                  <div>
                    <h3 className="text-base font-serif text-white">Student Profile</h3>
                    <p className="text-[11px] text-white/40 font-mono">Stored locally — zero cloud</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass border border-white/10 text-white/50 text-[11px] font-mono">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Private &amp; Local</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono block">Display Name</label>
                <input
                  type="text"
                  value={settings.studentName}
                  onChange={e => updateSetting('studentName', e.target.value)}
                  placeholder="Enter your name…"
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-white/30 rounded-2xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none text-sm font-sans transition-all"
                />
              </div>
            </motion.div>

            {/* Profile archetype cards */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-5"
              >
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">Preset Archetypes</span>
                <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
                  Adaptive <em className="italic text-white/50">Configurations</em>
                </h2>
              </motion.div>

              <motion.div
                variants={stagger.container}
                initial="initial"
                animate="animate"
                className="space-y-3"
              >
                {profiles.map(({ id, label, tag, icon: Icon, desc, accent, presets }) => {
                  const isActive = settings.profile === id;
                  return (
                    <motion.button
                      key={id}
                      variants={stagger.item}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelectProfile(id)}
                      className={`w-full text-left liquid-glass rounded-2xl sm:rounded-3xl px-5 sm:px-7 py-5 sm:py-6 border transition-all duration-300 flex items-start gap-5 group ${
                        isActive
                          ? 'border-white/30 bg-white/[0.04]'
                          : 'border-white/8 hover:border-white/20 hover:bg-white/[0.02]'
                      }`}
                    >
                      {/* Left: icon + active ring */}
                      <div className={`mt-0.5 w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
                        isActive ? 'border-white/30 bg-white/10' : 'border-white/10 bg-white/5 group-hover:bg-white/8'
                      }`}>
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`} />
                      </div>

                      {/* Centre: text */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-semibold text-sm">{label}</span>
                          <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 bg-white/5">{tag}</span>
                        </div>
                        <p className="text-white/50 text-xs leading-relaxed">{desc}</p>

                        {/* Presets — shown on active */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pt-3 mt-2 border-t border-white/10 grid grid-cols-2 gap-x-4 gap-y-1.5 overflow-hidden"
                            >
                              {presets.map(p => (
                                <div key={p} className="flex items-center gap-1.5 text-[11px] font-mono text-white/60">
                                  <span className={`w-1 h-1 rounded-full shrink-0 ${accent} bg-current`} />
                                  {p}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Right: check or arrow */}
                      <div className="shrink-0 mt-1">
                        {isActive
                          ? <CheckCircle2 className={`w-4 h-4 ${accent}`} />
                          : <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all" />
                        }
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right Column ────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="xl:col-span-4 space-y-5"
          >

            {/* Focus Cycle timer */}
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5 shadow-xl">
              <div className="flex items-center gap-3 pb-4 border-b border-white/8">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-white/60" />
                </div>
                <div>
                  <h3 className="text-base font-serif text-white">Focus Cycle</h3>
                  <span className="text-[11px] text-white/40 font-mono">Session duration</span>
                </div>
              </div>

              <p className="text-white/50 text-xs leading-relaxed">
                Set your default study interval. Breaks are auto-queued after each cycle.
              </p>

              {/* Segmented timer picker */}
              <div className="grid grid-cols-4 gap-2">
                {timerOptions.map(mins => {
                  const isSelected = settings.focusTimerMinutes === mins;
                  return (
                    <button
                      key={mins}
                      onClick={() => updateSetting('focusTimerMinutes', mins)}
                      className={`py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                        isSelected
                          ? 'bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.15)]'
                          : 'liquid-glass border border-white/10 text-white/50 hover:text-white hover:border-white/25'
                      }`}
                    >
                      {mins}m
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active parameters */}
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5 shadow-xl">
              <div className="flex items-center gap-3 pb-4 border-b border-white/8">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Sliders className="w-4 h-4 text-white/60" />
                </div>
                <div>
                  <h3 className="text-base font-serif text-white">Active Parameters</h3>
                  <span className="text-[11px] text-white/40 font-mono">Live engine state</span>
                </div>
              </div>

              <div className="space-y-0">
                {[
                  { label: 'Typography', val: settings.isDyslexicFont ? 'OpenDyslexic' : 'System Sans' },
                  { label: 'Font Scale', val: `${settings.fontSize}px` },
                  { label: 'Line Spacing', val: `${settings.lineHeight.toFixed(1)}×` },
                  { label: 'Letter Spacing', val: `${settings.letterSpacing}px` },
                  { label: 'Overlay', val: settings.overlayColor.toUpperCase() },
                  { label: 'Syllables', val: settings.syllableHighlight ? 'On' : 'Off', flag: settings.syllableHighlight },
                  { label: 'Ruler', val: settings.readingRuler ? 'On' : 'Off', flag: settings.readingRuler },
                  { label: 'Sensory Mode', val: settings.sensoryMode ? 'Active' : 'Off', flag: settings.sensoryMode },
                ].map(({ label, val, flag }) => (
                  <div key={label} className="flex justify-between items-center py-2.5 border-b border-white/5 text-xs gap-2 last:border-none">
                    <span className="text-white/50 font-medium">{label}</span>
                    <span className={`font-mono font-semibold ${flag === true ? 'text-emerald-400' : flag === false ? 'text-white/30' : 'text-white/80'}`}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              {settings.profile && (
                <button
                  onClick={() => updateSetting('profile', null)}
                  className="w-full py-2.5 rounded-xl liquid-glass border border-white/10 hover:border-white/20 text-white/40 hover:text-white text-xs font-mono transition-all"
                >
                  Reset to defaults
                </button>
              )}
            </div>

            {/* Privacy footnote */}
            <div className="px-4 py-3 rounded-2xl border border-white/6 text-white/30 text-[11px] font-mono flex items-start gap-2 leading-relaxed">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-white/20" />
              All settings are saved to localStorage. No server contact, no accounts, no tracking.
            </div>
          </motion.div>

        </div>
      </div>
    </AppShell>
  );
}
