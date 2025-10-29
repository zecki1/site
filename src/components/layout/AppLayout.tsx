"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollSmootherHeader } from "@/components/gsap/ScrollSmootherHeader";
import { images } from "@/lib/images";

// Registra os plugins do GSAP globalmente, uma única vez
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Rotas onde o header animado e a rolagem suave NÃO devem aparecer.
    const adminRoutes = ['/admin', '/sites', '/login'];
    const isPublicPage = !adminRoutes.some(route => pathname?.startsWith(route));

    // Efeito para inicializar o ScrollSmoother apenas em páginas públicas.
    useLayoutEffect(() => {
        // Se não for uma página pública, não faz nada.
        if (!isPublicPage) return;

        // Cria a instância do ScrollSmoother, que gerencia a rolagem da página.
        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.2, // Controle a "suavidade". Valores entre 1 e 2 são um bom começo.
            effects: true, // Ativa efeitos de paralaxe com atributos data-speed/data-lag.
        });

        // Função de limpeza: é executada quando o componente é desmontado.
        // Isso é crucial para evitar vazamentos de memória ao navegar entre páginas.
        return () => {
            smoother.kill();
        };

    }, [isPublicPage, pathname]); // Re-executa o efeito se o tipo de página mudar.

    // Se for uma página pública, renderiza o layout com o header,
    // a rolagem suave e a estrutura de divs necessária.
    if (isPublicPage) {
        return (
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <ScrollSmootherHeader
                        desktopImage={images.capaDesktop}
                        mobileImage={images.capaMobile}
                    />
                    <main
                        id="main-content"
                        // A classe 'isolate' cria um novo contexto de empilhamento.
                        // O padding-top cria o espaço para o header em tela cheia.
                        className="relative isolate pt-[60vh]"
                    >
                        {children}
                    </main>
                </div>
            </div>
        );
    }
   return (
        <main id="main-content">
            {children}
        </main>
    );
}