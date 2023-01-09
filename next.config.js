/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '**/*',
      },
      {
        protocol: 'https',
        hostname: 'fireship-remotion-intro.vercel.app',
        port: '443',
        pathname: '/api/**',
      },
    ],
  },
}

module.exports = nextConfig
