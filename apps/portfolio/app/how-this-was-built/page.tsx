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
          {/* [REPLACE] Swap this note for your real workflow if it differs. */}
          <p>
            The visual direction started in Figma, then this site itself was scaffolded by Claude Code from a
            single detailed prompt — the one below, reproduced verbatim. I picked the aesthetic direction, accent
            color, and default theme through a short back-and-forth, then reviewed and adjusted the generated
            code page by page.
          </p>
          <p>
            Every project, metric, and photo you see elsewhere on this site is placeholder content pending real
            case studies — look for <code className="rounded bg-background-surface-subtle px-1.5 py-0.5 text-caption text-text-primary">[REPLACE]</code> markers.
          </p>
        </div>
      </div>

      <div className="mt-10 max-w-3xl">
        <PromptPanel />
      </div>
    </Section>
  );
}
