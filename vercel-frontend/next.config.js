/** @type {import('next').NextConfig} */

// Safe environment variable handling with null/undefined checks
const getEnvVar = (key, defaultValue) => {
  try {
    const value = process.env[key];
    return (value !== null && value !== undefined && value !== '') ? value : defaultValue;
  } catch (error) {
    console.warn(`Error accessing environment variable ${key}:`, error);
    return defaultValue;
  }
};

// Default URLs for fallback
const DEFAULT_API_URL = 'https://3002-imc9v77qaa3h8epi0x9w8-6532622b.e2b.dev';
const DEFAULT_WS_URL = 'wss://3002-imc9v77qaa3h8epi0x9w8-6532622b.e2b.dev';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Performance optimizations
  images: {
    domains: ['railway.app', 'vercel.app', 'e2b.dev'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Environment variables with safe handling
  env: {
    NEXT_PUBLIC_API_URL: getEnvVar('NEXT_PUBLIC_API_URL', DEFAULT_API_URL),
    NEXT_PUBLIC_WS_URL: getEnvVar('NEXT_PUBLIC_WS_URL', DEFAULT_WS_URL),
    NEXT_PUBLIC_ENVIRONMENT: getEnvVar('NEXT_PUBLIC_ENVIRONMENT', 'production'),
    NEXT_PUBLIC_ENABLE_QUANTUM_PROCESSING: getEnvVar('NEXT_PUBLIC_ENABLE_QUANTUM_PROCESSING', 'true'),
    NEXT_PUBLIC_ENABLE_AI_CONSENSUS: getEnvVar('NEXT_PUBLIC_ENABLE_AI_CONSENSUS', 'true'),
    NEXT_PUBLIC_ENABLE_CL_TRADING: getEnvVar('NEXT_PUBLIC_ENABLE_CL_TRADING', 'true'),
  },
  
  // Headers for CORS and security
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
  
  // Rewrites for API proxy with safe environment variable handling
  async rewrites() {
    const apiUrl = getEnvVar('NEXT_PUBLIC_API_URL', DEFAULT_API_URL);
    return [
      {
        source: '/backend/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  
  // Build configuration optimized for Vercel
  output: 'standalone',
  
  // Disable problematic experimental features
  experimental: {},
  
  // Additional build safety
  typescript: {
    ignoreBuildErrors: false,
  },
  
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;