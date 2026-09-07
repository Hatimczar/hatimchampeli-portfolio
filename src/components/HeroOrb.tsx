"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useTheme } from "next-themes";

const BLOBS = [
  { size: 260, left: "30%", top: "18%", duration: 11, delay: 0, follow: 0.35 },
  { size: 210, left: "64%", top: "10%", duration: 13, delay: 1.2, follow: 0.22 },
  { size: 180, left: "48%", top: "36%", duration: 9, delay: 0.6, follow: 0.28 },
  { size: 150, left: "74%", top: "32%", duration: 14, delay: 2, follow: 0.18 },
];

export default function HeroOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 1 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 1 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (reduceMotion) return;
    const el = containerRef.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;

    let rafId: number | null = null;
    let lastEvent: MouseEvent | null = null;

    const applyMove = () => {
      rafId = null;
      if (!lastEvent) return;
      const rect = el.getBoundingClientRect();
      mouseX.set(((lastEvent.clientX - rect.left) / rect.width - 0.5) * 60);
      mouseY.set(((lastEvent.clientY - rect.top) / rect.height - 0.5) * 60);
    };

    const handleMove = (e: MouseEvent) => {
      lastEvent = e;
      if (rafId === null) rafId = requestAnimationFrame(applyMove);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY, reduceMotion]);

  if (mounted && resolvedTheme === "dark") return null;

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute -top-24 right-[-8%] -z-10 h-[560px] w-[560px] opacity-70 md:h-[640px] md:w-[640px]"
    >
      {/* Native CSS blur+contrast ("goo" merge) instead of an SVG <filter> reference:
          SVG filters are far more expensive to composite than CSS filter functions. */}
      <div
        className="relative h-full w-full"
        style={{
          filter: "blur(18px) contrast(22)",
          willChange: "filter",
          transform: "translateZ(0)",
        }}
      >
        {BLOBS.map((blob, i) => (
          <Blob key={i} {...blob} springX={springX} springY={springY} reduceMotion={!!reduceMotion} />
        ))}
      </div>
    </div>
  );
}

function Blob({
  size,
  left,
  top,
  duration,
  delay,
  follow,
  springX,
  springY,
  reduceMotion,
}: {
  size: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
  follow: number;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const x = useTransform(springX, (v) => v * follow);
  const y = useTransform(springY, (v) => v * follow);

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left,
        top,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        background: "radial-gradient(circle, rgba(107,140,184,0.55), rgba(107,140,184,0) 70%)",
        x: reduceMotion ? 0 : x,
        y: reduceMotion ? 0 : y,
      }}
      animate={reduceMotion ? undefined : { scale: [1, 1.12, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}
