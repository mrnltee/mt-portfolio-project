import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Card, CardBody } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact — Mernel Tusoy",
  description: "Get in touch about roles, collaborations, or feedback.",
};

// [REPLACE] with your real contact details.
const CONTACT_LINKS = [
  {
    label: "Email",
    value: "mbtusoy@gmail.com",
    href: "mailto:mbtusoy@gmail.com",
    description: "Best for role inquiries and project details.",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/REPLACE",
    href: "https://www.linkedin.com/in/REPLACE",
    description: "Connect or see full work history.",
  },
];

export default function ContactPage() {
  return (
    <Section className="pt-16 sm:pt-20">
      <h1 className="font-display text-h1 font-bold text-text-primary">Contact</h1>
      <p className="mt-4 max-w-xl text-body-lg text-text-secondary">
        {/* [REPLACE] Replace with your own note — availability, what kind of roles you're looking for, timezone, etc. */}
        Open to full-time and contract product design roles. Reach out — I usually reply within a couple of
        days.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:max-w-2xl">
        {CONTACT_LINKS.map((link) => (
          <Card key={link.label}>
            <CardBody>
              <p className="text-overline text-action-primary">{link.label}</p>
              <p className="mt-2 break-words font-display text-h4 font-semibold text-text-primary">{link.value}</p>
              <p className="mt-2 text-body-sm text-text-secondary">{link.description}</p>
              <ButtonLink
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                variant="secondary"
                size="sm"
                className="mt-4"
              >
                {link.label === "Email" ? "Send an email" : "View profile"}
              </ButtonLink>
            </CardBody>
          </Card>
        ))}
      </div>
    </Section>
  );
}
