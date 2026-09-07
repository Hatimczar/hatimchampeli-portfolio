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

      if (lenis) {
        lenis.scrollTo(el, { offset: -NAV_OFFSET });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis]
  );
}
