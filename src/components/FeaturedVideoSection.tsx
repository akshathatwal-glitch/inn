import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useModal } from '../hooks/useModal';
import { Link } from 'react-router-dom';

export default function FeaturedVideoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { openModal } = useModal();

  return (
    <div className="bg-black pt-16 sm:pt-24 md:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden relative border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full liquid-glass border border-white/10 text-white/70 text-[11px] sm:text-xs font-mono mb-4 sm:mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Next-Generation Accessibility</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-serif tracking-tight mb-4 sm:mb-6 leading-tight"
        >
          Ready to Break the <em className="italic text-white/50">Barriers</em> in Education?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/70 text-sm sm:text-base md:text-xl leading-relaxed mb-8 sm:mb-12 max-w-2xl mx-auto px-2"
        >
          Join us in building a future where learning technology adapts dynamically to the student, not the other way around.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16 sm:mb-28 px-4"
        >
          <Link
            to="/dashboard"
            className="bg-white text-black rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold hover:bg-gray-200 transition-all inline-flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 w-full sm:w-auto"
          >
            <span>Open AdaptLearn Platform</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={openModal}
            className="liquid-glass rounded-full px-7 sm:px-8 py-3.5 sm:py-4 text-white text-xs sm:text-sm font-medium hover:bg-white/10 transition-all border border-white/15 hover:border-white/30 w-full sm:w-auto"
          >
            Launch Pitch Simulator
          </button>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12 text-white/40 text-[11px] sm:text-xs font-mono border-t border-white/10 pt-6 sm:pt-8">
          <Link to="/dashboard" className="hover:text-white transition-colors">Workspace</Link>
          <Link to="/feature/library" className="hover:text-white transition-colors">Content Library</Link>
          <Link to="/feature/formatting" className="hover:text-white transition-colors">Typography Engine</Link>
          <Link to="/feature/simplification" className="hover:text-white transition-colors">Cognitive Deconstruction</Link>
          <Link to="/feature/sensory" className="hover:text-white transition-colors">Sensory Focus</Link>
        </div>
      </div>
    </div>
  );
}
