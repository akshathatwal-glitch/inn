import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, GraduationCap, School } from 'lucide-react';

export default function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="bg-black py-16 sm:py-28 md:py-40 px-4 sm:px-6 overflow-hidden relative">
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full liquid-glass border border-white/10 text-white/70 text-[11px] sm:text-xs font-mono mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Inclusive Mission</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-serif tracking-tight">
            The <em className="italic text-white/50">Real-World</em> Impact.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-stretch">
          {/* Vision Bento Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-between liquid-glass rounded-3xl p-6 sm:p-10 md:p-14 border border-white/10 shadow-2xl"
          >
            <div>
              <span className="text-white/40 text-[10px] sm:text-xs tracking-widest uppercase font-mono mb-3 sm:mb-4 block">The Vision</span>
              <p className="text-white/90 text-lg sm:text-2xl md:text-3xl leading-relaxed font-serif">
                A highly practical, cloud-based engine that can be licensed to school districts globally, permanently <em className="italic text-white/60">bridging the accessibility divide</em> in modern education.
              </p>
            </div>
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
              <span>Universal Access Standard</span>
              <span className="text-emerald-400">● 100% Compliant</span>
            </div>
          </motion.div>

          {/* Student & Educator Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-between space-y-4 sm:space-y-6"
          >
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all shadow-lg">
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-white/80 text-sm font-semibold">For Students</h4>
              </div>
              <p className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed">
                Transforms reading from a source of frustration and fatigue into an empowering, independent journey.
              </p>
            </div>
            
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all shadow-lg">
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                  <School className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-white/80 text-sm font-semibold">For Educators</h4>
              </div>
              <p className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed">
                Provides a scalable, software-based tool to support diverse learning needs without requiring extra hours of manual lesson preparation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
