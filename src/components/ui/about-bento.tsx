"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import { ArrowRight } from "lucide-react";
import { useModal } from "../../hooks/useModal";

export function AboutBento() {
  const { openModal } = useModal();

  return (
    <section className="bg-black py-16 px-6 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            About Our Impact
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            We've helped thousands of learners and educators achieve their
            goals through inclusive solutions and dedicated support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card onClick={openModal} className="md:col-span-2 md:row-span-2 bg-neutral-900/50 backdrop-blur-sm rounded-xl p-12 flex flex-col justify-between border border-white/10 relative overflow-hidden group cursor-pointer hover:bg-neutral-900/70 transition-colors">
            <svg
              width="377"
              height="368"
              className="w-[105%] max-w-[400px] fill-white/5 absolute -bottom-16 group-hover:rotate-180 duration-[2000ms] ease-in -right-16 transition-transform"
              viewBox="0 0 377 368"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M179.692 5.79814C182.635 -1.93287 193.572 -1.93285 196.515 5.79816L229.505 92.466C231.206 96.9342 236.103 99.2928 240.657 97.8366L328.986 69.5929C336.865 67.0735 343.684 75.6242 339.474 82.7452L292.284 162.574C289.851 166.69 291.061 171.99 295.038 174.642L372.192 226.091C379.075 230.68 376.641 241.343 368.449 242.491L276.613 255.369C271.878 256.033 268.489 260.283 268.895 265.047L276.776 357.445C277.479 365.688 267.625 370.433 261.619 364.744L194.293 300.973C190.821 297.686 185.386 297.686 181.914 300.973L114.588 364.744C108.582 370.433 98.7281 365.688 99.4311 357.445L107.312 265.047C107.718 260.283 104.329 256.033 99.5941 255.369L7.7582 242.491C-0.433812 241.343 -2.86746 230.68 4.01488 226.091L81.1687 174.642C85.1465 171.99 86.3561 166.69 83.9231 162.574L36.7325 82.7452C32.523 75.6242 39.342 67.0735 47.2212 69.5929L135.55 97.8366C140.104 99.2928 145.001 96.9342 146.702 92.4659L179.692 5.79814Z" />
            </svg>
            <div className="space-y-6 relative z-10">
              <div className="inline-flex px-4 py-2 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
                Global Reach
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                IMPACT WITHOUT
                <br />
                BOUNDARIES.
              </h3>
            </div>
            <div className="mt-12 relative z-10">
              <p className="text-xl text-white/60 leading-relaxed max-w-sm">
                We've helped 500+ learners build a solid foundation across
                every major educational platform.
              </p>
            </div>
          </Card>

          <Card onClick={openModal} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-10 text-white flex flex-col justify-between cursor-pointer hover:bg-white/10 transition-colors">
            <span className="text-xs font-black uppercase tracking-widest text-white/60">
              Avg Growth
            </span>
            <div className="space-y-1">
              <span className="text-5xl lg:text-6xl font-black tracking-tighter">450%</span>
              <div className="h-1.5 w-full bg-white/10 rounded-full mt-4">
                <div className="h-full w-4/5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.3)]" />
              </div>
            </div>
          </Card>

          <Card onClick={openModal} className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-10 text-white flex flex-col justify-center gap-4 cursor-pointer hover:bg-neutral-900/70 transition-colors">
            <div className="size-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/5">
              <div className="size-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
            <div>
               <h4 className="text-xl font-bold leading-tight">Atomic Habits</h4>
               <p className="text-xs text-white/40 font-mono mt-1">System Stable V4</p>
            </div>
          </Card>

          <Card onClick={openModal} className="md:col-span-2 rounded-xl p-6 border flex-row border-white/10 flex items-center justify-between cursor-pointer bg-white/10 hover:bg-white/15 transition-all duration-500 overflow-hidden group">
            <div className="space-y-2 relative z-10 text-white">
              <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                Join the community
              </h4>
              <p className="text-white/60">
                Connect with 12,000+ like-minded learners.
              </p>
            </div>
            <div className="size-16 md:size-20 shrink-0 rounded-full flex items-center justify-center bg-white text-black group-hover:scale-110 transition-all duration-500 relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <ArrowRight className="w-8 h-8" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default AboutBento;
