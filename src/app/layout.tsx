"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../app/globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";
import "../lib/i18n"; // Importa a configuração do i18next

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Forçar ptBR como idioma padrão na primeira carga ou se o localStorage estiver vazio
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
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <Header />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}