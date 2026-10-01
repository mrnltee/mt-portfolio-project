import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { motion as mtMotion } from "@mt/tokens/motion";
import { Card, CardBody } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import type { CaseStudy } from "@/types/project";

export function ProjectCard({ project }: { project: CaseStudy }) {
  const reduceMotion = useReducedMotion();
  const visibleTools = project.tools.slice(0, 2);
  const additionalTools = project.tools.length - visibleTools.length;

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: reduceMotion ? 0 : 0.2, ease: mtMotion.easing.standard }}
      className="h-full"
    >
      <Link
        href={`/case-studies/${project.slug}`}
        className="focus-ring group block h-full rounded-card"
        aria-label={`View project: ${project.title}`}
      >
        <Card className="flex h-full flex-col overflow-hidden group-hover:shadow-modal">
          <ImagePlaceholder
            label={project.coverLabel}
            src={project.cover}
            srcDark={project.coverDark}
            aspect="video"
            fit={project.coverAspect === "portrait" ? "contain" : "cover"}
            tone={project.tone}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="rounded-none border-0 border-b"
          />
          <CardBody className="flex flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <Tag variant="accent">{project.category}</Tag>
              {visibleTools.map((tool) => (
                <Tag key={tool}>{tool}</Tag>
              ))}
              {additionalTools > 0 && (
                <Tag aria-label={`${additionalTools} additional tools`}>+{additionalTools}</Tag>
              )}
            </div>
            <h3 className="font-display text-h4 font-semibold text-text-primary">{project.title}</h3>
            <p className="line-clamp-3 flex-1 text-body-sm text-text-secondary">{project.summary}</p>
            <div className="mt-auto space-y-3 pt-1">
              <div className="flex min-h-10 items-start justify-between gap-3 border-t border-border-default pt-3">
                <p className="line-clamp-2 text-caption text-text-secondary">{project.role}</p>
                <p className="shrink-0 whitespace-nowrap text-caption text-text-secondary">
                  {project.timeframe}
                </p>
              </div>
              <div className="flex items-center justify-between text-body-sm font-semibold text-text-primary group-hover:underline group-focus-visible:underline">
                <span>View case study</span>
                <span aria-hidden="true">→</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </Link>
    </motion.div>
  );
}
