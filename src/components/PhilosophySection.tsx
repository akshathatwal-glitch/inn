import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl text-white tracking-tight mb-16 md:mb-24"
        >
          The <span className="font-serif italic text-white/40">Real-World</span> Impact
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10"
          >
            <h4 className="text-white/40 text-xs tracking-widest uppercase mb-4">The Vision</h4>
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-serif italic">
              A highly practical, cloud-based platform that can be licensed to school districts globally, permanently bridging the accessibility gap in modern education.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-8 md:mb-12">
              <h4 className="text-white/40 text-xs tracking-widest uppercase mb-4">For Students</h4>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Transforms learning from a source of frustration into an empowering, independent journey.
              </p>
            </div>
            
            <div className="w-full h-px bg-white/10 mb-8 md:mb-12"></div>
            
            <div>
              <h4 className="text-white/40 text-xs tracking-widest uppercase mb-4">For Educators</h4>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Provides a scalable, software-based tool to support diverse learning needs without requiring extra hours of manual lesson prep.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
