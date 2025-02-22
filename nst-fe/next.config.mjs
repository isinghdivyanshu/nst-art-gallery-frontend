/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
        port: '8000',
      },
      {
        protocol: 'https',
        hostname: 'artium.rupaaksrinivas.tech',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
