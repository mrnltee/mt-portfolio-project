"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motion as mtMotion } from "@mt/tokens/motion";
import { ButtonLink } from "@/components/ui/button";
import { BrandMark } from "@/components/sections/brand-mark";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduceMotion ? undefined : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: mtMotion.easing.standard },
  });

  return (
    <section className="border-b border-border-default py-20 sm:py-28">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-12 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex max-w-xl flex-col items-start">
          <motion.p {...rise(0)} className="mb-4 text-overline text-action-primary">
            Product Designer — Enterprise, SaaS &amp; AI
          </motion.p>
          <motion.h1 {...rise(0.05)} className="font-display text-display font-bold tracking-tight text-text-primary">
            I make complex enterprise software feel obvious.
          </motion.h1>
          <motion.p {...rise(0.1)} className="mt-5 text-body-lg text-text-secondary">
            10+ years designing the high-stakes, high-density screens — document pipelines, claims
            portals, booking flows. Most recently I owned end-to-end UX for an AI document-processing
            platform across three portals, from discovery through developer handoff.
          </motion.p>
          <motion.p {...rise(0.15)} className="mt-4 text-body-sm text-text-secondary">
            Based in the Philippines (GMT+8) · Open to remote and relocation
          </motion.p>
          <motion.div {...rise(0.2)} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/case-studies">View case studies</ButtonLink>
            <ButtonLink href="/MERNEL-TUSOY-UIUX-CV.pdf" variant="secondary" download>
              Download CV
            </ButtonLink>
          </motion.div>
          <motion.p {...rise(0.25)} className="mt-6 text-caption text-text-tertiary">
            Previously at IBM · Work shipped for Maxicare, SM Cinema, Robinsons Movieworld, GoDaddy
            (white-label)
          </motion.p>
        </div>
        <motion.div {...rise(0.2)} className="mx-auto lg:mx-0">
          <BrandMark />
        </motion.div>
      </div>
    </section>
  );
}
