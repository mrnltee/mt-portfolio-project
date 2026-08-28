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
    cover: `${EXTRACTLY}/dashboard-light.png`,
    coverDark: `${EXTRACTLY}/dashboard.png`,
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
        image: `${EXTRACTLY}/documents-light.png`,
        imageDark: `${EXTRACTLY}/documents.png`,
      },
      {
        heading: "Designing for confidence",
        body: "The heart of the product is the review screen. The source document and its extracted fields sit side by side, and every field carries a confidence score. Low-confidence fields are flagged and counted, and a \"jump to next low-confidence field\" control turns a full re-read into a targeted pass. Reviewers verify instead of retype, and the interface never hides how sure the model is.",
        imageLabel: "Extractly review screen — document beside confidence-scored fields",
        image: `${EXTRACTLY}/review-light.png`,
        imageDark: `${EXTRACTLY}/review.png`,
      },
      {
        heading: "Closing the loop with reviewers",
        body: "Repetitive QA work is easy to burn out on, so I gave reviewers a view of their own accuracy, turnaround, and streaks. It reframes the task as something they can measure and improve rather than a faceless queue, and it doubles as an honest signal for leads on where the model, or the guidance around it, still needs work.",
        imageLabel: "Extractly My Performance — accuracy and turnaround over time",
        image: `${EXTRACTLY}/performance-light.png`,
        imageDark: `${EXTRACTLY}/performance.png`,
      },
    ],
    solution: {
      body: "The result is a review console built around one idea: surface the model's confidence, then route human attention exactly where it's needed. Documents flow from upload through extraction to review, confidence triage decides what a person sees first, and a shared dashboard keeps the whole operation (volume, throughput, and document mix) visible to the team.",
      gallery: [
        {
          label: "Extractly dashboard",
          caption:
            "The team's control room: volume over time, status breakdown, and document mix, with drill-downs into any status.",
          image: `${EXTRACTLY}/dashboard-light.png`,
          imageDark: `${EXTRACTLY}/dashboard.png`,
        },
        {
          label: "Extractly sign-in",
          caption: "A calm, credible first impression. The console leads with clarity from the login screen in.",
          image: `${EXTRACTLY}/login-light.png`,
          imageDark: `${EXTRACTLY}/login.png`,
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
  {
    slug: "maybahaba-flood-reports",
    title: "MayBahaBa — Flood Reports",
    role: "Product Designer (solo project)",
    timeframe: "2026",
    category: "Mobile",
    tools: ["Figma", "Next.js", "Supabase"],
    summary:
      "A free, mobile-first flood-condition app for Metro Manila motorists, designed around one rule: never tell someone a road is clear when nobody actually knows.",
    coverLabel: "MayBahaBa on a phone — search, the answer card, and the report flow",
    cover: `${MAYBAHABA}/cover-light.png`,
    coverDark: `${MAYBAHABA}/cover.png`,
    tone: 1,
    featured: true,
    problem: [
      "In Metro Manila, deciding whether to take a route during heavy rain means piecing together Facebook posts, group chats, and radio traffic reports — scattered, unverifiable, and often hours old. The question a motorist is actually asking is much narrower than any of those answer: may baha ba sa dadaanan ko?",
      "The trap in a crowdsourced map is its emptiest state. When no one has reported anything, the interface is one careless sentence away from implying the road is clear. That is not a polish problem — it is the difference between a useful tool and one that puts someone in chest-deep water at 2am on Katipunan.",
      "Two constraints shaped everything else. It had to cost nothing to run, which ruled out paid geocoding and map tiles. And it had to work without accounts, because asking a driver to sign up before reporting would remove the only data source the product has.",
    ],
    process: [
      {
        heading: "Making one question answerable",
        body: "The whole product had to fit the moment it is used in: one hand, one thumb, before pulling out of a parking space. So the home screen is a single input with two shortcuts — use my location, or pin on a map — and everything past it collapses into one answer card. Depth is named the way people name it out loud, gutter deep through bukong-bukong, tuhod, baywang, and hindi madaanan, rather than in centimetres nobody can picture through a windscreen.",
        imageLabel: "MayBahaBa search screen and the resulting flood condition card",
        image: `${MAYBAHABA}/search-to-answer-light.png`,
        imageDark: `${MAYBAHABA}/search-to-answer.png`,
      },
      {
        heading: "Designing the state nobody screenshots",
        body: "The empty state got more attention than any other screen. It never says a road is passable; it says no one has reported here, and then says plainly that this does not mean there is no flood. The same refusal repeats at area level when a whole city comes back with nothing. Reports also age out — stale after three hours, expired after six — so an old sighting quietly stops counting as an answer to a question about right now.",
        imageLabel: "The two empty states — no recent report at a point, and across a whole city",
        image: `${MAYBAHABA}/honesty-light.png`,
        imageDark: `${MAYBAHABA}/honesty.png`,
      },
      {
        heading: "Two questions, not one vote",
        body: "Community validation is split into two controls because it answers two different things: may baha pa ba? keeps a report current, and tama ba ito? judges whether it was right in the first place. A report can be perfectly accurate and no longer true. Confirmations refresh a report instead of forcing someone to file a duplicate, disputes lower confidence and route the report to a human queue, and no amount of anonymous tapping can clear a flood warning on its own. Confidence itself is shown as a tier with a report count, never a raw score.",
        imageLabel: "The answer card and a detail of its two validation controls",
        image: `${MAYBAHABA}/validation-light.png`,
        imageDark: `${MAYBAHABA}/validation.png`,
      },
    ],
    solution: {
      body:
        "MayBahaBa answers one question and then gets out of the way. Search a street, barangay, or city — or drop a pin — and the app returns the most recent nearby report with its depth, how long ago it was seen, and how much agreement sits behind it, then hands off to Waze, Google Maps, or OpenStreetMap rather than pretending to be a navigation app. Reporting runs the same logic in reverse: pick a place, pick a depth, submit, no account required.",
      gallery: [
        {
          label: "The flood depth selector with its waterline scene",
          caption:
            "Reporting depth without a ruler: a slider bound to Filipino depth terms, a waterline that rises against real vehicles and a pedestrian, and the MMDA passability band that follows from whatever you pick.",
          image: `${MAYBAHABA}/depth-picker-light.png`,
          imageDark: `${MAYBAHABA}/depth-picker.png`,
        },
        {
          label: "Area summary and the report flow",
          caption:
            "Searching a whole city returns a ranked summary rather than a wall of pins, and the report flow stays on one screen.",
          image: `${MAYBAHABA}/area-summary-light.png`,
          imageDark: `${MAYBAHABA}/area-summary.png`,
        },
      ],
    },
    outcome: {
      summary:
        "MayBahaBa is a working MVP rather than a product with an audience, so the honest result is the set of decisions it locks in: absence of data is never presented as safety, currency and accuracy are judged separately, and every service behind it was chosen so the app can keep running at no cost. The figures below are the product's design constraints, not usage numbers.",
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
      "The public home of a Philippine furparent non-profit, built to do one persuasive job: turn a breed-named community into an open invitation, and turn affection for our own dogs into showing up for people and animals who need it.",
    coverLabel: "House of Retrievers PH hero — \"Good dogs. Good people. Greater Good.\"",
    cover: `${HOR}/hero.jpg`,
    tone: 2,
    featured: true,
    problem: [
      "House of Retrievers PH is a non-profit that grew out of a furparent community. It gathers pet families around responsible ownership and turns that gathering instinct into service: volunteer-led outreach, practical care learning, and pack activities whose proceeds go to a clearly named beneficiary. The site is the organisation's front door, and the whole job is to convince a stranger, in one scroll, that this is a genuine cause and not just a very charming dog club.",
      "The hardest thing on the page is the name. \"House of Retrievers\" is honest about where the community came from, and dropping it would throw away the thing that made it cohere. But the door is open well past goldens, and a breed in the wordmark is the quickest way to make someone with a mixed-breed or a rescue assume they are not invited. The site has to carry the origin story and the open invitation in the same breath, without either reading as an apology for the other.",
      "The second problem is what to ask for. Most non-profit sites are built around a donate button, but this community's real currency is turnout — someone bringing their dog and their Saturday to an outreach. Attendance is a harder yes than money: it costs more, it needs a date and a place, and it only happens if a person can already picture themselves standing there.",
    ],
    process: [
      {
        heading: "Letting the headline do the reframing",
        body: "Rather than soften the branding, every section headline is built as a turn: a plain statement in black, then the clause that changes its meaning in gold italic. \"Good dogs. Good people. Greater Good.\" \"More than a breed. A way to give back.\" \"Every good story starts with a pack.\" The pattern is the argument — it keeps naming the dogs, then keeps landing on the purpose, so a visitor is walked from breed to cause four times before they reach the footer instead of being told once in an About paragraph.",
        imageLabel: "Hero — the headline pattern, the shared promise card, and \"Join the pack\"",
        image: `${HOR}/hero.jpg`,
      },
      {
        heading: "Answering \"is this for me?\" before it is asked",
        body: "\"More than a breed\" is placed as the first thing after the hero, because that is the question a non-retriever owner is already holding. Under it, the three pillars set out what the community actually does — showing up for communities that need support, raising healthier and better-socialised dogs together, and designing gatherings that give back — and none of them are breed-gated. The logo does quiet work here too: two dogs, one golden and one black, so the mark itself is already wider than the word next to it.",
        imageLabel: "\"More than a breed. A way to give back.\" with the three purpose pillars",
        image: `${HOR}/purpose-pillars.jpg`,
      },
      {
        heading: "Keeping a volunteer-run site alive",
        body: "A small non-profit cannot hand-maintain a website between engagements, and a stale site reads as a dead organisation. So the proof-of-life section is the community's own Instagram, pulled in and paged through on the homepage — real posts with real dates, from event announcements to International Dog Day. It costs nobody an update, and it means the page a first-time visitor lands on is never older than the last thing the pack actually did.",
        imageLabel: "\"Life with the retrievers\" — the live Instagram feed with post dates",
        image: `${HOR}/from-the-pack.jpg`,
      },
    ],
    solution: {
      body:
        "The site resolves into a ladder of asks rather than one expensive one. Become a member is the low step — meet other families, trade practical care knowledge. Volunteer together is the real ask, and it is deliberately phrased as bringing your time, your skills, or just a friendly dog, so that having nothing to give but presence still counts. Partner for a cause is the high step, and it is the one carrying the trust burden: it promises a transparent, beneficiary-led activity, matching the pillar that commits proceeds to a clearly named beneficiary. There is no donate button anywhere on the page. The primary call to action, from the header through to the closing frame, is to join.",
      gallery: [
        {
          label: "Three ways in",
          caption:
            "Member, volunteer, partner — three sizes of yes on a dark break in the page, so nobody who wants to help has to leave without something they can actually do.",
          image: `${HOR}/ways-to-join.jpg`,
        },
        {
          label: "The closing invitation",
          caption:
            "The last frame is the thesis in one line: \"There is always room for one more good human.\" Not one more retriever — one more human.",
          image: `${HOR}/closing-invite.jpg`,
        },
      ],
    },
    outcome: {
      summary:
        "The pack it speaks for is past a thousand furparents across Facebook and Instagram, which makes the site's job less about being found and more about converting an existing audience into people who turn up. So the result worth reporting is the positions it takes: it asks for turnout rather than money, it ties every gathering to a named beneficiary instead of a general appeal, and it treats the breed in its name as history rather than a membership rule — a reframe the headlines, the pillars, and the two-dog wordmark all carry. The open edge is the copy itself. The hero still greets \"retriever families\", which is broader than goldens but not yet as broad as the door actually is, and widening that language is the next pass — worth doing before the next intake of members reads it.",
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
