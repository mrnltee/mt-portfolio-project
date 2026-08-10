import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectGrid } from "@/components/sections/project-grid";
import { caseStudies } from "@/lib/projects-data";

export const metadata: Metadata = {
  title: "Case Studies — Mernel Tusoy",
  description: "Full project write-ups covering problem, process, solution, and outcome.",
};

export default function CaseStudiesPage() {
  return (
    <Section>
      <SectionHeading
        id="case-studies-heading"
        eyebrow="Work"
        title="Case studies"
        description="Filter by role, tool, or project type. Every entry below is placeholder content — see /how-this-was-built for the prompt that scaffolded this site."
        className="mb-10"
      />
      <ProjectGrid projects={caseStudies} />
    </Section>
  );
}
