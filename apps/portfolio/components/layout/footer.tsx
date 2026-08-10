import Link from "next/link";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-t border-border-default">
      <Container className="flex flex-col gap-4 py-10 text-body-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Mernel Tusoy. Designed & built by me.</p>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {/* [REPLACE] point at real profiles */}
          <a href="mailto:mbtusoy@gmail.com" className="focus-ring rounded-field hover:text-text-primary">
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/REPLACE"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring rounded-field hover:text-text-primary"
          >
            LinkedIn
          </a>
          <Link href="/how-this-was-built" className="focus-ring rounded-field text-text-secondary hover:text-text-primary">
            Built with AI — see how
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
