import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Type, Wand2, AlignLeft, Eye, BookOpen, RotateCcw } from 'lucide-react';
import AppShell from '../components/AppShell';
import { useSettings, OverlayColor } from '../hooks/useSettings';

// ── Syllable splitter (hyphenation heuristic) ─────────────────────────────────
function splitSyllables(word: string): string[] {
  const clean = word.replace(/[^a-zA-Z]/g, '');
  if (clean.length <= 3) return [word];
  const vowels = 'aeiouAEIOU';
  const parts: string[] = [];
  let current = '';
  let vowelCount = 0;
  for (let i = 0; i < word.length; i++) {
    current += word[i];
    if (vowels.includes(word[i])) vowelCount++;
    if (vowelCount >= 2 && i < word.length - 2) {
      parts.push(current);
      current = '';
      vowelCount = 0;
    }
  }
  if (current) parts.push(current);
  return parts.length > 1 ? parts : [word];
}

function SyllableText({ text, lineHeight, letterSpacing, fontSize }: { text: string; lineHeight: number; letterSpacing: number; fontSize: number }) {
  const words = text.split(' ');
  return (
    <span style={{ lineHeight, letterSpacing: `${letterSpacing}px`, fontSize: `${fontSize}px` }}>
      {words.map((word, wi) => {
        const syllables = splitSyllables(word);
        return (
          <span key={wi}>
            {syllables.map((syl, si) => (
              <span key={si} className={si % 2 === 0 ? 'syllable-even' : 'syllable-odd'}>{syl}</span>
            ))}
            {wi < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </span>
  );
}

// ── Reading Ruler ─────────────────────────────────────────────────────────────
function ReadingRulerContainer({ children, active }: { children: React.ReactNode; active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const el = containerRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const y = e.clientY - rect.top;
      if (rulerRef.current) rulerRef.current.style.top = `${y - 18}px`;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = el.getBoundingClientRect();
      const y = e.touches[0].clientY - rect.top;
      if (rulerRef.current) rulerRef.current.style.top = `${y - 18}px`;
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('touchmove', handleTouchMove);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, [active]);

  return (
    <div ref={containerRef} className={`relative ${active ? 'reading-ruler-container' : ''}`}>
      {active && <div ref={rulerRef} className="reading-ruler" />}
      {children}
    </div>
  );
}

const OVERLAY_OPTIONS: { id: OverlayColor; label: string; swatch: string }[] = [
  { id: 'none', label: 'Dark', swatch: 'bg-black/60 border-white/20' },
  { id: 'cream', label: 'Cream', swatch: 'bg-[#fcf8ee] border-amber-200 text-black' },
  { id: 'blue', label: 'Sky', swatch: 'bg-[#f0f4fc] border-blue-200 text-black' },
  { id: 'mint', label: 'Mint', swatch: 'bg-[#f0f8f3] border-emerald-200 text-black' },
  { id: 'rose', label: 'Rose', swatch: 'bg-[#fdf2f7] border-rose-200 text-black' },
];

const BOOK_TEXTS: Record<string, string> = {
  b1: 'Water constantly moves through a cycle called the water cycle. It evaporates from oceans, forms clouds, falls as rain, and flows back to the ocean through rivers and streams. The energy from the sun drives this entire process. Evaporation happens when water is heated and turns into water vapor. Condensation occurs when water vapor cools and forms clouds. Precipitation is when water falls back to Earth as rain, snow, sleet, or hail.',
  b2: 'Mitochondria are membrane-bound cell organelles that generate most of the chemical energy needed to power the cell\'s biochemical reactions. Chemical energy produced by the mitochondria is stored in a small molecule called adenosine triphosphate (ATP). Mitochondria contain their own small chromosomes. Generally, mitochondria, and therefore mitochondrial DNA, are inherited only from the mother.',
  b3: 'The French Revolution was a period of radical political and societal change in France that began with the Estates General of 1789 and ended with Napoleon Bonaparte\'s coup in November 1799. Many of its ideas are considered fundamental principles of liberal democracy.',
  b4: 'A fraction represents a part of a whole. The top number, called the numerator, shows how many parts we have. The bottom number, called the denominator, shows the total number of equal parts the whole is divided into. For example, in the fraction 3/4, we have 3 parts out of 4 total equal parts.',
  b5: 'Hamlet is a tragedy by William Shakespeare. The play depicts Prince Hamlet and his revenge against his uncle Claudius, who has murdered Hamlet\'s father, seized his throne, and married his mother. The play explores themes of treachery, revenge, incest, and moral corruption.',
  b6: 'Photosynthesis is the process by which plants use sunlight, water and carbon dioxide to produce oxygen and energy in the form of glucose. This process takes place in the chloroplasts. The overall equation for photosynthesis is: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2.',
  b7: 'Our solar system consists of the Sun and everything bound to it by gravity. This includes the eight planets, dwarf planets, moons, asteroids, comets, and meteors. The four inner planets are small rocky worlds, while the four outer planets are much larger gas and ice giants.',
  b8: 'World War II was a global conflict lasting from 1939 to 1945. It involved most of the world\'s nations forming two opposing military alliances: the Allies and the Axis. It was the deadliest conflict in human history, with between 70 and 85 million fatalities.',
};

const DEFAULT_TEXT = 'Mitochondria are membrane-bound cell organelles that generate most of the chemical energy needed to power the cell\'s biochemical reactions. Chemical energy produced by the mitochondria is stored in a small molecule called adenosine triphosphate (ATP). Mitochondria contain their own small chromosomes. Generally, mitochondria, and therefore mitochondrial DNA, are inherited only from the mother.';

export default function DynamicFormattingPage() {
  const { settings, updateSetting } = useSettings();
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get('book');

  const [text, setText] = useState(bookId && BOOK_TEXTS[bookId] ? BOOK_TEXTS[bookId] : DEFAULT_TEXT);

  return (
    <AppShell>
      <div className="py-6 sm:py-10 md:py-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-6 sm:space-y-10">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-white/10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full liquid-glass border border-white/10 text-white/70 text-[11px] sm:text-xs font-mono mb-3 sm:mb-4">
              <Type className="w-3.5 h-3.5 text-white" />
              <span>Accessibility Engine 01</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl text-white tracking-tight font-serif">
              Dynamic <em className="italic text-white/50">Formatting</em>.
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/feature/library"
              className="liquid-glass rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Browse Library</span>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8">

          {/* Controls Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="xl:col-span-4 space-y-6"
          >
            <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 sm:space-y-8 shadow-xl">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="text-lg sm:text-xl font-serif text-white">Visual Settings</h3>
                <Wand2 className="w-4 h-4 text-white/40" />
              </div>

              {/* Toggles */}
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-white text-xs sm:text-sm font-semibold">OpenDyslexic Font</p>
                    <p className="text-white/40 text-[11px] sm:text-xs mt-0.5">Weighted letters prevent inversion</p>
                  </div>
                  <button
                    onClick={() => updateSetting('isDyslexicFont', !settings.isDyslexicFont)}
                    className={`w-12 sm:w-14 h-6 sm:h-7 rounded-full transition-colors relative border border-white/20 shrink-0 ${settings.isDyslexicFont ? 'bg-white' : 'bg-white/10'}`}
                    aria-label="Toggle OpenDyslexic Font"
                  >
                    <motion.div
                      layout
                      className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full absolute top-0.5 left-0.5 transition-colors ${settings.isDyslexicFont ? 'bg-black shadow-md' : 'bg-white/80'}`}
                      animate={{ x: settings.isDyslexicFont ? 24 : 0 }}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-white text-xs sm:text-sm font-semibold">Syllable Segmentation</p>
                    <p className="text-white/40 text-[11px] sm:text-xs mt-0.5">Alternating phoneme hues</p>
                  </div>
                  <button
                    onClick={() => updateSetting('syllableHighlight', !settings.syllableHighlight)}
                    className={`w-12 sm:w-14 h-6 sm:h-7 rounded-full transition-colors relative border border-white/20 shrink-0 ${settings.syllableHighlight ? 'bg-white' : 'bg-white/10'}`}
                    aria-label="Toggle Syllable Segmentation"
                  >
                    <motion.div
                      layout
                      className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full absolute top-0.5 left-0.5 transition-colors ${settings.syllableHighlight ? 'bg-black shadow-md' : 'bg-white/80'}`}
                      animate={{ x: settings.syllableHighlight ? 24 : 0 }}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-white text-xs sm:text-sm font-semibold">Reading Ruler</p>
                    <p className="text-white/40 text-[11px] sm:text-xs mt-0.5">Dynamic focus beam on cursor</p>
                  </div>
                  <button
                    onClick={() => updateSetting('readingRuler', !settings.readingRuler)}
                    className={`w-12 sm:w-14 h-6 sm:h-7 rounded-full transition-colors relative border border-white/20 shrink-0 ${settings.readingRuler ? 'bg-white' : 'bg-white/10'}`}
                    aria-label="Toggle Reading Ruler"
                  >
                    <motion.div
                      layout
                      className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full absolute top-0.5 left-0.5 transition-colors ${settings.readingRuler ? 'bg-black shadow-md' : 'bg-white/80'}`}
                      animate={{ x: settings.readingRuler ? 24 : 0 }}
                    />
                  </button>
                </div>
              </div>

              <div className="w-full h-px bg-white/10" />

              {/* Sliders */}
              <div className="space-y-5 sm:space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-medium">Font Scale</span>
                    <span className="text-white/40 font-mono">{settings.fontSize}px</span>
                  </div>
                  <input
                    type="range" min="13" max="26" step="1"
                    value={settings.fontSize}
                    onChange={e => updateSetting('fontSize', parseInt(e.target.value))}
                    className="w-full accent-white"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white font-medium">Line Spacing</span>
                    <span className="text-white/40 font-mono">{settings.lineHeight.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range" min="1.3" max="2.8" step="0.1"
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
                    type="range" min="0" max="5" step="0.5"
                    value={settings.letterSpacing}
                    onChange={e => updateSetting('letterSpacing', parseFloat(e.target.value))}
                    className="w-full accent-white"
                  />
                </div>
              </div>

              <div className="w-full h-px bg-white/10" />

              {/* Overlay Palette */}
              <div>
                <p className="text-white text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">Contrast Overlay</p>
                <div className="flex gap-2.5 sm:gap-3 flex-wrap">
                  {OVERLAY_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => updateSetting('overlayColor', opt.id)}
                      className="flex flex-col items-center gap-1.5 group"
                      aria-label={`Overlay ${opt.label}`}
                    >
                      <div className={`w-8 sm:w-9 h-8 sm:h-9 rounded-full ${opt.swatch} border transition-all ${
                        settings.overlayColor === opt.id ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-black' : 'opacity-70 hover:opacity-100'
                      }`} />
                      <span className="text-[10px] text-white/40 font-mono">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reader & Live Preview Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="xl:col-span-8 space-y-6"
          >
            {/* Live Reader Canvas */}
            <div className="liquid-glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-white/60 shrink-0" />
                  <span className="text-white text-xs sm:text-sm font-semibold tracking-tight">Adaptive Reading View</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  {settings.isDyslexicFont && (
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 text-white text-[9px] sm:text-[10px] font-mono border border-white/10">OpenDyslexic</span>
                  )}
                  {settings.syllableHighlight && (
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 text-white text-[9px] sm:text-[10px] font-mono border border-white/10">Syllables</span>
                  )}
                </div>
              </div>

              <ReadingRulerContainer active={settings.readingRuler}>
                <div
                  className={`overlay-bg p-5 sm:p-8 md:p-10 min-h-[300px] sm:min-h-[380px] transition-all duration-500 rounded-b-3xl ${settings.isDyslexicFont ? 'font-dyslexic' : 'font-sans'}`}
                  style={{
                    lineHeight: settings.lineHeight,
                    letterSpacing: `${settings.letterSpacing}px`,
                    fontSize: `${settings.fontSize}px`,
                  }}
                >
                  {settings.syllableHighlight ? (
                    <SyllableText
                      text={text}
                      lineHeight={settings.lineHeight}
                      letterSpacing={settings.letterSpacing}
                      fontSize={settings.fontSize}
                    />
                  ) : (
                    <p className="whitespace-pre-wrap leading-relaxed">{text}</p>
                  )}
                </div>
              </ReadingRulerContainer>
            </div>

            {/* Input Text Box */}
            <div className="liquid-glass rounded-3xl p-5 sm:p-8 border border-white/10 space-y-4 shadow-xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-semibold">
                  <AlignLeft className="w-4 h-4 text-white/60" />
                  <span>Input Material</span>
                </div>
                <button
                  onClick={() => setText(DEFAULT_TEXT)}
                  className="text-white/40 hover:text-white text-[11px] sm:text-xs font-mono flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Sample
                </button>
              </div>

              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 sm:p-5 text-white/80 focus:outline-none focus:border-white/30 resize-none min-h-[120px] sm:min-h-[140px] text-xs sm:text-sm leading-relaxed font-mono placeholder:text-white/20"
                placeholder="Paste any textbook excerpt or classroom material here..."
              />
            </div>
          </motion.div>

        </div>
      </div>
    </AppShell>
  );
}
