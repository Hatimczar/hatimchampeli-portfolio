"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TrendingUp } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, revealItem } from "@/components/Reveal";
import { ventures } from "@/lib/data";

export default function Ventures() {
  return (
    <section id="ventures" className="section-pad bg-canvas-alt">
      <Container>
        <SectionHeading
          eyebrow="Impact & Ventures"
          title="Selected work"
          description="Enterprise partnerships, marketplace operations, high-stakes logistics, and one creative venture, all turned into results."
        />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {ventures.map((venture) => (
            <motion.article
              key={venture.id}
              variants={revealItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-tight"
            >
              {venture.image ? (
                <div className="relative h-44 w-full overflow-hidden border-b border-line">
                  <Image
                    src={venture.image}
                    alt={venture.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 588px"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-7">
                <span className="inline-flex w-fit items-center rounded-full bg-accent-tint px-3 py-1 font-mono text-[11.5px] uppercase tracking-[0.08em] text-accent">
                  {venture.tag}
                </span>
                <h3 className="font-display mt-4 text-[19px] font-semibold text-ink">{venture.title}</h3>
                <p className="mt-1 text-[13px] text-muted">{venture.context}</p>
                <p className="mt-4 text-[14.5px] leading-relaxed text-body">{venture.description}</p>
                <div className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-[13.5px] font-medium text-ink-soft">
                  <TrendingUp size={15} className="mt-0.5 shrink-0 text-accent" />
                  {venture.outcome}
                </div>
              </div>
            </motion.article>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
