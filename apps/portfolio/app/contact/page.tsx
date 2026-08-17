import type { Metadata } from "next";
import type { ComponentType } from "react";
import { Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { Section } from "@/components/layout/section";
import { Card, CardBody } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact — Mernel Tusoy",
  description: "Get in touch about roles, collaborations, or feedback.",
};

const CONTACT_LINKS: {
  label: string;
  value: string;
  href: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  cta: string;
}[] = [
  {
    label: "Email",
    value: "mbtusoy@gmail.com",
    href: "mailto:mbtusoy@gmail.com",
    description: "Best for role inquiries and project details.",
    icon: Mail,
    cta: "Send an email",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/merneltusoy",
    href: "https://www.linkedin.com/in/merneltusoy",
    description: "Connect or see full work history.",
    icon: LinkedInIcon,
    cta: "View profile",
  },
];

export default function ContactPage() {
  return (
    <Section className="pt-16 sm:pt-20">
      <h1 className="font-display text-h1 font-bold text-text-primary">Contact</h1>
      <p className="mt-4 max-w-xl text-body-lg text-text-secondary">
        Open to full-time and contract product design roles. Reach out and I usually reply within a couple of
        days.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:max-w-2xl sm:grid-cols-2">
        {CONTACT_LINKS.map((link) => (
          <Card key={link.label} className="h-full">
            <CardBody className="flex h-full flex-col">
              <div className="flex items-center gap-2.5">
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-field bg-action-accent-subtle text-action-primary"
                  aria-hidden="true"
                >
                  <link.icon className="h-[18px] w-[18px]" />
                </span>
                <p className="text-overline text-action-primary">{link.label}</p>
              </div>
              <p className="mt-3 break-all text-body font-medium text-text-primary">{link.value}</p>
              <p className="mt-1.5 text-body-sm text-text-secondary">{link.description}</p>
              <ButtonLink
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                variant="secondary"
                size="sm"
                className="mt-4 self-start"
              >
                {link.cta}
              </ButtonLink>
            </CardBody>
          </Card>
        ))}
      </div>
    </Section>
  );
}
