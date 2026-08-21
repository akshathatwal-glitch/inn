import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
      tag: "Feature",
      title: "Dynamic Formatting",
      howItWorks: "Instantly converts standard PDFs into OpenDyslexic fonts with customized line spacing.",
      benefit: "Reduces visual crowding and makes reading fluid and accessible.",
      link: "/feature/formatting"
    },
    {
      video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
      tag: "Feature",
      title: "Cognitive Simplification",
      howItWorks: "AI analyzes dense chapters and extracts core concepts into clean, structured bullet points.",
      benefit: "Prevents cognitive overload and dramatically boosts retention.",
      link: "/feature/simplification"
    },
    {
      video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4",
      tag: "Feature",
      title: "Sensory-Friendly Mode",
      howItWorks: "Strips away bright colors and UI clutter, applying a muted, calming color palette.",
      benefit: "Fosters a deep \"flow state\" and minimizes digital distractions.",
      link: "/feature/sensory"
    }
  ];

  return (
    <div className="bg-black py-28 md:py-40 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex justify-between items-end mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight">The AI Solution</h2>
          <span className="text-white/40 text-sm hidden md:block">Core Features</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <Link to={card.link} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="liquid-glass rounded-3xl overflow-hidden group flex flex-col cursor-pointer h-full"
              >
                <div className="relative aspect-video overflow-hidden">
                  <video
                    src={card.video}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                </div>
                
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <span className="uppercase tracking-widest text-white/40 text-xs">{card.tag}</span>
                    <div className="liquid-glass rounded-full p-2 group-hover:bg-white/10 transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight">{card.title}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white/80 text-sm font-semibold mb-1">How It Works</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{card.howItWorks}</p>
                    </div>
                    <div>
                      <h4 className="text-white/80 text-sm font-semibold mb-1">The Benefit</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{card.benefit}</p>
                    </div>
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
