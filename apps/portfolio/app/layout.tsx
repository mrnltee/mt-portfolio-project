import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/motion/page-transition";
// Stage 2B: @mt/tokens layered runtime CSS variables (--mt-*). Additive — nothing consumes
// them yet, so this does not change any existing visual. Imported before globals.css.
import "@mt/tokens/css";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mernel Tusoy — UI/UX Designer",
  description:
    "Portfolio of Mernel Tusoy, a UI/UX designer focused on research-driven, accessible product design. [REPLACE with your real meta description]",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-brand="a" className={`${sans.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-background-canvas font-sans text-text-primary antialiased">
        {/* Stage 2B: emit BOTH `class` (keeps existing .dark dark mode) and `data-theme`
            (for @mt/tokens). data-brand="a" selects the initial @mt brand. */}
        <ThemeProvider attribute={["class", "data-theme"]} defaultTheme="light" enableSystem={false}>
          <a
            href="#main-content"
            className="focus-ring sr-only rounded-field bg-action-primary px-4 py-2 text-action-on-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
