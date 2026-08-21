import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none"></div>
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-sm tracking-widest uppercase mb-6"
        >
          The Problem
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight mb-12"
        >
          The <span className="font-serif italic text-white/60">"One-Size-Fits-All"</span> Barrier
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl text-white mb-4 font-medium">The Reality</h3>
            <p className="text-white/60 text-lg leading-relaxed">
              Standard textbooks and digital documents are not built for neurodivergent minds.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-xl text-white mb-4 font-medium">The Challenge</h3>
            <p className="text-white/60 text-lg leading-relaxed">
              Dense paragraphs, harsh contrasts, and rigid formatting lead to cognitive overload and anxiety for students with Dyslexia, ADHD, and visual processing differences.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
