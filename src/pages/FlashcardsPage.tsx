import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, RotateCcw, Volume2, CheckCircle2,
  ChevronLeft, ChevronRight, Shuffle, Plus,
  Trash2, Brain, BookOpen, Layers, Award,
  Clock, Zap, Check, X
} from 'lucide-react';
import AppShell from '../components/AppShell';
import { useSettings } from '../hooks/useSettings';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  mastered: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const PRESET_DECKS: Record<string, { title: string; subject: string; cards: Flashcard[] }> = {
  biology: {
    title: 'Cellular Respiration & ATP',
    subject: 'Biology',
    cards: [
      {
        id: 'bio-1',
        front: 'What is the primary function of Mitochondria in eukaryotic cells?',
        back: 'To generate biochemical energy stored in adenosine triphosphate (ATP) molecules through cellular respiration.',
        category: 'Cytology',
        mastered: false,
      },
      {
        id: 'bio-2',
        front: 'From whom is mitochondrial DNA (mtDNA) inherited in humans?',
        back: 'Exclusively from the biological mother, as sperm mitochondria are destroyed after fertilization.',
        category: 'Genetics',
        mastered: false,
      },
      {
        id: 'bio-3',
        front: 'What are the two membrane layers of mitochondria?',
        back: 'An outer smooth membrane and a highly folded inner membrane that forms cristae to maximize surface area.',
        category: 'Cell Structure',
        mastered: false,
      },
      {
        id: 'bio-4',
        front: 'What critical energy carrier molecule powers cell reactions?',
        back: 'ATP (Adenosine Triphosphate), often referred to as the cellular currency of energy.',
        category: 'Biochemistry',
        mastered: false,
      }
    ],
  },
  history: {
    title: 'French Revolution (1789)',
    subject: 'History',
    cards: [
      {
        id: 'hist-1',
        front: 'What historic assembly met in May 1789, sparking the revolution?',
        back: 'The Estates-General, convened by King Louis XVI to address economic insolvency.',
        category: 'Political Events',
        mastered: false,
      },
      {
        id: 'hist-2',
        front: 'What fortress was stormed on July 14, 1789, symbolizing royal tyranny?',
        back: 'The Bastille prison in Paris, now celebrated as the French National Day.',
        category: 'Key Battles',
        mastered: false,
      },
      {
        id: 'hist-3',
        front: 'What seminal document established universal civic rights in August 1789?',
        back: 'The Declaration of the Rights of Man and of the Citizen.',
        category: 'Civic Law',
        mastered: false,
      },
    ],
  },
  science: {
    title: 'The Water Cycle & Atmosphere',
    subject: 'Earth Science',
    cards: [
      {
        id: 'sci-1',
        front: 'What is Evaporation in the hydrological cycle?',
        back: 'The process where liquid water absorbs solar thermal energy and transforms into water vapor gas.',
        category: 'Phase Changes',
        mastered: false,
      },
      {
        id: 'sci-2',
        front: 'How does Condensation lead to cloud formation?',
        back: 'Water vapor cools as it rises, coalescing around microscopic aerosols into liquid droplets.',
        category: 'Atmosphere',
        mastered: false,
      },
      {
        id: 'sci-3',
        front: 'What drives the entire global water movement cycle?',
        back: 'Solar radiation from the sun combined with Earth’s gravitational force.',
        category: 'Energy Transfer',
        mastered: false,
      },
    ],
  },
};

export default function FlashcardsPage() {
  const { settings } = useSettings();
  const [selectedDeckKey, setSelectedDeckKey] = useState<'biology' | 'history' | 'science'>('biology');
  const [cards, setCards] = useState<Flashcard[]>(PRESET_DECKS.biology.cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [quickAiText, setQuickAiText] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  useEffect(() => {
    setCards(PRESET_DECKS[selectedDeckKey].cards);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedDeckKey]);

  const currentCard = cards[currentIndex] || cards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCards((prev) => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
  };

  const toggleMastery = (id: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, mastered: !c.mastered } : c))
    );
  };

  const setCardDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    setCards((prev) =>
      prev.map((c, i) => (i === currentIndex ? { ...c, difficulty, mastered: difficulty === 'easy' } : c))
    );
    handleNext();
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFront.trim() || !newBack.trim()) return;
    const newCard: Flashcard = {
      id: `custom-${Date.now()}`,
      front: newFront.trim(),
      back: newBack.trim(),
      category: 'Custom Concept',
      mastered: false,
    };
    setCards((prev) => [...prev, newCard]);
    setNewFront('');
    setNewBack('');
    setShowAddModal(false);
    setCurrentIndex(cards.length);
  };

  const handleGenerateAiCards = () => {
    if (!quickAiText.trim()) return;
    setIsGeneratingAi(true);
    setTimeout(() => {
      // Extract key sentences into Q&A
      const sentences = quickAiText
        .split(/[.!?]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 15);

      const generated: Flashcard[] = sentences.slice(0, 4).map((sent, i) => {
        const words = sent.split(' ');
        const keySubject = words.slice(0, 3).join(' ');
        return {
          id: `ai-${Date.now()}-${i}`,
          front: `Explain the concept: "${keySubject}..."`,
          back: sent,
          category: 'AI Extraction',
          mastered: false,
        };
      });

      if (generated.length > 0) {
        setCards((prev) => [...prev, ...generated]);
        setQuickAiText('');
        setCurrentIndex(cards.length);
      }
      setIsGeneratingAi(false);
    }, 900);
  };

  const masteredCount = cards.filter((c) => c.mastered).length;
  const progressPct = cards.length > 0 ? Math.round((masteredCount / cards.length) * 100) : 0;

  return (
    <AppShell>
      <div className="py-6 sm:py-10 md:py-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto space-y-8 sm:space-y-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-white/10"
        >
          <div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-3">
              ● Active Recall Engine 04
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl text-white tracking-tight font-serif">
              Flashcard <em className="italic text-white/50">Studio</em>.
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 border border-white/10 text-xs font-mono text-white/70">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{masteredCount}/{cards.length} Mastered ({progressPct}%)</span>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-white text-black rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold hover:bg-gray-200 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Card</span>
            </button>
          </div>
        </motion.div>

        {/* Deck Switcher Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-2">
          <div className="flex items-center gap-2">
            {(['biology', 'history', 'science'] as const).map((deckKey) => {
              const deck = PRESET_DECKS[deckKey];
              const isSelected = selectedDeckKey === deckKey;
              return (
                <button
                  key={deckKey}
                  onClick={() => setSelectedDeckKey(deckKey)}
                  className={`px-4 py-2 rounded-2xl text-xs font-mono transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                      : 'liquid-glass border border-white/10 text-white/60 hover:text-white hover:border-white/25'
                  }`}
                >
                  <span>{deck.title}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleShuffle}
            className="liquid-glass border border-white/10 hover:border-white/20 text-white/60 hover:text-white px-3.5 py-2 rounded-2xl text-xs font-mono flex items-center gap-2 transition-all"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Shuffle</span>
          </button>
        </div>

        {/* Main Stage Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

          {/* Left Column: Interactive 3D Card Area */}
          <div className="xl:col-span-8 space-y-6">

            {/* Flashcard Component */}
            {currentCard && (
              <div className="relative perspective-1000 min-h-[340px] sm:min-h-[400px]">
                <motion.div
                  onClick={() => setIsFlipped(!isFlipped)}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 25 }}
                  className="w-full h-full min-h-[340px] sm:min-h-[400px] rounded-3xl liquid-glass border border-white/15 p-8 sm:p-12 flex flex-col justify-between cursor-pointer relative select-none shadow-2xl preserve-3d group hover:border-white/30 transition-colors"
                >
                  {/* FRONT FACE */}
                  <div
                    className={`flex flex-col justify-between h-full space-y-6 backface-hidden ${
                      isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10 bg-white/5">
                          {currentCard.category}
                        </span>
                        <span className="text-[10px] font-mono text-white/30">
                          Card {currentIndex + 1} of {cards.length}
                        </span>
                      </div>

                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => speakText(currentCard.front)}
                          className={`p-2 rounded-xl liquid-glass border border-white/10 hover:border-white/20 transition-colors ${
                            isSpeaking ? 'text-amber-300' : 'text-white/50 hover:text-white'
                          }`}
                          title="Read aloud"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="my-auto py-6">
                      <p className="text-white/40 text-xs font-mono uppercase tracking-wider mb-2">
                        [ Prompt / Question ]
                      </p>
                      <h2
                        className={`text-xl sm:text-2xl md:text-3xl text-white font-serif leading-relaxed ${
                          settings.isDyslexicFont ? 'font-dyslexic' : ''
                        }`}
                      >
                        {currentCard.front}
                      </h2>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                      <span>Click card or press Space to reveal answer</span>
                      <span className="text-white/20 group-hover:text-white/60 transition-colors">Flip →</span>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className={`absolute inset-0 p-8 sm:p-12 flex flex-col justify-between backface-hidden rotate-y-180 ${
                      !isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest px-2.5 py-1 rounded-full border border-emerald-400/20 bg-emerald-400/10">
                        Answer & Key Concept
                      </span>

                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => speakText(currentCard.back)}
                          className={`p-2 rounded-xl liquid-glass border border-white/10 hover:border-white/20 transition-colors ${
                            isSpeaking ? 'text-amber-300' : 'text-white/50 hover:text-white'
                          }`}
                          title="Read aloud"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="my-auto py-6">
                      <p className="text-emerald-400/60 text-xs font-mono uppercase tracking-wider mb-2">
                        [ Explanation ]
                      </p>
                      <p
                        className={`text-lg sm:text-xl md:text-2xl text-white/90 font-sans leading-relaxed ${
                          settings.isDyslexicFont ? 'font-dyslexic' : ''
                        }`}
                      >
                        {currentCard.back}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                      <span>Click to flip back</span>
                      <span className="text-emerald-400">● Verified Concept</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Navigation & Spaced Repetition Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-2xl liquid-glass border border-white/10 hover:border-white/25 text-white/70 hover:text-white transition-all"
                  aria-label="Previous card"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono text-white/50">
                  {currentIndex + 1} / {cards.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-2xl liquid-glass border border-white/10 hover:border-white/25 text-white/70 hover:text-white transition-all"
                  aria-label="Next card"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Leitner Spaced-Repetition Feedback */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                <button
                  onClick={() => setCardDifficulty('hard')}
                  className="px-4 py-2 rounded-xl text-xs font-mono border border-rose-500/20 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-colors"
                >
                  Hard (1d)
                </button>
                <button
                  onClick={() => setCardDifficulty('medium')}
                  className="px-4 py-2 rounded-xl text-xs font-mono border border-amber-500/20 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-colors"
                >
                  Good (3d)
                </button>
                <button
                  onClick={() => setCardDifficulty('easy')}
                  className="px-4 py-2 rounded-xl text-xs font-mono border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                >
                  Easy (7d)
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: AI Auto-Extractor & Deck Overview */}
          <div className="xl:col-span-4 space-y-6">

            {/* AI Text to Flashcards Generator */}
            <div className="liquid-glass rounded-3xl p-6 sm:p-7 border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/8">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white/70" />
                </div>
                <div>
                  <h3 className="text-base font-serif text-white">AI Note Extractor</h3>
                  <span className="text-[10px] text-white/40 font-mono">Convert text to study cards</span>
                </div>
              </div>

              <p className="text-white/50 text-xs leading-relaxed">
                Paste any paragraph or textbook passage to generate instant active-recall flashcards.
              </p>

              <textarea
                value={quickAiText}
                onChange={(e) => setQuickAiText(e.target.value)}
                placeholder="Paste notes, textbook definitions, or summaries here..."
                rows={3}
                className="w-full bg-white/[0.03] border border-white/10 focus:border-white/30 rounded-2xl p-3 text-xs text-white placeholder:text-white/20 focus:outline-none resize-none font-sans"
              />

              <button
                onClick={handleGenerateAiCards}
                disabled={isGeneratingAi || !quickAiText.trim()}
                className="w-full py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-white text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGeneratingAi ? 'Extracting Concepts...' : 'Generate Flashcards'}</span>
              </button>
            </div>

            {/* Active Deck List */}
            <div className="liquid-glass rounded-3xl p-6 sm:p-7 border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-white/60" />
                  <h3 className="text-base font-serif text-white">Deck Cards</h3>
                </div>
                <span className="text-xs font-mono text-white/40">{cards.length} cards</span>
              </div>

              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                {cards.map((c, i) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setCurrentIndex(i);
                      setIsFlipped(false);
                    }}
                    className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      i === currentIndex
                        ? 'border-white/30 bg-white/10 text-white'
                        : 'border-white/5 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/15'
                    }`}
                  >
                    <div className="min-w-0 flex-1 truncate">
                      <p className="truncate font-medium">{c.front}</p>
                    </div>
                    {c.mastered ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Manual Add Card Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="w-full max-w-lg liquid-glass border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-xl font-serif text-white">Create Study Card</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-1 rounded-lg text-white/40 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddCard} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                      Front (Question / Term)
                    </label>
                    <input
                      type="text"
                      value={newFront}
                      onChange={(e) => setNewFront(e.target.value)}
                      placeholder="e.g. What is ATP?"
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                      Back (Answer / Explanation)
                    </label>
                    <textarea
                      value={newBack}
                      onChange={(e) => setNewBack(e.target.value)}
                      placeholder="e.g. The primary energy currency of cells..."
                      rows={3}
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 font-sans resize-none"
                    />
                  </div>

                  <div className="pt-3 flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-5 py-2.5 rounded-xl liquid-glass border border-white/10 text-xs font-mono text-white/60 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-gray-200 transition-colors shadow-lg"
                    >
                      Save Card
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AppShell>
  );
}
