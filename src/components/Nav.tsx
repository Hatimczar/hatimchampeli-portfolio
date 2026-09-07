"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { navLinks, profile } from "@/lib/data";
import ThemeToggle from "@/components/ThemeToggle";
import { useScrollToSection } from "@/hooks/useScrollToSection";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .filter((link) => link.href.startsWith("#"))
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => Boolean(el));

    // Determine the active section from real scroll position rather than an
    // IntersectionObserver band, which can misfire on short sections or when
    // two sections' entries land in the same callback batch out of order.
    const updateActive = () => {
      const line = window.scrollY + 120;
      let current = "";
      for (const el of sections) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= line) {
          current = `#${el.id}`;
        } else {
          break;
        }
      }
      if (current) setActive(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const scrollToSection = useScrollToSection();

  const handleClick = (href: string) => {
    setOpen(false);
    if (!href.startsWith("#")) {
      router.push(href);
      return;
    }
    if (!isHome) {
      window.location.href = `/${href}`;
      return;
    }
    scrollToSection(href);
  };

  const isActive = (href: string) => (href.startsWith("#") ? active === href : pathname === href);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-3 pt-4 px-4">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className={`glass flex w-full max-w-[980px] items-center justify-between rounded-full border border-line px-5 py-2.5 transition-shadow duration-300 ${
          scrolled ? "shadow-tight" : ""
        }`}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleClick("#top");
          }}
          className="font-display text-[15px] font-semibold text-ink shrink-0"
        >
          {profile.name.split(" ")[0]}
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`relative rounded-full px-3.5 py-1.5 text-[13.5px] font-medium transition-colors duration-200 ${
                isActive(link.href) ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-canvas-alt"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => handleClick("#contact")}
          className="hidden lg:inline-flex items-center rounded-full bg-ink px-4 py-1.5 text-[13.5px] font-medium text-canvas transition-transform duration-200 hover:scale-[1.04]"
        >
          Let&apos;s Talk
        </button>

        <button className="lg:hidden text-ink" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      <ThemeToggle />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-[70px] w-[calc(100%-32px)] max-w-[880px] rounded-3xl border border-line bg-surface p-3 shadow-lift backdrop-blur-xl lg:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="block w-full rounded-2xl px-4 py-3 text-left text-[15px] font-medium text-ink-soft hover:bg-canvas-alt"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
