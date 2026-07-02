"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { useTheme } from "next-themes";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { experience } from "@/lib/data";

function ExperienceCard({
  item,
  index,
  isLast,
}: {
  item: (typeof experience)[number];
  index: number;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(index === 0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const logoSrc = mounted && resolvedTheme === "dark" && item.logoDark ? item.logoDark : item.logo;

  return (
    <Reveal delay={index * 0.06} className="relative pl-10 md:pl-16">
      <div className="absolute left-[3px] top-2 h-3 w-3 rounded-full border-2 border-accent bg-canvas md:left-[15px]" />
      {!isLast && (
        <div className="absolute left-[9px] top-5 bottom-[-2.5rem] w-px bg-line md:left-[21px]" />
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-lg border border-line bg-surface p-6 text-left shadow-tight transition-shadow duration-300 hover:shadow-soft md:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {logoSrc ? (
              <span className="relative h-8 w-[124px] shrink-0">
                <Image src={logoSrc} alt={item.company} fill sizes="124px" className="object-contain object-left" />
              </span>
            ) : null}
            <div>
              <h3 className="font-display text-[18px] font-semibold text-ink md:text-[20px]">{item.role}</h3>
              <p className="mt-1 text-[14px] text-accent">{item.focus}</p>
            </div>
          </div>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="mt-1 shrink-0 text-muted">
            <ChevronDown size={20} />
          </motion.span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13.5px] text-muted">
          <span className="font-medium text-ink-soft">{item.company}</span>
          <span className="flex items-center gap-1">
            <MapPin size={13} /> {item.location}
          </span>
          <span className="font-mono">{item.period}</span>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="overflow-hidden"
            >
              <p className="mt-5 text-[14.5px] leading-relaxed text-body">{item.summary}</p>
              <ul className="mt-4 space-y-2.5">
                {item.highlights.map((point) => (
                  <li key={point} className="flex gap-3 text-[14.5px] leading-relaxed text-ink-soft">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </Reveal>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-pad">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="The journey so far"
          description="From community-scale performance marketing to enterprise Apple ecosystem partnerships."
        />
        <div className="mt-14 flex flex-col gap-10">
          {experience.map((item, i) => (
            <ExperienceCard key={item.id} item={item} index={i} isLast={i === experience.length - 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
