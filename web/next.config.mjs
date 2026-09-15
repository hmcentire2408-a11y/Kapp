/** @type {import('next').NextConfig} */
const nextConfig = {
  // The corpus, fit dataset and student files are read from the repo root at
  // request time, so they must not be bundled or traced into .next output.
  outputFileTracingRoot: process.cwd(),
  experimental: { serverActions: { bodySizeLimit: "8mb" } },
};
export default nextConfig;
