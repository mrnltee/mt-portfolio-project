// Ambient declarations for side-effect stylesheet imports (./globals.css and the
// @mt/tokens runtime CSS at "@mt/tokens/css"). This types those imports cleanly in
// every environment, replacing per-line @ts-expect-error directives that fail the
// build wherever the import doesn't happen to error (e.g. Vercel's clean build).
declare module "*.css";
declare module "@mt/tokens/css";
