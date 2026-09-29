/** @type {import('next').NextConfig} */

// Rotas do hub — §8.5 do `planejamento-projetos.md`.
//
// Cada app é um build estático do Angular servido no seu próprio domínio, e o
// `baseHref` delas é `/`. O prefixo do hub é só um rewrite de borda: por isso
// todo par vem com o `:path*`, senão as rotas internas do app (ex.: as de
// detail do catálogo ou o `/dashboard` do Ledger) 404ariam por ficarem presas
// na origem do hub.
const ROTAS_DO_ROADMAP: ReadonlyArray<{
  prefixo: string;
  host: string;
}> = [
  { prefixo: "/gamehub", host: "vice-district.vercel.app" },
  { prefixo: "/atelier", host: "angular-atelier-north.vercel.app" },
  { prefixo: "/ledger", host: "angular-ledger-bank.vercel.app" },
  { prefixo: "/metrica", host: "angular-metrica-bi.vercel.app" },
  { prefixo: "/aurum", host: "angular-aurum-3d.vercel.app" },
  { prefixo: "/cadence", host: "angular-cadence.vercel.app" },
  { prefixo: "/pluma", host: "angular-pluma-pwa.vercel.app" },
  { prefixo: "/orbit", host: "nx-orbit-microfrontends.vercel.app" },
  { prefixo: "/portfolio", host: "angular-portfolio.vercel.app" },
];

const REWRITES_DO_ROADMAP = ROTAS_DO_ROADMAP.flatMap(({ prefixo, host }) => [
  { source: prefixo, destination: `https://${host}/` },
  { source: `${prefixo}/:path*`, destination: `https://${host}/:path*` },
]);

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
      // Por último: as rotas do roadmap são as do próprio conjunto, mas
      // collided com `/teleprompt/next` exigiria a ordem explícita acima.
      ...REWRITES_DO_ROADMAP,
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
