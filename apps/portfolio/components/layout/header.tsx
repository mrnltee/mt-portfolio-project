"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { motion as mtMotion } from "@mt/tokens/motion";
import { Container } from "./container";
import { NavLink } from "@/components/ui/nav-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { CV_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/case-studies", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/design-system", label: "Design system" },
];

const iconButton =
  "focus-ring inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border border-border-default bg-background-surface text-text-primary transition-colors duration-normal hover:bg-background-surface-subtle";

/**
 * Site header. It has its own surface (it is sticky, so without one the name would sit on
 * top of body text while scrolling). The current page uses text-on-accent-subtle on
 * accent-subtle (≥7.6:1); Contact is the one primary action, so it is a button, not a
 * nav item, and never reads as "current page".
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const activeItem = NAV_ITEMS.find(({ href }) => pathname === href || pathname.startsWith(`${href}/`));
  const highlightedHref = hoveredHref ?? activeItem?.href;
  const highlightTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 520, damping: 38, mass: 0.72 };

  useEffect(() => setOpen(false), [pathname]);

  // The mobile menu is a disclosure, not a modal: no scroll lock or focus trap.
  // Escape closes it and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-background-canvas/90 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Link href="/" className="focus-ring shrink-0 rounded-field font-display text-h4 font-bold text-text-primary">
          Mernel Tusoy
        </Link>

        <nav
          aria-label="Primary"
          onMouseLeave={() => setHoveredHref(null)}
          onBlurCapture={(event) => {
            const nextTarget = event.relatedTarget;
            if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) setHoveredHref(null);
          }}
          className="hidden items-center gap-0.5 rounded-pill border border-border-default bg-background-surface p-1 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isHighlighted = highlightedHref === item.href;
            return (
              <NavLink
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredHref(item.href)}
                onFocus={() => setHoveredHref(item.href)}
                className={cn(
                  "relative isolate whitespace-nowrap rounded-pill px-3.5 py-2 text-label text-text-secondary transition-colors duration-normal motion-reduce:transition-none",
                  isHighlighted && "text-action-on-accent-subtle hover:text-action-on-accent-subtle",
                  "aria-[current=page]:text-action-on-accent-subtle",
                )}
              >
                {isHighlighted && (
                  <motion.span
                    layoutId="primary-nav-highlight"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0 rounded-pill bg-action-accent-subtle"
                    transition={highlightTransition}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a href={CV_URL} download aria-label="Download CV (PDF)" title="Download CV" className={cn(iconButton, "hidden sm:inline-flex")}>
            <Download className="h-icon-md w-icon-md" aria-hidden="true" />
          </a>
          <ThemeToggle className="hidden sm:inline-flex" />
          <ButtonLink href="/contact" size="sm">
            Contact
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(iconButton, "md:hidden")}
          >
            {open ? <X className="h-icon-md w-icon-md" aria-hidden="true" /> : <Menu className="h-icon-md w-icon-md" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: mtMotion.duration.normal / 1000, ease: mtMotion.easing.standard }}
            className="overflow-hidden border-t border-border-subtle md:hidden"
          >
            <nav aria-label="Primary (mobile)">
              <Container className="flex flex-col gap-1 py-4">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    className="rounded-pill px-3 py-2.5 text-body text-text-primary aria-[current=page]:bg-action-accent-subtle aria-[current=page]:text-action-on-accent-subtle"
                  >
                    {item.label}
                  </NavLink>
                ))}
                <div className="mt-2 flex items-center justify-between gap-3 border-t border-border-subtle pt-4">
                  <a href={CV_URL} download className="focus-ring inline-flex items-center gap-2 rounded-field px-3 py-2 text-body-sm font-medium text-text-primary">
                    <Download className="h-icon-sm w-icon-sm" aria-hidden="true" />
                    Download CV
                  </a>
                  <ThemeToggle />
                </div>
              </Container>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
