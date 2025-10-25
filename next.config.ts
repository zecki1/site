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