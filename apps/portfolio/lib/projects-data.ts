import type { CaseStudy, Category } from "@/types/project";

/** Canonical filter order. A category only shows as a chip when a project uses it. */
export const CATEGORIES: Category[] = ["Enterprise SaaS", "AI Products", "Design Systems", "Mobile"];

const IMG = "/images/case-studies/extractly";

/**
 * LIVE projects — everything exported as `caseStudies` renders on the home grid,
 * the /case-studies filter, and its own /case-studies/[slug] page.
 *
 * Real case studies are added here one at a time. The scaffold's three fictional
 * placeholder studies were removed once Extractly went live; recover them from git
 * history if a template reference is ever needed.
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
      "A document-AI console that turns high-volume financial paperwork into validated, structured data, built around confidence-based triage and fast human review.",
    coverLabel: "Extractly dashboard — document volume, throughput, and status mix",
    cover: `${IMG}/dashboard-light.png`,
    coverDark: `${IMG}/dashboard.png`,
    tone: 3,
    featured: true,
    problem: [
      "Extractly is a sanitized, NDA-safe reconstruction of a client engagement. Company names, real data, and proprietary flows have been replaced with a fictional stand-in that preserves the design problem and the decisions behind it.",
      "Back-office teams were processing thousands of financial and tax documents a month almost entirely by hand: reading scanned invoices, receipts, purchase orders, and BIR forms, then re-keying every field into downstream systems. It was slow and hard to audit, and one mistyped TIN or amount could cascade into reconciliation and compliance problems.",
      "The automation already existed. People just didn't trust it. So the real design problem was legibility. The review experience had to make the model's certainty visible, so reviewers knew exactly what to check and could sign off against a tight turnaround SLA.",
    ],
    process: [
      {
        heading: "Mapping the review workflow",
        body: "I shadowed document-ops reviewers and mapped where they actually slowed down: second-guessing a value, dropping out to a spreadsheet, re-checking a field the model had already gotten right. The recurring insight was small but load-bearing. People didn't distrust automation, they distrusted unlabeled automation. So the worklist became the anchor: a filterable queue with status, confidence, and assignee, so work could be triaged before anyone opened a single document.",
        imageLabel: "Extractly documents worklist with status and confidence filters",
        image: `${IMG}/documents-light.png`,
        imageDark: `${IMG}/documents.png`,
      },
      {
        heading: "Designing for confidence",
        body: "The heart of the product is the review screen. The source document and its extracted fields sit side by side, and every field carries a confidence score. Low-confidence fields are flagged and counted, and a \"jump to next low-confidence field\" control turns a full re-read into a targeted pass. Reviewers verify instead of retype, and the interface never hides how sure the model is.",
        imageLabel: "Extractly review screen — document beside confidence-scored fields",
        image: `${IMG}/review-light.png`,
        imageDark: `${IMG}/review.png`,
      },
      {
        heading: "Closing the loop with reviewers",
        body: "Repetitive QA work is easy to burn out on, so I gave reviewers a view of their own accuracy, turnaround, and streaks. It reframes the task as something they can measure and improve rather than a faceless queue, and it doubles as an honest signal for leads on where the model, or the guidance around it, still needs work.",
        imageLabel: "Extractly My Performance — accuracy and turnaround over time",
        image: `${IMG}/performance-light.png`,
        imageDark: `${IMG}/performance.png`,
      },
    ],
    solution: {
      body: "The result is a review console built around one idea: surface the model's confidence, then route human attention exactly where it's needed. Documents flow from upload through extraction to review, confidence triage decides what a person sees first, and a shared dashboard keeps the whole operation (volume, throughput, and document mix) visible to the team.",
      gallery: [
        {
          label: "Extractly dashboard",
          caption:
            "The team's control room: volume over time, status breakdown, and document mix, with drill-downs into any status.",
          image: `${IMG}/dashboard-light.png`,
          imageDark: `${IMG}/dashboard.png`,
        },
        {
          label: "Extractly sign-in",
          caption: "A calm, credible first impression. The console leads with clarity from the login screen in.",
          image: `${IMG}/login-light.png`,
          imageDark: `${IMG}/login.png`,
        },
      ],
    },
    outcome: {
      summary:
        "Extractly reframes document processing from manual data entry into confidence-based review: reviewers validate rather than retype, and leads get a live picture of throughput and quality. (Figures below are the product's design targets in this sanitized version, not client results under NDA.)",
      metrics: [
        { label: "financial document types", value: "6" },
        { label: "confidence-based review tiers", value: "3" },
        { label: "field-accuracy target", value: "98%+" },
      ],
    },
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}
