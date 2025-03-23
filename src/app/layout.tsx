// src/app/layout.tsx
"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../app/globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ScrollSmootherHeader } from "@/components/gsap/ScrollSmootherHeader";
import { Toaster } from "@/components/ui/sonner";
import "../lib/i18n";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("i18nLng");
    if (!savedLang || savedLang !== "ptBR") {
      i18n.changeLanguage("ptBR");
    }
  }, [i18n]);

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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <ScrollSmootherHeader />
          <div id="main-content" className="pt-[100vh] min-h-screen" style={{ opacity: 0, pointerEvents: "none" }}>
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}