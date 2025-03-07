// src/components/ThemeProvider.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState("light");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "system";
        const initialTheme =
            savedTheme === "system"
                ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
                : savedTheme;
        setTheme(initialTheme);
        document.documentElement.classList.toggle("dark", initialTheme === "dark");
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        const root = document.documentElement;
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.toggle("dark", systemTheme === "dark");
        } else {
            root.classList.toggle("dark", theme === "dark");
        }
        if (theme !== "system") {
            localStorage.setItem("theme", theme);
        } else {
            localStorage.removeItem("theme");
        }
    }, [theme, isMounted]);

    useEffect(() => {
        if (!isMounted || theme !== "system") return;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            const systemTheme = mediaQuery.matches ? "dark" : "light";
            document.documentElement.classList.toggle("dark", systemTheme === "dark");
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme, isMounted]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
    }
    return context;
}