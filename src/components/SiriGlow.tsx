"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const FIBERS = [
  { width: 560, top: "12%", left: "-15%", rotate: -14, color: "rgba(255,255,255,0.55)", duration: 22, delay: 0 },
  { width: 460, top: "28%", left: "45%", rotate: 10, color: "rgba(93,150,255,0.5)", duration: 26, delay: 3 },
  { width: 500, top: "48%", left: "-10%", rotate: -8, color: "rgba(255,178,90,0.45)", duration: 24, delay: 1.5 },
  { width: 420, top: "66%", left: "55%", rotate: 16, color: "rgba(255,255,255,0.4)", duration: 28, delay: 5 },
  { width: 380, top: "8%", left: "58%", rotate: -20, color: "rgba(93,150,255,0.4)", duration: 20, delay: 2 },
  { width: 440, top: "82%", left: "5%", rotate: 6, color: "rgba(255,178,90,0.35)", duration: 30, delay: 4 },
];

export default function SiriGlow() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <AnimatePresence>
      {isDark ? (
        <motion.div
          key="siri-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          {FIBERS.map((fiber, i) => (
            <motion.div
              key={i}
              className="absolute h-px rounded-full"
              style={{
                width: fiber.width,
                top: fiber.top,
                left: fiber.left,
                background: `linear-gradient(90deg, transparent, ${fiber.color}, transparent)`,
                filter: "blur(3px)",
                rotate: fiber.rotate,
                willChange: "transform, opacity",
              }}
              animate={{ x: [0, 70, 0], opacity: [0.15, 0.6, 0.15] }}
              transition={{ duration: fiber.duration, repeat: Infinity, ease: "easeInOut", delay: fiber.delay }}
            />
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
