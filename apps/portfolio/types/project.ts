export interface ProcessBlock {
  heading: string;
  body: string;
  imageLabel: string;
  /** Real screenshot path (in /public), light theme. When set, replaces the placeholder. */
  image?: string;
  /** Optional dark-theme screenshot, shown in dark mode. */
  imageDark?: string;
}

export interface GalleryItem {
  label: string;
  caption: string;
  /** Real screenshot path (in /public), light theme. When set, replaces the placeholder. */
  image?: string;
  /** Optional dark-theme screenshot, shown in dark mode. */
  imageDark?: string;
}

export interface OutcomeMetric {
  label: string;
  value: string;
}

/** The single filter axis for the project grid. */
export type Category = "Enterprise SaaS" | "AI Products" | "Design Systems" | "Mobile";

export interface CaseStudy {
  slug: string;
  title: string;
  role: string;
  timeframe: string;
  /** The one axis the grid filters on — distinct from `tools`. */
  category: Category;
  /** Tools used — shown as card metadata, never a filter chip. */
  tools: string[];
  summary: string;
  coverLabel: string;
  /** Real cover screenshot path (in /public), light theme. When set, replaces the placeholder. */
  cover?: string;
  /** Optional dark-theme cover screenshot, shown in dark mode. */
  coverDark?: string;
  tone: 0 | 1 | 2 | 3;
  featured: boolean;
  problem: string[];
  process: ProcessBlock[];
  solution: { body: string; gallery: GalleryItem[] };
  outcome: { summary: string; metrics: OutcomeMetric[] };
}
