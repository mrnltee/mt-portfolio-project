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
