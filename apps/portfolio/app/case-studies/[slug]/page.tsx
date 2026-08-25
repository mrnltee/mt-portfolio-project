import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudyBySlug } from "@/lib/projects-data";
import { CaseStudyTemplate } from "@/components/sections/case-study-template";

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getCaseStudyBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Mernel Tusoy`,
    description: project.summary,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getCaseStudyBySlug(params.slug);
  if (!project) notFound();

  // Neighbours follow the authored order in projects-data.ts.
  const index = caseStudies.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? caseStudies[index - 1] : null;
  const next = index < caseStudies.length - 1 ? caseStudies[index + 1] : null;

  return <CaseStudyTemplate project={project} prev={prev} next={next} />;
}
