"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const q1Options = ["Productivity", "Creativity", "Gaming", "Business", "Travel"];
const q2Options = ["Minimal setup", "Powerful setup", "Smart automation", "Beautiful design"];

type ResultKey = "minimalist" | "creator" | "operator" | "gamer" | "business" | "automation";

const results: Record<ResultKey, { title: string; blurb: string }> = {
  minimalist: {
    title: "The Minimalist",
    blurb:
      "You value clarity over clutter — the same instinct behind the clean Apple ecosystems and streamlined marketplace operations I build.",
  },
  creator: {
    title: "The Creator",
    blurb: "You lead with vision and craft — the same instinct behind Photoczaro and the brand campaigns I run at Florence.",
  },
  operator: {
    title: "The Operator",
    blurb:
      "You care about structure, stock, systems, and clean execution — exactly the type of thinking behind my e-commerce and AI automation projects.",
  },
  gamer: {
    title: "The Gamer",
    blurb: "You want performance pushed to the edge — the same drive behind the AI-powered ad campaigns and Apple hardware I deploy.",
  },
  business: {
    title: "The Business Builder",
    blurb: "You think in deals, partnerships, and growth curves — the mindset behind the 25%+ growth I've driven in high-value B2B accounts.",
  },
  automation: {
    title: "The Automation Mind",
    blurb: "You'd rather build the system once than repeat the task forever — exactly why I lean on AI to turn manual workflows into growth engines.",
  },
};

function getResultKey(q1: string, q2: string): ResultKey {
  if (q1 === "Creativity") return "creator";
  if (q1 === "Gaming") return "gamer";
  if (q1 === "Travel") return "minimalist";
  if (q1 === "Productivity") return q2 === "Smart automation" ? "automation" : "operator";
  // Business
  if (q2 === "Smart automation") return "automation";
  if (q2 === "Minimal setup") return "operator";
  return "business";
}

function Chip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-line bg-surface px-2.5 py-1 text-[10.5px] font-medium text-ink-soft shadow-tight transition-colors duration-200 hover:border-accent-soft hover:bg-accent-tint hover:text-accent"
    >
      {label}
    </button>
  );
}

export default function TechPersonalityQuiz() {
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);

  const result = q1 && q2 ? results[getResultKey(q1, q2)] : null;

  const reset = () => {
    setQ1(null);
    setQ2(null);
  };

  return (
    <div className="relative mt-6 h-[180px] w-full overflow-hidden rounded-lg border border-line bg-canvas-alt p-4">
      <div className="flex items-start justify-between">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">Find My Tech Personality</p>
        <div className="mt-0.5 flex shrink-0 gap-1">
          <span className={`h-1.5 w-1.5 rounded-full transition-colors ${q1 ? "bg-accent" : "bg-line"}`} />
          <span className={`h-1.5 w-1.5 rounded-full transition-colors ${q2 ? "bg-accent" : "bg-line"}`} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!q1 ? (
          <motion.div key="q1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="mt-2 text-[13px] font-medium text-ink-soft">What matters most to you?</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {q1Options.map((opt) => (
                <Chip key={opt} label={opt} onClick={() => setQ1(opt)} />
              ))}
            </div>
          </motion.div>
        ) : !q2 ? (
          <motion.div key="q2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="mt-2 text-[13px] font-medium text-ink-soft">What do you like?</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {q2Options.map((opt) => (
                <Chip key={opt} label={opt} onClick={() => setQ2(opt)} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={reset}
            className="mt-2 cursor-pointer"
          >
            <p className="font-display text-[17px] font-semibold text-ink">{result!.title}</p>
            <p className="mt-1.5 text-[11.5px] leading-snug text-body">{result!.blurb}</p>
            <p className="mt-1.5 text-[10px] text-muted">Tap to try again</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
