/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // Or remove this if not using
  },
  allowedDevOrigins: ['*:3000'], // ✅ Allow ALL origins in development
};

export default nextConfig;
