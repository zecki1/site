"use client";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollSmootherHeader } from "@/components/gsap/ScrollSmootherHeader";
import Link from "next/link";

export default function DynamicPageClient({ slug }: { slug: string }) {
    const { i18n } = useTranslation();

    useEffect(() => {
        const savedLang = localStorage.getItem("i18nLng");
        if (!savedLang || savedLang !== "ptBR") {
            i18n.changeLanguage("ptBR");
        }
    }, [i18n]);

    return (
        <div>
            <ScrollSmootherHeader />
            <div id="main-content" className="pt-[100vh] min-h-screen" style={{ opacity: 0, pointerEvents: "none" }}>
                <h1>Bem-vindo ao Zecki1 - Slug: {slug}</h1>
                <Link href="/login" className="text-blue-600 hover:underline">
                    Área de Login para Clientes
                </Link>
            </div>
        </div>
    );
}