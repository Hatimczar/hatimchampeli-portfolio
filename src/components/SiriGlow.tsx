"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import GhostFibers from "@/components/GhostFibers";

export default function SiriGlow() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || resolvedTheme !== "dark") return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <GhostFibers
        lineColor="#272a38"
        glowColor="#edc585"
        speed={0.2}
        scale={2}
        rotation={0}
        rotationSpeed={0.25}
        layers={4}
        waveAmplitude={0.015}
        waveFrequency={3}
        waveSpeed={0.15}
        layerSpeed={0.08}
        twist={0.1}
        twistFrequency={5}
        twistSpeed={1.2}
        lineFrequency={5}
        lineSpacing={2}
        lineSharpness={16}
        glowFalloff={10}
        glowIntensity={1.6}
        brightness={2}
        blueBoost={1.25}
        vignette={0.8}
        grain={0.05}
        dpr={1}
        lightMode={false}
        fps={60}
        paused={false}
      />
    </div>
  );
}
