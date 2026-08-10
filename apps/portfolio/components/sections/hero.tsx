"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motion as mtMotion } from "@mt/tokens/motion";
import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduceMotion ? undefined : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: mtMotion.easing.standard },
  });

  return (
    <section className="border-b border-border-default py-20 sm:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-start px-5 sm:px-8">
        <motion.p {...rise(0)} className="mb-4 text-overline text-action-primary">
          UI/UX Designer {/* [REPLACE] optional: add location, e.g. "· San Francisco, CA" */}
        </motion.p>
        <motion.h1 {...rise(0.05)} className="font-display text-display font-bold tracking-tight text-text-primary">
          Mernel Tusoy
        </motion.h1>
        <motion.p {...rise(0.1)} className="mt-5 max-w-xl text-body-lg text-text-secondary">
          {/* [REPLACE] Replace with your real tagline — one or two sentences on what you design and how you think about it. */}
          I design clear, research-backed digital products — from early discovery through
          shippable, accessible interfaces.
        </motion.p>
        <motion.div {...rise(0.15)} className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/case-studies">View case studies</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Get in touch
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
