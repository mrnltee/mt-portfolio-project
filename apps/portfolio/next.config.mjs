/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `next build` writes a plain HTML/CSS/JS site to `out/`,
  // which any static host (Cloudflare Pages, Vercel) can serve.
  output: "export",
  // Static hosts can't run Next's on-demand image optimizer, so images are
  // served as-is from /public. Keep screenshots resized before adding them.
  images: { unoptimized: true },
};

export default nextConfig;
