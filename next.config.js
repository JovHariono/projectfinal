/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  ignoreDuringBuilds: true,
  images: {
    unoptimized: true,
},
}

module.exports = nextConfig
