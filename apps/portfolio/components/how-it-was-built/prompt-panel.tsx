import { ORIGINAL_PROMPT } from "@/lib/original-prompt";
import { CopyButton } from "./copy-button";

const HEADER_LINE = /^[A-Z][A-Z /]{2,}$/;

function renderLine(line: string, key: number) {
  if (line.trim().length === 0) return <div key={key} className="h-4" aria-hidden="true" />;

  if (HEADER_LINE.test(line.trim())) {
    return (
      <div key={key} className="mt-3 whitespace-pre-wrap font-semibold text-action-primary first:mt-0">
        {line}
      </div>
    );
  }

  const parts = line.split(/(`[^`]+`|\[REPLACE[^\]]*\])/g).filter((p) => p !== "");

  return (
    <div key={key} className="whitespace-pre-wrap text-text-secondary">
      {parts.map((part, i) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="rounded bg-background-surface-subtle px-1 py-0.5 text-action-primary">
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("[REPLACE")) {
          return (
            <span key={i} className="font-medium text-feedback-warning">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </div>
  );
}

/**
 * Static, read-only display — no API calls, no regeneration. The
 * highlighting below is a lightweight regex tokenizer (headers / `code` /
 * [REPLACE] markers), not a full syntax-highlighting library, to keep this
 * page's client JS footprint minimal.
 */
export function PromptPanel() {
  const lines = ORIGINAL_PROMPT.split("\n");

  return (
    <div className="overflow-hidden rounded-card border border-border-default bg-background-surface">
      <div className="flex items-center justify-between border-b border-border-default bg-background-surface-subtle px-4 py-3">
        <p className="font-mono text-caption text-text-secondary">original-prompt.txt</p>
        <CopyButton text={ORIGINAL_PROMPT} />
      </div>
      <pre className="max-h-[32rem] overflow-auto p-5 font-mono text-body-sm leading-relaxed">
        {lines.map((line, i) => renderLine(line, i))}
      </pre>
    </div>
  );
}
