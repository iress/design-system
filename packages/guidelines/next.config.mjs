import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  experimental: {
    optimizePackageImports: ['@iress-oss/ids-components'],
  },
};

const withMDX = createMDX();

export default withMDX(config);
