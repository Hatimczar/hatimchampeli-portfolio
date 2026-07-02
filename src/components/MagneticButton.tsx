"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function MagneticButton({
  children,
  onClick,
  href,
  variant = "primary",
  className,
  type = "button",
  fullWidth = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit";
  fullWidth?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    setPos({ x, y });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const classes = clsx(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-medium transition-colors duration-300",
    variant === "primary" ? "bg-ink text-canvas hover:opacity-90" : "bg-transparent text-ink border border-line hover:bg-canvas-alt",
    fullWidth && "w-full",
    className
  );

  const content = (
    <motion.span
      ref={ref as React.RefObject<HTMLSpanElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      className={classes}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={clsx("inline-block", fullWidth && "w-full")}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={clsx("inline-block", fullWidth && "w-full")}>
      {content}
    </button>
  );
}
