import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useModal } from '../hooks/useModal';

export default function FeaturedVideoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openModal } = useModal();

  return (
    <div className="bg-black pt-20 md:pt-32 pb-10 px-6 overflow-hidden relative border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-7xl text-white tracking-tight mb-6"
        >
          Ready to Break the <span className="font-serif italic text-white/60">Barriers</span> in Education?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          Join us in building a future where technology adapts to the student, not the other way around.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openModal}
          className="bg-white text-black rounded-full px-10 py-4 text-base font-semibold hover:bg-gray-200 transition-colors inline-flex items-center gap-3 mb-32"
        >
          Invest in the Future <ArrowRight className="w-5 h-5" />
        </motion.button>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-white/50 text-sm mt-12 border-t border-white/10 pt-8">
          <a href="#impact" className="hover:text-white transition-colors cursor-pointer">Project Synopsis</a>
          <a href="#solution" className="hover:text-white transition-colors cursor-pointer">Prototype Link</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openModal(); }} className="hover:text-white transition-colors cursor-pointer">Presentation</a>
          <a href="#contact" className="hover:text-white transition-colors cursor-pointer">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
