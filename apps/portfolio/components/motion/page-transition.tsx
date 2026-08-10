"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { motion as mtMotion } from "@mt/tokens/motion";

/**
 * Keyed on pathname so App Router navigations re-trigger the enter/exit
 * animation. Kept subtle (8px + opacity) — this is chrome, not a feature.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: mtMotion.duration.normal / 1000, ease: mtMotion.easing.standard }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
