import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { TINT } from "@/components/sections/project-media";
import type { CaseStudy } from "@/types/project";

/**
 * Project card for the Work index. The title is the link, stretched over the card with
 * ::after, so the accessible name is the visible title (WCAG 2.5.3). One category tag
 * (tools live on the case study), the summary in full, then role · year.
 */
export function ProjectCard({ project, headingLevel = "h2" }: { project: CaseStudy; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden hover:border-border-strong hover:shadow-overlay">
      <div className={TINT[project.tint ?? "neutral"]}>
        <ImagePlaceholder
          label={project.coverLabel}
          src={project.cover}
          srcDark={project.coverDark}
          aspect="video"
          fit={project.coverAspect === "portrait" ? "contain" : "cover"}
          tone={project.tone}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="rounded-none border-0 border-b bg-transparent"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <Tag variant="accent">{project.category}</Tag>
        </div>
        <Heading className="text-balance font-display text-h4 font-semibold text-text-primary">
          <Link href={`/case-studies/${project.slug}`} className="focus-ring rounded-field after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </Heading>
        <p className="flex-1 text-body-sm text-text-secondary">{project.summary}</p>
        <p className="border-t border-border-subtle pt-3 text-caption text-text-tertiary">
          {project.role} · {project.timeframe}
        </p>
        <span aria-hidden="true" className="inline-flex items-center gap-1.5 font-display text-body-sm font-semibold text-text-link group-hover:underline">
          Read the case study
          <ArrowRight className="h-icon-sm w-icon-sm" />
        </span>
      </div>
    </Card>
  );
}
