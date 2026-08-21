import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Sparkles, CheckCircle2, Clock, Sliders, Zap, BookOpen, Layers, ShieldCheck, Eye } from 'lucide-react';
import AppShell from '../components/AppShell';
import { useSettings, LearnerProfile } from '../hooks/useSettings';

interface ProfileOption {
  id: LearnerProfile;
  label: string;
  tag: string;
  icon: React.ElementType;
  desc: string;
  colorScheme: {
    badge: string;
    borderActive: string;
    bgActive: string;
    iconBg: string;
    iconText: string;
    glow: string;
  };
  presets: string[];
}

const profiles: ProfileOption[] = [
  {
    id: 'dyslexia',
    label: 'Dyslexia Profile',
    tag: 'Typography Engine',
    icon: BookOpen,
    desc: 'Optimizes letterform recognition and eliminates visual crowding with phonetic segmentation.',
    colorScheme: {
      badge: 'text-amber-300 bg-amber-400/10 border-amber-400/30',
      borderActive: 'border-amber-400',
      bgActive: 'bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-transparent',
      iconBg: 'bg-amber-500/20 border-amber-400/30',
      iconText: 'text-amber-400',
      glow: 'shadow-[0_0_30px_rgba(251,191,36,0.2)]',
    },
    presets: ['OpenDyslexic typography', 'Syllable phoneme coloring', 'Warm cream overlay', '2.0x line height'],
  },
  {
    id: 'adhd',
    label: 'ADHD Attention Flow',
    tag: 'Attention Engine',
    icon: Zap,
    desc: 'Suppresses extraneous visual stimulus and establishes short, rhythmic study intervals.',
    colorScheme: {
      badge: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/30',
      borderActive: 'border-cyan-400',
      bgActive: 'bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-transparent',
      iconBg: 'bg-cyan-500/20 border-cyan-400/30',
      iconText: 'text-cyan-400',
      glow: 'shadow-[0_0_30px_rgba(34,211,238,0.2)]',
    },
    presets: ['Sensory mode active', '15m Pomodoro cycles', 'Sky contrast overlay', 'Reading ruler focus beam'],
  },
  {
    id: 'visual',
    label: 'Visual Processing',
    tag: 'Clarity Engine',
    icon: Eye,
    desc: 'Enhances font scale and stabilizes line tracking to prevent cognitive visual fatigue.',
    colorScheme: {
      badge: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/30',
      borderActive: 'border-emerald-400',
      bgActive: 'bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent',
      iconBg: 'bg-emerald-500/20 border-emerald-400/30',
      iconText: 'text-emerald-400',
      glow: 'shadow-[0_0_30px_rgba(52,211,153,0.2)]',
    },
    presets: ['20px base font scale', 'Mint calm overlay', 'Dynamic cursor ruler', '2.2x vertical spacing'],
  },
  {
    id: 'multiple',
    label: 'Combined Neuro-Profile',
    tag: 'Comprehensive Support',
    icon: Layers,
    desc: 'Comprehensive multi-modal assistive configuration for multifaceted learning profiles.',
    colorScheme: {
      badge: 'text-purple-300 bg-purple-400/10 border-purple-400/30',
      borderActive: 'border-purple-400',
      bgActive: 'bg-gradient-to-br from-purple-500/15 via-pink-500/10 to-transparent',
      iconBg: 'bg-purple-500/20 border-purple-400/30',
      iconText: 'text-purple-400',
      glow: 'shadow-[0_0_30px_rgba(192,132,252,0.2)]',
    },
    presets: ['OpenDyslexic + Syllables', 'Low-stimulation environment', '15m intervals', 'Full accessibility ruler'],
  },
];

const timerOptions = [5, 10, 15, 20, 25, 30, 45];

export default function ProfilePage() {
  const { settings, updateSetting, applyProfile } = useSettings();
  const [saved, setSaved] = useState(false);

  const handleSelectProfile = (id: LearnerProfile) => {
    applyProfile(id);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSetting('studentName', e.target.value);
  };

  const profileInitial = settings.studentName ? settings.studentName[0].toUpperCase() : 'L';

  return (
    <AppShell>
      <div className="py-6 sm:py-10 md:py-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-6 sm:space-y-10">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-white/10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-400/30 text-violet-300 text-[11px] sm:text-xs font-mono mb-3 sm:mb-4 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>Learner Identity & Archetypes</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl text-white tracking-tight font-serif">
              Learner <em className="italic bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300 bg-clip-text text-transparent">Profile</em>.
            </h1>
          </div>

          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-full px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-mono flex items-center gap-2 shadow-[0_0_25px_rgba(52,211,153,0.3)]"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Profile Presets Applied!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8">

          {/* Left Column: Name & Presets */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="xl:col-span-8 space-y-6 sm:space-y-8"
          >
            {/* Student Name Card */}
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden space-y-5 sm:space-y-6 shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-pink-500 to-amber-400" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 justify-between">
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-[0_0_25px_rgba(168,85,247,0.4)] border border-white/20 shrink-0">
                    {profileInitial}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif text-white">Student Profile</h3>
                    <p className="text-[11px] sm:text-xs text-white/50 font-mono">Persists in local storage</p>
                  </div>
                </div>

                <div className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-300 text-[11px] sm:text-xs font-mono flex items-center gap-1.5 sm:gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                  <span>Secure & Local</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-white/50 font-mono block">Student Display Name</label>
                <input
                  type="text"
                  value={settings.studentName}
                  onChange={handleNameChange}
                  placeholder="Enter student name..."
                  className="w-full bg-black/60 border border-white/15 focus:border-violet-400 rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-xs sm:text-sm font-sans transition-all"
                />
              </div>
            </div>

            {/* Profile Selection Bento Cards */}
            <div className="space-y-4 sm:space-y-5">
              <div>
                <span className="uppercase tracking-widest text-violet-400 text-[10px] sm:text-xs font-semibold font-mono block mb-1">Preset Configurations</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white">Adaptive Learning <em className="italic text-white/50">Archetypes</em></h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {profiles.map(({ id, label, tag, icon: Icon, desc, colorScheme, presets }) => {
                  const isActive = settings.profile === id;
                  return (
                    <motion.div
                      key={id}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectProfile(id)}
                      className={`liquid-glass rounded-3xl p-6 sm:p-7 border transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden shadow-lg ${
                        isActive
                          ? `${colorScheme.borderActive} ${colorScheme.bgActive} ${colorScheme.glow}`
                          : 'border-white/10 hover:border-white/25 hover:bg-white/5'
                      }`}
                    >
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex justify-between items-start">
                          <div className={`w-9 sm:w-10 h-9 sm:h-10 rounded-2xl ${colorScheme.iconBg} border flex items-center justify-center ${colorScheme.iconText} shadow-sm shrink-0`}>
                            <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
                          </div>

                          <span className={`text-[9px] sm:text-[10px] font-mono px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border ${colorScheme.badge}`}>
                            {tag}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">{label}</h4>
                            {isActive && <CheckCircle2 className={`w-4 h-4 ${colorScheme.iconText} shrink-0`} />}
                          </div>
                          <p className="text-white/60 text-xs leading-relaxed mt-1.5">{desc}</p>
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-6 pt-4 border-t border-white/10 space-y-1.5 sm:space-y-2">
                        {presets.map(p => (
                          <div key={p} className="flex items-center gap-2 text-[10px] sm:text-[11px] text-white/70 font-mono">
                            <span className={`w-1.5 h-1.5 rounded-full ${colorScheme.iconText} shadow-[0_0_8px_currentColor] shrink-0`} />
                            <span className="leading-snug">{p}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Active Settings & Focus Duration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="xl:col-span-4 space-y-6"
          >
            {/* Attention Span Timer Preset */}
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5 sm:space-y-6 relative overflow-hidden shadow-xl">
              <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-violet-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-serif text-white">Default Focus Cycle</h3>
                  <span className="text-[11px] sm:text-xs text-violet-400/80 font-mono">Attention Span Tuning</span>
                </div>
              </div>

              <p className="text-white/60 text-xs leading-relaxed">
                Configure your target study interval duration. Breaks are automatically scheduled after each cycle.
              </p>

              <div className="flex gap-2 sm:gap-2.5 flex-wrap">
                {timerOptions.map(mins => {
                  const isSelected = settings.focusTimerMinutes === mins;
                  return (
                    <button
                      key={mins}
                      onClick={() => updateSetting('focusTimerMinutes', mins)}
                      className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-mono font-semibold transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-violet-400 scale-105'
                          : 'liquid-glass text-white/70 hover:text-white border-white/10 hover:border-white/25'
                      }`}
                    >
                      {mins}m
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Configuration Summary Table with Colorful Badges */}
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5 sm:space-y-6 shadow-xl">
              <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-pink-400 shrink-0">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-serif text-white">Active Parameters</h3>
                  <span className="text-[11px] sm:text-xs text-pink-400/80 font-mono">Engine Calibration</span>
                </div>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {[
                  { label: 'Typography', val: settings.isDyslexicFont ? 'OpenDyslexic' : 'System Sans', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
                  { label: 'Font Scale', val: `${settings.fontSize}px`, color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
                  { label: 'Line Spacing', val: `${settings.lineHeight.toFixed(1)}x`, color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
                  { label: 'Letter Spacing', val: `${settings.letterSpacing}px`, color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
                  { label: 'Color Overlay', val: settings.overlayColor.toUpperCase(), color: 'text-yellow-300 bg-yellow-400/10 border-yellow-400/20' },
                  { label: 'Phoneme Syllables', val: settings.syllableHighlight ? 'Enabled' : 'Disabled', color: settings.syllableHighlight ? 'text-pink-400 bg-pink-400/10 border-pink-400/20' : 'text-white/40 bg-white/5 border-white/10' },
                  { label: 'Reading Ruler', val: settings.readingRuler ? 'Enabled' : 'Disabled', color: settings.readingRuler ? 'text-amber-300 bg-amber-400/10 border-amber-400/20' : 'text-white/40 bg-white/5 border-white/10' },
                  { label: 'Sensory Mode', val: settings.sensoryMode ? 'Active' : 'Standard', color: settings.sensoryMode ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-white/40 bg-white/5 border-white/10' },
                ].map(({ label, val, color }) => (
                  <div key={label} className="flex justify-between items-center py-1.5 border-b border-white/5 text-xs gap-2">
                    <span className="text-white/60 font-medium truncate">{label}</span>
                    <span className={`px-2 sm:px-2.5 py-0.5 rounded-full font-mono font-semibold text-[11px] border shrink-0 ${color}`}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              {settings.profile && (
                <button
                  onClick={() => updateSetting('profile', null)}
                  className="w-full py-2.5 rounded-full liquid-glass border border-white/10 hover:border-white/20 text-white/50 hover:text-white text-xs font-mono transition-all"
                >
                  Reset to Custom Settings
                </button>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </AppShell>
  );
}
