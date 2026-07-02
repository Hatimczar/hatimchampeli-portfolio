"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, MapPin, Check, ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { LinkedInBadge } from "@/lib/icons";
import { profile } from "@/lib/data";

const contactCards = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: LinkedInBadge, label: "LinkedIn", value: "linkedin.com/in/hatimchampeli", href: profile.linkedin },
  { icon: MapPin, label: "Location", value: profile.location, href: undefined },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "website"}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-pad">
      <Container>
        <Reveal className="mx-auto mb-2 flex justify-center">
          <motion.div
            className="relative h-[130px] w-[130px]"
            animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/memoji-contact.png"
              alt=""
              fill
              sizes="130px"
              className="object-contain drop-shadow-[0_16px_20px_rgba(10,10,10,0.14)]"
            />
          </motion.div>
        </Reveal>
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something premium together"
          description="Open to business development, marketing leadership, and AI-driven growth roles, or just a conversation."
          align="center"
        />

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col gap-4">
            {contactCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <div className="flex items-center gap-4 rounded-lg border border-line bg-surface p-5 shadow-tight transition-shadow duration-300 hover:shadow-soft">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent">
                    <Icon size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] uppercase tracking-[0.08em] text-muted">{card.label}</p>
                    <p className="truncate text-[14.5px] font-medium text-ink-soft">{card.value}</p>
                  </div>
                  {card.href ? <ArrowUpRight size={16} className="ml-auto shrink-0 text-muted" /> : null}
                </div>
              );
              return card.href ? (
                <a key={card.label} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {content}
                </a>
              ) : (
                <div key={card.label}>{content}</div>
              );
            })}
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="rounded-lg border border-line bg-surface p-7 shadow-tight md:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 text-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-tint text-accent">
                    <Check size={22} />
                  </span>
                  <p className="font-display text-[18px] font-semibold text-ink">Opening your email client…</p>
                  <p className="text-[14px] text-muted">If it doesn&apos;t open, email me directly at {profile.email}</p>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="text-[13px] font-medium text-ink-soft">Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-2 w-full rounded-sm border border-line bg-canvas px-4 py-3 text-[14.5px] text-ink outline-none transition-colors focus:border-accent-soft"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-[13px] font-medium text-ink-soft">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-2 w-full rounded-sm border border-line bg-canvas px-4 py-3 text-[14.5px] text-ink outline-none transition-colors focus:border-accent-soft"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-[13px] font-medium text-ink-soft">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="mt-2 w-full resize-none rounded-sm border border-line bg-canvas px-4 py-3 text-[14.5px] text-ink outline-none transition-colors focus:border-accent-soft"
                      placeholder="Tell me a little about the opportunity…"
                    />
                  </div>
                  <MagneticButton type="submit" fullWidth className="justify-center">
                    Send Message
                  </MagneticButton>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
