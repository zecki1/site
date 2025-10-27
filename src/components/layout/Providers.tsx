"use client";

import "@/lib/i18n";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ScrollSmootherHeader } from "@/components/gsap/ScrollSmootherHeader";
import { Toaster } from "@/components/ui/sonner";
import { images } from "@/components/layout/ImageContainer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { GlobalBackgroundEffects } from "@/components/effects/GlobalBackgroundEffects";

export function Providers({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation();
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedLang = localStorage.getItem("i18nLng");
        if (savedLang) { i18n.changeLanguage(savedLang); }
        else { i18n.changeLanguage("ptBR"); }
    }, [i18n]);

    const routesWithoutHeader = ['/login', '/admin', '/sites'];
    const showGlobalElements = isMounted && !routesWithoutHeader.some(route => pathname?.startsWith(route));

    if (!isMounted) {
        return (
            <ThemeProvider>
                <div id="main-content">{children}</div>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider>
            <CustomCursor />

            {showGlobalElements && (
                <>
                    <ScrollSmootherHeader backgroundImage={images.capa} />
                    <GlobalBackgroundEffects />
                </>
            )}

            <main id="main-content" className="relative isolate pt-[60vh]">
                {children}
            </main>
            <Toaster />
        </ThemeProvider>
    );
}