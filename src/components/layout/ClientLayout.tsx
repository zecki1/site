"use client"; // Esta é a fronteira entre o servidor e o cliente

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ScrollSmootherHeader } from "@/components/gsap/ScrollSmootherHeader";
import { Toaster } from "@/components/ui/sonner";
import { images } from "@/components/layout/ImageContainer";
import { CustomCursor } from "@/components/layout/CustomCursor";

// Este componente agora lida com toda a lógica de cliente
export function ClientLayout({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation();
    const pathname = usePathname();

    useEffect(() => {
        const savedLang = localStorage.getItem("i18nLng");
        if (savedLang) {
            i18n.changeLanguage(savedLang);
        } else {
            i18n.changeLanguage("ptBR");
        }
    }, [i18n]);

    // A lógica para mostrar/esconder o header permanece aqui
    const isClientRoute = pathname?.startsWith("/sites") || pathname?.startsWith("/admin");
    const showHeader = !isClientRoute;

    // Renderiza todos os provedores e componentes de cliente
    return (
        <ThemeProvider>
            <CustomCursor />
            {showHeader && <ScrollSmootherHeader backgroundImage={images.capa} />}
            <div
                id="main-content"
                // className={showHeader ? "pt-[0vh]" : ""}
                className={showHeader ? "100vh" : ""}
            >
                {children}
            </div>
            <Toaster />
        </ThemeProvider>
    );
}