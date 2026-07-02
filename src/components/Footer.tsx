"use client";

import { Mail, ArrowUp } from "lucide-react";
import Container from "./Container";
import { LinkedInBadge } from "@/lib/icons";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-[13.5px] text-muted">
          © {new Date().getFullYear()} {profile.name}. Designed &amp; built with care.
        </p>
        <div className="flex items-center gap-4">
          <a href={`mailto:${profile.email}`} className="text-muted transition-colors hover:text-ink" aria-label="Email">
            <Mail size={18} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-ink" aria-label="LinkedIn">
            <LinkedInBadge size={18} />
          </a>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:bg-canvas-alt"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
