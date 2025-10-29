import type { Metadata } from 'next';
import "../app/globals.css";
import { Providers } from '@/components/layout/Providers';
import { VlibrasWidget } from '@/components/layout/VlibrasWidget';

export const metadata: Metadata = {
  // ...seus metadados permanecem os mesmos
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* ...seu script de tema e links permanecem os mesmos */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var savedTheme = localStorage.getItem('zecki1-ui-theme') || 'system';
                var isDark = savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
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
      <body className="min-h-screen bg-background" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
        <VlibrasWidget />
      </body>
    </html>
  );
}