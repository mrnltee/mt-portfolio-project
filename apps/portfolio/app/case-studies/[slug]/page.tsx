import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudyBySlug } from "@/lib/projects-data";
import { CaseStudyTemplate } from "@/components/sections/case-study-template";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

// Next.js 15+ passes route params as a Promise; reading `params.slug` directly is undefined.
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Mernel Tusoy`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);
  if (!project) notFound();

  // Neighbours follow the authored order in projects-data.ts.
  const index = caseStudies.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? caseStudies[index - 1] : null;
  // The last study points back to the first, so every page ends with somewhere to go.
  const next = caseStudies[(index + 1) % caseStudies.length];

  return <CaseStudyTemplate project={project} prev={prev} next={next} />;
}
