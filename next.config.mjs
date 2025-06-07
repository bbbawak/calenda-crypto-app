/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Disable image optimization and allow any external domains
    unoptimized: true,
  },
  eslint: {
    // Disable ESLint during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
