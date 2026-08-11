import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ColorSection } from "@/components/design-system/color-section";
import { TypeSection } from "@/components/design-system/type-section";
import { SpacingSection } from "@/components/design-system/spacing-section";
import { ComponentSection } from "@/components/design-system/component-section";
import { LibrarySection } from "@/components/design-system/library-section";
import { LibraryInteractive } from "@/components/design-system/library-interactive";
import { LibraryFinal } from "@/components/design-system/library-final";

export const metadata: Metadata = {
  title: "Design System — Mernel Tusoy",
  description: "The live token and component system this site is built on.",
};

const JUMP_LINKS = [
  { href: "#colors", label: "Color" },
  { href: "#typography", label: "Typography" },
  { href: "#spacing", label: "Spacing & grid" },
  { href: "#components", label: "Components" },
  { href: "#component-library", label: "Component library" },
];

export default function DesignSystemPage() {
  return (
    <>
      <Section className="border-b border-border-default pb-10 pt-16 sm:pt-20">
        <SectionHeading
          eyebrow="Design system"
          title="Tokens & components"
          description="This isn't a generic style guide — it's the actual token architecture and component set this site runs on. Every swatch, scale, and specimen below is live-rendered, not screenshotted."
        />
        <nav aria-label="Design system sections" className="mt-8 flex flex-wrap gap-4 border-t border-border-default pt-6">
          {JUMP_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="focus-ring rounded-field text-body-sm font-medium text-text-secondary hover:text-text-primary">
              {link.label}
            </a>
          ))}
        </nav>
      </Section>

      <Section aria-labelledby="colors-heading" id="colors">
        <h2 id="colors-heading" className="font-display text-h2 font-bold text-text-primary">
          Color
        </h2>
        <div className="mt-8">
          <ColorSection />
        </div>
      </Section>

      <Section aria-labelledby="typography-heading" id="typography" className="border-t border-border-default">
        <h2 id="typography-heading" className="font-display text-h2 font-bold text-text-primary">
          Typography
        </h2>
        <div className="mt-8">
          <TypeSection />
        </div>
      </Section>

      <Section aria-labelledby="spacing-heading" id="spacing" className="border-t border-border-default">
        <h2 id="spacing-heading" className="font-display text-h2 font-bold text-text-primary">
          Spacing &amp; grid
        </h2>
        <div className="mt-8">
          <SpacingSection />
        </div>
      </Section>

      <Section aria-labelledby="components-heading" id="components" className="border-t border-border-default">
        <h2 id="components-heading" className="font-display text-h2 font-bold text-text-primary">
          Components
        </h2>
        <p className="mt-3 max-w-2xl text-body text-text-secondary">
          The real components used across this site — same source files, no duplicated markup.
        </p>
        <div className="mt-4">
          <ComponentSection />
        </div>
      </Section>

      <Section aria-labelledby="component-library-heading" id="component-library" className="border-t border-border-default">
        <h2 id="component-library-heading" className="font-display text-h2 font-bold text-text-primary">
          Component library
        </h2>
        <p className="mt-3 max-w-2xl text-body text-text-secondary">
          Reusable primitives built on the same tokens — form controls, buttons, feedback &amp; status, navigation, and
          iconography.
        </p>
        <div className="mt-4">
          <LibrarySection />
          <LibraryInteractive />
          <LibraryFinal />
        </div>
      </Section>
    </>
  );
}
