/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Enable CSS imports from node_modules
  transpilePackages: ['lucide-react'],
  // Configure for Replit environment
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
  // Disable webpack dev middleware warnings
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
}

export default nextConfig