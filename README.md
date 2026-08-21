# 🌟 AdaptLearn — Real-Time Adaptive AI Learning Platform

> **Empowering Neurodivergent Minds in the Classroom & Beyond**  
> *Breaking the barrier of the "one-size-fits-all" educational model through personalized, AI-driven real-time material adaptation.*

---

## 📌 Executive Summary (Synopsis)

Traditional education relies heavily on static, dense textbooks and standardized curriculum formats that assume every student processes text and visual information identically. For neurodivergent learners—including those with **Dyslexia, ADHD, and Visual Processing Disorders**—this creates cognitive fatigue, visual crowding, and significant barriers to comprehension.

**AdaptLearn** is a web and tablet-based assistive educational platform that transforms standard curriculum materials into dynamically adapted, personalized reading formats in real time. Powered by client-side intelligence and Natural Language Processing, AdaptLearn provides three core assistive engines:
1. **Dynamic Text Formatting Engine**: Real-time conversion into OpenDyslexic typography, phonetic syllable color segmentation, customizable line kerning, and interactive reading rulers.
2. **Cognitive Simplification Engine**: NLP-powered extraction of dense academic chapters into structured takeaway points, interactive visual SVG mind maps, and instant retention verification quizzes.
3. **Sensory-Friendly Focus Mode**: Distraction-free, low-stimulus environments equipped with customizable Pomodoro attention arcs, ambient soundscapes, luminance dimmers, and 4-4-4 respiratory grounding anchors.

---

## 🎯 Problem Statement & Market Need

- **1 in 5 students** experiences language-based learning disabilities like dyslexia.
- **Over 10% of school-aged children** navigate ADHD or attention regulation challenges.
- **The Problem:** Modern digital textbooks and classroom PDFs are visually overwhelming, text-dense, and rigid. Students spend disproportionate cognitive energy deciphering words rather than grasping core concepts.
- **The Solution:** A zero-friction, privacy-preserving interface that instantly restructures any classroom text into a neuro-inclusive, accessible format tailored to the learner's individual profile.

---

## 🚀 Key Prototype Features

### 1. 🔤 Engine 01: Dynamic Text Formatting
*Eliminates visual crowding and letter-inversion anxiety.*
- **OpenDyslexic Font Integration:** Custom gravity-weighted baseline typography to prevent letter flipping (`b`/`d`, `p`/`q`).
- **Phonetic Syllable Segmentation:** Color-coded alternating phonemes (`syllable-even` / `syllable-odd`) to assist word decoding and phonetic breakdown.
- **Dynamic Reading Ruler:** Cursor- and touch-tracked focus beam that highlights the active line while dimming surrounding text.
- **Contrast Overlays:** Multi-spectral color overlays (Cream, Sky Blue, Mint, Rose, Pitch Black) to alleviate visual stress (Irlen syndrome / scotopic sensitivity).
- **Fine-Grained Typographic Sliders:** Real-time controls for font scaling (13–26px), line height (1.3–2.8x), and letter kerning (0–5px).

### 2. 🧠 Engine 02: Cognitive Simplification & Deconstruction
*Prevents working memory overload and enhances long-term retention.*
- **NLP Concept Extraction:** Real-time semantic analysis summarizing complex paragraphs into high-impact core takeaways without losing critical concepts.
- **Interactive SVG Mind Maps:** Automatically generates spatial, non-linear concept relationship diagrams for visual thinkers.
- **Subject-Specific Curriculum Modules:** Pre-loaded modules across Biology, European History, Mathematics, Literature, and custom input.
- **Concept Verification Quizzes:** Instant formative self-assessments that validate student comprehension and track weekly concept mastery.

### 3. 🌿 Engine 03: Sensory-Friendly Focus Mode
*Fosters sustained flow states and calms cognitive overstimulation.*
- **Distraction-Free Zen Canvas:** Strips away high-contrast colors, extraneous navigation elements, and digital clutter.
- **Tailored Attention-Span Timers:** Customizable Pomodoro intervals (5m, 15m, 25m, 45m) configured to individual attention arcs.
- **4-4-4 Grounding Anchor:** Interactive respiratory breathing sphere to de-escalate test anxiety and sensory overload.
- **Spatial Ambient Soundscapes:** Built-in audio generators (Rainfall, White Noise, Lo-Fi study beats, Café) with real-time waveform visualizers.
- **Hardware Brightness Dimmer:** Software-level luminance control to prevent glare and digital eye strain.

### 4. 👤 Learner Profile & Neuro-Archetypes
*Zero-login, privacy-first local configuration.*
- **Archetype Presets:** One-click configurations for **Dyslexia Mode**, **ADHD Attention Flow**, **Visual Processing Mode**, and **Combined Neuro-Profile**.
- **100% Client-Side Persistence:** Session streaks, focus metrics, student name, and accessibility presets persist locally via `localStorage` with zero biometric or tracking data transmitted.
- **Interactive Content Library:** Searchable curriculum repository with one-click PDF upload simulation.

---

## 🛠️ Technology Stack & Architecture

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 + TypeScript + Vite |
| **Styling & Design System** | Tailwind CSS v4 + Vanilla CSS Design Tokens |
| **Aesthetics** | Liquid-Glass Glassmorphism, Instrument Serif Typography, Dark Theme |
| **Motion & Physics** | Framer Motion (Layout Animations, Staggered Springs, LayoutId) |
| **Icons & Visuals** | Lucide React |
| **Typography** | OpenDyslexic (OTF/WOFF), Inter, Instrument Serif |
| **AI Integration** | OpenRouter API / LLM NLP pipeline with local fallbacks |
| **Data Persistence** | HTML5 `localStorage` (No login required, 100% privacy-compliant) |
| **Responsiveness** | Fully adaptive layout (Mobile, Tablet, Desktop, Chromebooks) |

---

## 🌟 Hackathon Innovation & Impact Highlights

1. **Inclusive by Design (WCAG AAA compliant)**: Developed from the ground up prioritizing universal design principles and neurodiversity.
2. **Zero Setup Friction**: Students do not need accounts, passwords, or emails. Everything works immediately and saves directly to the device.
3. **Multi-Modal Adaptation**: Addresses the triad of learning challenges: **Visual** (typography/spacing), **Cognitive** (AI summaries/mind maps), and **Sensory** (low-stimulation/timers).
4. **School District Scalability**: Lightweight web application deployable across Chromebooks, iPads, and standard classroom laptops with near-zero latency.

---

## 📂 Project Structure

```
├── public/
│   ├── favicon.svg
│   └── ...
├── src/
│   ├── components/
│   │   ├── AppShell.tsx               # Responsive sidebar & mobile drawer layout
│   │   ├── Index.tsx                  # Landing page hero, marquee, feature showcase
│   │   ├── ServicesSection.tsx        # Video preview feature bento
│   │   ├── PhilosophySection.tsx      # Educational vision and mission
│   │   ├── FeaturedVideoSection.tsx   # CTA banner and quick navigation
│   │   ├── PrototypeModal.tsx         # Interactive sandbox simulator modal
│   │   └── ui/about-bento.tsx         # Animated metrics and impact grid
│   ├── hooks/
│   │   ├── useSettings.tsx            # Centralized localStorage accessibility state
│   │   └── useModal.tsx               # Global modal state management
│   ├── pages/
│   │   ├── DashboardPage.tsx          # Student metrics, streaks & quick launch
│   │   ├── DynamicFormattingPage.tsx  # OpenDyslexic, ruler & syllable highlighter
│   │   ├── CognitiveSimplificationPage.tsx # AI Mind Maps & concept quizzes
│   │   ├── SensoryModePage.tsx        # Zen canvas, breathing sphere & soundscapes
│   │   ├── LibraryPage.tsx            # Textbook library & PDF upload
│   │   └── ProfilePage.tsx            # Archetype configurations & parameters
│   ├── index.css                      # Liquid glass tokens, OpenDyslexic font-face
│   └── App.tsx                        # Client-side router configuration
├── package.json
└── vite.config.ts
```

---

## ⚡ Quick Start & Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/akshathatwal-glitch/inn.git
   cd inn
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional)**:
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```
   *(Note: If no API key is provided, the platform automatically utilizes built-in instant local demo extraction).*

4. **Launch the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏆 Future Roadmap

- [ ] **AI Spaced-Repetition Flashcards**: Automatically turn extracted mind maps into interactive memory flashcards.
- [ ] **Voice-Synchronized Text-to-Speech**: Word-by-word visual highlight tracking accompanied by natural neural audio voices.
- [ ] **Teacher / Parent Export Token**: Generate a privacy-safe QR code or read-only token for educators to review student focus trends.
- [ ] **OCR Image-to-Accessible-Format**: Take pictures of physical whiteboard text or paper worksheets for instant digital adaptation.

---

## 👥 Authors & Team
- **Team**: AdaptLearn Hackathon Team
- **Concept**: Assistive AI for Neuro-Inclusive Education
