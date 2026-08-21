import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Upload, Search, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import AppShell from '../components/AppShell';

interface Book {
  id: string;
  title: string;
  subject: string;
  grade: string;
  difficulty: 'Elementary' | 'Intermediate' | 'Advanced';
  tag: string;
  pages: number;
  excerpt: string;
}

const BOOKS: Book[] = [
  {
    id: 'b1', title: 'The Water Cycle & Atmosphere', subject: 'Science', grade: 'Grade 5–7',
    difficulty: 'Elementary', tag: 'Meteorology', pages: 8,
    excerpt: 'Water constantly moves through an interconnected cycle across oceans, cloud formations, and terrestrial basins.'
  },
  {
    id: 'b2', title: 'Mitochondria & Cellular Respiration', subject: 'Biology', grade: 'Grade 8–10',
    difficulty: 'Intermediate', tag: 'Cytology', pages: 12,
    excerpt: 'Mitochondria synthesize adenosine triphosphate (ATP) to drive essential biological energy across eukaryotic cells.'
  },
  {
    id: 'b3', title: 'The French Revolution of 1789', subject: 'History', grade: 'Grade 9–11',
    difficulty: 'Advanced', tag: 'European History', pages: 20,
    excerpt: 'A radical disruption in monarchical rule that permanently reshaped modern democratic concepts and civic sovereignty.'
  },
  {
    id: 'b4', title: 'Foundational Fraction Arithmetic', subject: 'Math', grade: 'Grade 4–6',
    difficulty: 'Elementary', tag: 'Core Math', pages: 10,
    excerpt: 'An intuitive breakdown of fractional ratios, common denominators, and reciprocal multiplication rules.'
  },
  {
    id: 'b5', title: 'Shakespeare’s Hamlet: Act III', subject: 'Literature', grade: 'Grade 10–12',
    difficulty: 'Advanced', tag: 'Tragedy Drama', pages: 40,
    excerpt: 'An intense philosophical interrogation into morality, royal betrayal, existential doubt, and personal agency.'
  },
  {
    id: 'b6', title: 'Mechanics of Plant Photosynthesis', subject: 'Biology', grade: 'Grade 6–8',
    difficulty: 'Intermediate', tag: 'Botany', pages: 14,
    excerpt: 'How chloroplast structures convert photons and carbon dioxide into glucose and atmospheric oxygen.'
  },
  {
    id: 'b7', title: 'Planetary Systems of the Milky Way', subject: 'Science', grade: 'Grade 4–6',
    difficulty: 'Elementary', tag: 'Astronomy', pages: 16,
    excerpt: 'Exploring gravitational orbits, terrestrial planets, gas giants, and the Kuiper belt asteroid boundaries.'
  },
  {
    id: 'b8', title: 'Global Theatres of World War II', subject: 'History', grade: 'Grade 8–10',
    difficulty: 'Intermediate', tag: 'Modern Conflicts', pages: 24,
    excerpt: 'An objective historical overview of military alliances, civic mobilization, and geopolitical treaties from 1939 to 1945.'
  },
];

const SUBJECTS = ['All', 'Science', 'Biology', 'History', 'Math', 'Literature'];

export default function LibraryPage() {
  const [search, setSearch] = useState('');
  const [activeSubject, setActiveSubject] = useState('All');
  const [showUpload, setShowUpload] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);

  const filtered = BOOKS.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.subject.toLowerCase().includes(search.toLowerCase());
    const matchSubject = activeSubject === 'All' || b.subject === activeSubject;
    return matchSearch && matchSubject;
  });

  const handleFakeUpload = () => {
    setShowUpload(false);
    setUploadDone(true);
    setTimeout(() => setUploadDone(false), 3500);
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
              <BookOpen className="w-3.5 h-3.5 text-white" />
              <span>Curriculum Repository</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl text-white tracking-tight font-serif">
              Content <em className="italic text-white/50">Library</em>.
            </h1>
          </div>

          <button
            onClick={() => setShowUpload(true)}
            className="bg-white text-black rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-semibold hover:bg-gray-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] shrink-0 w-full sm:w-auto justify-center"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Textbook PDF</span>
          </button>
        </motion.div>

        {/* Upload Success Toast */}
        {uploadDone && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="p-4 rounded-2xl liquid-glass border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-3"
          >
            <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-400 shrink-0" />
            <span>Document processed: Formatted and ready in your adaptive reader.</span>
          </motion.div>
        )}

        {/* Search & Filter Controls */}
        <div className="space-y-3 sm:space-y-4">
          <div className="relative">
            <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search library by subject, title, or topic..."
              className="w-full liquid-glass border border-white/10 rounded-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-3.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 font-sans shadow-md"
            />
          </div>

          <div className="flex gap-2 items-center overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs uppercase tracking-widest text-white/40 font-mono mr-2 shrink-0">Discipline:</span>
            {SUBJECTS.map(s => (
              <button
                key={s}
                onClick={() => setActiveSubject(s)}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all duration-300 shrink-0 ${
                  activeSubject === s
                    ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'liquid-glass text-white/60 hover:text-white hover:border-white/20'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filtered.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link to={`/feature/formatting?book=${book.id}`} className="h-full block">
                <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/25 transition-all group flex flex-col justify-between h-full relative overflow-hidden cursor-pointer shadow-lg">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="uppercase tracking-widest text-white/40 text-[10px] font-mono font-semibold">{book.tag}</span>
                      <div className="liquid-glass rounded-full p-2 group-hover:bg-white/15 transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-white/90">
                      {book.title}
                    </h3>

                    <p className="text-white/50 text-xs leading-relaxed line-clamp-3">
                      {book.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 sm:mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/40">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                      {book.difficulty}
                    </span>
                    <span>{book.pages} Pages</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="liquid-glass rounded-3xl p-6 sm:p-10 border border-white/20 w-full max-w-lg space-y-5 sm:space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-serif text-white mb-1">Import Classroom PDF</h3>
                <p className="text-white/50 text-xs leading-relaxed">
                  Our system will extract text structures and apply your dyslexia formatting presets automatically.
                </p>
              </div>

              <label className="block w-full border-2 border-dashed border-white/15 rounded-3xl p-8 sm:p-12 text-center cursor-pointer hover:border-white/30 transition-colors bg-white/2">
                <Upload className="w-7 sm:w-8 h-7 sm:h-8 text-white/40 mx-auto mb-3" />
                <p className="text-white text-xs sm:text-sm font-semibold">Select or drag PDF file</p>
                <p className="text-white/30 text-[10px] sm:text-xs mt-1 font-mono">Standard textbook format up to 25MB</p>
                <input type="file" accept=".pdf" className="hidden" onChange={handleFakeUpload} />
              </label>

              <div className="flex gap-3">
                <button
                  onClick={handleFakeUpload}
                  className="flex-1 bg-white text-black rounded-full py-2.5 sm:py-3 text-xs font-semibold hover:bg-gray-200 transition-colors"
                >
                  Confirm Upload
                </button>
                <button
                  onClick={() => setShowUpload(false)}
                  className="flex-1 liquid-glass rounded-full py-2.5 sm:py-3 text-xs text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </AppShell>
  );
}
