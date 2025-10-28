<<<<<<< HEAD
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import "../app/globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ScrollSmootherHeader } from "@/components/gsap/ScrollSmootherHeader";
import { Toaster } from "@/components/ui/sonner";
import "../lib/i18n";
import { images } from "@/components/layout/ImageContainer";
import { CustomCursor } from "@/components/layout/CustomCursor"; // Importe o cursor

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const pathname = usePathname();

  useEffect(() => {
    const savedLang = localStorage.getItem("i18nLng");
    if (!savedLang || savedLang !== "ptBR") {
      i18n.changeLanguage("ptBR");
    }
  }, [i18n]);

  const isClientRoute = pathname?.startsWith("/sites") || pathname?.startsWith("/admin");
  const showHeader = !isClientRoute;

=======
import type { Metadata } from 'next';
import "../app/globals.css";
import { Providers } from '@/components/layout/Providers';
import { VlibrasWidget } from '@/components/layout/VlibrasWidget';
import { AppLayout } from '@/components/layout/AppLayout'; // Importe o novo componente

export const metadata: Metadata = {
  metadataBase: new URL('https://zecki1.com.br'),
  title: "Ezequiel Monção - Desenvolvedor Fullstack & UI/UX Designer",
  description: "Portfólio de Ezequiel Monção, Desenvolvedor Fullstack e Designer com mais de 10 anos de experiência na criação de soluções digitais robustas e interfaces de usuário intuitivas. Especialista em React, Next.js, Three.js e Design Systems.",
  keywords: "Desenvolvedor Front-end, Next.js, React, Three.js, UI/UX Design, Portfólio, Desenvolvedor Fullstack, São Paulo, zecki1, Ezequiel Monção, Design de Interfaces, Laravel, PHP",
  openGraph: {
    title: "Ezequiel Monção - Desenvolvedor Fullstack & UI/UX Designer",
    description: "Explore projetos inovadores que combinam design e tecnologia de ponta. Especialista em React, Next.js e Three.js.",
    url: "https://zecki1.com.br",
    siteName: "Ezequiel Monção | Portfólio",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Logo ou imagem de apresentação de Ezequiel Monção"
    }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ezequiel Monção - Desenvolvedor Fullstack & UI/UX Designer",
    description: "Portfólio de projetos web, desde interfaces ricas com Next.js até experiências 3D com Three.js.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicons/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
>>>>>>> refazendo-header
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
<<<<<<< HEAD
                var savedTheme = localStorage.getItem('theme') || 'system';
                var isDark = savedTheme === 'dark' || 
                  (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
=======
                var savedTheme = localStorage.getItem('zecki1-ui-theme') || 'system';
                var isDark = savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
>>>>>>> refazendo-header
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
      </head>
<<<<<<< HEAD
      <body className="min-h-screen bg-background">
        <ThemeProvider>
          <CustomCursor /> {/* Adicione o componente do cursor aqui */}
          {showHeader && <ScrollSmootherHeader backgroundImage={images.capa} />}
          <div
            id="main-content"
            className={showHeader ? "pt-[100vh]" : ""}
          >
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
=======
      <body className="min-h-screen bg-background" suppressHydrationWarning>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
        <VlibrasWidget />
>>>>>>> refazendo-header
      </body>
    </html>
  );
}