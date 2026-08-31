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
      {
        source: "/teleprompt",
        destination: "https://teleprompt-dun.vercel.app/teleprompt",
      },
      {
        source: "/teleprompt/:path*",
        destination: "https://teleprompt-dun.vercel.app/:path*",
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
      {
        protocol: 'https',
        hostname: 'nickgomes.com.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nicolas-gomes-site.vercel.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cleriston-site.vercel.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cleristonribeiro.com.br',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
