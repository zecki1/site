"use client";

import "@/lib/i18n";
import { useState, useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { GlobalBackgroundEffects } from "@/components/effects/GlobalBackgroundEffects";
import { ScrollSmootherHeader } from "@/components/gsap/ScrollSmootherHeader";
import { images } from "@/lib/images"; // ✅ Certifique-se que este caminho está correto

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function Providers({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation();
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedLang = localStorage.getItem("i18nLng");
        if (savedLang) {
            i18n.changeLanguage(savedLang);
        } else {
            i18n.changeLanguage("ptBR");
        }
    }, [i18n]);

    const adminRoutes = ['/admin', '/sites', '/login'];
    const isPublicPage = !adminRoutes.some(route => pathname?.startsWith(route));

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

    if (!isMounted) {
        return <ThemeProvider>{children}</ThemeProvider>;
    }

    return (
        <ThemeProvider>
            <CustomCursor />
            <GlobalBackgroundEffects />
            {isPublicPage ? (
                <>
                    {/* ✅ CORREÇÃO ESTRUTURAL: Header está FORA do wrapper de rolagem */}
                    <ScrollSmootherHeader
                        desktopImage={images.capaDesktop}
                        mobileImage={images.capaMobile}
                    />
                    <div id="smooth-wrapper">
                        <div id="smooth-content">
                            {/* O conteúdo principal agora começa no topo, atrás do header */}
                            <main id="main-content">
                                {children}
                            </main>
                        </div>
                    </div>
                </>
            ) : (
                // Layout simples para páginas de admin
                <main id="main-content">
                    {children}
                </main>
            )}
            <Toaster />
        </ThemeProvider>
    );
}
