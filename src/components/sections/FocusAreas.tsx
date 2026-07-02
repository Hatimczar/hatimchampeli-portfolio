"use client";

import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Apple, ShoppingCart, Sparkles, Check } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, revealItem } from "@/components/Reveal";
import { focusAreas } from "@/lib/data";

const icons = { apple: Apple, commerce: ShoppingCart, ai: Sparkles };

function TiltCard({ area }: { area: (typeof focusAreas)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = icons[area.id as keyof typeof icons];

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <motion.div variants={revealItem} style={{ perspective: 1200 }}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transition: "transform 0.4s var(--ease, cubic-bezier(.25,1,.5,1))",
        }}
        className="group relative h-full overflow-hidden rounded-lg border border-line bg-surface p-8 shadow-tight will-change-transform"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(53,80,122,0.10), transparent 70%)",
          }}
        />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-md bg-accent-tint text-accent">
          <Icon size={22} strokeWidth={1.75} />
        </div>
        <h3 className="font-display relative mt-6 text-[20px] font-semibold text-ink">{area.title}</h3>
        <p className="relative mt-3 text-[14.5px] leading-relaxed text-body">{area.blurb}</p>
        <ul className="relative mt-6 space-y-2.5 border-t border-line pt-5">
          {area.points.map((point) => (
            <li key={point} className="flex items-center gap-2.5 text-[13.5px] text-ink-soft">
              <Check size={14} className="shrink-0 text-accent" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function FocusAreas() {
  return (
    <section id="focus" className="section-pad bg-canvas-alt">
      <Container>
        <SectionHeading
          eyebrow="Focus Areas"
          title="Where I create the most value"
          description="Three disciplines, one thread: making premium technology and commerce operations run smarter."
        />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {focusAreas.map((area) => (
            <TiltCard key={area.id} area={area} />
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
