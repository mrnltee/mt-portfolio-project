"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { motion as mtMotion } from "@mt/tokens/motion";
import { ButtonLink } from "@/components/ui/button";
import { FrameLabel } from "@/components/ui/frame-label";
import { BrandMark } from "@/components/sections/brand-mark";
import { LocalTime } from "@/components/sections/local-time";
import { Container } from "@/components/layout/container";
import { CV_URL } from "@/lib/site";

const card = "relative overflow-hidden rounded-card border border-border-default bg-background-surface";

/**
 * Bento hero: the statement and actions in the large card; a portrait, the owner's local
 * time and the interactive brand mark beside it. Content order in the DOM is statement first,
 * so the reading order matches the visual priority at every width.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: false,
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : delay, ease: mtMotion.easing.standard },
  });

  return (
    <section aria-labelledby="hero-heading" className="pb-4 pt-4 sm:pt-12">
      <Container className="grid grid-cols-1 gap-3 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_28rem]">
        <motion.div {...rise(0)} className={`${card} flex flex-col items-start justify-center gap-5 p-6 sm:p-10 lg:min-h-[32rem] lg:p-12`}>
          <p className="inline-flex items-center gap-2 rounded-pill border border-border-default px-3 py-1.5 text-caption text-text-primary">
            <span aria-hidden="true" className="h-2 w-2 rounded-pill bg-feedback-success" />
            Open to product design roles
          </p>
          <p className="text-overline uppercase text-text-link">Product Designer</p>
          <h1 id="hero-heading" className="text-balance font-display text-h1 font-bold tracking-tight text-text-primary sm:text-display">
            I design complex software that&apos;s easy to use.
          </h1>
          <p className="max-w-2xl text-body text-text-secondary sm:text-body-lg">
            I work on enterprise and SaaS products — the research, the UX, and the design systems behind them. I like getting
            into the messy details, and I work closely with engineers so the thing we ship matches the thing we designed.
          </p>
          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="/case-studies">View my work</ButtonLink>
            <ButtonLink href={CV_URL} variant="secondary" download>
              Download CV
            </ButtonLink>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-rows-[17.5rem_1fr]">
          <motion.div {...rise(0.08)} className={`${card} min-h-[12.5rem] bg-background-surface-subtle`}>
            <Image
              src="/mernel-avatar.png"
              alt="Illustrated portrait of Mernel Tusoy"
              fill
              priority
              sizes="(max-width: 1024px) 50vw, 216px"
              className="object-cover object-top"
            />
            <FrameLabel className="absolute left-3 top-3">mernel.png</FrameLabel>
          </motion.div>
          <motion.div {...rise(0.12)} className={`${card} flex flex-col justify-between gap-4 p-4 sm:p-6`}>
            <div>
              <p className="text-overline uppercase text-text-tertiary">Local time</p>
              <LocalTime className="mt-1 block font-display text-h3 font-bold text-text-primary sm:text-h2" />
              <p className="mt-1 text-caption text-text-secondary">Philippines · GMT+8</p>
            </div>
            <p className="border-t border-border-subtle pt-3 text-body-sm text-text-primary">Open to remote work and relocation</p>
          </motion.div>
          <motion.div {...rise(0.16)} className={`${card} col-span-2 flex items-center justify-between gap-4 p-4 sm:p-6`}>
            <div>
              <p className="font-display text-h4 font-semibold text-text-primary">Curious about the box?</p>
              <p className="mt-1 text-body-sm text-text-secondary">Click to find out.</p>
            </div>
            <BrandMark compact />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
