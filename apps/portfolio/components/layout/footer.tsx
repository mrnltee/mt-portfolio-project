import Link from "next/link";
import { Mail, Sparkles } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/icons";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-t border-border-default">
      <Container className="flex flex-col gap-4 py-10 text-body-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Mernel Tusoy</p>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href="mailto:mbtusoy@gmail.com"
            className="focus-ring inline-flex items-center gap-1.5 rounded-field hover:text-text-primary"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/merneltusoy"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-1.5 rounded-field hover:text-text-primary"
          >
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn
          </a>
          <Link
            href="/how-this-was-built"
            className="focus-ring inline-flex items-center gap-1.5 rounded-field hover:text-text-primary"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            How this was built
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
