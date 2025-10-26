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

    const isClientRoute = pathname?.startsWith("/sites") || pathname?.startsWith("/admin");
    const showHeader = !isClientRoute;

    if (!isMounted) {
        return <>{children}</>;
    }

    return (
        <ThemeProvider>
            <CustomCursor />
            {showHeader && <ScrollSmootherHeader backgroundImage={images.capa} />}
            <div
                id="main-content"
                className={showHeader ? "pt-[100vh]" : ""}
            >
                {children}
            </div>
            <Toaster />
        </ThemeProvider>
    );
}