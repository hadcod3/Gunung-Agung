import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['00bvzmypxw.ufs.sh','00py46zcpt.ufs.sh'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '00bvzmypxw.ufs.sh',
        port: '',
        pathname: '/f/**',
      },
      {
        protocol: 'https',
        hostname: '00py46zcpt.ufs.sh',
        port: '',
        pathname: '/f/**',
      },
    ],
    // Increase timeout to 60 seconds
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
