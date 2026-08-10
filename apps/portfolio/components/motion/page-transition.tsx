"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { motion as mtMotion } from "@mt/tokens/motion";

/**
 * Keyed on pathname so each App Router navigation remounts and replays a
 * subtle enter animation (8px + opacity). Kept as chrome, not a feature.
 *
 * NOTE: intentionally does NOT use AnimatePresence/`exit`. Under the App
 * Router, React swaps the route subtree before AnimatePresence can run an
 * exit, so `mode="wait"` gets stuck waiting and the incoming page never
 * animates past `initial` — leaving content mounted but invisible on
 * client-side navigations. A keyed enter-only animation always resolves to
 * the visible state.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: mtMotion.duration.normal / 1000, ease: mtMotion.easing.standard }}
    >
      {children}
    </motion.div>
  );
}
