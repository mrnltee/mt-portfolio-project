import type { CaseStudy, Category } from "@/types/project";

/** Canonical filter order. A category only shows as a chip when a project uses it. */
export const CATEGORIES: Category[] = ["Enterprise SaaS", "AI Products", "Design Systems", "Mobile"];

const IMG = "/images/case-studies/extractly";

/**
 * LIVE projects — everything exported as `caseStudies` renders on the home grid,
 * the /case-studies filter, and its own /case-studies/[slug] page.
 *
 * The three fictional placeholder studies are currently PARKED (see
 * `parkedCaseStudies` below). To bring one back, move its object into this array.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "extractly-document-ai",
    title: "Extractly — Document AI",
    role: "Lead Product Designer",
    timeframe: "2025 – 2026",
    category: "AI Products",
    tools: ["Figma", "FigJam", "Dovetail", "Linear"],
    summary:
      "A document-AI console that turns high-volume financial paperwork into validated, structured data — designed around confidence-based triage and fast human review.",
    coverLabel: "Extractly dashboard — document volume, throughput, and status mix",
    cover: `${IMG}/dashboard-light.png`,
    coverDark: `${IMG}/dashboard.png`,
    tone: 3,
    featured: true,
    problem: [
      "Extractly is a sanitized, NDA-safe reconstruction of a client engagement. Company names, real data, and proprietary flows have been replaced with a fictional stand-in that preserves the design problem and the decisions behind it.",
      "Back-office teams were processing thousands of financial and tax documents a month almost entirely by hand — reading scanned invoices, receipts, purchase orders, and BIR forms, then re-keying every field into downstream systems. It was slow, hard to audit, and unforgiving: a single mistyped TIN or amount could cascade into reconciliation and compliance problems.",
      "The automation already existed — but people didn't trust it. So the real design challenge wasn't extraction accuracy; it was building a review experience that made the model's certainty legible, so reviewers knew exactly what to check and could sign off against a tight turnaround SLA.",
    ],
    process: [
      {
        heading: "Mapping the review workflow",
        body: "I shadowed document-ops reviewers and mapped where they actually slowed down — second-guessing a value, dropping out to a spreadsheet, or re-checking a field the model had already gotten right. The recurring insight: people didn't distrust automation, they distrusted unlabeled automation. The worklist became the anchor — a filterable queue with status, confidence, and assignee, so work could be triaged before anyone opened a single document.",
        imageLabel: "Extractly documents worklist with status and confidence filters",
        image: `${IMG}/documents-light.png`,
        imageDark: `${IMG}/documents.png`,
      },
      {
        heading: "Designing for confidence",
        body: "The heart of the product is the review screen: the source document and its extracted fields sit side by side, and every field carries a confidence score. Low-confidence fields are flagged, counted, and jumpable — “jump to next low-confidence field” turns a full re-read into a targeted pass. Reviewers verify instead of retype, and the interface never hides how sure the model is.",
        imageLabel: "Extractly review screen — document beside confidence-scored fields",
        image: `${IMG}/review-light.png`,
        imageDark: `${IMG}/review.png`,
      },
      {
        heading: "Closing the loop with reviewers",
        body: "Repetitive QA work is easy to burn out on, so I gave reviewers a view of their own accuracy, turnaround, and streaks — reframing the task as something measurable and improvable rather than a faceless queue. It doubles as an honest signal for leads on where the model, or the guidance around it, still needs work.",
        imageLabel: "Extractly My Performance — accuracy and turnaround over time",
        image: `${IMG}/performance-light.png`,
        imageDark: `${IMG}/performance.png`,
      },
    ],
    solution: {
      body: "The result is a review console built around one idea: surface the model's confidence, and route human attention exactly where it's needed. Documents flow from upload through extraction to review; confidence triage decides what a person sees first; and a shared dashboard keeps the whole operation — volume, throughput, and document mix — visible to the team.",
      gallery: [
        {
          label: "Extractly dashboard",
          caption:
            "The team's control room — volume over time, status breakdown, and document mix, with drill-downs into any status.",
          image: `${IMG}/dashboard-light.png`,
          imageDark: `${IMG}/dashboard.png`,
        },
        {
          label: "Extractly sign-in",
          caption: "A calm, credible first impression — the console leads with clarity from the login screen in.",
          image: `${IMG}/login-light.png`,
          imageDark: `${IMG}/login.png`,
        },
      ],
    },
    outcome: {
      summary:
        "Extractly reframes document processing from manual data entry into confidence-based review — reviewers validate rather than retype, and leads get a live picture of throughput and quality. (Figures below are the product's design targets in this sanitized version, not client results under NDA.)",
      metrics: [
        { label: "financial document types", value: "6" },
        { label: "confidence-based review tiers", value: "3" },
        { label: "field-accuracy target", value: "98%+" },
      ],
    },
  },
];

/**
 * [PARKED] Fictional placeholder studies, temporarily hidden from the site.
 * They render nowhere while they live in this array. To reactivate one, move its
 * object into `caseStudies` above (and swap the [REPLACE] copy for real content).
 */
export const parkedCaseStudies: CaseStudy[] = [
  {
    slug: "wildflow-habit-app",
    title: "Wildflow — Habit Tracking App",
    role: "Lead Product Designer",
    timeframe: "Jan 2024 – Apr 2024",
    category: "Mobile",
    tools: ["Figma", "FigJam", "Maze", "Notion"],
    summary: "[REPLACE] One-line summary of the project and your impact, written for a scanning hiring manager.",
    coverLabel: "Wildflow app screens",
    tone: 0,
    featured: true,
    problem: [
      "[REPLACE] Describe the problem or business context in 1-2 paragraphs. What was broken, unclear, or missing before this project started? Who was affected, and how did you find out?",
      "[REPLACE] Name any constraints — timeline, team size, technical limitations, stakeholder expectations — that shaped how you approached the work.",
    ],
    process: [
      {
        heading: "Research",
        body: "[REPLACE] Summarize your research approach — interviews, surveys, competitive analysis, analytics review. Call out 1-2 concrete findings that changed your direction.",
        imageLabel: "Research synthesis / affinity map",
      },
      {
        heading: "Wireframes",
        body: "[REPLACE] Describe how you moved from insights to early structure — sketches, low-fidelity wireframes, information architecture decisions.",
        imageLabel: "Low-fidelity wireframes",
      },
      {
        heading: "Iterations",
        body: "[REPLACE] Show your thinking evolve — what changed between v1 and the final design, and why. Mention any testing that drove a pivot.",
        imageLabel: "Iteration comparison, v1 vs v2",
      },
    ],
    solution: {
      body: "[REPLACE] Describe the final design direction — key screens, interaction patterns, and the design decisions you're proudest of.",
      gallery: [
        { label: "Onboarding flow", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
        { label: "Habit dashboard", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
        { label: "Streak detail view", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
      ],
    },
    outcome: {
      summary: "[REPLACE] Summarize the outcome — shipped result, qualitative feedback, or what you'd do differently with more time.",
      metrics: [
        { label: "[REPLACE metric]", value: "+00%" },
        { label: "[REPLACE metric]", value: "00%" },
        { label: "[REPLACE metric]", value: "0.0★" },
      ],
    },
  },
  {
    slug: "northwind-banking-redesign",
    title: "Northwind — Online Banking Redesign",
    role: "UX Researcher & Designer",
    timeframe: "Jun 2023 – Nov 2023",
    category: "Enterprise SaaS",
    tools: ["Figma", "UserTesting", "Miro", "Jira"],
    summary: "[REPLACE] One-line summary of the project and your impact, written for a scanning hiring manager.",
    coverLabel: "Northwind banking dashboard",
    tone: 1,
    featured: true,
    problem: [
      "[REPLACE] Describe the problem or business context in 1-2 paragraphs. What was broken, unclear, or missing before this project started? Who was affected, and how did you find out?",
      "[REPLACE] Name any constraints — timeline, team size, technical limitations, stakeholder expectations — that shaped how you approached the work.",
    ],
    process: [
      {
        heading: "Research",
        body: "[REPLACE] Summarize your research approach — interviews, surveys, competitive analysis, analytics review. Call out 1-2 concrete findings that changed your direction.",
        imageLabel: "Usability testing highlights",
      },
      {
        heading: "Wireframes",
        body: "[REPLACE] Describe how you moved from insights to early structure — sketches, low-fidelity wireframes, information architecture decisions.",
        imageLabel: "Information architecture map",
      },
      {
        heading: "Iterations",
        body: "[REPLACE] Show your thinking evolve — what changed between v1 and the final design, and why. Mention any testing that drove a pivot.",
        imageLabel: "Iteration comparison, v1 vs v2",
      },
    ],
    solution: {
      body: "[REPLACE] Describe the final design direction — key screens, interaction patterns, and the design decisions you're proudest of.",
      gallery: [
        { label: "Account overview", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
        { label: "Transfer flow", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
        { label: "Statements view", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
      ],
    },
    outcome: {
      summary: "[REPLACE] Summarize the outcome — shipped result, qualitative feedback, or what you'd do differently with more time.",
      metrics: [
        { label: "[REPLACE metric]", value: "-00%" },
        { label: "[REPLACE metric]", value: "+00 pts" },
        { label: "[REPLACE metric]", value: "00%" },
      ],
    },
  },
  {
    slug: "atlas-design-system",
    title: "Atlas — Design System",
    role: "Design Systems Lead",
    timeframe: "Feb 2023 – Present",
    category: "Design Systems",
    tools: ["Figma", "Storybook", "Zeroheight"],
    summary: "[REPLACE] One-line summary of the project and your impact, written for a scanning hiring manager.",
    coverLabel: "Atlas component library",
    tone: 2,
    featured: true,
    problem: [
      "[REPLACE] Describe the problem or business context in 1-2 paragraphs. What was broken, unclear, or missing before this project started? Who was affected, and how did you find out?",
      "[REPLACE] Name any constraints — timeline, team size, technical limitations, stakeholder expectations — that shaped how you approached the work.",
    ],
    process: [
      {
        heading: "Research",
        body: "[REPLACE] Summarize your research approach — component audit, engineering interviews, inconsistency inventory across the product.",
        imageLabel: "Component audit spreadsheet",
      },
      {
        heading: "Wireframes",
        body: "[REPLACE] Describe your token architecture and component API decisions before high-fidelity work began.",
        imageLabel: "Token architecture diagram",
      },
      {
        heading: "Iterations",
        body: "[REPLACE] Show how components evolved through design/engineering pairing and adoption feedback.",
        imageLabel: "Component variant iterations",
      },
    ],
    solution: {
      body: "[REPLACE] Describe the final system — token structure, component coverage, documentation approach.",
      gallery: [
        { label: "Color & type tokens", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
        { label: "Core component set", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
        { label: "Documentation site", caption: "[REPLACE] Caption describing this screen and the decision behind it." },
      ],
    },
    outcome: {
      summary: "[REPLACE] Summarize the outcome — adoption rate, design/dev velocity change, or qualitative feedback from teams using it.",
      metrics: [
        { label: "[REPLACE metric]", value: "00 components" },
        { label: "[REPLACE metric]", value: "00% adoption" },
        { label: "[REPLACE metric]", value: "-00% design debt" },
      ],
    },
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}
