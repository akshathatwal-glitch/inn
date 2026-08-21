"use client";
import { Card } from "@/components/ui/card";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Users, Shield } from "lucide-react";
import { useModal } from "../../hooks/useModal";
import { Link } from "react-router-dom";

export function AboutBento() {
  const { openModal } = useModal();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-black py-16 sm:py-24 md:py-36 px-4 sm:px-6 min-h-screen relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full liquid-glass border border-white/10 text-white/70 text-[11px] sm:text-xs font-mono mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Proven Neuro-Inclusive Results</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-4 sm:mb-6 tracking-tight">
            Impact Without <em className="italic text-white/50">Boundaries</em>.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed px-2">
            Eliminating accessibility friction across 500+ classrooms with automated AI formatting and attention arc calibration.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 sm:gap-6">

          {/* Large Hero Bento Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-2 md:row-span-2"
          >
            <Card
              onClick={openModal}
              className="h-full liquid-glass rounded-3xl p-6 sm:p-10 md:p-12 flex flex-col justify-between border border-white/10 relative overflow-hidden group cursor-pointer hover:border-white/25 transition-all duration-500 shadow-2xl"
            >
              {/* Rotating Background Star Pattern */}
              <motion.svg
                width="377"
                height="368"
                className="w-[105%] max-w-[420px] fill-white/5 absolute -bottom-16 -right-16 transition-transform pointer-events-none"
                viewBox="0 0 377 368"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <path d="M179.692 5.79814C182.635 -1.93287 193.572 -1.93285 196.515 5.79816L229.505 92.466C231.206 96.9342 236.103 99.2928 240.657 97.8366L328.986 69.5929C336.865 67.0735 343.684 75.6242 339.474 82.7452L292.284 162.574C289.851 166.69 291.061 171.99 295.038 174.642L372.192 226.091C379.075 230.68 376.641 241.343 368.449 242.491L276.613 255.369C271.878 256.033 268.489 260.283 268.895 265.047L276.776 357.445C277.479 365.688 267.625 370.433 261.619 364.744L194.293 300.973C190.821 297.686 185.386 297.686 181.914 300.973L114.588 364.744C108.582 370.433 98.7281 365.688 99.4311 357.445L107.312 265.047C107.718 260.283 104.329 256.033 99.5941 255.369L7.7582 242.491C-0.433812 241.343 -2.86746 230.68 4.01488 226.091L81.1687 174.642C85.1465 171.99 86.3561 166.69 83.9231 162.574L36.7325 82.7452C32.523 75.6242 39.342 67.0735 47.2212 69.5929L135.55 97.8366C140.104 99.2928 145.001 96.9342 146.702 92.4659L179.692 5.79814Z" />
              </motion.svg>

              <div className="space-y-4 sm:space-y-6 relative z-10">
                <div className="inline-flex px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full liquid-glass border border-white/10 text-white text-[10px] font-mono uppercase tracking-widest">
                  Global Adoption
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
                  Universal <em className="italic text-white/50">Access</em> Across Classrooms.
                </h3>
              </div>

              <div className="mt-8 sm:mt-16 relative z-10 space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed max-w-md">
                  Over <span className="text-white font-bold">12,000+ hours</span> of study time transformed for students with Dyslexia, ADHD, and visual processing differences.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-white/40 group-hover:text-white transition-colors">
                  <span>Explore impact metrics</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Growth Stat Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card
              onClick={openModal}
              className="liquid-glass border border-white/10 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between cursor-pointer hover:border-white/25 transition-all duration-300 group h-full shadow-lg"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  Comprehension Speed
                </span>
                <TrendingUp className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </div>

              <div className="my-4 sm:my-6">
                <motion.span
                  className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-white block"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  +450%
                </motion.span>
                <div className="h-1.5 w-full bg-white/10 rounded-full mt-3 sm:mt-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '85%' } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <p className="text-[11px] sm:text-xs text-white/40 font-mono">Verified across pilot groups</p>
            </Card>
          </motion.div>

          {/* Adaptive AI Engine Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card
              onClick={openModal}
              className="liquid-glass border border-white/10 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between cursor-pointer hover:border-white/25 transition-all duration-300 group h-full shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Stable v2.4</span>
              </div>

              <div className="my-3 sm:my-4">
                <h4 className="text-lg sm:text-xl font-bold tracking-tight">Zero Latency</h4>
                <p className="text-xs text-white/50 font-mono mt-1">Real-time local processing</p>
              </div>

              <p className="text-xs text-white/40 leading-relaxed">Runs on student Chromebooks & tablets without cloud delays.</p>
            </Card>
          </motion.div>

          {/* Community Full-Width Row Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-2"
          >
            <Link to="/dashboard" className="block">
              <Card className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer hover:border-white/30 transition-all duration-500 group overflow-hidden relative shadow-xl gap-4">
                <div className="space-y-1.5 sm:space-y-2 relative z-10 text-white">
                  <div className="inline-flex items-center gap-1.5 text-xs text-white/50 font-mono">
                    <Users className="w-3.5 h-3.5 text-white" />
                    <span>Join 12,000+ Learners</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-serif tracking-tight">
                    Launch your <em className="italic text-white/60">neuro-inclusive</em> journey.
                  </h4>
                </div>
                <div className="w-12 sm:w-14 h-12 sm:h-14 shrink-0 rounded-full flex items-center justify-center bg-white text-black group-hover:scale-110 transition-all duration-500 relative z-10 shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                  <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6" />
                </div>
              </Card>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default AboutBento;
