"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, revealItem } from "@/components/Reveal";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="section-pad bg-canvas-alt">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="Toolkit, by discipline"
          description="Grouped by operations, commerce, technology, and creative work."
        />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={revealItem}
              className="rounded-lg border border-line bg-surface p-7 shadow-tight"
            >
              <h3 className="font-display text-[16px] font-semibold text-ink">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.06, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="cursor-default rounded-full border border-line bg-canvas-alt px-3.5 py-1.5 text-[13px] font-medium text-ink-soft transition-colors duration-200 hover:border-accent-soft hover:bg-accent-tint hover:text-accent"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
