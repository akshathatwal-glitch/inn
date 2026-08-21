import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Type, Brain, Eye, BookOpen, User, Play, Pause,
  RotateCcw, Flame, Clock, BookMarked, Sparkles,
  ArrowUpRight, TrendingUp, CheckCircle2, ChevronRight
} from 'lucide-react';
import AppShell from '../components/AppShell';
import { useSettings } from '../hooks/useSettings';

// ── Progress Ring ────────────────────────────────────────────────────────────
function ProgressRing({
  value, max, size = 84, strokeWidth = 6, label, sub
}: {
  value: number; max: number; size?: number;
  strokeWidth?: number; label: string; sub: string;
}) {
  const r = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const offset = circumference * (1 - pct);

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="progress-ring-circle shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white text-base sm:text-lg font-bold tracking-tight">{value}</span>
        </div>
      </div>
      <div>
        <p className="text-white text-[11px] sm:text-xs font-semibold tracking-tight leading-snug">{label}</p>
        <p className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-wider font-mono">{sub}</p>
      </div>
    </div>
  );
}

// ── Focus Session Pomodoro ───────────────────────────────────────────────────
function CompactTimer({ minutes }: { minutes: number }) {
  const total = minutes * 60;
  const [timeLeft, setTimeLeft] = useState(total);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeLeft === 0) setIsActive(false);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isActive, timeLeft]);

  useEffect(() => { setTimeLeft(minutes * 60); }, [minutes]);

  const pct = 1 - timeLeft / total;
  const size = 150;
  const r = 58;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={7} />
          <circle
            cx={size/2} cy={size/2} r={r} fill="none"
            stroke="white"
            strokeWidth={7}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="progress-ring-circle shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white text-2xl sm:text-3xl font-mono font-bold tracking-tight">
            {m.toString().padStart(2, '0')}:{s.toString().padStart(2, '0')}
          </span>
          <span className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest mt-1">
            {isActive ? 'Session Active' : 'Ready'}
          </span>
        </div>
      </div>

      <div className="flex gap-2.5 w-full justify-center">
        <button
          onClick={() => setIsActive(a => !a)}
          className="bg-white text-black rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-semibold hover:bg-gray-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          {isActive ? <><Pause className="w-3.5 h-3.5" /> Pause</> : <><Play className="w-3.5 h-3.5 fill-current" /> Start</>}
        </button>
        <button
          onClick={() => { setIsActive(false); setTimeLeft(total); }}
          className="liquid-glass rounded-full p-2 sm:p-2.5 text-white/50 hover:text-white transition-colors"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── Bento Feature Card ───────────────────────────────────────────────────────
function BentoFeatureCard({
  to, icon: Icon, title, tag, desc
}: {
  to: string; icon: React.ElementType; title: string; tag: string; desc: string;
}) {
  return (
    <Link to={to} className="h-full block">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/25 transition-all group flex flex-col justify-between h-full relative overflow-hidden cursor-pointer shadow-lg"
      >
        <div className="space-y-3 sm:space-y-4">
          <div className="flex justify-between items-start">
            <span className="uppercase tracking-widest text-white/40 text-[10px] sm:text-xs font-semibold">{tag}</span>
            <div className="liquid-glass rounded-full p-2 group-hover:bg-white/15 transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
            <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
          </div>
          <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">{title}</h3>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{desc}</p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-medium text-white/40 group-hover:text-white transition-colors">
          <span>Open module</span>
          <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.div>
    </Link>
  );
}

export default function DashboardPage() {
  const { settings, updateSetting } = useSettings();

  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('adaptlearn_last_visit');
    if (lastVisit !== today) {
      localStorage.setItem('adaptlearn_last_visit', today);
      updateSetting('totalSessions', settings.totalSessions + 1);
    }
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const recentActivity = [
    { icon: Type, label: 'Formatted biology textbook chapter', tag: 'Text Engine', time: '2h ago' },
    { icon: Brain, label: 'Extracted 3 concepts from French Revolution', tag: 'Simplification', time: '4h ago' },
    { icon: Eye, label: 'Completed 25-minute deep focus session', tag: 'Focus Mode', time: 'Yesterday' },
    { icon: BookOpen, label: 'Read "The Water Cycle" with dyslexic font', tag: 'Library', time: 'Yesterday' },
  ];

  return (
    <AppShell>
      <div className="py-6 sm:py-10 md:py-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-8 sm:space-y-12">

        {/* Page Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-white/10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full liquid-glass border border-white/10 text-white/70 text-[11px] sm:text-xs font-mono mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>{greeting}, {settings.studentName}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl text-white tracking-tight font-serif">
              Empowering Your <em className="italic text-white/50">Unique Mind</em>.
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="liquid-glass rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center gap-2 border border-white/10">
              <Flame className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-orange-400" />
              <span className="text-white text-xs font-semibold">{settings.streakDays} Day Streak</span>
            </div>
            {settings.profile && (
              <div className="liquid-glass rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center gap-2 border border-white/10">
                <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400" />
                <span className="text-white/80 text-xs font-mono capitalize">{settings.profile} Mode</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Progress Overview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 liquid-glass rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 flex flex-col justify-between relative overflow-hidden shadow-xl"
          >
            <div className="flex justify-between items-start mb-6 sm:mb-8">
              <div>
                <span className="uppercase tracking-widest text-white/40 text-[10px] sm:text-xs font-semibold block mb-1 sm:mb-2">Metrics</span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-white">Your Weekly <em className="italic text-white/60">Milestones</em></h2>
              </div>
              <div className="liquid-glass rounded-full p-2.5 sm:p-3">
                <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5 text-white/70" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-6 py-6 border-y border-white/5">
              <ProgressRing value={settings.totalSessions} max={20} label="Reading Sessions" sub="/ 20 target" size={76} />
              <ProgressRing value={settings.totalConceptsMastered} max={50} label="Concepts Mastered" sub="/ 50 goal" size={76} />
              <ProgressRing value={settings.totalFocusMinutes} max={300} label="Focus Minutes" sub="this week" size={76} />
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-white/60 text-xs sm:text-sm max-w-md">
                Adaptive features have reduced cognitive load and visual strain by <span className="text-white font-bold">~45%</span> this week.
              </p>
              <Link
                to="/feature/profile"
                className="liquid-glass rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors shrink-0 w-full sm:w-auto text-center"
              >
                Fine-tune Settings →
              </Link>
            </div>
          </motion.div>

          {/* Today's Focus Timer Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between items-center text-center shadow-xl"
          >
            <div className="w-full flex justify-between items-center mb-4">
              <span className="uppercase tracking-widest text-white/40 text-[10px] sm:text-xs font-semibold">Focus Engine</span>
              <BookMarked className="w-4 h-4 text-white/40" />
            </div>
            
            <CompactTimer minutes={settings.focusTimerMinutes} />

            <div className="mt-4 sm:mt-6 pt-4 border-t border-white/5 w-full">
              <p className="text-white/40 text-[11px] sm:text-xs font-mono">
                {settings.focusTimerMinutes}m session configured for attention flow
              </p>
            </div>
          </motion.div>

        </div>

        {/* Feature Modules Row */}
        <div>
          <div className="flex justify-between items-end mb-6 sm:mb-8">
            <div>
              <span className="uppercase tracking-widest text-white/40 text-[10px] sm:text-xs font-semibold block mb-1">Core Engines</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-serif tracking-tight">Adaptive <em className="italic text-white/50">Tooling</em></h2>
            </div>
            <span className="text-white/40 text-xs font-mono hidden md:block">Select an engine to launch</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            <BentoFeatureCard
              to="/feature/formatting"
              icon={Type}
              tag="Engine 01"
              title="Dynamic Formatting"
              desc="Transform dense PDFs with OpenDyslexic typography, syllable color-coding, and custom reading rulers."
            />
            <BentoFeatureCard
              to="/feature/simplification"
              icon={Brain}
              tag="Engine 02"
              title="Cognitive Simplification"
              desc="Extract high-impact concepts and generate interactive mind maps to eliminate cognitive overload."
            />
            <div className="sm:col-span-2 md:col-span-1">
              <BentoFeatureCard
                to="/feature/sensory"
                icon={Eye}
                tag="Engine 03"
                title="Sensory Focus Mode"
                desc="Strip away high-contrast distractions with ambient soundscapes and tailored Pomodoro sessions."
              />
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-white/50" />
              <h3 className="text-lg sm:text-xl font-serif text-white">Recent Activity</h3>
            </div>
            <Link to="/feature/library" className="text-white/40 hover:text-white text-xs font-mono transition-colors">
              View Library →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-white/15 transition-all">
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <a.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 text-xs sm:text-sm font-medium truncate">{a.label}</p>
                  <p className="text-white/40 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider">{a.tag}</p>
                </div>
                <span className="text-white/30 text-[11px] sm:text-xs font-mono shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </AppShell>
  );
}
