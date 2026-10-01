import type { CSSProperties } from "react";
import { motion as motionTokens } from "@mt/tokens/motion";

const TOOLS = [
  { name: "Figma", icon: "figma" },
  { name: "Claude", icon: "anthropic" },
  { name: "ChatGPT", mark: "AI" },
  { name: "Codex", mark: "</>" },
  { name: "Gemini", icon: "googlegemini" },
  { name: "Grok", mark: "G" },
  { name: "GitHub", icon: "github" },
  { name: "Vercel", icon: "vercel" },
  { name: "Notion", icon: "notion" },
  { name: "Framer", icon: "framer" },
  { name: "Sketch", icon: "sketch" },
  { name: "VS Code", icon: "vscode" },
  { name: "LottieFiles", icon: "lottiefiles" },
  { name: "WordPress", icon: "wordpress" },
  { name: "Beaver Builder", mark: "BB" },
  { name: "Elementor", icon: "elementor" },
  { name: "Divi", mark: "D" },
] as const;

const marqueeStyle = {
  "--tools-marquee-duration": String(motionTokens.duration.slow * 80) + "ms",
} as CSSProperties;

function ToolList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className="tools-marquee-group flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
      aria-label={duplicate ? undefined : "Design, AI, and development tools"}
      aria-hidden={duplicate || undefined}
    >
      {TOOLS.map((tool) => (
        <li
          key={tool.name}
          className="group inline-flex min-w-max items-center gap-3 rounded-container border border-border-subtle bg-background-surface/75 px-4 py-3 text-body-sm font-medium text-text-primary"
        >
          {"icon" in tool ? (
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox={tool.icon === "vscode" ? "0 0 128 128" : "0 0 24 24"}
              className="h-6 w-6 shrink-0 fill-current text-text-primary transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:-rotate-6 group-hover:scale-110"
            >
              <use href={"/tool-logos.svg#" + tool.icon} />
            </svg>
          ) : (
            <span
              aria-hidden="true"
              className="flex h-6 w-6 shrink-0 items-center justify-center font-display text-caption font-bold text-text-primary transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:-rotate-6 group-hover:scale-110"
            >
              {tool.mark}
            </span>
          )}
          <span>{tool.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function ToolsMarquee() {
  return (
    <div
      className="tools-marquee"
      role="region"
      aria-label="Tools I use"
      style={marqueeStyle}
    >
      <div className="tools-marquee-viewport">
        <div className="tools-marquee-track">
          <ToolList />
          <ToolList duplicate />
        </div>
      </div>
    </div>
  );
}
