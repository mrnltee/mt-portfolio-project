import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Tag } from "@/components/ui/tag";
import { FrameLabel, frameName } from "@/components/ui/frame-label";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { BrowserShot, MediaPanel, PhoneShot } from "@/components/sections/project-media";
import { ContactBand } from "@/components/sections/contact-band";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/types/project";

/** Minimal shape needed to link to a neighbouring case study. */
type CaseStudyLink = Pick<CaseStudy, "slug" | "title">;

const PROSE = "max-w-[68ch]";
const eyebrow = "text-overline uppercase text-text-link";
const h2 = "mt-2 font-display text-h2 font-bold text-text-primary";

/** Spacing rule: a caption sits 8px under its own figure; the next item is ≥24px away. */
function Figure({ project, src, srcDark, label, aspect, caption }: { project: CaseStudy; src?: string; srcDark?: string; label: string; aspect?: CaseStudy["coverAspect"]; caption?: string }) {
  const short = project.title.split(" —")[0].split(":")[0];
  const portrait = aspect === "portrait";
  return (
    <figure>
      <MediaPanel
        tint={project.tint}
        label={src ? <FrameLabel>{frameName(short, src)}</FrameLabel> : undefined}
        className={cn("rounded-card", portrait ? "px-6 pb-6 pt-14 sm:pb-10" : "p-4 pt-14 sm:p-8 sm:pt-14")}
      >
        {portrait && src ? (
          <PhoneShot shot={{ src, srcDark, label }} zoomable className="w-48 sm:w-56" sizes="240px" />
        ) : (
          <ImagePlaceholder label={label} src={src} srcDark={srcDark} aspect={aspect ?? "video"} zoomable sizes="(max-width: 768px) 100vw, 1152px" className="w-full shadow-overlay" />
        )}
      </MediaPanel>
      <figcaption className="mt-2 text-caption text-text-tertiary">{caption ?? label}</figcaption>
    </figure>
  );
}

export function CaseStudyTemplate({ project, next }: { project: CaseStudy; prev?: CaseStudyLink | null; next?: CaseStudyLink | null }) {
  const facts: [string, string][] = [
    ["Role", project.role],
    ["Timeframe", project.timeframe],
    ...(project.platforms?.length ? ([["Platform", project.platforms.join(", ")]] as [string, string][]) : []),
    ["Tools", project.tools.join(", ")],
  ];
  const coverPortrait = project.coverAspect === "portrait";
  const gallery = project.solution.gallery ?? [];
  const portraitGallery = gallery.every((g) => g.aspect === "portrait");
  const metrics = project.outcome.metrics ?? [];

  return (
    <article>
      {/* Header: what this is, before anything else */}
      <header className="pb-12 pt-8 sm:pb-16 sm:pt-10">
        <Container>
          <Breadcrumb items={[{ label: "Work", href: "/case-studies" }, { label: project.title }]} />
          {/* Phones: intro → cover → facts, so the work shows on the first screen. lg: two columns, cover spans both rows. */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_30rem] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-5">
            <div className="flex flex-col gap-5 lg:self-end">
              <div className="flex flex-wrap gap-2">
                <Tag variant="accent">{project.category}</Tag>
                <Tag>{project.timeframe}</Tag>
              </div>
              <h1 className="text-balance font-display text-h1 font-bold text-text-primary">{project.title}</h1>
              <p className="max-w-[60ch] text-body-lg text-text-secondary">{project.summary}</p>
            </div>
            <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              {project.cover && (
                <MediaPanel
                  tint={project.tint}
                  label={<FrameLabel>{frameName(project.title.split(" —")[0].split(":")[0], project.cover)}</FrameLabel>}
                  className={cn("rounded-card", coverPortrait ? "min-h-[22rem] px-6 pb-8 pt-14 lg:min-h-[35rem]" : "p-4 pt-14 sm:p-8 sm:pt-14")}
                >
                  {coverPortrait ? (
                    <PhoneShot shot={{ src: project.cover, srcDark: project.coverDark, label: project.coverLabel }} className="w-40 sm:w-56" sizes="240px" />
                  ) : (
                    <BrowserShot shot={{ src: project.cover, srcDark: project.coverDark, label: project.coverLabel }} aspect="aspect-video" className="w-full" />
                  )}
                </MediaPanel>
              )}
            </div>
            <div className="flex flex-col gap-5 lg:self-start">
              <dl className="grid grid-cols-1 overflow-hidden rounded-card border border-border-default bg-background-surface sm:grid-cols-2">
                {facts.map(([k, v], i) => (
                  <div key={k} className={cn("border-border-subtle px-5 py-4", i > 0 && "border-t", i === 1 && "sm:border-l sm:border-t-0", i > 1 && i % 2 === 1 && "sm:border-l")}>
                    <dt className="text-caption text-text-tertiary">{k}</dt>
                    <dd className="mt-1 text-body-sm text-text-primary">{v}</dd>
                  </div>
                ))}
              </dl>
              {(project.websiteUrl || project.prototypeUrl) && (
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {project.websiteUrl && (
                    <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1.5 rounded-field font-display text-body-sm font-semibold text-text-link underline-offset-4 hover:underline">
                      Visit the live website <ArrowUpRight className="h-icon-sm w-icon-sm" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                  {project.prototypeUrl && (
                    <a href={project.prototypeUrl} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1.5 rounded-field font-display text-body-sm font-semibold text-text-link underline-offset-4 hover:underline">
                      View the Figma prototype <ArrowUpRight className="h-icon-sm w-icon-sm" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </header>

      {/* What I did */}
      {project.contribution?.length ? (
        <section aria-labelledby="contribution-heading">
          <Container>
            <div className="grid gap-6 rounded-card border border-border-default bg-background-surface p-6 sm:p-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
              <div>
                <p className={eyebrow}>What I did</p>
                <h2 id="contribution-heading" className="mt-2 font-display text-h4 font-semibold text-text-primary">
                  What I did on this project
                </h2>
              </div>
              <ul className="space-y-3">
                {project.contribution.map((c) => (
                  <li key={c} className="flex gap-3 text-body text-text-primary">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-pill bg-action-primary" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Problem */}
      <section aria-labelledby="problem-heading" className="pt-16 sm:pt-24">
        <Container>
          <RevealOnScroll className={PROSE}>
            <p className={eyebrow}>The problem</p>
            <h2 id="problem-heading" className={h2}>
              Problem &amp; context
            </h2>
            <div className="mt-5 space-y-4 text-body-lg text-text-secondary">
              {project.problem.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Process */}
      <section aria-labelledby="process-heading" className="pt-16 sm:pt-24">
        <Container>
          <p className={eyebrow}>How it came together</p>
          <h2 id="process-heading" className={h2}>
            Process
          </h2>
          <ol className="mt-10 space-y-16 sm:space-y-20">
            {project.process.map((block, i) => {
              const portrait = block.aspect === "portrait";
              return (
                <li key={block.heading}>
                  <RevealOnScroll className={cn("grid grid-cols-1 gap-8", portrait && "items-center lg:grid-cols-[minmax(0,1fr)_30rem] lg:gap-16")}>
                    <div className={PROSE}>
                      <p aria-hidden="true" className="font-mono text-caption text-text-link">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 text-balance font-display text-h3 font-semibold text-text-primary">{block.heading}</h3>
                      <p className="mt-3 text-body text-text-secondary">{block.body}</p>
                    </div>
                    <Figure project={project} src={block.image} srcDark={block.imageDark} label={block.imageLabel} aspect={block.aspect} />
                  </RevealOnScroll>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Solution */}
      <section aria-labelledby="solution-heading" className="pt-16 sm:pt-24">
        <Container>
          <div className={PROSE}>
            <p className={eyebrow}>What shipped</p>
            <h2 id="solution-heading" className={h2}>
              Solution
            </h2>
            <p className="mt-5 text-body-lg text-text-secondary">{project.solution.body}</p>
          </div>
          {gallery.length > 0 && (
            <ul className={cn("mt-10 grid grid-cols-1 gap-x-6 gap-y-10", portraitGallery ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2")}>
              {gallery.map((item) => (
                <li key={item.label}>
                  <figure>
                    {item.aspect === "portrait" && item.image ? (
                      <MediaPanel tint="neutral" className="rounded-card px-6 py-8">
                        <PhoneShot shot={{ src: item.image, srcDark: item.imageDark, label: item.label }} zoomable className="w-36 sm:w-40" sizes="180px" />
                      </MediaPanel>
                    ) : (
                      <ImagePlaceholder label={item.label} src={item.image} srcDark={item.imageDark} aspect={item.aspect ?? "video"} zoomable sizes="(max-width: 768px) 100vw, 560px" />
                    )}
                    <figcaption className="mt-2">
                      <span className="block text-label text-text-primary">{item.label}</span>
                      <span className="mt-0.5 block text-caption text-text-tertiary">{item.caption}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* Outcome */}
      <section aria-labelledby="outcome-heading" className="pt-16 sm:pt-24">
        <Container>
          <div className={PROSE}>
            <p className={eyebrow}>Result</p>
            <h2 id="outcome-heading" className={h2}>
              Outcome &amp; impact
            </h2>
            <p className="mt-5 text-body-lg text-text-secondary">{project.outcome.summary}</p>
          </div>
          {metrics.length > 0 && (
            <dl className={cn("mt-8 grid grid-cols-1 gap-4 sm:gap-6", metrics.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3")}>
              {metrics.map((m) => (
                // Label first in the markup (dt before dd); the value is shown first visually.
                <div key={m.label} className="flex flex-col-reverse justify-end gap-1 rounded-card border border-border-default bg-background-surface p-6">
                  <dt className="text-caption text-text-secondary">{m.label}</dt>
                  <dd className="font-display text-h2 font-bold text-text-link">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </Container>
      </section>

      {/* Where to next: contact first (the reader just finished evaluating), then more work */}
      <ContactBand className="pb-6 pt-16 sm:pb-6 sm:pt-24" />
      <nav aria-label="More work" className="pb-16">
        <Container className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          {next && (
            <Link
              href={`/case-studies/${next.slug}`}
              className="focus-ring group flex items-center justify-between gap-6 rounded-card border border-border-default bg-background-surface p-6 shadow-raised hover:border-border-strong hover:shadow-overlay"
            >
              <span>
                <span className="block text-overline uppercase text-text-tertiary">Next case study</span>
                <span className="mt-1 block font-display text-h3 font-semibold text-text-primary">{next.title}</span>
              </span>
              <ArrowRight className="h-icon-lg w-icon-lg shrink-0 text-text-link transition-transform duration-normal group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          )}
          <Link
            href="/case-studies"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-card border border-border-default px-6 py-5 font-display text-body-sm font-semibold text-text-link hover:border-border-strong"
          >
            All work <ArrowRight className="h-icon-sm w-icon-sm" aria-hidden="true" />
          </Link>
        </Container>
      </nav>
    </article>
  );
}
