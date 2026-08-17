import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ColorSection } from "@/components/design-system/color-section";
import { TypeSection } from "@/components/design-system/type-section";
import { SpacingSection } from "@/components/design-system/spacing-section";
import { ComponentLibrary } from "@/components/design-system/component-library";
import { COMPONENT_TOC, slugify } from "@/components/design-system/component-toc";

export const metadata: Metadata = {
  title: "Design System — Mernel Tusoy",
  description: "The live token and component system this site is built on.",
};

const FOUNDATIONS = [
  { href: "#colors", label: "Color" },
  { href: "#typography", label: "Typography" },
  { href: "#spacing", label: "Spacing & grid" },
];

const navLink = "focus-ring block rounded py-0.5 text-body-sm text-text-secondary hover:text-text-primary";
const navHead = "text-caption font-semibold uppercase tracking-wide text-text-tertiary";

/** In-page table of contents — sticky on desktop, separate from the site header. */
function DesignSystemNav() {
  return (
    <nav
      aria-label="On this page"
      className="hidden lg:sticky lg:top-20 lg:block lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-auto lg:pb-10"
    >
      <p className={navHead}>Foundations</p>
      <ul className="mt-2 space-y-1">
        {FOUNDATIONS.map((f) => (
          <li key={f.href}>
            <a href={f.href} className={navLink}>
              {f.label}
            </a>
          </li>
        ))}
      </ul>

      <p className={`mt-6 ${navHead}`}>Components</p>
      <ul className="mt-2 space-y-3">
        {COMPONENT_TOC.map((cat) => (
          <li key={cat.title}>
            <a
              href={`#${slugify(cat.title)}`}
              className="focus-ring block rounded text-body-sm font-semibold text-text-primary hover:text-action-primary"
            >
              {cat.title}
            </a>
            <ul className="mt-1 space-y-0.5 border-l border-border-default pl-3">
              {cat.items.map((item) => (
                <li key={item}>
                  <a href={`#${slugify(item)}`} className={navLink}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <Section className="border-b border-border-default pb-10 pt-16 sm:pt-20">
        <SectionHeading
          eyebrow="Design system"
          title="Tokens & components"
          description="These are the actual tokens and components this site runs on. Every swatch, scale, and specimen below is live-rendered from the same @mt/tokens, never a screenshot."
        />
      </Section>

      <Container className="py-12 sm:py-16 lg:grid lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-12">
        <DesignSystemNav />

        <div className="min-w-0 space-y-16">
          <section id="colors" aria-labelledby="colors-heading" className="scroll-mt-24">
            <h2 id="colors-heading" className="font-display text-h2 font-bold text-text-primary">
              Color
            </h2>
            <div className="mt-8">
              <ColorSection />
            </div>
          </section>

          <section id="typography" aria-labelledby="typography-heading" className="scroll-mt-24 border-t border-border-default pt-16">
            <h2 id="typography-heading" className="font-display text-h2 font-bold text-text-primary">
              Typography
            </h2>
            <div className="mt-8">
              <TypeSection />
            </div>
          </section>

          <section id="spacing" aria-labelledby="spacing-heading" className="scroll-mt-24 border-t border-border-default pt-16">
            <h2 id="spacing-heading" className="font-display text-h2 font-bold text-text-primary">
              Spacing &amp; grid
            </h2>
            <div className="mt-8">
              <SpacingSection />
            </div>
          </section>

          <section id="components" aria-labelledby="components-heading" className="scroll-mt-24 border-t border-border-default pt-16">
            <h2 id="components-heading" className="font-display text-h2 font-bold text-text-primary">
              Components
            </h2>
            <p className="mt-3 max-w-2xl text-body text-text-secondary">
              The component library this site runs on — grouped by category, each built on the same tokens and
              live-rendered from its real source file.
            </p>
            <div className="mt-6">
              <ComponentLibrary />
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
