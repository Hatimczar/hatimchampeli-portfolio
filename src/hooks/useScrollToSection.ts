"use client";

import { useLenis } from "lenis/react";
import { useCallback } from "react";

const NAV_OFFSET = 88;

export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (target: string | HTMLElement) => {
      const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
      if (!el) return;

      // Compute the absolute target from the real, current scroll position rather than
      // letting Lenis derive it from its own internally-tracked scroll value, which can
      // drift from the true native position and land on the wrong section.
      const absoluteTop = el.getBoundingClientRect().top + window.scrollY;
      const destination = Math.max(0, absoluteTop - NAV_OFFSET);

      if (lenis) {
        lenis.scrollTo(destination, { immediate: false });
      } else {
        window.scrollTo({ top: destination, behavior: "smooth" });
      }
    },
    [lenis]
  );
}
