/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // برای Vercel
  swcMinify: true,
  // اگر از MongoDB استفاده می‌کنید
  serverExternalPackages: ['mongoose'],
};

module.exports = nextConfig;