// src/components/ThemeProvider.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            console.log("Tema inicial carregado:", savedTheme || "system");
            return savedTheme || "system";
        }
        return "system";
    });

    useEffect(() => {
        const root = document.documentElement;
        console.log("Aplicando tema:", theme);
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.toggle("dark", systemTheme === "dark");
            console.log("Tema do sistema aplicado:", systemTheme);
        } else {
            root.classList.toggle("dark", theme === "dark");
            console.log("Tema fixo aplicado:", theme);
        }
        if (theme !== "system") {
            localStorage.setItem("theme", theme);
        } else {
            localStorage.removeItem("theme");
        }
    }, [theme]);

    useEffect(() => {
        if (theme !== "system") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            const systemTheme = mediaQuery.matches ? "dark" : "light";
            document.documentElement.classList.toggle("dark", systemTheme === "dark");
            console.log("Tema do sistema mudou para:", systemTheme);
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
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