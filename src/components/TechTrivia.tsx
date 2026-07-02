"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Speaker, Disc, SatelliteDish, Bell } from "lucide-react";
import { BrandIcon } from "@/lib/icons";

type BrandId = "apple" | "bando" | "claude" | "jamf" | "google" | "starlink" | "ring" | "origin";

const REVEAL_MS = 5800;
const IDLE_RESPAWN_MS = 4200;

// Hardware brands spawn as a product silhouette; software/service brands spawn as their brand mark.
const brandMeta: Record<
  BrandId,
  { label: string; dotLabel: string; iconId?: string; ProductIcon?: typeof Smartphone }
> = {
  apple: { label: "Apple", dotLabel: "", ProductIcon: Smartphone },
  bando: { label: "Bang & Olufsen", dotLabel: "", ProductIcon: Speaker },
  claude: { label: "Claude", dotLabel: "", iconId: "claude" },
  jamf: { label: "JAMF", dotLabel: "JAMF" },
  google: { label: "Google", dotLabel: "", iconId: "google" },
  starlink: { label: "Starlink", dotLabel: "", ProductIcon: SatelliteDish },
  ring: { label: "Ring", dotLabel: "", ProductIcon: Bell },
  origin: { label: "Origin Acoustics", dotLabel: "", ProductIcon: Disc },
};

const items: Record<BrandId, string[]> = {
  apple: [
    "The first Apple logo showed Isaac Newton under a tree. The bitten apple arrived a year later, in 1977.",
    "In 1997, Apple was 90 days from bankruptcy before Steve Jobs returned and Microsoft invested $150M.",
    "News: in June 2026, Apple named John Ternus as incoming CEO, with Tim Cook moving to executive chairman on September 1.",
    "News: at WWDC 2026, Apple unveiled a redesigned Siri built on Google's Gemini models, landing in iOS 27.",
  ],
  bando: [
    "Bang & Olufsen was founded in 1925 in a Danish attic by two radio engineers, Peter Bang and Svend Olufsen.",
    "Several B&O speakers and turntables are held in MoMA's permanent design collection.",
    "News: B&O marked its 100th anniversary in 2025/26 and previewed Beosound Haven, its first fully in-house outdoor speaker.",
    "News: 2026's lineup added the Beo Grace earpieces and the Beosound Premiere soundbar.",
  ],
  claude: [
    "Claude is named after Claude Shannon, the mathematician who founded information theory.",
    "Claude is trained with 'Constitutional AI', critiquing and revising its own answers against a written set of principles.",
    "News: Claude Sonnet 5 launched in 2026 as Anthropic's most agentic Sonnet model, and became the default for every Free and Pro user.",
    "News: in 2026, Anthropic struck a deal giving California's state agencies, cities, and counties discounted access to Claude.",
  ],
  jamf: [
    "Jamf was founded in 2002 in Eau Claire, Wisconsin, before Apple device management was even a category.",
    "Jamf Pro manages millions of Apple devices worldwide, across schools, hospitals, and enterprises.",
    "News: in July 2026, Jamf launched Beacon, a threat-hunting service that puts its own researchers inside customer Mac environments.",
    "News: Jamf rolled out AI Governance for Mac in 2026, letting IT teams audit and control AI tools on managed fleets.",
  ],
  google: [
    "Google's name comes from a misspelling of 'googol', the number 1 followed by 100 zeros.",
    "Google was originally called 'BackRub', named after its use of backlinks to rank pages.",
    "News: at Google I/O 2026, Google introduced Gemini 3.5 and a new Google Home Speaker built around it.",
    "News: Android 17, announced in 2026, added floating app windows, live translation, and on-device Gemma 4 models.",
  ],
  starlink: [
    "Starlink is SpaceX's satellite internet constellation, first launched in 2019 to beam broadband from low Earth orbit.",
    "Each Starlink satellite weighs only a few hundred kilograms and is designed to burn up safely at the end of its life.",
    "News: Starlink passed 10,000 active satellites in orbit in March 2026, about two-thirds of everything currently in space.",
    "News: SpaceX deployed its 1,500th Starlink satellite of 2026 in June, its first launch as a newly public company.",
  ],
  ring: [
    "Ring started as 'Doorbot', a startup pitched on Shark Tank in 2013 that every investor on the show turned down.",
    "Amazon acquired Ring for a reported $1 billion in 2018.",
    "News: at CES 2026, Ring launched new smoke, motion, and glass-break sensors, plus real-time wildfire alerts in the app.",
    "News: Ring added 'AI Unusual Event Alerts' in 2026, learning a property's normal patterns to flag anything out of place.",
  ],
  origin: [
    "Origin Acoustics builds architectural speakers designed to disappear into ceilings, walls, and outdoor landscapes.",
    "The brand is best known for in-ceiling and in-wall speakers used in custom home theaters worldwide.",
    "News: Origin Acoustics launched a Built-to-Order Soundbar program in 2026, custom-sized for each installation.",
    "News: Origin's new BLENDS invisible speaker series began shipping in 2026, for rooms where speakers can't be seen.",
  ],
};

const brandOrder: BrandId[] = ["apple", "bando", "claude", "jamf", "google", "starlink", "ring", "origin"];

type Spawn = { uid: number; brand: BrandId; x: number; y: number };

function randomSpawn(uid: number, lastBrand: BrandId | null): Spawn {
  let brand = brandOrder[Math.floor(Math.random() * brandOrder.length)];
  if (brand === lastBrand) {
    brand = brandOrder[(brandOrder.indexOf(brand) + 1) % brandOrder.length];
  }
  const x = 14 + Math.random() * 72;
  const y = 34 + Math.random() * 46;
  return { uid, brand, x, y };
}

export default function TechTrivia() {
  const [spawn, setSpawn] = useState<Spawn | null>(null);
  const [revealed, setRevealed] = useState<{ brand: BrandId; fact: string } | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uidRef = useRef(0);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const spawnNext = (lastBrand: BrandId | null) => {
    uidRef.current += 1;
    const next = randomSpawn(uidRef.current, lastBrand);
    setSpawn(next);
    setRevealed(null);
    clearTimer();
    timerRef.current = setTimeout(() => spawnNext(next.brand), IDLE_RESPAWN_MS);
  };

  useEffect(() => {
    spawnNext(null);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (brand: BrandId) => {
    clearTimer();
    const pool = items[brand];
    const fact = pool[Math.floor(Math.random() * pool.length)];
    setRevealed({ brand, fact });
    setSpawn(null);
    timerRef.current = setTimeout(() => spawnNext(brand), REVEAL_MS);
  };

  const dismiss = () => {
    if (!revealed) return;
    spawnNext(revealed.brand);
  };

  return (
    <div className="relative mt-6 h-[180px] w-full overflow-hidden rounded-lg border border-line bg-canvas-alt p-4">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">Tap a device for a fun fact</p>

      <AnimatePresence mode="wait">
        {revealed ? (
          <motion.div
            key="fact"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="mt-2 cursor-pointer"
          >
            <p className="font-display text-[14px] font-semibold text-ink">{brandMeta[revealed.brand].label}</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-body">{revealed.fact}</p>
            <p className="mt-2 text-[10px] text-muted">Tap to close</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {spawn ? (
          <motion.button
            key={spawn.uid}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            onClick={() => handleClick(spawn.brand)}
            style={{ left: `${spawn.x}%`, top: `${spawn.y}%` }}
            className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-ink-soft shadow-tight transition-colors duration-200 hover:border-accent-soft hover:bg-accent-tint hover:text-accent"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/20" />
            {(() => {
              const meta = brandMeta[spawn.brand];
              if (meta.ProductIcon) {
                const Icon = meta.ProductIcon;
                return <Icon className="relative h-4 w-4" strokeWidth={1.8} />;
              }
              if (meta.iconId) {
                return <BrandIcon id={meta.iconId} className="relative h-4 w-4" />;
              }
              return <span className="relative text-[9px] font-semibold">{meta.dotLabel}</span>;
            })()}
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
