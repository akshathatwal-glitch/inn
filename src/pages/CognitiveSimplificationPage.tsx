import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Sparkles, RotateCcw, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CognitiveSimplificationPage() {
  const [text, setText] = useState('Mitochondria are membrane-bound cell organelles that generate most of the chemical energy needed to power the cell\'s biochemical reactions. Chemical energy produced by the mitochondria is stored in a small molecule called adenosine triphosphate (ATP). Mitochondria contain their own small chromosomes. Generally, mitochondria, and therefore mitochondrial DNA, are inherited only from the mother.');
  const [apiKey, setApiKey] = useState(localStorage.getItem('openrouter_key') || '');
  const [isSimplifying, setIsSimplifying] = useState(false);
  const [simplifiedPoints, setSimplifiedPoints] = useState<Array<{ text: string, color: string }> | null>(null);

  useEffect(() => {
    localStorage.setItem('openrouter_key', apiKey);
  }, [apiKey]);

  const handleSimplify = async () => {
    if (!text.trim()) return;
    if (!apiKey.trim()) {
      alert("Please enter your OpenRouter API Key first.");
      return;
    }

    setIsSimplifying(true);

    try {
      const sanitizedKey = apiKey.trim();
      console.log("--- OpenRouter API Request Debug ---");
      console.log("API Key Length:", sanitizedKey.length);
      console.log("API Key Starts With:", sanitizedKey.substring(0, 10) + "...");
      console.log("Is it formatted correctly? (Starts with sk-or-v1-):", sanitizedKey.startsWith("sk-or-v1-"));
      console.log("Headers being sent:", {
        "Authorization": `Bearer ${sanitizedKey.substring(0, 10)}...`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "AdaptLearn Interface"
      });
      console.log("------------------------------------");

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${sanitizedKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin, // Required by OpenRouter
          "X-Title": "AdaptLearn Interface"       // Optional but recommended
        },
        body: JSON.stringify({
          model: "stealth/ox-alpha",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that simplifies dense text for cognitive ease. Extract the 3 to 5 most important core concepts from the user's text. Return ONLY a valid JSON array of strings, where each string is a single simplified concept. Do not include any markdown formatting, backticks, or other text outside the JSON array. Example: [\"Concept 1\", \"Concept 2\", \"Concept 3\"]"
            },
            {
              role: "user",
              content: text
            }
          ]
        })
      });

      if (!response.ok) {
        let errorMsg = `HTTP Error ${response.status}`;
        try {
          const errorData = await response.json();
          console.error("OpenRouter Error Details:", errorData);
          if (errorData.error && errorData.error.message) {
            errorMsg = errorData.error.message;
          }
        } catch (e) {
          console.error("Failed to parse OpenRouter error response.");
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      let content = data.choices[0].message.content.trim();

      // Cleanup common markdown formatting that AI might still inject
      if (content.startsWith("```json")) content = content.slice(7);
      if (content.startsWith("```")) content = content.slice(3);
      if (content.endsWith("```")) content = content.slice(0, -3);
      content = content.trim();

      const parsed = JSON.parse(content);
      const colors = ["text-blue-400", "text-green-400", "text-purple-400", "text-pink-400", "text-yellow-400"];

      if (Array.isArray(parsed)) {
        setSimplifiedPoints(parsed.map((pt: string, i: number) => ({
          text: pt,
          color: colors[i % colors.length]
        })));
      } else {
        throw new Error("Invalid format returned by AI");
      }

    } catch (error: any) {
      console.error("Simplification Error:", error);
      alert(`Failed to simplify text.\n\nError: ${error.message}\n\nPlease check the browser console for more details, or verify your API key.`);
    } finally {
      setIsSimplifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6 md:p-12">
      <Link to="/" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-12">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Cognitive Simplification</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">Extract core concepts from dense, difficult text and reduce cognitive load instantly.</p>

          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-3 max-w-md w-full">
            <Key className="w-4 h-4 text-white/50" />
            <input
              type="password"
              placeholder="Enter OpenRouter API Key (sk-or-v1-...)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-transparent border-none text-white text-sm focus:outline-none w-full"
            />
          </div>
          <p className="text-white/40 text-xs mt-3">
            Using <span className="text-white/70">stealth/ox-alpha</span>. Your key is stored locally in your browser.
          </p>
        </div>

        <div className="liquid-glass rounded-3xl p-8 border border-white/10 flex flex-col mb-8">
          <h3 className="text-xl text-white mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5" /> Analyze Text
          </h3>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSimplifying || simplifiedPoints !== null}
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-white/80 focus:outline-none focus:border-white/30 resize-none min-h-[200px] mb-6 disabled:opacity-50"
            placeholder="Paste dense reading material here..."
          />

          <div className="flex justify-end">
            {!simplifiedPoints ? (
              <button
                onClick={handleSimplify}
                disabled={isSimplifying || !text.trim()}
                className="bg-white text-black rounded-full px-8 py-3 text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-80 disabled:cursor-wait"
              >
                {isSimplifying ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <RotateCcw className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                {isSimplifying ? "Extracting Concepts..." : "Simplify with AI"}
              </button>
            ) : (
              <button
                onClick={() => setSimplifiedPoints(null)}
                className="text-white/60 hover:text-white transition-colors text-sm underline underline-offset-4"
              >
                Analyze New Text
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {simplifiedPoints && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="liquid-glass rounded-3xl p-8 border border-white/10"
            >
              <h3 className="text-xl text-white mb-8 border-b border-white/10 pb-4">Key Takeaways</h3>
              <div className="space-y-6">
                {simplifiedPoints.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-4 items-start bg-white/5 p-5 rounded-2xl border border-white/5"
                  >
                    <div className={`mt-2 w-3 h-3 rounded-full shrink-0 ${point.color} bg-current shadow-[0_0_12px_currentColor]`} />
                    <p className="text-white/90 text-xl leading-relaxed">{point.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
