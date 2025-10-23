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

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var savedTheme = localStorage.getItem('theme') || 'system';
                var isDark = savedTheme === 'dark' || 
                  (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
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
      </body>
    </html>
  );
}