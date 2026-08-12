import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { PromptPanel } from "@/components/how-it-was-built/prompt-panel";

export const metadata: Metadata = {
  title: "How This Was Built — Mernel Tusoy",
  description: "The workflow and prompt behind this site.",
};

export default function HowThisWasBuiltPage() {
  return (
    <Section className="pt-16 sm:pt-20">
      <div className="max-w-3xl">
        <h1 className="font-display text-h1 font-bold text-text-primary">How this was built</h1>
        <div className="mt-5 space-y-4 text-body-lg text-text-secondary">
          {/* Personalize the voice if you like — the facts below reflect the real build. */}
          <p>
            The visual direction started in Figma. From there the site was scaffolded by Claude Code from the
            single detailed prompt below — reproduced verbatim — after a short back-and-forth to lock the
            aesthetic, accent color, and default theme.
          </p>
          <p>
            It then grew well past that original prompt. The design tokens were pulled out of the app into a
            standalone, multi-brand token library — authored in the{" "}
            <a href="https://www.designtokens.org" className="focus-ring rounded underline decoration-border-strong underline-offset-2 hover:text-text-primary" target="_blank" rel="noreferrer">DTCG</a>{" "}
            standard, shared through an{" "}
            <code className="rounded bg-background-surface-subtle px-1.5 py-0.5 text-caption text-text-primary">@mt/tokens</code>{" "}
            package in a monorepo, and projected back into Figma — so the{" "}
            <a href="/design-system" className="focus-ring rounded underline decoration-border-strong underline-offset-2 hover:text-text-primary">design-system</a>{" "}
            page is generated straight from that single source of truth. From there I built out a full component
            library — buttons, form controls, navigation, and feedback, including interactive pieces like a
            combobox, date picker, and toasts on Radix — plus an interactive 3D brand mark and a subtle honeycomb
            backdrop. Everything was reviewed and adjusted page by page, and the whole thing lives on GitHub,
            auto-deploying to Vercel.
          </p>
          <p>
            Every project, metric, and photo elsewhere on this site is placeholder content pending real case
            studies — look for <code className="rounded bg-background-surface-subtle px-1.5 py-0.5 text-caption text-text-primary">[REPLACE]</code> markers.
          </p>
        </div>
      </div>

      <div className="mt-10 max-w-3xl">
        <PromptPanel />
      </div>
    </Section>
  );
}
