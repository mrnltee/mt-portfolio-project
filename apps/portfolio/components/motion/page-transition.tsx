"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Keeps route content visible in server-rendered HTML. The keyed wrapper is
 * retained for route changes, but avoids an opacity-zero initial state so
 * content does not depend on JavaScript animation to become readable.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
