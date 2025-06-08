"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollSmootherHeader } from "@/components/gsap/ScrollSmootherHeader";
import Login from "@/components/layout/Login";
import "../../lib/i18n";

export default function LoginPage() {
    const { i18n } = useTranslation();

    useEffect(() => {
        const savedLang = localStorage.getItem("i18nLng");
        if (!savedLang || savedLang !== "ptBR") {
            i18n.changeLanguage("ptBR");
        }

        gsap.to("#main-content", {
            opacity: 1,
            pointerEvents: "auto",
            duration: 1,
            ease: "power2.out",
        });

        return () => {
            gsap.killTweensOf("#main-content");
        };
    }, [i18n]);

    return (
        <div>
            <ScrollSmootherHeader />
            <div
                id="main-content"
                className="pt-[100vh] min-h-screen flex items-center justify-center"
                style={{ opacity: 0, pointerEvents: "none" }}
            >
                <Login />
            </div>
        </div>
    );
}