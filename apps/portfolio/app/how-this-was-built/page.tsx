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
          <p>
            The visual direction started in Figma. From there, Claude Code scaffolded the site from the single
            detailed prompt below, reproduced verbatim, after a short back-and-forth to lock the aesthetic,
            accent color, and default theme.
          </p>
          <p>
            It then grew well past that original prompt. The design tokens were pulled out of the app into a
            standalone, multi-brand token library, authored in the{" "}
            <a href="https://www.designtokens.org" className="focus-ring rounded underline decoration-border-strong underline-offset-2 hover:text-text-primary" target="_blank" rel="noreferrer">DTCG</a>{" "}
            standard, shared through an{" "}
            <code className="rounded bg-background-surface-subtle px-1.5 py-0.5 text-caption text-text-primary">@mt/tokens</code>{" "}
            package in a monorepo, and projected back into Figma. That makes the{" "}
            <a href="/design-system" className="focus-ring rounded underline decoration-border-strong underline-offset-2 hover:text-text-primary">design-system</a>{" "}
            page generate straight from a single source of truth. From there I built a full component library:
            buttons, form controls, navigation, feedback, and interactive pieces like a combobox, date picker,
            and toasts on Radix, plus an interactive 3D brand mark and a subtle honeycomb backdrop. Everything
            was reviewed and adjusted page by page, and the whole thing lives on GitHub, auto-deploying to
            Vercel.
          </p>
          <p>
            The work shown here is real. Extractly is a sanitized, NDA-safe reconstruction of a client
            engagement: the design problem and the decisions behind it are intact, the client&apos;s data and
            branding are not. More case studies are in progress.
          </p>
        </div>
      </div>

      <div className="mt-10 max-w-3xl">
        <PromptPanel />
      </div>
    </Section>
  );
}
