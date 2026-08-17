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
        description="Deep dives into selected product design work — problem, process, solution, and outcome. Filter by role, tool, or project type."
        className="mb-10"
      />
      <ProjectGrid projects={caseStudies} />
    </Section>
  );
}
