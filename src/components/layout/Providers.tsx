"use client";

import "@/lib/i18n";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { GlobalBackgroundEffects } from "@/components/effects/GlobalBackgroundEffects";
import { useIsDesktop } from '@/lib/hooks/uselsDesktop';
// import { ScrollSmootherHeader } from "@/components/gsap/ScrollSmootherHeader";

export function Providers({ children }: { children: React.ReactNode }) {
    const isDesktop = useIsDesktop(); // Hook que nos diz se é desktop.
    const { i18n } = useTranslation();
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

    if (!isMounted) {
        // Retorna um fallback mínimo para evitar "hydration mismatch"
        // durante a renderização do servidor.
        return (
            <ThemeProvider>
                {children}
            </ThemeProvider>
        );
    }
    return (
        <ThemeProvider>
            {isDesktop && <CustomCursor />}
            <GlobalBackgroundEffects />
            {children}
            <Toaster />
        </ThemeProvider>
    );
}
