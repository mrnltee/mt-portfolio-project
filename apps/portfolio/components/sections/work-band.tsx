import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tag } from "@/components/ui/tag";
import { FrameLabel, frameName } from "@/components/ui/frame-label";
import { BrowserShot, MediaPanel, PhoneShot } from "@/components/sections/project-media";
import type { CaseStudy } from "@/types/project";

/**
 * A featured project on the home page: what it is, the owner's role, one evaluable fact,
 * and large, legible screenshots. The whole band is clickable, but the link is the title
 * (stretched with ::after), so its accessible name is the visible project title (WCAG 2.5.3).
 */
export function WorkBand({ project }: { project: CaseStudy }) {
  const band = project.band;
  if (!band) return null;
  const short = project.title.split(" —")[0];
  const label = band.media === "phones" && band.images.length > 1 ? `${short.toLowerCase()} / before → after` : frameName(short, band.images[0].src);

  return (
    <article className="group relative grid overflow-hidden rounded-card border border-border-default bg-background-surface shadow-raised transition-shadow duration-normal hover:border-border-strong hover:shadow-overlay lg:min-h-[30rem] lg:grid-cols-[30rem_minmax(0,1fr)]">
      <div className="order-2 flex flex-col justify-center gap-4 p-6 sm:p-10 lg:order-1 lg:p-12">
        <div className="flex flex-wrap gap-2">
          <Tag variant="accent">{project.category}</Tag>
          <Tag>{project.timeframe}</Tag>
        </div>
        <h3 className="text-balance font-display text-h3 font-semibold text-text-primary">
          <Link href={`/case-studies/${project.slug}`} className="focus-ring rounded-field after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </h3>
        <p className="text-body text-text-secondary">{project.summary}</p>
        <dl className="mt-1 space-y-3 border-t border-border-subtle pt-4">
          <div>
            <dt className="text-caption text-text-tertiary">My role</dt>
            <dd className="mt-0.5 text-body-sm text-text-primary">{project.role}</dd>
          </div>
          <div>
            <dt className="text-caption text-text-tertiary">{band.highlight.label}</dt>
            <dd className="mt-0.5 text-body-sm text-text-primary">{band.highlight.value}</dd>
          </div>
        </dl>
        <span aria-hidden="true" className="mt-1 inline-flex items-center gap-1.5 font-display text-body-sm font-semibold text-text-link group-hover:underline">
          Read the case study
          <ArrowRight className="h-icon-sm w-icon-sm transition-transform duration-normal group-hover:translate-x-0.5" />
        </span>
      </div>

      <MediaPanel tint={project.tint} label={<FrameLabel>{label}</FrameLabel>} className="order-1 min-h-[15rem] gap-4 px-6 pb-8 pt-14 sm:gap-8 lg:order-2 lg:p-10 lg:pt-14">
        {band.media === "phones" &&
          band.images.map((img, i) => (
            <figure key={img.src} className="flex flex-col items-center gap-3">
              <PhoneShot shot={img} className={i === band.images.length - 1 ? "w-28 sm:w-44" : "w-24 sm:w-36"} sizes="180px" />
              {img.tag && <Tag>{img.tag}</Tag>}
            </figure>
          ))}
        {band.media === "browser" && <BrowserShot shot={band.images[0]} className="w-full max-w-xl" />}
        {band.media === "image" && (
          <BrowserShot shot={band.images[0]} aspect="aspect-[16/9]" className="w-full max-w-xl" />
        )}
      </MediaPanel>
    </article>
  );
}
