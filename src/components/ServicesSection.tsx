import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, Sliders, Sparkles, Volume2, VolumeX, Eye, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// ── Interactive Specimen 01: Tactile Typographic Shifter ─────────────────────
function TypographySpecimen() {
  const [spacing, setSpacing] = useState(2);
  const [isWeighted, setIsWeighted] = useState(false);

  const sampleWords = [
    { text: "Knowledge", syllable: ["Know", "ledge"] },
    { text: "should", syllable: ["should"] },
    { text: "adapt", syllable: ["a", "dapt"] },
    { text: "to", syllable: ["to"] },
    { text: "every", syllable: ["ev", "ery"] },
    { text: "individual", syllable: ["in", "di", "vid", "u", "al"] },
  ];

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-neutral-950/80 border border-white/10 flex flex-col justify-between h-64 select-none relative overflow-hidden group">
      {/* Live Text Specimen */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[11px] font-mono text-white/40 border-b border-white/10 pb-2">
          <span>SPECIMEN // 01</span>
          <span className="text-white/60">{isWeighted ? 'Weighted Baselines' : 'Neutral Tracking'}</span>
        </div>

        <p
          className={`text-lg sm:text-xl text-white/90 transition-all duration-300 ${isWeighted ? 'font-dyslexic tracking-wide' : 'font-sans'}`}
          style={{
            lineHeight: `${1.4 + spacing * 0.25}`,
            letterSpacing: `${spacing * 0.8}px`
          }}
        >
          {sampleWords.map((w, idx) => (
            <span key={idx} className="inline-block mr-1.5">
              {isWeighted ? (
                w.syllable.map((s, sIdx) => (
                  <span key={sIdx} className={sIdx % 2 === 0 ? 'text-amber-200' : 'text-orange-300'}>
                    {s}
                  </span>
                ))
              ) : (
                w.text
              )}
            </span>
          ))}
        </p>
      </div>

      {/* Tactile Control Bar */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsWeighted(!isWeighted); }}
            className={`px-3 py-1 rounded-full border transition-all text-[11px] ${isWeighted
                ? 'bg-white text-black border-white font-semibold'
                : 'bg-white/5 border-white/15 text-white/60 hover:text-white'
              }`}
          >
            {isWeighted ? 'Phonemes: ON' : 'Phonemes: OFF'}
          </button>
        </div>

        <div className="flex items-center gap-2 text-white/50 text-[11px]">
          <span>Kerning</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((val) => (
              <button
                key={val}
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSpacing(val); }}
                className={`w-5 h-5 rounded flex items-center justify-center text-[10px] transition-all ${spacing === val ? 'bg-white/20 text-white font-bold' : 'bg-white/5 text-white/40 hover:text-white'
                  }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Interactive Specimen 02: Real-time Synthesizer & Concept Map ─────────────
function SynthesizerSpecimen() {
  const [stage, setStage] = useState<'dense' | 'extracted'>('extracted');

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-neutral-950/80 border border-white/10 flex flex-col justify-between h-64 select-none relative overflow-hidden">
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[11px] font-mono text-white/40 border-b border-white/10 pb-2">
          <span>SPECIMEN // 02</span>
          <span className="text-white/60">{stage === 'dense' ? 'Raw Chapter (240w)' : '3 Core Atoms'}</span>
        </div>

        <AnimatePresence mode="wait">
          {stage === 'dense' ? (
            <motion.p
              key="dense"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs sm:text-[13px] text-white/50 leading-relaxed font-mono line-clamp-4 pt-1"
            >
              Mitochondria generate most biochemical energy through oxidative phosphorylation inside adenosine triphosphate (ATP) molecules, transferring metabolic power across eukaryotic cellular structures...
            </motion.p>
          ) : (
            <motion.div
              key="extracted"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="space-y-2 pt-1"
            >
              {[
                "1. Generates cellular biochemical power",
                "2. Stores energy within ATP molecules",
                "3. Inherited strictly via maternal lineage"
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-white/90 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  <span className="truncate">{point}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stage Switcher */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] font-mono">
        <span className="text-white/40">Cognitive Load</span>
        <div className="flex p-0.5 rounded-full bg-white/5 border border-white/10">
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setStage('dense'); }}
            className={`px-3 py-0.5 rounded-full transition-all ${stage === 'dense' ? 'bg-white text-black font-semibold' : 'text-white/40 hover:text-white'
              }`}
          >
            Dense
          </button>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setStage('extracted'); }}
            className={`px-3 py-0.5 rounded-full transition-all ${stage === 'extracted' ? 'bg-white text-black font-semibold' : 'text-white/40 hover:text-white'
              }`}
          >
            Simplified
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Interactive Specimen 03: Tactile Zen Waveform & Breathing Pace ───────────
function SensorySpecimen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cadence, setCadence] = useState<'4-4-4' | 'calm'>('4-4-4');

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-neutral-950/80 border border-white/10 flex flex-col justify-between h-64 select-none relative overflow-hidden">
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[11px] font-mono text-white/40 border-b border-white/10 pb-2">
          <span>SPECIMEN // 03</span>
          <span className="text-white/60">{isPlaying ? 'Binaural Drift 432Hz' : 'Muted Sanctuary'}</span>
        </div>

        {/* Minimalist Waveform Rhythm */}
        <div className="h-16 flex items-center justify-center gap-1.5 px-4">
          {[24, 48, 18, 64, 32, 56, 20, 44, 60, 28, 52, 16, 40].map((h, i) => (
            <motion.span
              key={i}
              animate={{
                height: isPlaying ? [10, h, 8] : 8,
                opacity: isPlaying ? [0.4, 1, 0.4] : 0.25,
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.08,
              }}
              className="w-1 rounded-full bg-white transition-all"
            />
          ))}
        </div>
      </div>

      {/* Sound & Cadence Switch */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] font-mono">
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsPlaying(!isPlaying); }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 transition-all"
        >
          {isPlaying ? <Volume2 className="w-3.5 h-3.5 text-white" /> : <VolumeX className="w-3.5 h-3.5 text-white/40" />}
          <span>{isPlaying ? 'Soundscape Active' : 'Enable Audio'}</span>
        </button>

        <span className="text-white/40">4-4-4 Grounding</span>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pillars = [
    {
      num: "01",
      title: "Dynamic Formatting",
      subtitle: "Visual Typography & Spatial Relief",
      desc: "Instantly reforms rigid textbook typography with customizable letter weights, contrast tints, and eye-tracking rulers.",
      component: <TypographySpecimen />,
      link: "/feature/formatting",
    },
    {
      num: "02",
      title: "Cognitive Simplification",
      subtitle: "Semantic Deconstruction",
      desc: "Synthesizes dense academic prose into spatial mind maps and atomic takeaway cards without losing core conceptual depth.",
      component: <SynthesizerSpecimen />,
      link: "/feature/simplification",
    },
    {
      num: "03",
      title: "Sensory-Friendly Focus",
      subtitle: "Neuro-Quiet Environment",
      desc: "Suppresses digital overstimulation, anchoring cognitive attention with rhythmic respiratory cycles and low-contrast palettes.",
      component: <SensorySpecimen />,
      link: "/feature/sensory",
    },
  ];

  return (
    <section className="bg-black py-24 sm:py-32 md:py-44 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/10 mb-12 sm:mb-16"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest mb-3">
              <span>● Architecture</span>
              <span>/</span>
              <span>Assistive Engines</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight">
              Adaptive by <em className="italic text-white/50">Design</em>.
            </h2>
          </div>

          <p className="text-white/60 text-xs sm:text-sm max-w-sm leading-relaxed font-sans">
            Every engine is designed as a standalone, tactile instrument. Interact with the live specimens below to test their mechanics.
          </p>
        </motion.div>

        {/* 3 Editorial Pillar Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-neutral-900/40 border border-white/10 hover:border-white/25 transition-all duration-300 group relative"
            >
              {/* Top Header */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-white/30 font-semibold">{pillar.num}</span>
                  <Link
                    to={pillar.link}
                    className="w-8 h-8 rounded-full border border-white/10 group-hover:border-white/30 group-hover:bg-white group-hover:text-black flex items-center justify-center text-white/60 transition-all duration-300"
                    aria-label={`Open ${pillar.title}`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>

                {/* Interactive Tactile Specimen */}
                {pillar.component}

                {/* Title & Copy */}
                <div className="space-y-2 pt-2">
                  <h3 className="text-xl sm:text-2xl font-serif text-white tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-mono text-white/40 uppercase tracking-wider">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed pt-1">
                    {pillar.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Interactive Link */}
              <div className="pt-6 mt-6 border-t border-white/5">
                <Link
                  to={pillar.link}
                  className="inline-flex items-center gap-2 text-xs font-mono text-white/50 group-hover:text-white transition-colors"
                >
                  <span>Launch working tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
