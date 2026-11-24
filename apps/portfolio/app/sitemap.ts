import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/projects-data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const PAGES = ["", "/case-studies", "/about", "/contact", "/design-system", "/how-this-was-built"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...caseStudies.map((p) => ({ url: `${SITE_URL}/case-studies/${p.slug}` })),
  ];
}
