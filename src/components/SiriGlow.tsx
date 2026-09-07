"use client";

import { motion } from "framer-motion";

const FIBERS = [
  { width: 620, top: "12%", left: "-15%", rotate: -14, color: "rgba(255,255,255,0.95)", duration: 22, delay: 0 },
  { width: 520, top: "28%", left: "42%", rotate: 10, color: "rgba(120,170,255,0.9)", duration: 26, delay: 3 },
  { width: 560, top: "48%", left: "-10%", rotate: -8, color: "rgba(255,190,110,0.85)", duration: 24, delay: 1.5 },
  { width: 480, top: "66%", left: "52%", rotate: 16, color: "rgba(255,255,255,0.75)", duration: 28, delay: 5 },
  { width: 440, top: "8%", left: "55%", rotate: -20, color: "rgba(120,170,255,0.8)", duration: 20, delay: 2 },
  { width: 500, top: "82%", left: "2%", rotate: 6, color: "rgba(255,190,110,0.7)", duration: 30, delay: 4 },
];

export default function SiriGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-0 transition-opacity duration-700 dark:opacity-100"
    >
      {FIBERS.map((fiber, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: fiber.width,
            height: 2,
            top: fiber.top,
            left: fiber.left,
            background: `linear-gradient(90deg, transparent, ${fiber.color}, transparent)`,
            filter: "blur(2.5px)",
            rotate: fiber.rotate,
            willChange: "transform, opacity",
          }}
          animate={{ x: [0, 70, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: fiber.duration, repeat: Infinity, ease: "easeInOut", delay: fiber.delay }}
        />
      ))}
    </div>
  );
}
