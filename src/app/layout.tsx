// src/app/layout.tsx
import "../app/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
// import { Header } from "@/components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      <body>
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground">
            {children} {/* Header já está em [slug]/page.tsx */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}