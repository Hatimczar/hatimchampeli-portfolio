"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import MagneticButton from "@/components/MagneticButton";
import BrandMark from "@/components/BrandMark";
import ContinuumDots from "@/components/ContinuumDots";
import { brands, platforms, profile } from "@/lib/data";

const easeOutQuart = [0.25, 1, 0.5, 1] as const;

const wordVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.15 + i * 0.06, ease: easeOutQuart },
  }),
};

export default function Hero() {
  const titleWords = profile.heroTitle.split(" ");

  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(53,80,122,0.10) 0%, rgba(250,250,250,0) 70%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[420px] w-[420px] rounded-full opacity-40 blur-[90px] md:h-[560px] md:w-[560px]"
        style={{ background: "radial-gradient(circle, rgba(107,140,184,0.35), transparent 70%)" }}
        animate={{ y: [0, 24, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutQuart }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-[12.5px] uppercase tracking-[0.12em] text-accent shadow-tight"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {profile.tagline}
            </motion.span>

            <h1 className="font-display mt-7 text-[clamp(34px,5.4vw,64px)] font-semibold leading-[1.06] text-ink text-balance">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  className="inline-block mr-[0.28em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: easeOutQuart }}
              className="mt-7 max-w-lg text-[17px] leading-relaxed text-body"
            >
              {profile.heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: easeOutQuart }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                onClick={() => document.querySelector("#ventures")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Work <ArrowUpRight size={17} />
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Contact Me
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-16"
            >
              <div className="flex flex-col gap-6">
                <div>
                  <p className="mb-4 font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted">Brands</p>
                  <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                    {brands.map((mark) => (
                      <BrandMark key={mark.id} mark={mark} />
                    ))}
                    <ContinuumDots />
                  </div>
                </div>
                <div>
                  <p className="mb-4 font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted">Platforms</p>
                  <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                    {platforms.map((mark) => (
                      <BrandMark key={mark.id} mark={mark} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: easeOutQuart }}
            className="relative mx-auto w-full max-w-[340px]"
          >
            <div
              aria-hidden
              className="absolute inset-8 -z-10 rounded-full opacity-70 blur-[55px]"
              style={{ background: "radial-gradient(closest-side, rgba(107,140,184,0.45), transparent)" }}
            />
            <motion.div
              className="relative aspect-square"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/memoji-hero.png"
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 1024px) 70vw, 340px"
                className="object-contain drop-shadow-[0_25px_35px_rgba(10,10,10,0.16)]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1, ease: easeOutQuart }}
              className="glass absolute -bottom-16 -left-6 rounded-md border border-line px-5 py-4 shadow-soft"
            >
              <p className="font-display text-[26px] font-semibold leading-none text-ink">5+</p>
              <p className="mt-1 text-[12.5px] text-ink">Years across premium tech &amp; commerce</p>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      <motion.button
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.4, duration: 0.6 }, y: { delay: 1.6, duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-muted md:flex"
        aria-label="Scroll to About"
      >
        <ArrowDown size={18} />
      </motion.button>
    </section>
  );
}
