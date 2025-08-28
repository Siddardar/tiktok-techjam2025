import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === 'development', // This disables PWA in dev
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  /* your other config options here */
};

export default withPWA(nextConfig);