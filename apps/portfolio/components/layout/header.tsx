"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { motion as mtMotion } from "@mt/tokens/motion";
import { Container } from "./container";
import { NavLink } from "@/components/ui/nav-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/case-studies", label: "Case Studies & Projects" },
  { href: "/design-system", label: "Design System" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const activeItem = NAV_ITEMS.find(
    ({ href }) => pathname === href || pathname.startsWith(`${href}/`)
  );
  const highlightedHref = hoveredHref ?? activeItem?.href;
  const highlightTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 520, damping: 38, mass: 0.72 };

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="focus-ring shrink-0 rounded-field font-display text-h4 font-bold text-text-primary"
        >
          Mernel Tusoy
        </Link>

        <nav
          aria-label="Primary"
          onMouseLeave={() => setHoveredHref(null)}
          onBlurCapture={(event) => {
            const nextTarget = event.relatedTarget;
            if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
              setHoveredHref(null);
            }
          }}
          className="hidden items-center gap-0.5 rounded-pill border border-border-default/60 bg-background-canvas/70 p-1.5 shadow-raised backdrop-blur-xl md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const isHighlighted = highlightedHref === item.href;

            return (
              <NavLink
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredHref(item.href)}
                onFocus={() => setHoveredHref(item.href)}
                className={cn(
                  "relative isolate whitespace-nowrap rounded-pill px-3 py-2 text-caption text-text-secondary transition-colors duration-normal hover:text-action-primary motion-reduce:transition-none",
                  isActive &&
                    "text-action-primary after:absolute after:bottom-0.5 after:left-1/2 after:h-0.5 after:w-3 after:-translate-x-1/2 after:rounded-full after:bg-action-primary",
                  item.href === "/contact" && "text-action-primary hover:text-action-primary"
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
          <ThemeToggle className="hidden border-border-default/60 bg-background-canvas/70 shadow-raised backdrop-blur-xl sm:inline-flex" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-pill border border-border-default/60 bg-background-canvas/70 text-text-primary shadow-raised backdrop-blur-xl md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: mtMotion.duration.normal / 1000, ease: mtMotion.easing.standard }}
            className="overflow-hidden border-y border-border-default/60 bg-background-canvas/80 backdrop-blur-xl md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-pill px-3 py-2 text-body-sm aria-[current=page]:bg-action-accent-subtle",
                    item.href === "/contact" && "text-action-primary hover:text-action-primary"
                  )}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-border-default pt-4">
                <span className="text-caption text-text-secondary">Theme</span>
                <ThemeToggle className="border-border-default/60 bg-background-canvas/70 shadow-raised backdrop-blur-xl" />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
