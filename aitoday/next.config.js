/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use shorter directory name to avoid Windows MAX_PATH (260 chars) issues
  distDir: '.n',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'image.thum.io',
      },
    ],
  },
};

module.exports = nextConfig;
