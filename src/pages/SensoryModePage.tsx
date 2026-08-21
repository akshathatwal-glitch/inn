import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, Bell, MessageCircle, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettings } from '../hooks/useSettings';

export default function SensoryModePage() {
  const { settings, updateSetting } = useSettings();

  return (
    <div className={`min-h-screen p-6 md:p-12 transition-all duration-700 ${settings.sensoryMode ? 'bg-[#121212]' : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900'}`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Top Navigation & Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <Link to="/" className="inline-flex items-center text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          
          <div className="liquid-glass rounded-full px-6 py-4 flex items-center gap-4 border border-white/20 shadow-xl backdrop-blur-md">
            <span className="text-white font-medium">Sensory Mode</span>
            <button 
              onClick={() => updateSetting('sensoryMode', !settings.sensoryMode)}
              className={`w-14 h-7 rounded-full transition-colors relative shadow-inner ${settings.sensoryMode ? 'bg-[#4a5d53]' : 'bg-green-500'}`}
            >
              <motion.div 
                layout
                className="w-5 h-5 bg-white rounded-full absolute top-1 left-1 shadow-md"
                animate={{ x: settings.sensoryMode ? 28 : 0 }}
              />
            </button>
          </div>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">
            Experience the Difference
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto font-medium">
            Toggle Sensory Mode to instantly remove harsh colors, high contrast, and visual noise.
          </p>
        </div>

        {/* Cluttered UI Example */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Annoying Alert Card */}
          <div className={`rounded-3xl p-8 transition-all duration-700 ${settings.sensoryMode ? 'bg-black/40 border border-white/5' : 'bg-red-500 shadow-[0_0_40px_rgba(239,68,68,0.5)] border-4 border-red-300'}`}>
            <div className="flex items-center gap-3 mb-4">
              <Bell className={`w-8 h-8 ${settings.sensoryMode ? 'text-white/40' : 'text-white animate-bounce'}`} />
              <h3 className="text-2xl font-bold text-white">URGENT ALERT!</h3>
            </div>
            <p className="text-white font-semibold text-lg">You have 14 unread messages! Check them now before they expire!</p>
            <button className={`mt-6 w-full py-3 rounded-xl font-bold transition-all ${settings.sensoryMode ? 'bg-white/10 text-white/60' : 'bg-yellow-400 text-black hover:bg-yellow-300'}`}>
              ACTION REQUIRED
            </button>
          </div>

          {/* Busy Content Card */}
          <div className={`rounded-3xl p-8 col-span-1 md:col-span-2 transition-all duration-700 ${settings.sensoryMode ? 'bg-black/40 border border-white/5' : 'bg-blue-600 bg-opacity-90 shadow-[0_0_40px_rgba(37,99,235,0.5)] bg-[url("https://www.transparenttextures.com/patterns/cubes.png")]'}`}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-black text-white">Daily Dashboard</h3>
              <div className="flex gap-2">
                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${settings.sensoryMode ? 'bg-white/10 text-white/50' : 'bg-pink-500 text-white animate-pulse'}`}>NEW</span>
                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${settings.sensoryMode ? 'bg-white/10 text-white/50' : 'bg-green-400 text-black'}`}>PRO</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-2xl ${settings.sensoryMode ? 'bg-white/5' : 'bg-white/20 backdrop-blur-md border border-white/40'}`}>
                <Star className={`w-6 h-6 mb-2 ${settings.sensoryMode ? 'text-white/40' : 'text-yellow-300'}`} />
                <h4 className="text-white font-bold">Achievement Unlocked</h4>
                <p className="text-white/80 text-sm">You earned 500 XP!</p>
              </div>
              <div className={`p-4 rounded-2xl ${settings.sensoryMode ? 'bg-white/5' : 'bg-white/20 backdrop-blur-md border border-white/40'}`}>
                <Zap className={`w-6 h-6 mb-2 ${settings.sensoryMode ? 'text-white/40' : 'text-orange-400'}`} />
                <h4 className="text-white font-bold">Streak Active</h4>
                <p className="text-white/80 text-sm">7 Days in a row!</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
