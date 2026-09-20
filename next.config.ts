/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
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
        source: "/teleprompt/next",
        destination: "https://teleprompt-dun.vercel.app/dashboard",
      },
      {
        source: "/teleprompt/next/:path*",
        destination: "https://teleprompt-dun.vercel.app/:path*",
      },
      {
        source: "/teleprompt/angular22",
        destination: "https://angular22.teleprompt.zecki1.com.br/teleprompt/angular22/",
      },
      {
        source: "/teleprompt/angular22/:path*",
        destination: "https://angular22.teleprompt.zecki1.com.br/teleprompt/angular22/:path*",
      },
      {
        source: "/teleprompt/angular17",
        destination: "https://angular17.teleprompt.zecki1.com.br/teleprompt/angular17/",
      },
      {
        source: "/teleprompt/angular17/:path*",
        destination: "https://angular17.teleprompt.zecki1.com.br/teleprompt/angular17/:path*",
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
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "zecki1.com.br",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nickgomes.com.br",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nicolas-gomes-site.vercel.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cleriston-site.vercel.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cleristonribeiro.com.br",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
