"use client";

import { usePathname } from "next/navigation";
import { ScrollSmootherHeader } from "@/components/gsap/ScrollSmootherHeader";
import { images } from "@/lib/images";

export function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Rotas onde o header animado NÃO deve aparecer.
    const adminRoutes = ['/admin', '/sites', '/login'];
    // Verifica se a rota atual começa com alguma das rotas de admin.
    const isPublicPage = !adminRoutes.some(route => pathname?.startsWith(route));

    // Se for uma página pública, renderiza o layout com o header especial.
    if (isPublicPage) {
        return (
            <>
                <ScrollSmootherHeader
                    desktopImage={images.capaDesktop}
                    capaMobile={images.capaMobile}
                />
                
                <main
                    id="main-content"
                     className="relative isolate pt-[60vh]"
                >
                    {children}
                </main>
            </>
        );
    }

    // Para todas as outras páginas (admin, login, etc.), renderiza um layout simples.
    return (
        <main id="main-content">
            {children}
        </main>
    );
}