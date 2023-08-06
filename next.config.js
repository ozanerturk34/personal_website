/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ["cdn.sanity.io", "tailwindui.com"] },
};

module.exports = nextConfig;
