import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Disable static export - app uses cookies and dynamic session management
  // output: 'export',
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.goodfriendszone.com",
      },
      {
        protocol: "http",
        // hostname: "localhost",
        hostname: "127.0.0.1",
        port: "10004",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "assets.bd34fgabh.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
