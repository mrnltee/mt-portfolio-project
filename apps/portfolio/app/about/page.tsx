import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardBody } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { CareerTimeline } from "@/components/sections/career-timeline";

export const metadata: Metadata = {
  title: "About — Mernel Tusoy",
  description:
    "Product designer with ten-plus years across enterprise SaaS, AI document tooling, and cinema booking, designing for the stack engineers actually build in.",
};

// One shared content width so every section aligns (centered, symmetric margins).
const WIDTH = "max-w-4xl";

const WHAT_I_BRING = [
  {
    title: "I hand over decisions, not possibilities.",
    body: "Design ends at a picture. Engineering ends at behavior. Every question I leave open in a file gets answered anyway, by an engineer, alone, with less context than me. So I try to answer them first: empty states, failure states, what happens at zero rows and at five hundred.",
  },
  {
    title: "I've sat in the seat.",
    body: "Before I designed the document validation workflow on an AI document-processing platform, I did that job. Hours of checking whether a model read a document correctly. I know which part of that day is tedious because I lived the tedious part.",
  },
  {
    title: "I design for the stack that exists.",
    body: "My engineers build in React, so my designs are React-shaped. I'm not limiting myself. A design that fights the framework loses, and then nobody gets the good version.",
  },
];

const SELECTED_WORK = [
  {
    title: "AI document processing",
    body: "Almost five years as the only designer on an enterprise platform spanning three portals: research, information architecture, workflow design, the design system, usability testing, and handoff. One example. The platform needed scheduled document runs, and the logic underneath was cron: engineer-shaped, not human-shaped. I studied how existing scheduling tools handled it, found that Apple Calendar had the clearest mental model, and rebuilt that logic into something an operations user could set up without thinking about cron at all.",
  },
  {
    title: "IBM",
    body: "Learning portals for IBM employees. Dense pedagogical requirements turned into navigable interfaces, built in React, Moodle, and WordPress with WCAG applied in the code. I built custom editor blocks so non-technical staff could update pages without a developer, cutting content development time by roughly 30%.",
  },
  {
    title: "Cinema booking",
    body: "Search, showtimes, seat selection, and payment for SM Cinema, Robinsons Movieworld, and Shang Cineplex. Three chains, three sets of business rules, three seat layouts, one experience that had to stay coherent across all of them.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Opening */}
      <Section containerClassName={WIDTH} className="pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Avatar
            src="/mernel-avatar-head.png"
            alt="Mernel Tusoy"
            size={112}
            className="bg-action-accent-subtle ring-1 ring-border-default"
          />
          <h1 className="font-display text-h1 font-bold text-text-primary">About</h1>
        </div>

        <div className="mt-8 space-y-4">
          <p className="text-body-lg text-text-primary">
            I&apos;ve changed direction more than once. Web designer, graphic artist, UI/UX designer, and then
            in 2019 back into development.
          </p>
          <p className="text-body text-text-secondary">
            That last turn is the one that mattered. I&apos;d already been designing for a couple of years, so
            going back to building meant finding out exactly what a design file leaves unanswered. Every state
            and edge case I&apos;d been handing over and quietly hoping someone would resolve. Then I came back
            to design, and I haven&apos;t designed the same way since.
          </p>
          <p className="text-body text-text-secondary">
            Ten-plus years in software, and product design is where all of it finally sits in one place: the
            research, the systems, the interface, and the part where it actually gets built. Alongside the
            full-time roles, I&apos;ve kept a freelance practice running since 2014.
          </p>
          <p className="text-body-sm italic text-text-tertiary">
            Based in the Philippines (GMT+8) · Open to remote work and relocation
          </p>
        </div>
      </Section>

      {/* What I bring */}
      <Section containerClassName={WIDTH} className="border-t border-border-default py-12 sm:py-16">
        <h2 className="font-display text-h2 font-bold text-text-primary">What I bring</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {WHAT_I_BRING.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 0.06}>
              <Card className="h-full">
                <CardBody className="flex h-full flex-col">
                  <h3 className="font-display text-h4 font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-3 text-body-sm text-text-secondary">{item.body}</p>
                </CardBody>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      {/* Working with engineers */}
      <Section containerClassName={WIDTH} className="border-t border-border-default py-12 sm:py-16">
        <h2 className="font-display text-h2 font-bold text-text-primary">Working with engineers</h2>
        <div className="mt-6 space-y-4">
          <p className="text-body text-text-secondary">
            A QA engineer I worked with put it better than I would: I&apos;m reliable to work with because when
            something blocks on their end, I adjust.
          </p>
          <p className="text-body text-text-secondary">
            That&apos;s most of it. I don&apos;t treat a constraint as a betrayal of the design. Sometimes the
            build comes back close to what I drew rather than identical, and if the behavior is right, close is
            fine. I&apos;ve been the person on the other end of that conversation. It changes what you fight for.
          </p>
        </div>
      </Section>

      {/* Selected work */}
      <Section containerClassName={WIDTH} className="border-t border-border-default py-12 sm:py-16">
        <h2 className="font-display text-h2 font-bold text-text-primary">Selected work</h2>
        <div className="mt-8 grid grid-cols-1 gap-6">
          {SELECTED_WORK.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 0.06}>
              <Card>
                <CardBody className="sm:flex sm:gap-8">
                  <h3 className="mb-2 shrink-0 font-display text-h4 font-semibold text-text-primary sm:mb-0 sm:w-52">
                    {item.title}
                  </h3>
                  <p className="text-body text-text-secondary">{item.body}</p>
                </CardBody>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      {/* Where I've worked */}
      <Section containerClassName={WIDTH} className="border-t border-border-default py-12 sm:py-16">
        <h2 className="font-display text-h2 font-bold text-text-primary">Where I&apos;ve worked</h2>
        <p className="mt-3 text-body text-text-secondary">
          A quick tour of the teams I&apos;ve built things with, from early studios to enterprise, with room at
          the end for whatever comes next.
        </p>
        <CareerTimeline />
      </Section>

      {/* What I'm looking for */}
      <Section containerClassName={WIDTH} className="border-t border-border-default py-12 sm:py-16">
        <h2 className="font-display text-h2 font-bold text-text-primary">What I&apos;m looking for</h2>
        <p className="mt-6 text-body text-text-secondary">
          Enterprise or SaaS products with real complexity in them: multiple roles, real rules, workflows that
          people live inside for eight hours. I work best on a team where engineers are in the room early rather
          than at the end.
        </p>
      </Section>

      {/* Personal */}
      <Section containerClassName={WIDTH} className="border-t border-border-default py-12 sm:py-16">
        <h2 className="font-display text-h2 font-bold text-text-primary">Personal</h2>
        <div className="mt-6 space-y-4">
          <p className="text-body text-text-secondary">
            When I hit a badly designed app, I don&apos;t just close it. I work out why it&apos;s behaving that
            way, screenshot it, send it to friends, and sometimes leave a comment for the developers. I can lose
            an entire day to state management, checking whether the right thing triggers and the right thing
            shows.
          </p>
          <p className="text-body text-text-secondary">
            What I&apos;d want a team to remember: that there was a designer here who could code a little, spoke
            the engineers&apos; language, and used it to make their jobs easier.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section containerClassName={WIDTH} className="border-t border-border-default bg-background-surface-subtle/40 py-12 sm:py-16">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-h2 font-bold text-text-primary">Looking for a product designer?</h2>
          <ButtonLink href="/contact" variant="primary" size="lg" className="shrink-0">
            Get in touch
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
