/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Enable CSS imports from node_modules
  transpilePackages: ['lucide-react'],
}

export default nextConfig