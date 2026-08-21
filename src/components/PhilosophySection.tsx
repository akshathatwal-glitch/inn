import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, GraduationCap, School, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    {
      stat: "1 in 5",
      desc: "students has a language-based learning disability such as Dyslexia.",
    },
    {
      stat: "10%+",
      desc: "of school-aged children navigate ADHD or attention regulation challenges daily.",
    },
    {
      stat: "90%",
      desc: "of classroom content is delivered in a single, fixed, non-adaptive format.",
    },
  ];

  const solutions = [
    {
      engine: "Engine 01",
      title: "Dynamic Formatting",
      desc: "Converts rigid PDFs to OpenDyslexic typography with phonetic syllable color coding and interactive reading rulers in real time.",
      link: "/feature/formatting",
    },
    {
      engine: "Engine 02",
      title: "AI Simplification",
      desc: "NLP breaks dense academic chapters into spatial mind maps and structured 3-bullet takeaways, eliminating cognitive overload.",
      link: "/feature/simplification",
    },
    {
      engine: "Engine 03",
      title: "Sensory Focus",
      desc: "Strips away bright UI, applies low-stimulus palettes, integrates 4-4-4 grounding anchors and tailored Pomodoro attention cycles.",
      link: "/feature/sensory",
    },
  ];

  return (
    <div className="bg-black py-16 sm:py-28 md:py-40 px-4 sm:px-6 overflow-hidden relative">
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10 sm:pb-14 border-b border-white/10 mb-10 sm:mb-14"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest mb-3">
              <span>● The Case for Adaptation</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-serif tracking-tight">
              The <em className="italic text-white/50">Real-World</em> Impact.
            </h2>
          </div>
          <p className="text-white/50 text-xs sm:text-sm max-w-sm font-mono leading-relaxed">
            One in five students is held back by inflexible classroom materials. AdaptLearn exists to fix that.
          </p>
        </motion.div>

        {/* Problem Stat Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14"
        >
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col gap-3 relative overflow-hidden group hover:border-white/20 transition-all"
            >
              <AlertTriangle className="w-4 h-4 text-white/30" />
              <span className="text-4xl sm:text-5xl font-serif text-white font-bold tracking-tight">{p.stat}</span>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-4 mb-10 sm:mb-14"
        >
          <div className="flex-1 h-px bg-white/10" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[11px] font-mono uppercase tracking-widest">
            <CheckCircle2 className="w-3 h-3" />
            <span>AdaptLearn's Answer</span>
          </div>
          <div className="flex-1 h-px bg-white/10" />
        </motion.div>

        {/* Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {solutions.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.12 }}
            >
              <Link to={s.link} className="block h-full">
                <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/25 transition-all h-full flex flex-col justify-between group cursor-pointer">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{s.engine}</span>
                    <h3 className="text-lg sm:text-xl font-serif text-white tracking-tight">{s.title}</h3>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="pt-5 mt-5 border-t border-white/5 flex items-center gap-1.5 text-xs font-mono text-white/40 group-hover:text-white transition-colors">
                    <span>Try it live</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 sm:mt-14 p-8 sm:p-10 rounded-3xl border border-white/10 liquid-glass flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest">
              <GraduationCap className="w-4 h-4 text-white" />
              <span>Vision for Inclusive Education</span>
            </div>
            <p className="text-white/90 text-lg sm:text-2xl font-serif leading-relaxed max-w-2xl">
              A future where the <em className="italic text-white/60">learning environment adapts to every student</em>, not the other way around.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2 text-xs font-mono shrink-0">
            <span className="text-emerald-400">● WCAG AAA Compliant</span>
            <span className="text-white/40">Zero cloud dependence</span>
            <span className="text-white/40">100% privacy-first</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
