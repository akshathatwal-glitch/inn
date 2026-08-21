import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, Play, Pause, RotateCcw, Volume2, Wind, CloudRain, Music,
  Maximize2, Minimize2, Coffee, Sparkles, CheckCircle2, Heart,
  Sliders, Moon, VolumeX
} from 'lucide-react';
import AppShell from '../components/AppShell';
import { useSettings } from '../hooks/useSettings';

// ── Interactive Breathing Guide ───────────────────────────────────────────────
function BreathingGuide() {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;
    const cycle = [
      { name: 'Inhale', duration: 4000 },
      { name: 'Hold', duration: 4000 },
      { name: 'Exhale', duration: 4000 },
      { name: 'Rest', duration: 2000 },
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % cycle.length;
      setPhase(cycle[index].name as any);
    }, 3500);

    return () => clearInterval(interval);
  }, [isRunning]);

  const scale = phase === 'Inhale' ? 1.3 : phase === 'Hold' ? 1.3 : phase === 'Exhale' ? 0.85 : 1;
  const phaseColors: Record<string, string> = {
    Inhale: 'from-cyan-500/30 to-blue-500/20 border-cyan-400 text-cyan-300',
    Hold: 'from-violet-500/30 to-purple-500/20 border-violet-400 text-violet-300',
    Exhale: 'from-teal-500/30 to-emerald-500/20 border-teal-400 text-teal-300',
    Rest: 'from-white/10 to-white/5 border-white/30 text-white/70',
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center space-y-5 sm:space-y-6">
      <div className="relative flex items-center justify-center w-44 sm:w-52 h-44 sm:h-52">
        {/* Outer glowing ripple */}
        <motion.div
          animate={{ scale: [scale * 0.9, scale * 1.1, scale * 0.9], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-violet-500/10 blur-xl"
        />

        {/* Animated breathing sphere */}
        <motion.div
          animate={{ scale }}
          transition={{ duration: 3.5, ease: 'easeInOut' }}
          className={`w-32 sm:w-36 h-32 sm:h-36 rounded-full bg-gradient-to-br ${phaseColors[phase]} border shadow-2xl flex flex-col items-center justify-center backdrop-blur-md transition-colors duration-700`}
        >
          <motion.span
            key={phase}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-base sm:text-lg font-serif tracking-tight font-semibold"
          >
            {phase}
          </motion.span>
          <span className="text-[9px] sm:text-[10px] font-mono text-white/50 uppercase tracking-widest mt-0.5">4 Seconds</span>
        </motion.div>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-serif text-white">4-4-4 Grounding Anchor</p>
        <p className="text-xs text-white/50 font-mono">Synchronize respiratory pace to quiet cognitive anxiety</p>
      </div>

      <button
        onClick={() => setIsRunning(!isRunning)}
        className="px-5 py-1.5 rounded-full liquid-glass border border-white/10 hover:border-white/25 text-xs font-mono text-white/70 hover:text-white transition-all"
      >
        {isRunning ? 'Pause Anchor' : 'Resume Anchor'}
      </button>
    </div>
  );
}

// ── Pomodoro Ring Timer ───────────────────────────────────────────────────────
function PomodoroRing({ minutes, onComplete, onTick }: {
  minutes: number; onComplete?: () => void; onTick?: (elapsed: number) => void;
}) {
  const total = minutes * 60;
  const [timeLeft, setTimeLeft] = useState(total);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'work' | 'break'>('work');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setTimeLeft(minutes * 60);
    setIsActive(false);
    setPhase('work');
  }, [minutes]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          onTick?.(total - t + 1);
          return t - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeLeft === 0) {
        setIsActive(false);
        if (phase === 'work') {
          onComplete?.();
          setPhase('break');
          setTimeLeft(5 * 60);
        } else {
          setPhase('work');
          setTimeLeft(total);
        }
      }
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isActive, timeLeft]);

  const pct = 1 - timeLeft / (phase === 'work' ? total : 5 * 60);
  const size = 190;
  const sw = 7;
  const r = (size - sw * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;

  return (
    <div className="flex flex-col items-center gap-5 sm:gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Track */}
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={sw} />
          {/* Progress */}
          <circle
            cx={size/2} cy={size/2} r={r}
            fill="none"
            stroke={phase === 'work' ? 'rgba(255,255,255,0.95)' : '#34d399'}
            strokeWidth={sw}
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
            className="progress-ring-circle shadow-[0_0_25px_rgba(255,255,255,0.6)]"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest mb-1 font-mono">
            {phase === 'work' ? 'Deep Work' : 'Rest Break'}
          </span>
          <motion.span
            key={`${m}-${s}`}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-white text-3xl sm:text-4xl font-mono font-bold tracking-tight"
          >
            {m.toString().padStart(2, '0')}:{s.toString().padStart(2, '0')}
          </motion.span>
          <span className="text-white/30 text-[9px] sm:text-[10px] mt-1 font-mono flex items-center gap-1.5">
            {isActive ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Active Flow</span>
              </>
            ) : 'Ready'}
          </span>
        </div>
      </div>

      <div className="flex gap-2.5 sm:gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsActive(a => !a)}
          className="bg-white text-black rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-xs font-semibold hover:bg-gray-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          {isActive ? <><Pause className="w-3.5 h-3.5" /> Pause</> : <><Play className="w-3.5 h-3.5 fill-current" /> Start Focus</>}
        </motion.button>
        <motion.button
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
          onClick={() => { setIsActive(false); setTimeLeft(total); setPhase('work'); }}
          className="liquid-glass rounded-full p-2.5 sm:p-3 text-white/50 hover:text-white transition-colors"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="flex gap-4 text-xs font-mono text-white/40">
        <span className={phase === 'work' ? 'text-white font-bold' : ''}>● Focus ({minutes}m)</span>
        <span className={phase === 'break' ? 'text-emerald-400 font-bold' : ''}>● Rest (5m)</span>
      </div>
    </div>
  );
}

// ── Audio Visualizer Equalizer Bar ────────────────────────────────────────────
function EqualizerBars() {
  return (
    <div className="flex items-end gap-1 h-3.5 shrink-0">
      {[0.8, 1.4, 0.6, 1.2, 0.9].map((dur, i) => (
        <motion.div
          key={i}
          animate={{ height: ['25%', '100%', '35%'] }}
          transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
          className="w-0.5 bg-white rounded-full"
        />
      ))}
    </div>
  );
}

// ── Ambient Sounds ────────────────────────────────────────────────────────────
const SOUNDS = [
  { id: 'none', label: 'Silent', icon: VolumeX },
  { id: 'white', label: 'White Noise', icon: Wind },
  { id: 'rain', label: 'Rainfall', icon: CloudRain },
  { id: 'lofi', label: 'Lo-fi', icon: Music },
  { id: 'cafe', label: 'Café', icon: Coffee },
];

export default function SensoryModePage() {
  const { settings, updateSetting } = useSettings();
  const [activeSound, setActiveSound] = useState('none');
  const [activeTab, setActiveTab] = useState<'canvas' | 'breathing' | 'compare'>('canvas');
  const [dimmerLevel, setDimmerLevel] = useState(100);
  const [focusText, setFocusText] = useState('Paste your study material here and enter full-screen mode to eliminate visual distractions.\n\nSensory Mode softens harsh contrasts, suppresses digital clutter, and provides ambient soundscapes to anchor your cognitive attention.');
  const [fullscreen, setFullscreen] = useState(false);
  const [showBreak, setShowBreak] = useState(false);

  const handleComplete = () => setShowBreak(true);

  const handleTick = (elapsed: number) => {
    if (elapsed % 60 === 0) {
      updateSetting('totalFocusMinutes', settings.totalFocusMinutes + 1);
    }
  };

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
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full liquid-glass border border-white/10 text-white/70 text-[11px] sm:text-xs font-mono mb-3 sm:mb-4">
              <Eye className="w-3.5 h-3.5 text-white" />
              <span>Accessibility Engine 03</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl text-white tracking-tight font-serif">
              Sensory <em className="italic text-white/50">Focus Mode</em>.
            </h1>
          </div>

          {/* Master Sensory Switch */}
          <div className="flex items-center gap-3 sm:gap-4 liquid-glass rounded-full px-5 sm:px-6 py-2.5 sm:py-3 border border-white/10 shadow-xl">
            <span className="text-white text-xs font-semibold">Low-Stimulation Mode</span>
            <button
              onClick={() => updateSetting('sensoryMode', !settings.sensoryMode)}
              className={`w-12 sm:w-14 h-6 sm:h-7 rounded-full transition-colors relative border border-white/20 shrink-0 ${settings.sensoryMode ? 'bg-white' : 'bg-white/10'}`}
              aria-label="Toggle Low-Stimulation Mode"
            >
              <motion.div
                layout
                className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full absolute top-0.5 left-0.5 transition-colors ${settings.sensoryMode ? 'bg-black shadow-md' : 'bg-white/80'}`}
                animate={{ x: settings.sensoryMode ? 24 : 0 }}
              />
            </button>
          </div>
        </motion.div>

        {/* Interactive View Navigation with Sliding Pill */}
        <div className="flex justify-between items-center gap-3 sm:gap-4 flex-wrap">
          <div className="inline-flex p-1 rounded-full liquid-glass border border-white/10 bg-black/40 backdrop-blur-xl relative max-w-full overflow-x-auto">
            {[
              { id: 'canvas', label: 'Zen Canvas', icon: Eye },
              { id: 'breathing', label: 'Breathe', icon: Heart },
              { id: 'compare', label: 'Compare', icon: Sliders },
            ].map(({ id, label, icon: Icon }) => {
              const isSelected = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`relative z-10 flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-colors duration-300 shrink-0 ${
                    isSelected ? 'text-black font-bold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>

                  {/* Animated Sliding Pill Background */}
                  {isSelected && (
                    <motion.div
                      layoutId="sensoryTabPill"
                      className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] z-[-1]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Canvas Dimmer Controls */}
          <div className="hidden sm:flex items-center gap-3 liquid-glass rounded-full px-4 sm:px-5 py-2 border border-white/10 text-xs font-mono text-white/60">
            <Moon className="w-3.5 h-3.5 text-white/40" />
            <span>Dimmer</span>
            <input
              type="range"
              min="50"
              max="100"
              value={dimmerLevel}
              onChange={e => setDimmerLevel(parseInt(e.target.value))}
              className="w-16 sm:w-20 accent-white"
            />
            <span className="w-7 text-right font-bold text-white">{dimmerLevel}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8">

          {/* Left Column: Dynamic Interactive Viewports */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="xl:col-span-8 space-y-6"
          >
            <AnimatePresence mode="wait">
              {activeTab === 'canvas' && (
                <motion.div
                  key="canvas"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Minimalist Reader Canvas */}
                  <div className="liquid-glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-white/60" />
                        <span className="text-white text-xs sm:text-sm font-semibold tracking-tight">Distraction-Free Canvas</span>
                      </div>
                      <button
                        onClick={() => setFullscreen(true)}
                        className="liquid-glass rounded-full px-3.5 sm:px-4 py-1 sm:py-1.5 text-xs text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Full Screen</span>
                      </button>
                    </div>

                    <div
                      className="p-5 sm:p-8 transition-all duration-300"
                      style={{
                        backgroundColor: settings.sensoryMode ? '#0a0a0a' : '#000000',
                        filter: `brightness(${dimmerLevel}%)`,
                      }}
                    >
                      <textarea
                        value={focusText}
                        onChange={e => setFocusText(e.target.value)}
                        className="w-full bg-transparent border-none text-white/85 focus:outline-none resize-none min-h-[250px] sm:min-h-[300px] leading-[2] sm:leading-[2.1] text-sm sm:text-base font-sans placeholder:text-white/20"
                        style={{
                          fontFamily: settings.isDyslexicFont ? 'OpenDyslexic, sans-serif' : 'Inter, sans-serif',
                          fontSize: `${settings.fontSize}px`,
                          letterSpacing: `${settings.letterSpacing}px`,
                          lineHeight: settings.lineHeight,
                        }}
                        placeholder="Paste your reading or writing content here..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'breathing' && (
                <motion.div
                  key="breathing"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="liquid-glass rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                >
                  <BreathingGuide />
                </motion.div>
              )}

              {activeTab === 'compare' && (
                <motion.div
                  key="compare"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 shadow-2xl"
                >
                  <div>
                    <span className="uppercase tracking-widest text-white/40 text-[10px] sm:text-xs font-semibold block mb-1">Visual Comparison</span>
                    <h3 className="text-xl sm:text-2xl font-serif text-white">Cognitive Load <em className="italic text-white/50">Attenuation</em></h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-5 sm:p-6 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-3 shadow-lg"
                    >
                      <span className="text-[10px] uppercase tracking-widest text-red-400 font-mono">High Stimulus Interface</span>
                      <div className="p-3.5 sm:p-4 rounded-xl bg-red-500/20 border border-red-400/30 text-white space-y-1">
                        <p className="font-bold text-xs">⚠️ URGENT NOTIFICATION (14 ITEMS)</p>
                        <p className="text-[11px] text-white/70">Flashing banners & heavy contrast cause cognitive overload and sensory fatigue.</p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-5 sm:p-6 rounded-2xl bg-black/80 border border-emerald-400/30 space-y-3 shadow-lg"
                    >
                      <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono">Sensory Attuned Interface</span>
                      <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-white space-y-1">
                        <p className="font-bold text-xs">Quiet State Active</p>
                        <p className="text-[11px] text-white/60">Gentle luminance & zero intrusive popups foster deep flow and focus.</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ambient Soundscapes with Sliding Pill & Audio Equalizer */}
            <div className="liquid-glass rounded-3xl p-5 sm:p-8 border border-white/10 space-y-4 sm:space-y-5 shadow-xl">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-white/60" />
                  <h3 className="text-base sm:text-lg font-serif text-white">Ambient Soundscapes</h3>
                </div>
                {activeSound !== 'none' && (
                  <span className="text-[11px] sm:text-xs text-emerald-400 font-mono flex items-center gap-1.5 sm:gap-2">
                    <EqualizerBars />
                    <span>Streaming</span>
                  </span>
                )}
              </div>

              {/* Sound Selector with Sliding Selection Pill */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 relative">
                {SOUNDS.map(({ id, label, icon: Icon }) => {
                  const isSelected = activeSound === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveSound(id)}
                      className={`relative z-10 flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl text-xs font-semibold transition-all duration-300 ${
                        isSelected
                          ? 'text-black font-bold shadow-[0_0_25px_rgba(255,255,255,0.25)]'
                          : 'liquid-glass border-white/10 text-white/60 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
                      <span className="text-[11px] sm:text-xs">{label}</span>

                      {/* Sliding Pill Indicator for Active Sound */}
                      {isSelected && (
                        <motion.div
                          layoutId="activeSoundPill"
                          className="absolute inset-0 bg-white rounded-2xl z-[-1]"
                          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Pomodoro & Attention Arc Tuning */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="xl:col-span-4 space-y-6"
          >
            {/* Pomodoro Card */}
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col items-center text-center space-y-5 sm:space-y-6 shadow-2xl">
              <div className="w-full flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="text-lg sm:text-xl font-serif text-white">Focus Engine</h3>
                <span className="text-white/40 text-xs font-mono">Attention Arc</span>
              </div>

              <PomodoroRing
                minutes={settings.focusTimerMinutes}
                onComplete={handleComplete}
                onTick={handleTick}
              />

              <div className="w-full pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono text-white/40">
                <span>Session Goal</span>
                <span className="text-white">{settings.focusTimerMinutes} Minutes</span>
              </div>
            </div>

            {/* Quick Session Length Presets with Sliding Indicator */}
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 border border-white/10 space-y-4">
              <span className="uppercase tracking-widest text-white/40 text-[10px] sm:text-xs font-semibold block">Session Duration</span>
              <div className="flex gap-1.5 p-1 liquid-glass rounded-full border border-white/10 bg-black/40 relative">
                {[5, 15, 25, 45].map(m => {
                  const isSelected = settings.focusTimerMinutes === m;
                  return (
                    <button
                      key={m}
                      onClick={() => updateSetting('focusTimerMinutes', m)}
                      className={`relative z-10 flex-1 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono font-semibold transition-colors duration-300 ${
                        isSelected ? 'text-black font-bold' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <span>{m}m</span>

                      {/* Sliding Timer Pill */}
                      {isSelected && (
                        <motion.div
                          layoutId="activeTimerPill"
                          className="absolute inset-0 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] z-[-1]"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Session Stats */}
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 border border-white/10 space-y-3 sm:space-y-4 shadow-lg">
              <span className="uppercase tracking-widest text-white/40 text-[10px] sm:text-xs font-semibold block">Cumulative Metrics</span>
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-white/60">Total Focus Logged</span>
                  <span className="text-white font-mono font-bold">{settings.totalFocusMinutes} min</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-white/60">Completed Intervals</span>
                  <span className="text-white font-mono font-bold">{settings.totalSessions} sessions</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Fullscreen Focus Overlay */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col p-4 sm:p-8 md:p-16"
          >
            <div className="flex justify-between items-center mb-4 sm:mb-8 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                <span className="text-white text-[10px] sm:text-xs uppercase tracking-widest font-mono">Sensory Focus State</span>
              </div>
              <button
                onClick={() => setFullscreen(false)}
                className="liquid-glass rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-xs text-white hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Exit Fullscreen</span>
              </button>
            </div>

            <div className="flex-1 max-w-4xl mx-auto w-full">
              <textarea
                value={focusText}
                onChange={e => setFocusText(e.target.value)}
                className="w-full h-full bg-transparent border-none text-white/90 focus:outline-none resize-none leading-[2] sm:leading-[2.2] text-base sm:text-lg font-sans placeholder:text-white/20"
                style={{
                  fontFamily: settings.isDyslexicFont ? 'OpenDyslexic, sans-serif' : 'Inter, sans-serif',
                  fontSize: `${settings.fontSize + 2}px`,
                  letterSpacing: `${settings.letterSpacing}px`,
                  lineHeight: settings.lineHeight,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Break Dialog */}
      {showBreak && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="liquid-glass rounded-3xl p-6 sm:p-10 border border-white/20 text-center max-w-md space-y-5 sm:space-y-6 shadow-2xl"
          >
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              <CheckCircle2 className="w-7 sm:w-8 h-7 sm:h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif text-white">Focus Session Complete</h2>
              <p className="text-white/60 text-xs sm:text-sm">
                Rest your eyes and stretch for 5 minutes before your next study sprint.
              </p>
            </div>
            <button
              onClick={() => setShowBreak(false)}
              className="bg-white text-black rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-gray-200 transition-colors w-full"
            >
              Begin Rest Period
            </button>
          </motion.div>
        </div>
      )}
    </AppShell>
  );
}
