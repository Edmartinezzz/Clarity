import type { NextConfig } from "next";

const isCapacitor = process.env.IS_CAPACITOR_BUILD === 'true';

const nextConfig: NextConfig = {
  output: isCapacitor ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
