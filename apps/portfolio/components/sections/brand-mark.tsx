"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated isometric 3D box used as personal branding on the hero.
 * Pure CSS 3D (transform-style: preserve-3d) with a slow framer-motion spin +
 * gentle float. Face colors come from the @mt indigo token scale, so it stays
 * on-brand and reacts to nothing but the tokens. No text/letters by design.
 * Respects prefers-reduced-motion (settles into a static isometric pose).
 */
const EDGE = 128; // cube edge in px
const H = EDGE / 2;

const FACES: { transform: string; background: string }[] = [
  { transform: `rotateY(0deg) translateZ(${H}px)`, background: "linear-gradient(160deg, var(--mt-color-indigo-500), var(--mt-color-indigo-700))" }, // front
  { transform: `rotateY(90deg) translateZ(${H}px)`, background: "linear-gradient(160deg, var(--mt-color-indigo-600), var(--mt-color-indigo-800))" }, // right
  { transform: `rotateY(180deg) translateZ(${H}px)`, background: "linear-gradient(160deg, var(--mt-color-indigo-500), var(--mt-color-indigo-700))" }, // back
  { transform: `rotateY(-90deg) translateZ(${H}px)`, background: "linear-gradient(160deg, var(--mt-color-indigo-600), var(--mt-color-indigo-800))" }, // left
  { transform: `rotateX(90deg) translateZ(${H}px)`, background: "linear-gradient(135deg, var(--mt-color-indigo-300), var(--mt-color-indigo-500))" }, // top
  { transform: `rotateX(-90deg) translateZ(${H}px)`, background: "var(--mt-color-indigo-900)" }, // bottom
];

export function BrandMark() {
  const reduceMotion = useReducedMotion();
  const box = EDGE * 2.1;

  return (
    <div
      aria-hidden="true"
      className="relative grid shrink-0 place-items-center"
      style={{ width: box, height: box, perspective: 900 }}
    >
      {/* soft ground shadow */}
      <div
        className="absolute rounded-full"
        style={{
          width: EDGE * 1.15,
          height: EDGE * 0.42,
          bottom: "16%",
          background:
            "radial-gradient(closest-side, rgb(var(--mt-color-indigo-900-rgb) / 0.30), transparent)",
          filter: "blur(3px)",
        }}
      />
      {/* tilt + float */}
      <motion.div
        style={{ width: EDGE, height: EDGE, transformStyle: "preserve-3d", rotateX: -26 }}
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={reduceMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* spin */}
        <motion.div
          className="relative"
          style={{ width: EDGE, height: EDGE, transformStyle: "preserve-3d" }}
          initial={{ rotateY: reduceMotion ? -45 : 0 }}
          animate={reduceMotion ? undefined : { rotateY: 360 }}
          transition={reduceMotion ? undefined : { duration: 16, repeat: Infinity, ease: "linear" }}
        >
          {FACES.map((f, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                transform: f.transform,
                background: f.background,
                boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 0.08)",
                backfaceVisibility: "hidden",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
