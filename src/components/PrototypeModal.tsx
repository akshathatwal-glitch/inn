import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Type, Brain, Eye, Sparkles, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import { useModal } from '../hooks/useModal';
import { useSettings } from '../hooks/useSettings';
import { Link } from 'react-router-dom';

const SAMPLE_TEXT = `Mitochondria are membrane-bound cell organelles (mitochondrion, singular) that generate most of the chemical energy needed to power the cell's biochemical reactions. Chemical energy produced by the mitochondria is stored in a small molecule called adenosine triphosphate (ATP). Mitochondria contain their own small chromosomes. Generally, mitochondria, and therefore mitochondrial DNA, are inherited only from the mother.`;

const KEY_CONCEPTS = [
  "Mitochondria generate cellular biochemical energy.",
  "Energy is captured and stored as ATP molecules.",
  "Mitochondrial DNA is inherited maternally."
];

export default function PrototypeModal() {
  const { isModalOpen, closeModal } = useModal();
  const { settings, updateSetting } = useSettings();
  const [activeTab, setActiveTab] = useState<'formatting' | 'simplification' | 'sensory'>('formatting');

  if (!isModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="liquid-glass w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl relative flex flex-col md:flex-row shadow-2xl border border-white/15 my-auto"
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition z-20 text-white"
            aria-label="Close modal"
          >
            <X className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>

          {/* Left Column: Interactive Controls */}
          <div className="w-full md:w-5/12 p-5 sm:p-8 border-b md:border-b-0 md:border-r border-white/10 bg-black/40 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/40 block mb-1">Live Simulator</span>
                <h3 className="text-xl sm:text-2xl font-serif text-white flex items-center gap-2">
                  AdaptLearn Sandbox
                </h3>
              </div>

              {/* Tab Selector */}
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-full liquid-glass border border-white/10 text-xs">
                <button
                  onClick={() => setActiveTab('formatting')}
                  className={`py-1.5 rounded-full font-medium transition-all ${activeTab === 'formatting' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'}`}
                >
                  Type
                </button>
                <button
                  onClick={() => setActiveTab('simplification')}
                  className={`py-1.5 rounded-full font-medium transition-all ${activeTab === 'simplification' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'}`}
                >
                  AI Map
                </button>
                <button
                  onClick={() => setActiveTab('sensory')}
                  className={`py-1.5 rounded-full font-medium transition-all ${activeTab === 'sensory' ? 'bg-white text-black font-semibold' : 'text-white/60 hover:text-white'}`}
                >
                  Sensory
                </button>
              </div>

              {/* Tab Content Controls */}
              {activeTab === 'formatting' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-xs sm:text-sm font-semibold">OpenDyslexic Font</p>
                      <p className="text-white/40 text-[11px]">Weighted gravity baseline</p>
                    </div>
                    <button
                      onClick={() => updateSetting('isDyslexicFont', !settings.isDyslexicFont)}
                      className={`w-12 h-6 rounded-full transition-colors relative border border-white/20 shrink-0 ${settings.isDyslexicFont ? 'bg-white' : 'bg-white/10'}`}
                    >
                      <motion.div
                        layout
                        className={`w-4 h-4 rounded-full absolute top-1 left-1 transition-colors ${settings.isDyslexicFont ? 'bg-black shadow-md' : 'bg-white/80'}`}
                        animate={{ x: settings.isDyslexicFont ? 24 : 0 }}
                      />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-white font-medium">Line Spacing</span>
                      <span className="text-white/40 font-mono">{settings.lineHeight.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range" min="1.3" max="2.6" step="0.1"
                      value={settings.lineHeight}
                      onChange={e => updateSetting('lineHeight', parseFloat(e.target.value))}
                      className="w-full accent-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-white font-medium">Letter Kerning</span>
                      <span className="text-white/40 font-mono">{settings.letterSpacing}px</span>
                    </div>
                    <input
                      type="range" min="0" max="4" step="0.5"
                      value={settings.letterSpacing}
                      onChange={e => updateSetting('letterSpacing', parseFloat(e.target.value))}
                      className="w-full accent-white"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'simplification' && (
                <div className="space-y-4">
                  <p className="text-xs text-white/60 leading-relaxed">
                    AI automatically deconstructs multi-syllabic academic prose into bulleted takeaways.
                  </p>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Extraction Confidence: 98%</span>
                    </div>
                    <p className="text-white/80">3 Core Concepts identified from 1 dense paragraph.</p>
                  </div>
                </div>
              )}

              {activeTab === 'sensory' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-xs sm:text-sm font-semibold">Low-Stimulus Mode</p>
                      <p className="text-white/40 text-[11px]">Mutes harsh contrast</p>
                    </div>
                    <button
                      onClick={() => updateSetting('sensoryMode', !settings.sensoryMode)}
                      className={`w-12 h-6 rounded-full transition-colors relative border border-white/20 shrink-0 ${settings.sensoryMode ? 'bg-white' : 'bg-white/10'}`}
                    >
                      <motion.div
                        layout
                        className={`w-4 h-4 rounded-full absolute top-1 left-1 transition-colors ${settings.sensoryMode ? 'bg-black shadow-md' : 'bg-white/80'}`}
                        animate={{ x: settings.sensoryMode ? 24 : 0 }}
                      />
                    </button>
                  </div>
                  <p className="text-xs text-white/50 font-mono">Sensory calm state active across live viewport.</p>
                </div>
              )}
            </div>

            <Link
              to="/dashboard"
              onClick={closeModal}
              className="bg-white text-black rounded-full py-3 text-xs font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] mt-4"
            >
              <span>Launch Full Platform</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right Column: Live Viewport */}
          <div className="w-full md:w-7/12 p-5 sm:p-8 md:p-10 flex flex-col justify-between bg-black/60">
            <div>
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-white/10">
                <span className="text-[11px] sm:text-xs font-mono text-white/50 uppercase tracking-widest">
                  Live Viewport Preview
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/10">
                  Biology 101
                </span>
              </div>

              {activeTab === 'simplification' ? (
                <div className="space-y-3">
                  <p className="text-xs text-white/40 font-mono uppercase tracking-wider mb-2">Core Concepts:</p>
                  {KEY_CONCEPTS.map((concept, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-3 items-start p-4 rounded-2xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{concept}</span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div
                  className={`p-6 sm:p-8 rounded-2xl transition-all duration-500 ${
                    settings.sensoryMode ? 'bg-[#0f0f0f] border border-white/5' : 'bg-white/5 border border-white/10'
                  } ${settings.isDyslexicFont ? 'font-dyslexic' : 'font-sans'}`}
                  style={{
                    lineHeight: settings.lineHeight,
                    letterSpacing: `${settings.letterSpacing}px`,
                  }}
                >
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                    {SAMPLE_TEXT}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
              <span>AdaptLearn Sensory Engine</span>
              <span className="text-emerald-400">● Live Preview Active</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
