import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectGrid } from "@/components/sections/project-grid";
import { caseStudies } from "@/lib/projects-data";

export const metadata: Metadata = {
  title: "Case Studies & Projects — Mernel Tusoy",
  description:
    "Case studies and shipped projects — full write-ups covering problem, process, solution, and outcome.",
};

export default function CaseStudiesPage() {
  return (
    <Section>
      <SectionHeading
        id="case-studies-heading"
        eyebrow="Work"
        title="Case studies & projects"
        description="Deep dives into selected product design work, alongside projects I've shipped — problem, process, solution, and outcome. Filter by project type."
        className="mb-10"
      />
      <ProjectGrid projects={caseStudies} />
    </Section>
  );
}
