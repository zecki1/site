/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/dashboard",
        destination: "https://dashboard-zecki.vercel.app/dashboard",
      },
      {
        source: "/dashboard/:path*",
        destination: "https://dashboard-zecki.vercel.app/dashboard/:path*",
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: process.env.NEXT_IGNORE_TYPE_ERRORS === "1",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/avatars/**",
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'zecki1.com.br',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
