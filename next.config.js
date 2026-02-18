/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['@turtle-easyagent/ui'],
  },
};

module.exports = nextConfig;
