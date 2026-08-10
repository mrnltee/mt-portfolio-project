export interface ProcessBlock {
  heading: string;
  body: string;
  imageLabel: string;
}

export interface GalleryItem {
  label: string;
  caption: string;
}

export interface OutcomeMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  role: string;
  /** Short filter-friendly category, e.g. "Product Design" — distinct from the full `role` job title. */
  roleTag: string;
  timeframe: string;
  tools: string[];
  /** Drives the home page filter — keep to a handful of short tags. */
  projectTypes: string[];
  summary: string;
  coverLabel: string;
  tone: 0 | 1 | 2 | 3;
  featured: boolean;
  problem: string[];
  process: ProcessBlock[];
  solution: { body: string; gallery: GalleryItem[] };
  outcome: { summary: string; metrics: OutcomeMetric[] };
}
