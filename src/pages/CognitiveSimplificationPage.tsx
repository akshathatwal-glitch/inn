import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, RotateCcw, Network, HelpCircle, CheckCircle2, XCircle, List, ArrowRight } from 'lucide-react';
import AppShell from '../components/AppShell';
import { useSettings } from '../hooks/useSettings';

// ── Types ─────────────────────────────────────────────────────────────────────
interface ConceptPoint { text: string; }
interface QuizQuestion { q: string; options: string[]; answer: number; }

// ── Sample texts per subject ──────────────────────────────────────────────────
const SUBJECTS = ['Biology', 'History', 'Math', 'Literature', 'Custom'] as const;
type Subject = typeof SUBJECTS[number];

const SAMPLE_TEXTS: Record<Subject, string> = {
  Biology: 'Mitochondria are membrane-bound cell organelles that generate most of the chemical energy needed to power the cell\'s biochemical reactions. Chemical energy produced by the mitochondria is stored in a small molecule called adenosine triphosphate (ATP). Mitochondria contain their own small chromosomes. Generally, mitochondria, and therefore mitochondrial DNA, are inherited only from the mother.',
  History: 'The French Revolution was a period of radical political and societal change in France that began with the Estates General of 1789 and ended with Napoleon Bonaparte\'s coup in November 1799. The upheaval was caused by widespread discontent with the French monarchy and the poor economic policies of King Louis XVI.',
  Math: 'A fraction represents a part of a whole. The numerator shows how many parts we have. The denominator shows the total number of equal parts. To add fractions with the same denominator, simply add the numerators. To multiply fractions, multiply numerators together and denominators together. Always simplify your final answer.',
  Literature: 'In Shakespeare\'s Hamlet, the young Prince of Denmark is called to avenge his father\'s murder by his uncle Claudius, who has taken the throne and married Hamlet\'s mother Gertrude. Hamlet\'s famous soliloquy "To be, or not to be" reflects his deep moral uncertainty about revenge, existence, and the human condition.',
  Custom: '',
};

// ── Static quiz bank ──────────────────────────────────────────────────────────
const QUIZ_BANK: Record<Subject, QuizQuestion[]> = {
  Biology: [
    { q: 'What does ATP stand for in cellular energy?', options: ['Adenosine Triphosphate', 'Atomic Transfer Protein', 'Advanced Tissue Production', 'Amino Tri-Phase'], answer: 0 },
    { q: 'Where is mitochondrial DNA primarily inherited from?', options: ['Father', 'Both parents equally', 'Mother', 'Neither parent'], answer: 2 },
  ],
  History: [
    { q: 'In what year did the French Revolution begin?', options: ['1776', '1789', '1804', '1799'], answer: 1 },
    { q: 'Who ended the French Revolution with a coup in 1799?', options: ['Louis XVI', 'Marie Antoinette', 'Napoleon Bonaparte', 'Robespierre'], answer: 2 },
  ],
  Math: [
    { q: 'In a fraction, what does the numerator represent?', options: ['Total parts in whole', 'Parts we currently have', 'The multiplier', 'The remainder'], answer: 1 },
    { q: 'To multiply two fractions, what is the rule?', options: ['Add numerators only', 'Find common denominator', 'Multiply numerators together and denominators together', 'Cross subtract'], answer: 2 },
  ],
  Literature: [
    { q: 'Who is Prince Hamlet seeking revenge against?', options: ['Polonius', 'Laertes', 'Claudius', 'Horatio'], answer: 2 },
    { q: 'What central dilemma does Hamlet explore in "To be, or not to be"?', options: ['Military conquest', 'Moral uncertainty & existence', 'Royal inheritance', 'Friendship loyalty'], answer: 1 },
  ],
  Custom: [],
};

// ── Mind Map Component ────────────────────────────────────────────────────────
function MindMap({ concepts }: { concepts: ConceptPoint[] }) {
  const cx = 250, cy = 180, r = 120;
  const angles = concepts.map((_, i) => (i / concepts.length) * 2 * Math.PI - Math.PI / 2);

  return (
    <div className="w-full flex justify-center py-4 sm:py-6 overflow-x-auto max-w-full">
      <svg viewBox="0 0 500 360" className="w-full max-w-[480px] h-auto overflow-visible shrink-0">
        {/* Center node */}
        <circle cx={cx} cy={cy} r={42} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" strokeWidth={1.5} className="shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
        <text x={cx} y={cy - 6} textAnchor="middle" fill="white" fontSize={11} fontWeight="700" letterSpacing="0.05em">CORE</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize={10} fontStyle="italic">Concepts</text>

        {concepts.map((c, i) => {
          const angle = angles[i];
          const nx = cx + r * Math.cos(angle);
          const ny = cy + r * Math.sin(angle);
          const lx = cx + 44 * Math.cos(angle);
          const ly = cy + 44 * Math.sin(angle);

          return (
            <motion.g key={i} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 }}>
              {/* Line with subtle glow */}
              <line x1={lx} y1={ly} x2={nx} y2={ny} stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} strokeDasharray="3 3" />
              {/* Node */}
              <circle cx={nx} cy={ny} r={20} fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth={1.5} />
              <text x={nx} y={ny + 4} textAnchor="middle" fill="white" fontSize={10} fontWeight="bold">{`0${i + 1}`}</text>
              {/* Label */}
              <foreignObject
                x={nx - 65}
                y={ny + (ny > cy ? 26 : -52)}
                width={130}
                height={50}
              >
                <div className="text-center bg-black/75 backdrop-blur-md rounded-lg p-1.5 border border-white/10" style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.85)', lineHeight: 1.3 }}>
                  {c.text.length > 55 ? c.text.slice(0, 52) + '…' : c.text}
                </div>
              </foreignObject>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Quiz Component ────────────────────────────────────────────────────────────
function QuizSection({ subject, onMastered }: { subject: Subject; onMastered: () => void }) {
  const questions = QUIZ_BANK[subject].slice(0, 2);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (questions.length === 0) return null;

  const score = submitted ? questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0) : 0;

  const handleSubmit = () => {
    setSubmitted(true);
    if (score === questions.length) onMastered();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5 sm:space-y-6 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
          <h3 className="text-lg sm:text-xl font-serif text-white">Concept Verification Quiz</h3>
        </div>
        <span className="text-white/40 text-xs font-mono">2 Questions</span>
      </div>

      <div className="space-y-5 sm:space-y-6">
        {questions.map((q, qi) => (
          <div key={qi} className="space-y-3">
            <p className="text-white text-xs sm:text-sm font-semibold">{qi + 1}. {q.q}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
              {q.options.map((opt, oi) => {
                const isSelected = answers[qi] === oi;
                const isCorrect = submitted && oi === q.answer;
                const isWrong = submitted && isSelected && oi !== q.answer;
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => setAnswers(a => ({ ...a, [qi]: oi }))}
                    className={`text-left p-3.5 sm:p-4 rounded-2xl text-xs border transition-all duration-300 ${
                      isCorrect ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                      : isWrong ? 'bg-red-500/20 border-red-400 text-white'
                      : isSelected ? 'bg-white text-black font-semibold border-white'
                      : 'liquid-glass border-white/10 text-white/70 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="leading-snug">{opt}</span>
                      {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {isWrong && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
          className="w-full py-3 sm:py-3.5 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Check Understanding
        </button>
      ) : (
        <div className={`p-4 rounded-2xl text-center border ${score === questions.length ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300' : 'bg-white/5 border-white/10 text-white/80'}`}>
          <p className="font-semibold text-xs sm:text-sm">
            {score}/{questions.length} Concepts Verified {score === questions.length ? '— Added to your weekly mastery count!' : '— Try reviewing the mind map.'}
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CognitiveSimplificationPage() {
  const { settings, updateSetting } = useSettings();
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || '';

  const [activeSubject, setActiveSubject] = useState<Subject>('Biology');
  const [text, setText] = useState(SAMPLE_TEXTS['Biology']);
  const [isSimplifying, setIsSimplifying] = useState(false);
  const [concepts, setConcepts] = useState<ConceptPoint[] | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'mindmap'>('list');
  const [showQuiz, setShowQuiz] = useState(false);

  const handleSubjectSwitch = (subject: Subject) => {
    setActiveSubject(subject);
    setConcepts(null);
    setShowQuiz(false);
    if (subject !== 'Custom') setText(SAMPLE_TEXTS[subject]);
    else setText('');
  };

  const handleSimplify = async () => {
    if (!text.trim()) return;
    setIsSimplifying(true);

    if (!apiKey.trim()) {
      await new Promise(r => setTimeout(r, 1200));
      const demoPoints: Record<Subject, string[]> = {
        Biology: ['Mitochondria generate most biochemical energy for cell operations.', 'Energy is stored inside adenosine triphosphate (ATP) molecules.', 'Mitochondrial chromosomes are inherited exclusively from the maternal lineage.'],
        History: ['The French Revolution began in 1789 following severe economic distress.', 'Public outrage towards King Louis XVI dismantled centuries of feudal rule.', 'General Napoleon Bonaparte seized state authority via coup in 1799.'],
        Math: ['A fraction expresses parts of an equal whole via numerator & denominator.', 'Fractions with identical denominators are combined by adding numerators.', 'Multiply fractions directly across both numerators and denominators.'],
        Literature: ['Prince Hamlet is burdened with executing vengeance upon King Claudius.', 'The soliloquy "To be or not to be" interrogates human suffering and agency.', 'The tragedy illustrates the toxic rot of corruption within Denmark\'s court.'],
        Custom: ['Core Idea 01: Key takeaway extracted from text input.', 'Core Idea 02: Secondary essential principle.', 'Core Idea 03: Practical conclusion and takeaway.'],
      };
      setConcepts((demoPoints[activeSubject] || []).map(t => ({ text: t })));
      setIsSimplifying(false);
      return;
    }

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey.trim()}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AdaptLearn Interface',
        },
        body: JSON.stringify({
          model: 'stealth/ox-alpha',
          messages: [
            { role: 'system', content: 'Extract 3 to 4 core concepts from the text. Return ONLY a valid JSON array of strings. No markdown, no backticks.' },
            { role: 'user', content: text },
          ],
        }),
      });

      let content = (await response.json()).choices[0].message.content.trim();
      if (content.startsWith('```')) content = content.replace(/```json?/g, '').replace(/```/g, '').trim();
      const parsed: string[] = JSON.parse(content);
      setConcepts(parsed.map(t => ({ text: t })));
    } catch (e: any) {
      alert(`Failed to simplify: ${e.message}`);
    } finally {
      setIsSimplifying(false);
    }
  };

  const handleMastered = () => {
    updateSetting('totalConceptsMastered', settings.totalConceptsMastered + (concepts?.length || 0));
  };

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
              <Brain className="w-3.5 h-3.5 text-white" />
              <span>Cognitive Engine 02</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl text-white tracking-tight font-serif">
              Cognitive <em className="italic text-white/50">Simplification</em>.
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setConcepts(null); setShowQuiz(false); }}
              className="liquid-glass rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset State</span>
            </button>
          </div>
        </motion.div>

        {/* Subject Pills Row with smooth horizontal touch scroll */}
        <div className="flex gap-2 items-center overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs uppercase tracking-widest text-white/40 font-mono mr-2 shrink-0">Curriculum:</span>
          {SUBJECTS.map(s => (
            <button
              key={s}
              onClick={() => handleSubjectSwitch(s)}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-300 shrink-0 ${
                activeSubject === s
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                  : 'liquid-glass text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 sm:space-y-6 shadow-xl"
        >
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <h3 className="text-lg sm:text-xl font-serif text-white">Dense Reading Material</h3>
            <span className="text-[11px] sm:text-xs text-white/40 font-mono">NLP Deconstruction</span>
          </div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            disabled={isSimplifying || concepts !== null}
            className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 sm:p-6 text-white/90 focus:outline-none focus:border-white/30 resize-none min-h-[140px] sm:min-h-[160px] text-xs sm:text-sm leading-relaxed font-mono disabled:opacity-50"
            placeholder={activeSubject === 'Custom' ? 'Paste any textbook chapter or dense essay...' : 'Sample text loaded...'}
          />

          <div className="flex justify-end pt-2">
            {!concepts ? (
              <button
                onClick={handleSimplify}
                disabled={isSimplifying || !text.trim()}
                className="bg-white text-black rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-gray-200 transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)] disabled:opacity-60 w-full sm:w-auto justify-center"
              >
                {isSimplifying ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                    <RotateCcw className="w-4 h-4" />
                  </motion.div>
                ) : <Sparkles className="w-4 h-4" />}
                <span>{isSimplifying ? 'Extracting Core Concepts...' : 'Simplify with AI'}</span>
              </button>
            ) : (
              <button
                onClick={() => { setConcepts(null); setShowQuiz(false); }}
                className="text-white/50 hover:text-white text-xs underline underline-offset-4 transition-colors font-mono"
              >
                Enter New Text →
              </button>
            )}
          </div>
        </motion.div>

        {/* Results Stream */}
        <AnimatePresence>
          {concepts && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6 sm:space-y-8">

              {/* View Switcher Card */}
              <div className="liquid-glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-white/10 flex items-center justify-between gap-3 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-serif text-white">Extracted Core Concepts</h3>
                  <div className="flex items-center gap-1 liquid-glass rounded-full p-1 border border-white/10">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        viewMode === 'list' ? 'bg-white text-black' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      <List className="w-3.5 h-3.5" />
                      <span>Takeaways</span>
                    </button>
                    <button
                      onClick={() => setViewMode('mindmap')}
                      className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        viewMode === 'mindmap' ? 'bg-white text-black' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      <Network className="w-3.5 h-3.5" />
                      <span>Mind Map</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-8">
                  {viewMode === 'list' ? (
                    <div className="space-y-3 sm:space-y-4">
                      {concepts.map((c, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-3 sm:gap-5 items-start p-4 sm:p-6 rounded-2xl bg-white/3 border border-white/5 hover:border-white/15 transition-all"
                        >
                          <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                            {`0${i + 1}`}
                          </div>
                          <p className="text-white text-sm sm:text-base md:text-lg font-sans leading-relaxed pt-0.5">{c.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <MindMap concepts={concepts} />
                  )}
                </div>
              </div>

              {/* Quiz Trigger / Quiz Card */}
              {!showQuiz && activeSubject !== 'Custom' && (
                <button
                  onClick={() => setShowQuiz(true)}
                  className="w-full liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/25 transition-all flex items-center justify-between group cursor-pointer text-left gap-4"
                >
                  <div className="space-y-1">
                    <span className="uppercase tracking-widest text-white/40 text-[10px] sm:text-xs font-semibold">Self Assessment</span>
                    <h4 className="text-xl sm:text-2xl font-serif text-white">Ready to test your retention?</h4>
                    <p className="text-white/60 text-xs sm:text-sm">Take a 2-question knowledge verification check.</p>
                  </div>
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)] shrink-0">
                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                  </div>
                </button>
              )}

              {showQuiz && activeSubject !== 'Custom' && (
                <QuizSection subject={activeSubject} onMastered={handleMastered} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AppShell>
  );
}
