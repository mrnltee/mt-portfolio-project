import metadata from "@mt/tokens/metadata";

/**
 * Documents the @mt/tokens typography roles. Sizes/weights/line-heights/tracking
 * and families come from `@mt/tokens/metadata` (Brand A). Specimens render with the
 * portfolio's loaded fonts (font-display / font-sans / font-mono, next/font).
 */
interface Tok {
  name: string;
  path: string[];
  type?: string;
  reference?: string;
  values: Record<string, string>;
}
const tokens = (metadata as { tokens: Tok[] }).tokens;

const roles = tokens
  .filter((t) => t.path[0] === "text" && t.path[2] === "font-size")
  .map((t) => t.path[1]);

function sub(role: string, prop: string) {
  return tokens.find((t) => t.path[0] === "text" && t.path[1] === role && t.path[2] === prop);
}
function familyClass(role: string) {
  const slot = sub(role, "font-family")?.reference?.match(/family\.(\w+)/)?.[1];
  return slot === "display" ? "font-display" : slot === "mono" ? "font-mono" : "font-sans";
}
function toPx(size: string) {
  const rem = size.endsWith("rem") ? parseFloat(size) * 16 : parseFloat(size);
  return Math.round(rem);
}

export function TypeSection() {
  return (
    <div className="space-y-8">
      <p className="max-w-2xl text-body text-text-secondary">
        Every role below is rendered at its actual @mt/tokens (Brand A) size — this is what it looks like in the
        product, not a scaled-down mockup.
      </p>
      <div className="divide-y divide-border-default">
        {roles.map((role) => {
          const family = sub(role, "font-family")!.values["a-light"];
          const size = sub(role, "font-size")!.values["a-light"];
          const weight = sub(role, "font-weight")!.values["a-light"];
          const lineHeight = sub(role, "line-height")!.values["a-light"];
          const letterSpacing = sub(role, "letter-spacing")!.values["a-light"];
          return (
            <div key={role} className="grid grid-cols-1 gap-4 py-6 md:grid-cols-[1fr_2fr] md:items-center">
              <div className="text-caption text-text-secondary">
                <p className="font-mono text-text-primary">text-{role}</p>
                <p className="mt-1">
                  {family.split(",")[0]} · {weight} · {toPx(size)}px / {lineHeight} lh
                  {letterSpacing !== "0em" && <> · {letterSpacing} tracking</>}
                </p>
              </div>
              <p
                className={`${familyClass(role)} text-text-primary`}
                style={{ fontSize: size, lineHeight, letterSpacing, fontWeight: Number(weight) }}
              >
                Ag — Designing with intent
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
