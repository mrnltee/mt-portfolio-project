import Image from "next/image";
import { ArrowUpRight, Boxes, Component, Frame, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";

const FIGMA_URL =
  "https://www.figma.com/design/SPT1RGg952RBTxsnzJmUM2/MT-Design?node-id=0-1&t=BamXxuCBKYWUTQ5O-1";

const coverage = [
  {
    icon: Boxes,
    title: "Foundations",
    detail: "Colour, type, spacing, shape, elevation, layout, motion, iconography, and interaction.",
  },
  {
    icon: Component,
    title: "Components",
    detail: "A production-minded library with documented anatomy, states, density, and usage rules.",
  },
  {
    icon: Frame,
    title: "Patterns & templates",
    detail: "Forms, data tables, search, notifications, confirmation flows, and responsive app shells.",
  },
  {
    icon: ShieldCheck,
    title: "Accessibility",
    detail: "WCAG 2.2 AA guidance for contrast, focus, keyboard paths, targets, structure, and motion.",
  },
];

const previews = [
  {
    src: "/images/design-system/mt-design-color.png",
    alt: "MT Design colour foundations showing primitive ramps, semantic roles, rules, and usage examples",
    title: "Semantic colour",
    description: "Brand-neutral surfaces, restrained accents, and feedback colours that keep their meaning in both themes.",
    width: 623,
    height: 1568,
  },
  {
    src: "/images/design-system/mt-design-typography.png",
    alt: "MT Design typography foundations showing font roles, type scale, specifications, and rules",
    title: "Purposeful type",
    description: "Inter carries product UI, Space Grotesk adds selective display contrast, and JetBrains Mono handles machine-readable content.",
    width: 766,
    height: 1568,
  },
  {
    src: "/images/design-system/mt-design-template.png",
    alt: "MT Design desktop application shell with navigation, tabs, actions, and a data table",
    title: "System in use",
    description: "A responsive shell demonstrates how foundations and components compose into dense, calm operational software.",
    width: 1440,
    height: 900,
  },
  {
    src: "/images/design-system/mt-design-accessibility.png",
    alt: "MT Design accessibility documentation covering contrast, focus, keyboard use, targets, errors, and screen readers",
    title: "Accessibility as a baseline",
    description: "The library records testable decisions so teams can review a screen without rediscovering the standard each time.",
    width: 479,
    height: 1568,
  },
];

export function MtDesignOverview() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 border-b border-border-default pb-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="max-w-3xl">
          <p className="text-body-sm font-medium text-action-primary">MT Design · version 0.6.0</p>
          <h2 className="mt-3 max-w-2xl font-display text-h1 font-bold text-text-primary">
            A parent system for product teams, not a finished product skin.
          </h2>
          <p className="mt-5 max-w-2xl text-body-lg text-text-secondary">
            MT Design is a brand-neutral, inheritable design system for web, desktop, and mobile products. It gives
            each product shared foundations, a tokenised theme model, contribution rules, and a compact set of
            components without erasing product-specific decisions.
          </p>
          <ButtonLink href={FIGMA_URL} target="_blank" rel="noreferrer" className="mt-7" size="md">
            Open MT Design in Figma
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </div>

        <figure className="overflow-hidden rounded-card border border-border-default bg-background-surface">
          <Image
            src="/images/design-system/mt-design-readme.png"
            alt="MT Design read-me documentation with purpose, principles, conventions, contribution rules, and release guidance"
            width={616}
            height={1568}
            className="h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 320px"
            priority
          />
          <figcaption className="border-t border-border-default p-4 text-caption text-text-secondary">
            The library documents how it should be inherited, changed, reviewed, and deprecated.
          </figcaption>
        </figure>
      </div>

      <section aria-labelledby="mt-design-coverage" className="py-12 sm:py-16">
        <div className="max-w-2xl">
          <h3 id="mt-design-coverage" className="font-display text-h2 font-bold text-text-primary">
            What the system covers
          </h3>
          <p className="mt-3 text-body text-text-secondary">
            The Figma library is organised as a working product-design toolkit, from decisions and variables through
            reusable screen structures.
          </p>
        </div>
        <div className="mt-8 grid gap-px overflow-hidden rounded-card border border-border-default bg-border-default sm:grid-cols-2 lg:grid-cols-4">
          {coverage.map(({ icon: Icon, title, detail }) => (
            <article key={title} className="bg-background-surface p-6">
              <Icon aria-hidden="true" className="size-5 text-action-primary" strokeWidth={1.75} />
              <h4 className="mt-5 font-display text-h4 font-semibold text-text-primary">{title}</h4>
              <p className="mt-2 text-body-sm text-text-secondary">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="mt-design-principles" className="border-t border-border-default py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div>
            <h3 id="mt-design-principles" className="font-display text-h2 font-bold text-text-primary">
              The decisions behind it
            </h3>
            <p className="mt-3 text-body text-text-secondary">
              Four constraints keep the system useful as it grows.
            </p>
          </div>
          <ol className="grid gap-6 sm:grid-cols-2">
            {[
              ["Calm by default", "Neutral surfaces carry the interface. Colour appears when it communicates action, selection, or feedback."],
              ["Hierarchy through craft", "Weight, spacing, contrast, and alignment establish order before decoration does."],
              ["Every state is designed", "Components are incomplete until hover, focus, disabled, loading, empty, and error states are resolved."],
              ["Dense without becoming cramped", "Compact layouts still preserve touch targets, keyboard access, and readable content."],
            ].map(([title, detail], index) => (
              <li key={title} className="border-t border-border-strong pt-4">
                <span className="text-caption text-text-tertiary">{String(index + 1).padStart(2, "0")}</span>
                <h4 className="mt-2 font-display text-h4 font-semibold text-text-primary">{title}</h4>
                <p className="mt-2 text-body-sm text-text-secondary">{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="mt-design-previews" className="border-t border-border-default py-12 sm:py-16">
        <div className="max-w-2xl">
          <h3 id="mt-design-previews" className="font-display text-h2 font-bold text-text-primary">
            Inside the Figma library
          </h3>
          <p className="mt-3 text-body text-text-secondary">
            Selected pages from the current source document. The Figma file remains the editable source of truth.
          </p>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {previews.map((preview) => (
            <figure key={preview.title} className="overflow-hidden rounded-card border border-border-default bg-background-surface">
              <div className="max-h-[680px] overflow-hidden border-b border-border-default bg-white">
                <Image
                  src={preview.src}
                  alt={preview.alt}
                  width={preview.width}
                  height={preview.height}
                  className="h-auto w-full object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <figcaption className="p-5">
                <h4 className="font-display text-h4 font-semibold text-text-primary">{preview.title}</h4>
                <p className="mt-2 text-body-sm text-text-secondary">{preview.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </Container>
  );
}
