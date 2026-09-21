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
const HOR_APP = img("house-of-retrievers-ph-app");
const AUTOSWEEP = img("autosweep-companion-app");

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
    slug: "autosweep-companion-app",
    title: "Autosweep — Toll App Redesign",
    role: "Product Designer & UX Researcher (independent case study)",
    timeframe: "2026",
    category: "Mobile",
    tools: ["Figma", "Heuristic audit", "Design tokens", "Prototyping"],
    platforms: ["iOS", "Responsive web"],
    summary:
      "A UX audit and mobile-first redesign of the Philippines' Autosweep RFID toll app, built to answer a driver's three real questions on the first screen.",
    coverLabel: "Redesigned Autosweep Home — balance-first vehicle card, sticker status, reload, recent activity",
    coverAspect: "portrait",
    cover: `${AUTOSWEEP}/home-light.png`,
    coverDark: `${AUTOSWEEP}/home.png`,
    prototypeUrl: "https://www.figma.com/design/jHxCDpgzI3anYdo2WPsUZH/MT-Case-Study-Autosweep?node-id=1-2",
    tone: 0,
    featured: true,
    problem: [
      "Autosweep is the prepaid RFID toll system for the Skyway, SLEX, STAR, TPLEX and NAIAX tollways, with over a million registered customers. Its companion app is where drivers check balance, reload, and get help when a sticker fails to read or a charge looks wrong.",
      "Every session starts with one of three questions: do I have enough load, was that charge right, did my money arrive. The app answered none of them on the first screen. The balance was two taps deep, two of four primary tabs did not work, and there was no transaction history at all.",
      "The money moments were the quietest and the most damaging. A ₱13 convenience fee appeared only at the final summary, and bank passwords were typed into an Autosweep-branded webview with no URL bar. This is an independent case study, not client work; all sample data is invented.",
    ],
    process: [
      {
        heading: "Auditing against the app's own support form",
        body: "I reviewed all 41 captured screens and documented 32 findings with severity, evidence and a recommendation each. The Customer Care form listed the reasons people contact Autosweep: incorrect charging, uncredited load, unreadable sticker, request for statement. That list became the research: every support category that becomes a screen is a call that does not happen.",
        imageLabel: "The original Home screen — no balance, a placeholder greeting, and a disabled primary tab",
        aspect: "portrait",
        image: `${AUTOSWEEP}/before-home.png`,
      },
      {
        heading: "Leading with the balance, and its status",
        body: "Each vehicle card now shows the balance in 38pt numerals, a plain-language status chip, sticker status, and a Reload button inside the card. A low-balance state turns the card amber and offers auto-reload, so the app tells you before the toll plaza does. The last three transactions and any operator announcement sit directly beneath.",
        imageLabel: "Redesigned Home in its low-balance state — amber banner, status chip, Reload now, auto-reload prompt",
        aspect: "portrait",
        image: `${AUTOSWEEP}/home-low-balance.png`,
      },
      {
        heading: "Reloading in three decisions, fee first",
        body: "The original flow asked users to classify their provider, retyped the amount on every method screen, and revealed the fee at the end. The redesign inverts it: amount with presets and a live total, then one grouped provider list showing each fee, then review. Bank sign-in moves to the system browser behind a plain-language interstitial, and an in-app receipt closes the loop.",
        imageLabel: "Reload step 2 — every provider in one list with its fee, saved card pre-selected",
        aspect: "portrait",
        image: `${AUTOSWEEP}/reload-method-light.png`,
        imageDark: `${AUTOSWEEP}/reload-method.png`,
      },
    ],
    solution: {
      body: "Twenty-nine screens in Light and Dark, built on a two-mode token collection so the themes cannot drift, with five shared components and a wired prototype. A five-tab shell only lists things that work; Activity replaces the six-dropdown statement generator; Traffic and Help are native instead of an embedded website. After the main screens, I scanned every tappable control for dead ends and built the six screens they pointed to, from a notifications inbox to auto-reload settings.",
      gallery: [
        {
          label: "Activity ledger",
          caption: "Every toll and reload with its running balance, grouped by day, with a one-tap dispute from the detail view.",
          aspect: "portrait",
          image: `${AUTOSWEEP}/activity.png`,
        },
        {
          label: "Native traffic",
          caption: "Per-tollway status with freshness timestamps and advisories — replacing a webview blocked by a 2018 consent modal.",
          aspect: "portrait",
          image: `${AUTOSWEEP}/traffic.png`,
        },
        {
          label: "Help with visible numbers",
          caption: "Hotlines with hours and a Call button, one account pre-selected, a plain-language concern picker, and ticket tracking after sending.",
          aspect: "portrait",
          image: `${AUTOSWEEP}/help.png`,
        },
        {
          label: "Notifications and auto-reload",
          caption: "Two of the screens the dead-end scan produced: the inbox behind the Home bell, and the settings two other screens were already promising.",
          aspect: "portrait",
          image: `${AUTOSWEEP}/notifications.png`,
        },
      ],
    },
    outcome: {
      summary:
        "Measured from the design files rather than live users: the balance moved from two taps to zero, a reload went from seven screens to three decisions with the fee shown on step one, and the brand green was darkened twelve percent to clear WCAG AA on every button label, link and chip — taking contrast failures from more than thirty to none, verified in both themes. The next step is validating with drivers.",
      metrics: [
        { label: "Taps to see the balance", value: "2 → 0" },
        { label: "Decisions to complete a reload", value: "7 → 3" },
        { label: "WCAG AA contrast failures", value: "31+ → 0" },
      ],
    },
  },
  {
    slug: "extractly-document-ai",
    title: "Extractly — Document AI",
    role: "Lead Product Designer",
    timeframe: "2025 – 2026",
    category: "AI Products",
    tools: ["Figma", "FigJam", "Dovetail", "Linear"],
    summary:
      "A document-operations platform that turns high-volume financial paperwork into reviewable, policy-aware work across intake, extraction, exceptions, and posting.",
    coverLabel: "Extractly operations dashboard — queue health, pipeline status, and work that needs attention",
    cover: `${EXTRACTLY}/dashboard-light.png`,
    coverDark: `${EXTRACTLY}/dashboard.png`,
    tone: 3,
    featured: true,
    problem: [
      "Extractly is a sanitized, NDA-safe reconstruction of a client engagement. Company names, real data, and proprietary flows have been replaced with a fictional stand-in that preserves the design problem and the decisions behind it.",
      "Back-office teams were processing thousands of financial and tax documents a month almost entirely by hand: reading scanned invoices, receipts, purchase orders, and BIR forms, then re-keying every field into downstream systems. It was slow and hard to audit, and one mistyped TIN or amount could cascade into reconciliation and compliance problems.",
      "The automation already existed. People just didn't trust it. So the real design problem was legibility and control: show what the model knows, explain why a field needs attention, and make every human decision traceable from intake through posting.",
    ],
    process: [
      {
        heading: "Designing the operating queue",
        body: "I mapped the product around the decisions operators make before opening a document: what is waiting, why it stopped, who owns it, and how close it is to breaching an SLA. Saved views, layered filters, bulk actions, confidence signals, and intake states turn the documents table into an operating queue rather than a passive archive.",
        imageLabel: "Extractly document queue with saved views, layered filters, bulk actions, and confidence states",
        image: `${EXTRACTLY}/documents-light.png`,
        imageDark: `${EXTRACTLY}/documents.png`,
      },
      {
        heading: "Explaining why review is needed",
        body: "The review workspace keeps the source, extracted fields, business rules, and audit context in one place. Reviewers can jump directly to fields that require attention, see the model value beside its normalised result, and understand the policy behind a warning before they confirm or correct it. Duplicate handling, reprocessing, comments, and escalation stay inside the same task flow.",
        imageLabel: "Extractly review workspace with source document, explainable field checks, rules, and activity",
        image: `${EXTRACTLY}/review-light.png`,
        imageDark: `${EXTRACTLY}/review.png`,
      },
      {
        heading: "Making quality operational",
        body: "Analytics were expanded from personal performance into a shared quality view. Leads can compare first-pass verification, exception mix, queue age, reviewer throughput, document-type accuracy, and SLA health without exporting the work to a spreadsheet. The same language and status model carry from the dashboard into each drill-down.",
        imageLabel: "Extractly analytics overview with quality, exception, queue-age, and reviewer signals",
        image: `${EXTRACTLY}/performance-light.png`,
        imageDark: `${EXTRACTLY}/performance.png`,
      },
    ],
    solution: {
      body: "The result is a connected document-operations workspace. Intake catches failures and duplicates early; the queue routes work by status, confidence, ownership, and SLA; the review workspace pairs evidence with policy; and analytics help leads improve the system instead of merely counting completed documents. Client-facing exception and approval flows extend the same model beyond the internal operations team.",
      gallery: [
        {
          label: "Extractly dashboard",
          caption:
            "The operations control room brings urgent work, pipeline health, recent activity, SLA risk, and each reviewer's next action into one scan.",
          image: `${EXTRACTLY}/dashboard-light.png`,
          imageDark: `${EXTRACTLY}/dashboard.png`,
        },
        {
          label: "Extractly sign-in",
          caption: "A restrained, enterprise-ready entry point with password and single sign-on paths for connected organisations.",
          image: `${EXTRACTLY}/login-light.png`,
          imageDark: `${EXTRACTLY}/login.png`,
        },
      ],
    },
    outcome: {
      summary:
        "The redesigned product gives operators a clearer path from intake to resolution. Reviewers can focus on the fields and exceptions that genuinely need judgement, understand the rule behind each warning, and resolve work without switching tools. Leads gain a shared view of queue health, quality, and process friction, while client approvers receive focused decisions instead of internal operational noise. The qualitative result is a system that makes automation easier to trust because its limits, evidence, and handoffs remain visible.",
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
    websiteUrl: "https://www.houseofretrieversph.org/",
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
        "The site's job is turning followers into turnout, not simply being found. It asks for time instead of money, names a beneficiary for every gathering, and treats the breed in its name as history, not a rule.",
    },
  },
  {
    slug: "house-of-retrievers-ph-app",
    title: "House of Retrievers PH: My ComPAWnion App",
    role: "Senior Product Designer & Developer",
    timeframe: "2026",
    category: "Community & Non-profit",
    tools: ["Figma", "Product strategy", "Next.js"],
    platforms: ["Web", "iOS & Android", "iPadOS"],
    summary:
      "A warm, practical community app that helps Filipino furparents show up for their dogs, their pack, and the causes they care about.",
    coverLabel: "My ComPAWnion app concept — a welcoming House of Retrievers PH community experience",
    coverAspect: "portrait",
    cover: `${HOR_APP}/app-home.png`,
    tone: 2,
    featured: true,
    problem: [
      "House of Retrievers PH is more than a breed community. It is a group of people who want a better, more generous life with their dogs, and who are willing to turn that care outward through events, learning, and service.",
      "The old experience made those pieces feel scattered. Announcements, events, dog profiles, beneficiary stories, and transparency updates all mattered, but they did not yet feel like one place a furparent would return to every week.",
      "The design challenge was to make the app useful on an ordinary Tuesday as well as during a fundraiser: personal enough for a person's dogs, social enough for the pack, and clear enough that every contribution can be understood.",
    ],
    process: [
      {
        heading: "Giving the pack a home screen",
        body: "The home experience starts with what members actually need: announcements, upcoming events, and a gentle path into the community. The tone stays friendly and editorial, while the structure makes it easy to see what is new, what is next, and where a member can help.",
        imageLabel: "My ComPAWnion home and announcements experience for everyday member updates",
        aspect: "portrait",
        image: `${HOR_APP}/app-home.png`,
      },
      {
        heading: "Making events feel worth showing up for",
        body: "Events are treated as the heartbeat of the product, not a calendar dump. A member can understand the invitation, see who it is for, open the details, join the waitlist when space is tight, and come back later to the photos and the story of what the gathering made possible.",
        imageLabel: "Event listing, event detail, attendance states, and photo album direction",
        aspect: "portrait",
        image: `${HOR_APP}/app-event.png`,
      },
      {
        heading: "Connecting dogs, people, and trust",
        body: "Profiles give the community a human shape: a member can introduce themselves, add their dogs, and move between personal context and the shared pack. Beneficiary pages and transparency reports complete the loop, showing where care goes after the event ends.",
        imageLabel: "Member and dog profiles alongside beneficiaries and transparency reporting",
        aspect: "video",
        image: `${HOR_APP}/app-profile.png`,
      },
    ],
    solution: {
      body:
        "My ComPAWnion brings the pack into one calm, approachable space. Members can keep up with announcements, discover and join events, meet one another through profiles and community rooms, and follow beneficiary and transparency updates without losing the warmth that makes the organisation feel personal. The same design language carries across web, iOS, Android, and iPadOS.",
      gallery: [
        {
          label: "The community loop",
          caption: "Home, community, events, and profiles work together so the app supports both belonging and action.",
          aspect: "portrait",
          image: `${HOR_APP}/app-community.png`,
        },
        {
          label: "Care you can follow through",
          caption: "Beneficiary stories and transparency reports keep the relationship between a gathering and its impact visible.",
          aspect: "portrait",
          image: `${HOR_APP}/app-transparency.png`,
        },
      ],
    },
    outcome: {
      summary:
        "The result is a product that feels less like a noticeboard and more like a place to belong. A furparent can find their next reason to participate, keep their own dogs close, and see the care behind each initiative. The app makes the community easier to join while keeping its purpose — good dogs, good people, greater good — in view.",
    },
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((project) => project.slug === slug);
}
