/**
 * Copy shared by more than one page. Edit here, not in the pages.
 */

export type Principle = { title: string; body: string };

/** "What I bring" — shown on the home page and About. */
export const WHAT_I_BRING: Principle[] = [
  {
    title: "I hand over decisions, not possibilities.",
    body: "Design ends at a picture. Engineering ends at behavior. Every question I leave open in a file gets answered anyway, by an engineer, alone, with less context than me. So I try to answer them first: empty states, failure states, what happens at zero rows and at five hundred.",
  },
  {
    title: "I've sat in the seat.",
    body: "Before I designed the document validation workflow on an AI document-processing platform, I did that job. Hours of checking whether a model read a document correctly. I know which part of that day is tedious because I lived the tedious part.",
  },
  {
    title: "I design for the stack that exists.",
    body: "My engineers build in React, so my designs are React-shaped. I'm not limiting myself. A design that fights the framework loses, and then nobody gets the good version.",
  },
];

export type Employer = {
  name: string;
  /** Asset in /public/images/employers, shown white on a dark plate. Omit to show `wordmark`. */
  logo?: string;
  /** Text shown when there is no logo file yet. */
  wordmark?: string;
  role: string;
};

/** Oldest → newest. Drives the About timeline and the home page teams strip. */
export const EMPLOYERS: Employer[] = [
  { name: "Medilink Network Inc.", logo: "/images/employers/medilink.png", role: "Web Designer" },
  { name: "TalentSource Inc.", logo: "/images/employers/talentsource.png", role: "Jr. Graphic Designer" },
  { name: "MobileGroup Inc.", logo: "/images/employers/mobilegroup.png", role: "UI/UX Designer" },
  { name: "HelloMedia Inc.", wordmark: "hellomedia", role: "UI/UX Designer" }, // add /images/employers/hellomedia.png, then set `logo`
  { name: "Affinity Express Inc.", logo: "/images/employers/affinityx.png", role: "Web Developer (WordPress)" },
  { name: "IBM", logo: "/images/employers/ibm.svg", role: "User Interface Developer" },
  { name: "Actimai Philippines, Inc.", logo: "/images/employers/actimai.svg", role: "UI/UX Designer" },
];

/** A tool on the About page: `icon` is a symbol id in /public/tool-logos.svg; `mark` is a short monogram when no logo is licensed. */
export type Tool = { name: string; icon?: string; mark?: string };

/** About → "Tools I use", grouped. Chosen by the owner (Nov 2026). Add a logo by appending a <symbol> to tool-logos.svg. */
export const TOOL_GROUPS: { title: string; tools: Tool[] }[] = [
  {
    title: "Design & prototyping",
    tools: [
      { name: "Figma", icon: "figma" },
      { name: "FigJam", icon: "figma" },
      { name: "Sketch", icon: "sketch" },
      { name: "Framer", icon: "framer" },
      { name: "Balsamiq", mark: "Bq" },
      { name: "Adobe XD", icon: "adobexd" },
      { name: "Adobe Illustrator", icon: "adobeillustrator" },
      { name: "Adobe Photoshop", icon: "adobephotoshop" },
      { name: "Canva", icon: "canva" },
    ],
  },
  { title: "Motion & animation", tools: [{ name: "LottieFiles", icon: "lottiefiles" }, { name: "Adobe After Effects", icon: "adobeaftereffects" }] },
  {
    title: "Research & testing",
    tools: [{ name: "Dovetail", icon: "dovetail" }, { name: "Typeform", mark: "Tf" }, { name: "Google Forms", icon: "googleforms" }],
  },
  {
    title: "Collaboration & planning",
    tools: [
      { name: "Notion", icon: "notion" },
      { name: "Linear", icon: "linear" },
      { name: "Jira", icon: "jira" },
      { name: "Miro", icon: "miro" },
      { name: "Slack", icon: "slack" },
      { name: "Trello", icon: "trello" },
    ],
  },
  { title: "Design systems", tools: [{ name: "Tokens Studio", mark: "TS" }, { name: "Storybook", icon: "storybook" }] },
  {
    title: "Build & ship",
    tools: [
      { name: "VS Code", icon: "vscode" },
      { name: "GitHub", icon: "github" },
      { name: "Vercel", icon: "vercel" },
      { name: "Cloudflare", icon: "cloudflare" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "React", icon: "react" },
      { name: "Vue.js", icon: "vuedotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS", icon: "css3" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Supabase", icon: "supabase" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "UiPath", mark: "Ui" },
    ],
  },
  {
    title: "CMS & site builders",
    tools: [
      { name: "WordPress", icon: "wordpress" },
      { name: "Elementor", icon: "elementor" },
      { name: "Beaver Builder", mark: "BB" },
      { name: "Divi", mark: "D" },
      { name: "Webflow", icon: "webflow" },
      { name: "Moodle", icon: "moodle" },
    ],
  },
  {
    title: "AI tools",
    tools: [
      { name: "Claude", icon: "anthropic" },
      { name: "ChatGPT", icon: "openai" },
      { name: "Codex", mark: "</>" },
      { name: "Gemini", icon: "googlegemini" },
      { name: "Grok", mark: "G" },
      { name: "GitHub Copilot", icon: "githubcopilot" },
      { name: "Cursor", mark: "Cu" },
    ],
  },
];

/** About → "Skills", shown as plain labels. Chosen by the owner (Nov 2026). */
export const SKILLS: string[] = [
  "User research",
  "Usability testing",
  "Heuristic evaluation",
  "Information architecture",
  "Workflow design",
  "Wireframing",
  "Prototyping",
  "Design systems",
  "Design tokens",
  "Accessibility (WCAG)",
  "Front-end development",
  "Project management",
];
