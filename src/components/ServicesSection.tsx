import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
      tag: "Engine 01",
      title: "Dynamic Formatting",
      howItWorks: "Instantly converts standard PDFs into OpenDyslexic fonts with customized line spacing.",
      benefit: "Reduces visual crowding and makes reading fluid and accessible.",
      link: "/feature/formatting"
    },
    {
      video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
      tag: "Engine 02",
      title: "Cognitive Simplification",
      howItWorks: "AI analyzes dense chapters and extracts core concepts into clean, structured bullet points.",
      benefit: "Prevents cognitive overload and dramatically boosts retention.",
      link: "/feature/simplification"
    },
    {
      video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4",
      tag: "Engine 03",
      title: "Sensory-Friendly Mode",
      howItWorks: "Strips away bright colors and UI clutter, applying a muted, calming color palette.",
      benefit: "Fosters a deep \"flow state\" and minimizes digital distractions.",
      link: "/feature/sensory"
    }
  ];

  return (
    <div className="bg-black py-16 sm:py-28 md:py-40 px-4 sm:px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-end mb-10 sm:mb-16 md:mb-20"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full liquid-glass border border-white/10 text-white/70 text-[11px] sm:text-xs font-mono mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Core Assistive Engines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl text-white font-serif tracking-tight">
              The AI <em className="italic text-white/50">Solution</em>.
            </h2>
          </div>
          <span className="text-white/40 text-xs font-mono hidden md:block">Interactive Demonstrations</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {cards.map((card, index) => (
            <Link to={card.link} key={index} className="block h-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.18 }}
                whileHover={{ y: -6 }}
                className="liquid-glass rounded-3xl overflow-hidden group flex flex-col cursor-pointer h-full border border-white/10 hover:border-white/30 transition-all duration-500 shadow-2xl"
              >
                <div className="relative aspect-video overflow-hidden">
                  <video
                    src={card.video}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                </div>
                
                <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4 sm:mb-5">
                      <span className="uppercase tracking-widest text-white/40 text-[10px] font-mono font-semibold">{card.tag}</span>
                      <div className="liquid-glass rounded-full p-2 group-hover:bg-white/20 transition-colors">
                        <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 font-bold tracking-tight">{card.title}</h3>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <h4 className="text-white/70 text-[11px] sm:text-xs font-mono uppercase tracking-wider mb-1">Mechanism</h4>
                        <p className="text-white/50 text-xs leading-relaxed">{card.howItWorks}</p>
                      </div>
                      <div>
                        <h4 className="text-white/70 text-[11px] sm:text-xs font-mono uppercase tracking-wider mb-1">Student Benefit</h4>
                        <p className="text-white/50 text-xs leading-relaxed">{card.benefit}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 pt-4 border-t border-white/5 flex items-center text-xs font-mono text-white/40 group-hover:text-white transition-colors">
                    <span>Launch full tool →</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
