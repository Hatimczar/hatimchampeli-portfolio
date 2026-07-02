"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

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
          {/* white glossy core */}
          <motion.div
            className="absolute left-1/2 top-[-14%] h-[460px] w-[460px] -translate-x-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.5), rgba(255,255,255,0.08) 55%, transparent 72%)",
              filter: "blur(70px)",
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 0.9, 0.7] }}
            transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
          />
          {/* blue rim fringe */}
          <motion.div
            className="absolute left-[62%] top-[-8%] h-[340px] w-[340px] -translate-x-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(93,150,255,0.35), transparent 68%)",
              filter: "blur(64px)",
            }}
            animate={{ x: [0, 14, 0], scale: [1, 1.06, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
          />
          {/* amber/gold rim fringe */}
          <motion.div
            className="absolute left-[38%] top-[-2%] h-[300px] w-[300px] -translate-x-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,178,90,0.3), transparent 68%)",
              filter: "blur(60px)",
            }}
            animate={{ x: [0, -12, 0], scale: [1.05, 0.95, 1.05], opacity: [0.45, 0.65, 0.45] }}
            transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
