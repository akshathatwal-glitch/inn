import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wand2 } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

export default function DynamicFormattingPage() {
  const { settings, updateSetting } = useSettings();
  const [text, setText] = useState('Paste or type some text here to see it formatted dynamically based on your accessibility preferences...');

  return (
    <div className={`min-h-screen p-6 md:p-12 transition-colors duration-500 ${settings.sensoryMode ? 'bg-[#121212]' : 'bg-black'}`}>
      <Link to="/" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-12">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Dynamic Formatting</h1>
          <p className="text-white/60 text-lg">Instantly adapt any text to your neuro-inclusive reading preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Side */}
          <div className="liquid-glass rounded-3xl p-8 border border-white/10 flex flex-col">
            <h3 className="text-xl text-white mb-6 flex items-center gap-2">
              <Wand2 className="w-5 h-5" /> Source Text
            </h3>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-6 text-white/80 focus:outline-none focus:border-white/30 resize-none min-h-[400px]"
              placeholder="Paste your text here..."
            />
          </div>

          {/* Output Side */}
          <div className="liquid-glass rounded-3xl p-8 border border-white/10 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl text-white">Live Preview</h3>
              <div className="flex items-center gap-4 text-sm">
                <label className="flex items-center gap-2 text-white/70">
                  <input type="checkbox" checked={settings.isDyslexicFont} onChange={(e) => updateSetting('isDyslexicFont', e.target.checked)} className="rounded" />
                  Dyslexic Font
                </label>
              </div>
            </div>
            
            <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-6 overflow-y-auto min-h-[400px]">
              <div 
                className={`text-white/90 transition-all duration-300 ${settings.isDyslexicFont ? 'font-dyslexic' : ''}`}
                style={{
                  lineHeight: settings.lineHeight,
                  letterSpacing: `${settings.letterSpacing}px`
                }}
              >
                {text}
              </div>
            </div>
            
            {/* Quick Settings */}
            <div className="mt-6 grid grid-cols-2 gap-6">
               <div>
                  <label className="text-white/60 text-xs uppercase tracking-widest block mb-2">Line Spacing</label>
                  <input 
                    type="range" min="1.2" max="2.5" step="0.1" 
                    value={settings.lineHeight}
                    onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
                    className="w-full accent-white"
                  />
               </div>
               <div>
                  <label className="text-white/60 text-xs uppercase tracking-widest block mb-2">Letter Spacing</label>
                  <input 
                    type="range" min="0" max="4" step="0.5" 
                    value={settings.letterSpacing}
                    onChange={(e) => updateSetting('letterSpacing', parseFloat(e.target.value))}
                    className="w-full accent-white"
                  />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
