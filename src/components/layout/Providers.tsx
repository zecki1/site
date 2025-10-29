"use client";

import "@/lib/i18n";
import { useState, useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ScrollSmootherHeader } from "@/components/gsap/ScrollSmootherHeader";
import { Toaster } from "@/components/ui/sonner";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { GlobalBackgroundEffects } from "@/components/effects/GlobalBackgroundEffects";
import { images } from "@/lib/images"; // ✅ Certifique-se que o caminho para suas imagens está correto

// Registra os plugins do GSAP globalmente, uma única vez
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function Providers({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation();
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    // Efeito para lógica de cliente (idioma, etc.)
    useEffect(() => {
        setIsMounted(true);
        const savedLang = localStorage.getItem("i18nLng");
        if (savedLang) {
            i18n.changeLanguage(savedLang);
        } else {
            i18n.changeLanguage("ptBR");
        }
    }, [i18n]);

    // Lógica para decidir se a página atual é pública (e deve ter o header animado)
    const adminRoutes = ['/admin', '/sites', '/login'];
    const isPublicPage = !adminRoutes.some(route => pathname?.startsWith(route));

    // Efeito para inicializar e destruir o ScrollSmoother
    useLayoutEffect(() => {
        if (!isPublicPage || !isMounted) return;

        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.2,
            effects: true,
        });

        return () => {
            smoother.kill();
        };
    }, [isPublicPage, isMounted, pathname]);

    // Fallback para evitar "hydration mismatch"
    if (!isMounted) {
        return <ThemeProvider>{children}</ThemeProvider>;
    }

    // Renderização para páginas PÚBLICAS
    if (isPublicPage) {
        return (
            <ThemeProvider>
                <CustomCursor />
                <GlobalBackgroundEffects />
                <div id="smooth-wrapper">
                    <div id="smooth-content">
                        {/* ✅ CORREÇÃO: Passando as props corretas: desktopImage e mobileImage */}
                        <ScrollSmootherHeader
                            desktopImage={images.capaDesktop}
                            mobileImage={images.capaMobile}
                        />
                        <main id="main-content" className="relative isolate pt-[60vh]">
                            {children}
                        </main>
                        <Toaster />
                    </div>
                </div>
            </ThemeProvider>
        );
    }

    // Renderização para páginas de ADMIN/LOGIN (layout simples)
    return (
        <ThemeProvider>
            <CustomCursor />
            <GlobalBackgroundEffects />
            <main id="main-content">
                {children}
            </main>
            <Toaster />
        </ThemeProvider>
    );
}