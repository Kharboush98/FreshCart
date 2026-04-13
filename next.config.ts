import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        port: '',
        pathname: '/Route-Academy-categories/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        port: '',
        pathname: '/Route-Academy-products/**',
        search: '',
      }
    ],
  },

  reactCompiler: true,

  async redirects() {
    return [
      {
        source: '/blog/:slug*',
        destination: '/news/:slug*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
