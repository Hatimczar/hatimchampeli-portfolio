"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Tablet, Laptop, Watch, Headphones, Tv, Monitor } from "lucide-react";

const devices = [
  {
    name: "iPhone",
    icon: Smartphone,
    fact: "The original 2007 iPhone had no App Store, no copy-paste, and no video recording.",
  },
  {
    name: "MacBook",
    icon: Laptop,
    fact: "Steve Jobs unveiled the MacBook Air in 2008 by pulling it out of a manila envelope.",
  },
  {
    name: "iPad",
    icon: Tablet,
    fact: "Apple trademarked the name \"iPad\" back in 2003, years before it launched in 2010.",
  },
  {
    name: "Apple Watch",
    icon: Watch,
    fact: "The Apple Watch was Apple's first all-new product category since the original iPad.",
  },
  {
    name: "AirPods",
    icon: Headphones,
    fact: "AirPods reportedly took inspiration from the wireless earpiece in the film \"Her.\"",
  },
  {
    name: "Apple TV",
    icon: Tv,
    fact: "Steve Jobs called Apple TV a \"hobby\" for years before it grew into a real product line.",
  },
  {
    name: "iMac",
    icon: Monitor,
    fact: "The 1998 iMac shipped in five fruit colors and helped kill off the floppy disk.",
  },
];

function randomPos() {
  return { x: Math.random() * 68 + 6, y: Math.random() * 42 + 10 };
}

function randomDeviceIndex(exclude: number) {
  let next = Math.floor(Math.random() * devices.length);
  while (next === exclude && devices.length > 1) {
    next = Math.floor(Math.random() * devices.length);
  }
  return next;
}

export default function AppleTrivia() {
  const [deviceIndex, setDeviceIndex] = useState(0);
  const [pos, setPos] = useState(randomPos());
  const [revealed, setRevealed] = useState(false);
  const [found, setFound] = useState(0);

  useEffect(() => {
    if (!revealed) return;
    const timer = setTimeout(() => {
      setDeviceIndex((i) => randomDeviceIndex(i));
      setPos(randomPos());
      setRevealed(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, [revealed]);

  const device = devices[deviceIndex];
  const Icon = device.icon;

  const handleClick = () => {
    if (revealed) return;
    setRevealed(true);
    setFound((f) => f + 1);
  };

  return (
    <div className="relative mt-6 h-[180px] w-full overflow-hidden rounded-lg border border-line bg-canvas-alt">
      <div className="pointer-events-none absolute left-4 top-4 z-10">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">Apple Trivia</p>
        <p className="text-[13px] font-medium text-ink-soft">Tap a device for a fun fact</p>
      </div>
      <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-surface px-3 py-1 font-mono text-[12px] font-semibold text-accent shadow-tight">
        {found}
      </div>

      <motion.button
        onClick={handleClick}
        className="absolute flex flex-col items-center gap-1.5"
        animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        aria-label={`Reveal a fact about ${device.name}`}
      >
        <motion.span
          animate={revealed ? { scale: 1 } : { scale: [1, 1.08, 1] }}
          transition={revealed ? { duration: 0.2 } : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-tint text-accent shadow-tight"
        >
          <Icon size={22} strokeWidth={1.75} />
        </motion.span>
        <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-medium text-ink-soft shadow-tight">
          {device.name}
        </span>
      </motion.button>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="glass absolute inset-x-4 bottom-4 rounded-md border border-line px-4 py-3 text-[12.5px] leading-snug text-ink-soft shadow-soft"
          >
            {device.fact}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
