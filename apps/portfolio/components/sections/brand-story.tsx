"use client";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

/* Isometric cube vertices (viewBox 120×120). The same box shown in the hero,
   frozen at an angle where its own edges line up into a letter. */
const P = {
  T: [60, 18], UL: [26, 38], UR: [94, 38], C: [60, 58], L: [26, 78], R: [94, 78], B: [60, 98],
} as const;
const CUBE_EDGES: Array<[readonly [number, number], readonly [number, number]]> = [
  [P.T, P.UL], [P.T, P.UR], [P.UL, P.C], [P.UR, P.C],
  [P.UL, P.L], [P.UR, P.R], [P.C, P.B], [P.L, P.B], [P.R, P.B],
];

/** Faint wireframe cube with one letter traced over it in the accent color. */
function LetterCube({ letter }: { letter: "M" | "T" }) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" role="img" aria-label={`The box seen as the letter ${letter}`}>
      {CUBE_EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]}
          stroke="var(--mt-color-indigo-500)"
          strokeOpacity={0.22}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      ))}
      {letter === "M" ? (
        // Left vertical → down to center → up to right → right vertical: all real cube edges.
        <polyline
          points={`${P.L[0]},${P.L[1]} ${P.UL[0]},${P.UL[1]} ${P.C[0]},${P.C[1]} ${P.UR[0]},${P.UR[1]} ${P.R[0]},${P.R[1]}`}
          fill="none"
          stroke="var(--mt-color-action-primary)"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        // T drawn as an upward arrow: vertical shaft + a chevron head resting flush on
        // the box's two top edges (apex at the top corner, wings on the upper corners).
        <>
          <line x1={60} y1={P.T[1]} x2={60} y2={P.B[1]} stroke="var(--mt-color-action-primary)" strokeWidth={5} strokeLinecap="round" />
          <polyline
            points={`${P.UL[0]},${P.UL[1]} ${P.T[0]},${P.T[1]} ${P.UR[0]},${P.UR[1]}`}
            fill="none"
            stroke="var(--mt-color-action-primary)"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}

/** A dash cell for the little Morse legend (M = ▄▄, T = ▄). */
function Dash() {
  return <span className="inline-block h-[3px] w-4 rounded-full bg-action-primary align-middle" />;
}

export function BrandStoryDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogTitle>Why the box is empty</DialogTitle>
        <DialogDescription className="mt-1">The story behind the mark.</DialogDescription>

        <div className="mt-6 space-y-6 [text-wrap:pretty]">
          <section>
            <h3 className="text-overline text-action-primary">It starts empty</h3>
            <p className="mt-2 text-body-sm text-text-secondary">
              Everything starts from one empty block. Fill it with color, multiply it, and the block becomes
              an object, the way a single atom combines into matter. The box is that first block, caught
              before anything fills it in.
            </p>
          </section>

          <section>
            <h3 className="text-overline text-action-primary">M.T, and &quot;empty&quot;</h3>
            <p className="mt-2 text-body-sm text-text-secondary">
              Each face is outlined in Morse code, my initials: <Dash /> <Dash /> for <strong className="font-semibold text-text-primary">M</strong>,{" "}
              <Dash /> for <strong className="font-semibold text-text-primary">T</strong>. Say them together and{" "}
              <em>M.T</em> sounds like <em>empty</em>. So the box is empty on purpose. And an empty box is a box of surprises.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-caption text-text-tertiary">
              <span className="inline-flex items-center gap-2"><strong className="font-semibold text-text-secondary">M</strong> <Dash /> <Dash /></span>
              <span className="inline-flex items-center gap-2"><strong className="font-semibold text-text-secondary">T</strong> <Dash /></span>
            </div>
          </section>

          <section>
            <h3 className="text-overline text-action-primary">It hides an M and a T</h3>
            <p className="mt-2 text-body-sm text-text-secondary">
              As the box turns, its own edges line up into letters. Catch it at one angle and you see an M.
              Keep watching and it resolves into a T, drawn as an arrow pointing up: a reminder that I keep
              looking ahead.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {(["M", "T"] as const).map((l) => (
                <figure key={l} className="rounded-card border border-border-default bg-background-surface-subtle/50 p-3">
                  <div className="mx-auto aspect-square w-full max-w-[140px]">
                    <LetterCube letter={l} />
                  </div>
                  <figcaption className="mt-1 text-center text-caption text-text-tertiary">
                    the box as <strong className="font-semibold text-action-primary">{l}</strong>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-overline text-action-primary">It never stops</h3>
            <p className="mt-2 text-body-sm text-text-secondary">
              The spin doesn&apos;t end because learning and creativity don&apos;t either. It just keeps rolling.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
