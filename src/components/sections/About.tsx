"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal, { RevealGroup, revealItem } from "@/components/Reveal";
import TechTrivia from "@/components/TechTrivia";
import { aboutStrengths } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="section-pad">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal>
            <div className="relative mx-auto w-full max-w-[320px] lg:mx-0">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-canvas-alt shadow-soft">
                <Image
                  src="/images/memoji-about.png"
                  alt="Hatim Champeli"
                  fill
                  sizes="(max-width: 1024px) 70vw, 320px"
                  className="object-contain p-6"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass absolute -top-5 -right-5 rounded-full border border-line px-4 py-2 text-[12.5px] font-medium text-ink-soft shadow-tight"
              >
                MBA · Marketing &amp; AI
              </motion.div>
            </div>
            <div className="mx-auto w-full max-w-[320px] lg:mx-0">
              <TechTrivia />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="About"
              title="Premium technology deserves premium execution."
              description="I help premium tech, lifestyle, and audio brands turn Apple ecosystems, e-commerce operations, and marketing data into growth that just works. 5+ years, Dubai-based."
            />

            <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {aboutStrengths.map((item) => (
                <motion.div
                  key={item.title}
                  variants={revealItem}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="rounded-md border border-line bg-surface p-6 shadow-tight"
                >
                  <h3 className="font-display text-[16px] font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-body">{item.description}</p>
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}
