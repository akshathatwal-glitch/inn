import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Type, Sparkles, Brain, Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

export default function PrototypeModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { settings, updateSetting } = useSettings();
  const [isSimplifying, setIsSimplifying] = useState(false);
  const [isSimplified, setIsSimplified] = useState(false);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const handleSimplify = () => {
    setIsSimplifying(true);
    setTimeout(() => {
      setIsSimplifying(false);
      setIsSimplified(true);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="liquid-glass w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl relative flex flex-col md:flex-row shadow-2xl border border-white/10"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition z-10 text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Controls */}
          <div className="w-full md:w-1/3 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10 bg-black/20 flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
                <Type className="w-5 h-5" /> Formatting Engine
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Dyslexia-Friendly Font</span>
                  <button 
                    onClick={() => updateSetting('isDyslexicFont', !settings.isDyslexicFont)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.isDyslexicFont ? 'bg-green-500' : 'bg-white/20'}`}
                  >
                    <motion.div 
                      layout
                      className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"
                      animate={{ x: settings.isDyslexicFont ? 24 : 0 }}
                    />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80 text-sm">Line Spacing</span>
                    <span className="text-white/50 text-xs">{settings.lineHeight.toFixed(1)}x</span>
                  </div>
                  <input 
                    type="range" min="1.2" max="2.5" step="0.1" 
                    value={settings.lineHeight}
                    onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
                    className="w-full accent-white"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80 text-sm">Letter Spacing</span>
                    <span className="text-white/50 text-xs">{settings.letterSpacing}px</span>
                  </div>
                  <input 
                    type="range" min="0" max="4" step="0.5" 
                    value={settings.letterSpacing}
                    onChange={(e) => updateSetting('letterSpacing', parseFloat(e.target.value))}
                    className="w-full accent-white"
                  />
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-white/10"></div>

            <div>
              <h3 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5" /> Focus Environment
              </h3>
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-white/80 text-sm">Sensory Mode</span>
                <button 
                  onClick={() => updateSetting('sensoryMode', !settings.sensoryMode)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.sensoryMode ? 'bg-[#7a9b83]' : 'bg-white/20'}`}
                >
                  <motion.div 
                    layout
                    className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"
                    animate={{ x: settings.sensoryMode ? 24 : 0 }}
                  />
                </button>
              </div>

              <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-3 text-white/80">
                  <Clock className="w-4 h-4" /> <span className="text-sm font-medium">Pomodoro Timer</span>
                </div>
                <div className="text-4xl font-mono text-center text-white mb-4 tracking-wider">
                  {formatTime(timeLeft)}
                </div>
                <div className="flex justify-center gap-2">
                  <button onClick={toggleTimer} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                    {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <button onClick={resetTimer} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Learning Simulator */}
          <div className="w-full md:w-2/3 p-6 md:p-12 flex flex-col bg-white/5">
            <h2 className="text-2xl md:text-3xl text-white font-serif italic mb-6">Learning Simulator</h2>
            
            <div className="flex-1 bg-black/40 rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden">
              <h4 className="text-white/50 uppercase tracking-widest text-xs mb-4">Sample Biology Text</h4>
              
              <AnimatePresence mode="wait">
                {!isSimplified ? (
                  <motion.div 
                    key="dense-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white/80 text-lg transition-all duration-300"
                    style={{ 
                      lineHeight: settings.lineHeight, 
                      letterSpacing: `${settings.letterSpacing}px` 
                    }}
                  >
                    Mitochondria are membrane-bound cell organelles that generate most of the chemical energy needed to power the cell's biochemical reactions. Chemical energy produced by the mitochondria is stored in a small molecule called adenosine triphosphate (ATP). Mitochondria contain their own small chromosomes. Generally, mitochondria, and therefore mitochondrial DNA, are inherited only from the mother.
                  </motion.div>
                ) : (
                  <motion.div 
                    key="simplified-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4 transition-all duration-300"
                    style={{ 
                      lineHeight: settings.lineHeight, 
                      letterSpacing: `${settings.letterSpacing}px` 
                    }}
                  >
                    {[
                      { color: "text-blue-400", text: "Mitochondria produce most of the cell's chemical energy." },
                      { color: "text-green-400", text: "This energy is stored in a molecule called ATP." },
                      { color: "text-purple-400", text: "They contain their own DNA, which is inherited only from the mother." }
                    ].map((point, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/5"
                      >
                        <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${point.color} bg-current shadow-[0_0_8px_currentColor]`} />
                        <p className="text-white/90 text-lg">{point.text}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {!isSimplified && (
                <div className="mt-8 flex justify-end">
                  <button 
                    onClick={handleSimplify}
                    disabled={isSimplifying}
                    className="bg-white text-black rounded-full px-6 py-3 text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-80 disabled:cursor-wait"
                  >
                    {isSimplifying ? (
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    {isSimplifying ? "Processing AI..." : "Simplify with AI"}
                  </button>
                </div>
              )}

              {isSimplified && (
                <div className="mt-8 flex justify-end">
                  <button 
                    onClick={() => setIsSimplified(false)}
                    className="text-white/50 hover:text-white transition-colors text-sm underline underline-offset-4"
                  >
                    Reset Text
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
