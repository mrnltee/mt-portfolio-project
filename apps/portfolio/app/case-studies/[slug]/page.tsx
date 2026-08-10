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

  return <CaseStudyTemplate project={project} />;
}
