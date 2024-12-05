/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rosy-spaniel-295.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
