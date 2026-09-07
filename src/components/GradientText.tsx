"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";

export default function GradientText({
  children,
  className = "",
  colors = ["#0a0a0a", "#35507a", "#0a0a0a"],
  animationSpeed = 6,
  yoyo = true,
}: {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  yoyo?: boolean;
}) {
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const animationDuration = animationSpeed * 1000;

  useAnimationFrame((time) => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    if (yoyo) {
      const fullCycle = animationDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;
      progress.set(
        cycleTime < animationDuration
          ? (cycleTime / animationDuration) * 100
          : 100 - ((cycleTime - animationDuration) / animationDuration) * 100
      );
    } else {
      progress.set((elapsedRef.current / animationDuration) * 100);
    }
  });

  const backgroundPosition = useTransform(progress, (p) => `${p}% 50%`);
  const gradientColors = [...colors, colors[0]].join(", ");

  return (
    <motion.span
      className={`inline bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${gradientColors})`,
        backgroundSize: "300% 100%",
        backgroundPosition,
        willChange: "background-position",
      }}
    >
      {children}
    </motion.span>
  );
}
