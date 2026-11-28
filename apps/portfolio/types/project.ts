export interface ProcessBlock {
  heading: string;
  body: string;
  imageLabel: string;
  aspect?: "video" | "square" | "portrait" | "wide";
  /** Real screenshot path (in /public), light theme. When set, replaces the placeholder. */
  image?: string;
  /** Optional dark-theme screenshot, shown in dark mode. */
  imageDark?: string;
}

export interface GalleryItem {
  label: string;
  caption: string;
  aspect?: "video" | "square" | "portrait" | "wide";
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
export type Category =
  | "Enterprise SaaS"
  | "AI Products"
  | "Design Systems"
  | "Mobile"
  | "Community & Non-profit";

/** Decorative panel tint behind a project's screenshots (maps to background.tint-* tokens). */
export type Tint = "green" | "blue" | "violet" | "neutral";

/** One screenshot in a home-page work band. */
export interface BandImage {
  src: string;
  srcDark?: string;
  /** Alt text — what is in the frame. */
  label: string;
  /** Short visible tag under a phone, e.g. "Before". */
  tag?: string;
}

/** How a featured project is presented on the home page. */
export interface WorkBand {
  /** phones = one or more phone screens side by side; browser = desktop screenshot in a window; image = an image that is already composed. */
  media: "phones" | "browser" | "image";
  images: BandImage[];
  /** One fact a reader can evaluate — use only figures the case study itself states. */
  highlight: { label: string; value: string };
}

/** One platform's prototype inside the interactive-prototype embed. */
export interface PrototypePlatform {
  platform: "ios" | "android";
  embedUrl: string;
  /** Full-screen prototype link for this platform. */
  url?: string;
  poster?: string;
  posterDark?: string;
}

/** A named flow (story) inside a Figma prototype, with its start link per platform. */
export interface PrototypeFlow {
  label: string;
  links: Partial<Record<PrototypePlatform["platform"], { url: string; embedUrl: string }>>;
}

export interface CaseStudy {
  slug: string;
  title: string;
  role: string;
  timeframe: string;
  /** The one axis the grid filters on — distinct from `tools`. */
  category: Category;
  /** Tools used — shown as card metadata, never a filter chip. */
  tools: string[];
  /** Supported product surfaces, shown on the case-study detail page. */
  platforms?: string[];
  summary: string;
  coverLabel: string;
  /** Optional live project URL shown in the case-study footer. */
  websiteUrl?: string;
  /** Optional Figma file / prototype URL shown in the case-study footer. */
  prototypeUrl?: string;
  /** Optional Figma prototype embed URL (embed.figma.com/proto/…). Renders a click-to-load phone frame after the solution. */
  prototypeEmbedUrl?: string;
  /** Optional Android version of the prototype. When set, an iOS / Android switch appears above the embed. */
  prototypeAndroid?: { url: string; embedUrl: string; poster?: string; posterDark?: string };
  /** Optional named flows in the prototype. When set, a flow picker appears above the embed; each flow gives its start link per platform. */
  prototypeFlows?: PrototypeFlow[];
  coverAspect?: "video" | "square" | "portrait" | "wide";
  /** Real cover screenshot path (in /public), light theme. When set, replaces the placeholder. */
  cover?: string;
  /** Optional dark-theme cover screenshot, shown in dark mode. */
  coverDark?: string;
  tone: 0 | 1 | 2 | 3;
  /** Featured projects get a work band on the home page (keep it to three). */
  featured: boolean;
  /** Media-panel tint for this project's figures. */
  tint?: Tint;
  /** Home-page work band; required when `featured` is true. */
  band?: WorkBand;
  /** "What I did" — first-person bullets of the work the owner did. Omit rather than guess. */
  contribution?: string[];
  problem: string[];
  process: ProcessBlock[];
  /** `gallery` is optional — omit it for a study with no final-design shots. */
  solution: { body: string; gallery?: GalleryItem[] };
  /** `metrics` is optional — omit rather than inventing numbers you can't stand behind. */
  outcome: { summary: string; metrics?: OutcomeMetric[] };
}
