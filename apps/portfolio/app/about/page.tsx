import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Avatar } from "@/components/ui/avatar";
import { Tag } from "@/components/ui/tag";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";

export const metadata: Metadata = {
  title: "About — Mernel Tusoy",
  description: "Bio, skills, and design process philosophy.",
};

// [REPLACE] all copy, skills, and process steps below with your own.
const SKILLS = [
  "User research",
  "Interaction design",
  "Design systems",
  "Prototyping",
  "Usability testing",
  "Accessibility (WCAG)",
  "Information architecture",
  "Cross-functional collaboration",
];

const PROCESS = [
  {
    step: "01",
    title: "Understand",
    body: "[REPLACE] Describe how you kick off a project — stakeholder interviews, user research, reviewing existing data.",
  },
  {
    step: "02",
    title: "Explore",
    body: "[REPLACE] Describe how you diverge — sketching, wireframing, exploring multiple directions before converging.",
  },
  {
    step: "03",
    title: "Refine",
    body: "[REPLACE] Describe how you validate and tighten a direction — testing, critique, iteration.",
  },
  {
    step: "04",
    title: "Ship & measure",
    body: "[REPLACE] Describe how you hand off to engineering and what you look at post-launch to know it worked.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Avatar
            src="/mernel-avatar-head.png"
            alt="Mernel Tusoy"
            size={112}
            className="bg-action-accent-subtle ring-1 ring-border-default"
          />
          <div>
            <h1 className="font-display text-h1 font-bold text-text-primary">About</h1>
            <p className="mt-3 max-w-2xl text-body-lg text-text-secondary">
              {/* [REPLACE] Replace with your real bio — 2-4 sentences on your background, focus area, and what kind of work energizes you. */}
              I&apos;m a UI/UX designer who likes turning ambiguous problems into interfaces people don&apos;t
              have to think about. Most of my work sits at the intersection of research, systems thinking, and
              craft.
            </p>
            <p className="mt-3 max-w-2xl text-body-sm text-text-secondary">
              I&apos;ve worked at IBM, and on products for Maxicare, SM Cinema, Robinsons Movieworld, and
              GoDaddy (white-label).
            </p>
            <p className="mt-2 text-body-sm text-text-tertiary">
              Based in the Philippines (GMT+8) · Open to remote work and relocation
            </p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border-default">
        <h2 className="font-display text-h2 font-bold text-text-primary">Skills</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <Tag key={skill} variant="neutral" size="md">
              {skill}
            </Tag>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border-default">
        <h2 className="font-display text-h2 font-bold text-text-primary">How I work</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {PROCESS.map((p, i) => (
            <RevealOnScroll key={p.step} delay={i * 0.06}>
              <span className="font-display text-h3 font-bold text-action-primary">{p.step}</span>
              <h3 className="mt-2 font-display text-h4 font-semibold text-text-primary">{p.title}</h3>
              <p className="mt-2 text-body text-text-secondary">{p.body}</p>
            </RevealOnScroll>
          ))}
        </div>
      </Section>
    </>
  );
}
