"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motion as mtMotion } from "@mt/tokens/motion";

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}

/** Scroll-triggered fade/rise, used sparingly (hero exempt, avoid stacking on every element). */
export function RevealOnScroll({ children, delay = 0, className, as = "div" }: RevealOnScrollProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: mtMotion.easing.standard }}
      className={className}
    >
      {children}
    </Component>
  );
}
