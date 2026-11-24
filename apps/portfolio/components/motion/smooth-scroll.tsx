"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** Smooth, eased scrolling for mouse wheels and trackpads. Phones keep native touch scrolling. */
const OPTIONS = {
  autoRaf: true,
  // Let panels that scroll on their own (dialogs, code blocks, the design-system index) keep the wheel.
  allowNestedScroll: true,
} as const;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Mounts Lenis once for the whole site. Off when the visitor asks for reduced motion (and switches
 * off live if they change the setting). Same-page links (#…) glide to their target but still behave
 * like a normal link: the address bar updates, keyboard focus moves to the target, and the target's
 * `scroll-margin-top` (scroll-mt-*) still keeps it clear of the sticky header.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const start = () => {
      if (lenisRef.current || reducedMotion()) return;
      lenisRef.current = new Lenis(OPTIONS);
    };
    const stop = () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
    const onMotionChange = () => (reducedMotion() ? stop() : start());

    // Radix dialogs lock page scroll by marking <body>; pause Lenis while they're open.
    const lockObserver = new MutationObserver(() => {
      const locked = document.body.hasAttribute("data-scroll-locked");
      if (locked) lenisRef.current?.stop();
      else lenisRef.current?.start();
    });

    const onClick = (event: MouseEvent) => {
      const lenis = lenisRef.current;
      if (!lenis || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href^='#']");
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      // Lenis reads the target's scroll-margin-top itself, so scroll-mt-* keeps it below the sticky header.
      lenis.scrollTo(target);
      history.pushState(null, "", hash);
      // Move focus like a native jump, so Tab continues from the target (e.g. Skip to main content).
      if (!target.matches("a, button, input, select, textarea, [tabindex]")) {
        target.setAttribute("tabindex", "-1");
        target.setAttribute("data-scroll-target", ""); // no focus outline around a whole section (globals.css)
      }
      target.focus({ preventScroll: true });
    };

    start();
    query.addEventListener("change", onMotionChange);
    lockObserver.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });
    document.addEventListener("click", onClick);
    return () => {
      query.removeEventListener("change", onMotionChange);
      lockObserver.disconnect();
      document.removeEventListener("click", onClick);
      stop();
    };
  }, []);

  // A new page shouldn't inherit the last page's glide; Next.js handles the scroll position itself.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.stop();
    lenis.start();
  }, [pathname]);

  return null;
}
