"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

/**
 * Keeps route content visible in server-rendered HTML. The keyed wrapper is
 * retained for route changes, but avoids an opacity-zero initial state so
 * content does not depend on JavaScript animation to become readable.
 *
 * The wrapper is rendered the same way whatever the motion preference: with
 * `initial={false}` it starts at its resting values and never animates, so
 * reduced motion needs no branch. Branching on `useReducedMotion()` here would
 * change the DOM shape between the static HTML (server sees `null`) and the
 * first client render (browser sees `true`), which is a hydration mismatch.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div key={pathname} initial={false} animate={{ opacity: 1, y: 0 }}>
      {children}
    </motion.div>
  );
}
