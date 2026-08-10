import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Tag } from "@/components/ui/tag";
import { Divider } from "@/components/ui/divider";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import type { CaseStudy } from "@/types/project";

/**
 * Shared shape for every case study: Header -> Problem -> Process -> Solution -> Outcome.
 * All copy and image slots come from lib/projects-data.ts — edit that file,
 * not this template, to swap in real project content.
 */
export function CaseStudyTemplate({ project }: { project: CaseStudy }) {
  return (
    <article>
      <header className="border-b border-border-default py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="mb-4 flex flex-wrap gap-2">
            {project.projectTypes.map((t) => (
              <Tag key={t} variant="accent">
                {t}
              </Tag>
            ))}
          </div>
          <h1 className="font-display text-h1 font-bold text-text-primary">{project.title}</h1>
          <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-border-default pt-6 text-body-sm sm:grid-cols-3">
            <div>
              <dt className="text-caption uppercase tracking-wide text-text-secondary">Role</dt>
              <dd className="mt-1 text-text-primary">{project.role}</dd>
            </div>
            <div>
              <dt className="text-caption uppercase tracking-wide text-text-secondary">Timeframe</dt>
              <dd className="mt-1 text-text-primary">{project.timeframe}</dd>
            </div>
            <div>
              <dt className="text-caption uppercase tracking-wide text-text-secondary">Tools</dt>
              <dd className="mt-1 text-text-primary">{project.tools.join(", ")}</dd>
            </div>
          </dl>
        </Container>
      </header>

      <Section aria-labelledby="problem-heading" containerClassName="max-w-3xl">
        <RevealOnScroll>
          <h2 id="problem-heading" className="font-display text-h2 font-bold text-text-primary">
            Problem &amp; context
          </h2>
          <div className="mt-5 space-y-4 text-body-lg text-text-secondary">
            {project.problem.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </RevealOnScroll>
      </Section>

      <Divider />

      <Section aria-labelledby="process-heading" containerClassName="max-w-3xl">
        <RevealOnScroll>
          <h2 id="process-heading" className="font-display text-h2 font-bold text-text-primary">
            Process
          </h2>
        </RevealOnScroll>
        <div className="mt-8 space-y-14">
          {project.process.map((block, i) => (
            <RevealOnScroll key={block.heading} delay={i * 0.05}>
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                <div className={i % 2 === 1 ? "md:order-2" : undefined}>
                  <h3 className="font-display text-h4 font-semibold text-text-primary">{block.heading}</h3>
                  <p className="mt-3 text-body text-text-secondary">{block.body}</p>
                </div>
                <ImagePlaceholder label={block.imageLabel} aspect="wide" tone={(i % 4) as 0 | 1 | 2 | 3} />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      <Divider />

      <Section aria-labelledby="solution-heading" containerClassName="max-w-3xl">
        <RevealOnScroll>
          <h2 id="solution-heading" className="font-display text-h2 font-bold text-text-primary">
            Solution
          </h2>
          <p className="mt-5 text-body-lg text-text-secondary">{project.solution.body}</p>
        </RevealOnScroll>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {project.solution.gallery.map((item, i) => (
            <RevealOnScroll key={item.label} delay={i * 0.05}>
              <ImagePlaceholder label={item.label} aspect="portrait" tone={(i % 4) as 0 | 1 | 2 | 3} />
              <p className="mt-2 text-caption text-text-secondary">{item.caption}</p>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      <Divider />

      <Section aria-labelledby="outcome-heading" containerClassName="max-w-3xl">
        <RevealOnScroll>
          <h2 id="outcome-heading" className="font-display text-h2 font-bold text-text-primary">
            Outcome &amp; impact
          </h2>
          <p className="mt-5 text-body-lg text-text-secondary">{project.outcome.summary}</p>
          <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {project.outcome.metrics.map((m) => (
              <div key={m.label} className="rounded-card border border-border-default bg-background-surface p-6">
                <dd className="font-display text-h2 font-bold text-action-primary">{m.value}</dd>
                <dt className="mt-1 text-caption text-text-secondary">{m.label}</dt>
              </div>
            ))}
          </dl>
        </RevealOnScroll>
      </Section>
    </article>
  );
}
