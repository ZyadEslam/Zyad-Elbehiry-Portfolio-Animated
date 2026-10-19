import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 only permits explicitly listed optimization qualities.
    // The hero is intentionally delivered at full quality.
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
