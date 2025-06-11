/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
  // Enable CSS imports from node_modules
  transpilePackages: ['lucide-react'],
}

module.exports = nextConfig