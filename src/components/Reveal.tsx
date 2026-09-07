"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span";
  once?: boolean;
};

const easeOutQuart = [0.25, 1, 0.5, 1] as const;

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export default function Reveal({ children, delay = 0, y = 24, className, once = true }: RevealProps) {
  const mounted = useMounted();

  // Content defaults to fully visible so it never depends on JS successfully
  // initialising and running whileInView (crawlers, slow connections, a JS
  // error elsewhere on the page, or a full-page capture without scrolling).
  // The scroll-triggered reveal only takes over once mounted client-side.
  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: easeOutQuart },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const mounted = useMounted();

  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutQuart } },
};
