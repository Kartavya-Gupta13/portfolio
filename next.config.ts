import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      "kartavya.studio",
      "kartavyagupta.com",
      "www.kartavyagupta.com",
    ].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://www.kartavya.studio/:path*",
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
