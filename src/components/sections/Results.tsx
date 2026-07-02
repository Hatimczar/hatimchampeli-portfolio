"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, revealItem } from "@/components/Reveal";
import Counter from "@/components/Counter";
import { results } from "@/lib/data";

export default function Results() {
  return (
    <section id="results" className="section-pad bg-ink text-white">
      <Container>
        <SectionHeading
          eyebrow="Results"
          title="Numbers behind the work"
          description="Complexity turned into measurable growth, across marketing, sales, and marketplace operations."
          dark
        />
        <RevealGroup className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3">
          {results.map((r) => (
            <motion.div
              key={r.label}
              variants={revealItem}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-8"
            >
              <p className="font-display text-[clamp(26px,4.2vw,42px)] font-semibold leading-none text-white">
                <Counter value={r.value} prefix={r.prefix} suffix={r.suffix} />
              </p>
              <p className="mt-3 text-[14.5px] leading-snug text-white/80">{r.label}</p>
              <p className="mt-1.5 font-mono text-[12px] text-white/45">{r.context}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
