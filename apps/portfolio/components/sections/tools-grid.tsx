import { SKILLS, TOOL_GROUPS, type Tool } from "@/lib/content";

function ToolLogo({ tool }: { tool: Tool }) {
  if (tool.icon) {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox={tool.icon === "vscode" ? "0 0 128 128" : "0 0 24 24"}
        className="h-icon-md w-icon-md shrink-0 fill-current text-text-primary"
      >
        <use href={`/tool-logos.svg#${tool.icon}`} />
      </svg>
    );
  }
  return (
    <span aria-hidden="true" className="flex h-icon-md w-icon-md shrink-0 items-center justify-center font-display text-caption font-bold text-text-primary">
      {tool.mark}
    </span>
  );
}

/**
 * About → tools grouped by category, then skills as labels. Static on purpose: 50 logos in a
 * marquee take over a minute to pass and can't be scanned; groups let a reader find "do they
 * know X?" at a glance, and nothing moves (no reduced-motion special case needed).
 */
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function ToolsGrid() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
        {TOOL_GROUPS.map((group) => (
          <section key={group.title} aria-labelledby={`tools-${slug(group.title)}`}>
            <h3 id={`tools-${slug(group.title)}`} className="text-overline uppercase text-text-tertiary">
              {group.title}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.tools.map((tool) => (
                <li
                  key={tool.name}
                  className="inline-flex items-center gap-2 rounded-pill border border-border-default bg-background-surface px-3 py-1.5 text-body-sm font-medium text-text-primary"
                >
                  <ToolLogo tool={tool} />
                  {tool.name}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section aria-labelledby="skills-heading">
        <h3 id="skills-heading" className="font-display text-h4 font-semibold text-text-primary">
          Skills
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <li key={skill} className="rounded-pill bg-action-accent-subtle px-3 py-1.5 text-body-sm font-medium text-action-on-accent-subtle">
              {skill}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
