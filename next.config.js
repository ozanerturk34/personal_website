/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // TODO: Remove kasandbox domain
  images: { domains: ["www.kasandbox.org"] },
};

module.exports = nextConfig;
