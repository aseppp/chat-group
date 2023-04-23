/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://chat-group-me.vercel.app/:path*',
  //     },
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3000:path*',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
