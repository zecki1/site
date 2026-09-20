"use client";

import "@/lib/i18n";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LenisSmoothScroll } from "@/components/layout/LenisSmoothScroll";
import { useIsDesktop } from '@/lib/hooks/uselsDesktop';
// import { ScrollSmootherHeader } from "@/components/gsap/ScrollSmootherHeader";

// Cursor customizado (gsap) só baixa em desktop — fora do caminho crítico.
const CustomCursor = dynamic(
    () => import("@/components/layout/CustomCursor").then((m) => m.CustomCursor),
    { ssr: false, loading: () => null }
);

// Toaster (sonner) só é necessário após uma interação — fora do caminho crítico.
const Toaster = dynamic(
    () => import("@/components/ui/sonner").then((m) => m.Toaster),
    { ssr: false, loading: () => null }
);

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
            <LenisSmoothScroll />
            {children}
            <Toaster />
        </ThemeProvider>
    );
}
