import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { ProjectGrid } from "@/components/sections/project-grid";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardBody } from "@/components/ui/card";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { caseStudies } from "@/lib/projects-data";

const QUICK_NAV = [
  {
    href: "/case-studies",
    title: "Case Studies",
    description: "Full project write-ups — problem, process, solution, and outcome.",
  },
  {
    href: "/design-system",
    title: "Design System",
    description: "The live token and component system this site is built on.",
  },
  {
    href: "/contact",
    title: "Contact",
    description: "Get in touch about roles, collaborations, or feedback.",
  },
];

export default function Home() {
  const featured = caseStudies.filter((p) => p.featured);

  return (
    <>
      <Hero />

      <Section aria-labelledby="selected-work-heading">
        <RevealOnScroll>
          <SectionHeading
            id="selected-work-heading"
            eyebrow="Selected work"
            title="Featured projects"
            description="Selected product design work — the research that shaped it, the systems behind it, and what shipped."
            className="mb-10"
          />
        </RevealOnScroll>
        <ProjectGrid projects={featured} />
      </Section>

      <Section className="border-t border-border-default bg-background-surface-subtle/40">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {QUICK_NAV.map((item, i) => (
            <RevealOnScroll key={item.href} delay={i * 0.08}>
              <Link href={item.href} className="focus-ring group block h-full rounded-card">
                <Card className="h-full group-hover:shadow-overlay group-hover:border-border-strong">
                  <CardBody>
                    <h3 className="font-display text-h4 font-semibold text-text-primary">{item.title}</h3>
                    <p className="mt-2 text-body-sm text-text-secondary">{item.description}</p>
                    <span className="mt-4 inline-block text-body-sm font-medium text-action-primary">Explore →</span>
                  </CardBody>
                </Card>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </Section>
    </>
  );
}
