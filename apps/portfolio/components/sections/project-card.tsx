import Link from "next/link";
import { motion } from "framer-motion";
import { motion as mtMotion } from "@mt/tokens/motion";
import { Card, CardBody } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import type { CaseStudy } from "@/types/project";

export function ProjectCard({ project }: { project: CaseStudy }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: mtMotion.easing.standard }} className="h-full">
      <Link
        href={`/case-studies/${project.slug}`}
        className="focus-ring group block h-full rounded-card"
        aria-label={`View case study: ${project.title}`}
      >
        <Card className="flex h-full flex-col overflow-hidden group-hover:shadow-modal">
          <ImagePlaceholder label={project.coverLabel} tone={project.tone} className="rounded-none border-0 border-b" />
          <CardBody className="flex flex-1 flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {project.projectTypes.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <h3 className="font-display text-h4 font-semibold text-text-primary">{project.title}</h3>
            <p className="flex-1 text-body-sm text-text-secondary">{project.summary}</p>
            <p className="text-caption text-text-secondary">
              {project.role} · {project.timeframe}
            </p>
          </CardBody>
        </Card>
      </Link>
    </motion.div>
  );
}
