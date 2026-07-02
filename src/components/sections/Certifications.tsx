"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Sparkles, GraduationCap, ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, revealItem } from "@/components/Reveal";
import { certifications } from "@/lib/data";

const categoryIcons = {
  apple: ShieldCheck,
  marketing: Award,
  tech: GraduationCap,
  ai: Sparkles,
} as const;

export default function Certifications() {
  return (
    <section id="certifications" className="section-pad">
      <Container>
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials that back the work"
          description="Verified across Apple enterprise tooling, Google marketing platforms, and AI-native workflows."
        />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => {
            const Icon = categoryIcons[cert.category];
            return (
              <motion.a
                key={cert.id}
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                variants={revealItem}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group flex items-start gap-4 rounded-lg border border-line bg-surface p-6 shadow-tight transition-shadow duration-300 hover:shadow-soft"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent">
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-[15px] font-semibold leading-snug text-ink">{cert.name}</h3>
                  <p className="mt-1.5 text-[13px] text-muted">{cert.issuer}</p>
                </div>
                <ArrowUpRight
                  size={15}
                  className="ml-auto shrink-0 text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
              </motion.a>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
