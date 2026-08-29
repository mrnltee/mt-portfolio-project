import type { CaseStudy, Category } from "@/types/project";

/** Canonical filter order. A category only shows as a chip when a project uses it. */
export const CATEGORIES: Category[] = [
  "Enterprise SaaS",
  "AI Products",
  "Design Systems",
  "Mobile",
  "Community & Non-profit",
];

/**
 * Screenshots live in one folder per case study, named after its slug:
 * /public/images/case-studies/<slug>/. Add a new study by adding a const here.
 */
const img = (slug: string) => `/images/case-studies/${slug}`;

const EXTRACTLY = img("extractly-document-ai");
const MAYBAHABA = img("maybahaba-flood-reports");
const HOR = img("house-of-retrievers-ph");

/**
 * LIVE projects — everything exported as `caseStudies` renders on the home grid,
 * the /case-studies filter, and its own /case-studies/[slug] page.
 *
 * COPY RULES (the template constrains length, so respect these):
 * - `summary` renders on a card. Keep it under 25 words.
 * - `problem` is an array — each string is its own paragraph. Aim 3 x ~35 words.
 * - `process[].body`, `solution.body` and `outcome.summary` each render as ONE
 *   paragraph and cannot be broken up. Cap them at ~60 words or the page turns
 *   into a wall. Prefer short sentences; one idea each.
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
      "A document-AI console for high-volume financial paperwork. It shows reviewers how sure the model is, so they verify instead of retype.",
    coverLabel: "Extractly dashboard — document volume, throughput, and status mix",
    cover: `${EXTRACTLY}/dashboard-light.png`,
    coverDark: `${EXTRACTLY}/dashboard.png`,
    tone: 3,
    featured: true,
    problem: [
      "Extractly is a sanitised stand-in for a client engagement. The company and the data are fictional. The design problem is real.",
      "Back-office teams were processing thousands of invoices, receipts, purchase orders, and BIR forms by hand, re-keying every field into another system. It was slow, hard to audit, and one mistyped TIN could cascade into a compliance problem.",
      "The automation already existed. People just didn't trust it. So the real problem was not accuracy but legibility: reviewers had to see how sure the model was before they would sign off.",
    ],
    process: [
      {
        heading: "Mapping the review workflow",
        body: "I shadowed reviewers and watched where they slowed down: second-guessing a value, dropping out to a spreadsheet, re-checking a field the model had already got right. People didn't distrust automation. They distrusted unlabelled automation. So the worklist became the anchor, a queue filtered by status, confidence, and assignee.",
        imageLabel: "Extractly documents worklist with status and confidence filters",
        image: `${EXTRACTLY}/documents-light.png`,
        imageDark: `${EXTRACTLY}/documents.png`,
      },
      {
        heading: "Designing for confidence",
        body: "The review screen puts the document beside its extracted fields, and every field carries a confidence score. Low-confidence fields are flagged and counted, and one control jumps straight to the next one. A full re-read becomes a targeted pass.",
        imageLabel: "Extractly review screen — document beside confidence-scored fields",
        image: `${EXTRACTLY}/review-light.png`,
        imageDark: `${EXTRACTLY}/review.png`,
      },
      {
        heading: "Closing the loop with reviewers",
        body: "Repetitive QA is easy to burn out on, so reviewers get a view of their own accuracy, turnaround, and streaks. It makes the work measurable instead of faceless, and it shows leads where the model still needs help.",
        imageLabel: "Extractly My Performance — accuracy and turnaround over time",
        image: `${EXTRACTLY}/performance-light.png`,
        imageDark: `${EXTRACTLY}/performance.png`,
      },
    ],
    solution: {
      body: "One idea runs through the console: surface the model's confidence, then send human attention where it is needed. Documents move from upload to extraction to review, triage decides what a person sees first, and a shared dashboard keeps volume and throughput visible to the team.",
      gallery: [
        {
          label: "Extractly dashboard",
          caption: "The control room: volume over time, status breakdown, and document mix, with drill-downs into any status.",
          image: `${EXTRACTLY}/dashboard-light.png`,
          imageDark: `${EXTRACTLY}/dashboard.png`,
        },
        {
          label: "Extractly sign-in",
          caption: "A calm first impression. The console leads with clarity from the login screen in.",
          image: `${EXTRACTLY}/login-light.png`,
          imageDark: `${EXTRACTLY}/login.png`,
        },
      ],
    },
    outcome: {
      summary:
        "Extractly turns data entry into review. People validate instead of retype, and leads get a live picture of quality. The figures below are design targets in this sanitised version, not client results.",
      metrics: [
        { label: "financial document types", value: "6" },
        { label: "confidence-based review tiers", value: "3" },
        { label: "field-accuracy target", value: "98%+" },
      ],
    },
  },
  {
    slug: "maybahaba-flood-reports",
    title: "MayBahaBa — Flood Reports",
    role: "Product Designer (solo project)",
    timeframe: "2026",
    category: "Mobile",
    tools: ["Figma", "Next.js", "Supabase"],
    summary:
      "A free flood-condition app for Metro Manila motorists, built on one rule: never tell someone a road is clear when nobody actually knows.",
    coverLabel: "MayBahaBa on a phone — search, the answer card, and the report flow",
    cover: `${MAYBAHABA}/cover-light.png`,
    coverDark: `${MAYBAHABA}/cover.png`,
    tone: 1,
    featured: true,
    problem: [
      "During heavy rain, picking a route means piecing together Facebook posts, group chats, and radio reports. Scattered, unverifiable, often hours old. The real question is narrower than any of them answer: may baha ba sa dadaanan ko?",
      "The trap in a crowdsourced map is its emptiest state. With nothing reported, the interface is one careless sentence away from implying the road is clear. That is the difference between a useful tool and one that puts someone in chest-deep water at 2am on Katipunan.",
      "Two constraints shaped the rest. It had to cost nothing to run, which ruled out paid maps and geocoding. And it had to work without accounts, because a sign-up wall would kill the only data source the app has.",
    ],
    process: [
      {
        heading: "Making one question answerable",
        body: "The app gets used one-handed, before pulling out of a parking space. So the home screen is a single input with two shortcuts, use my location or drop a pin, and everything past it collapses into one answer card. Depth is named the way people say it out loud: gutter deep, bukong-bukong, tuhod, baywang, hindi madaanan.",
        imageLabel: "MayBahaBa search screen and the resulting flood condition card",
        image: `${MAYBAHABA}/search-to-answer-light.png`,
        imageDark: `${MAYBAHABA}/search-to-answer.png`,
      },
      {
        heading: "Designing the state nobody screenshots",
        body: "The empty state got more attention than any other screen. It never says a road is passable. It says no one has reported here, then says plainly that this does not mean there is no flood. Reports also age out, stale at three hours and expired at six, so an old sighting stops answering a question about right now.",
        imageLabel: "The two empty states — no recent report at a point, and across a whole city",
        image: `${MAYBAHABA}/honesty-light.png`,
        imageDark: `${MAYBAHABA}/honesty.png`,
      },
      {
        heading: "Two questions, not one vote",
        body: "Validation is split in two, because it answers two things. May baha pa ba? keeps a report current. Tama ba ito? judges whether it was right at all. A report can be accurate and no longer true. Confirmations refresh it, disputes lower confidence and send it to a human queue, and anonymous tapping never clears a warning by itself.",
        imageLabel: "The answer card and a detail of its two validation controls",
        image: `${MAYBAHABA}/validation-light.png`,
        imageDark: `${MAYBAHABA}/validation.png`,
      },
    ],
    solution: {
      body:
        "Search a street, barangay, or city, or drop a pin, and the app returns the nearest recent report: depth, how long ago, how much agreement behind it. Then it hands off to Waze, Google Maps, or OpenStreetMap instead of pretending to navigate. Reporting is the same flow in reverse, no account required.",
      gallery: [
        {
          label: "The flood depth selector",
          caption:
            "Reporting depth without a ruler: a slider bound to Filipino depth terms, a waterline rising against real vehicles, and the MMDA passability band that follows.",
          image: `${MAYBAHABA}/depth-picker-light.png`,
          imageDark: `${MAYBAHABA}/depth-picker.png`,
        },
        {
          label: "Area summary and the report flow",
          caption: "A whole city returns a ranked summary instead of a wall of pins, and reporting stays on one screen.",
          image: `${MAYBAHABA}/area-summary-light.png`,
          imageDark: `${MAYBAHABA}/area-summary.png`,
        },
      ],
    },
    outcome: {
      summary:
        "MayBahaBa is a working MVP, so the result is the rules it locks in. Absence of data is never shown as safety. Currency and accuracy are judged separately. And every service behind it was picked so the app can keep running for free.",
      metrics: [
        { label: "Filipino depth levels, gutter deep to hindi madaanan", value: "8" },
        { label: "before a report stops counting as current", value: "3 hrs" },
        { label: "running cost, by constraint", value: "₱0" },
      ],
    },
  },
  {
    slug: "house-of-retrievers-ph",
    title: "House of Retrievers PH",
    role: "Designer & Developer",
    timeframe: "2026",
    category: "Community & Non-profit",
    tools: ["Next.js"],
    summary:
      "The public home of a Filipino furparent non-profit, built so a breed-named community reads as open to every dog.",
    coverLabel: "House of Retrievers PH hero — \"Good dogs. Good people. Greater Good.\"",
    cover: `${HOR}/hero.jpg`,
    tone: 2,
    featured: true,
    problem: [
      "House of Retrievers PH turns a furparent community into service: volunteer outreach, practical care learning, and gatherings whose proceeds go to a named beneficiary. The site is its front door.",
      "The hardest thing on the page is the name. It says where the pack came from, and dropping it would throw away what made the community cohere. But the door is open well past goldens, and a breed in the wordmark is the fastest way to make a rescue owner feel uninvited.",
      "The second problem is the ask. Most non-profit sites are built around a donate button. This community's currency is turnout, someone bringing their dog and their Saturday. That is a harder yes than money.",
    ],
    process: [
      {
        heading: "Letting the headline do the work",
        body: "Every section headline is a turn: a plain line in black, then the clause that changes it in gold italic. Good dogs. Good people. Greater Good. More than a breed. A way to give back. The pattern is the argument. It walks a visitor from breed to cause four times before the footer.",
        imageLabel: "Hero — the headline pattern, the shared promise card, and \"Join the pack\"",
        image: `${HOR}/hero.jpg`,
      },
      {
        heading: "Answering \"is this for me?\"",
        body: "\"More than a breed\" sits first after the hero, because that is the question a non-retriever owner is already holding. The three pillars under it, outreach, better care, and gatherings that give back, are none of them breed-gated. The logo helps too: two dogs, one golden, one black.",
        imageLabel: "\"More than a breed. A way to give back.\" with the three purpose pillars",
        image: `${HOR}/purpose-pillars.jpg`,
      },
      {
        heading: "Keeping a volunteer-run site alive",
        body: "A small non-profit cannot hand-update a website between engagements, and a stale site reads as a dead one. So the proof of life is the community's own Instagram, embedded and dated. It costs nobody an update, and the homepage is never older than the last thing the pack did.",
        imageLabel: "\"Life with the retrievers\" — the live Instagram feed with post dates",
        image: `${HOR}/from-the-pack.jpg`,
      },
    ],
    solution: {
      body:
        "The asks form a ladder. Become a member is the low step. Volunteer together is the real one, phrased as bringing your time, your skills, or just a friendly dog, so presence alone still counts. Partner for a cause carries the trust, promising a named beneficiary. There is no donate button anywhere. The ask is to join.",
      gallery: [
        {
          label: "Three ways in",
          caption: "Member, volunteer, partner — three sizes of yes, so nobody who wants to help leaves empty-handed.",
          image: `${HOR}/ways-to-join.jpg`,
        },
        {
          label: "The closing invitation",
          caption: "The last frame, in one line: \"There is always room for one more good human.\" Not one more retriever.",
          image: `${HOR}/closing-invite.jpg`,
        },
      ],
    },
    outcome: {
      summary:
        "Over a thousand furparents already follow the pack, so the site's job is turning followers into turnout, not being found. It asks for time instead of money, names a beneficiary for every gathering, and treats the breed in its name as history, not a rule.",
      metrics: [
        { label: "furparents following the pack on social", value: "1,000+" },
        { label: "ways in — member, volunteer, or partner", value: "3" },
        { label: "donate buttons, by design", value: "0" },
      ],
    },
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}
