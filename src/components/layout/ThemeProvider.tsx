// src/components/layout/ThemeProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

// Tipos para todas as nossas configurações (sem alteração)
type Theme = "dark" | "light" | "system";
type AccessibilityMode = "monocromatic" | "protanopia" | "deuteranopia" | "tritanopia" | "deuteranomaly" | "protanomaly" | "none";
type FontFamily = "default" | "opendyslexic";

// Propriedades do provedor (sem alteração)
type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
    accessibilityKey?: string;
    fontSizeKey?: string;
    fontFamilyKey?: string;
};

// A "forma" do nosso contexto (sem alteração)
type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    accessibilityMode: AccessibilityMode;
    setAccessibilityMode: (mode: AccessibilityMode) => void;
    fontSize: number;
    setFontSize: (size: number) => void;
    fontFamily: FontFamily;
    setFontFamily: (font: FontFamily) => void;
};

// Estado inicial (sem alteração)
const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
    accessibilityMode: "none",
    setAccessibilityMode: () => null,
    fontSize: 16,
    setFontSize: () => null,
    fontFamily: "default",
    setFontFamily: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "zecki1-ui-theme",
    accessibilityKey = "zecki1-ui-accessibility",
    fontSizeKey = "zecki1-ui-font-size",
    fontFamilyKey = "zecki1-ui-font-family",
    ...props
}: ThemeProviderProps) {
    // 1. Inicialize o estado com valores PADRÃO, SEM LER o localStorage.
    // Isso garante que a renderização do servidor não quebre.
    const [theme, setTheme] = useState<Theme>(defaultTheme);
    const [accessibilityMode, setAccessibilityMode] = useState<AccessibilityMode>("none");
    const [fontSize, setFontSize] = useState<number>(16);
    const [fontFamily, setFontFamily] = useState<FontFamily>("default");

    // 2. Use um useEffect que roda APENAS no CLIENTE para ler o localStorage.
    useEffect(() => {
        const savedTheme = (localStorage.getItem(storageKey) as Theme) || defaultTheme;
        const savedAccessibilityMode = (localStorage.getItem(accessibilityKey) as AccessibilityMode) || "none";
        const savedFontSize = parseInt(localStorage.getItem(fontSizeKey) || "16", 10);
        const savedFontFamily = (localStorage.getItem(fontFamilyKey) as FontFamily) || "default";

        // Atualiza o estado com os valores salvos
        setTheme(savedTheme);
        setAccessibilityMode(savedAccessibilityMode);
        setFontSize(savedFontSize);
        setFontFamily(savedFontFamily);
    }, []); // O array vazio [] garante que isso só rode uma vez, no cliente.

    // 3. Este segundo useEffect aplica as classes/estilos sempre que o estado muda.
    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }

        const allModes: AccessibilityMode[] = ["monocromatic", "protanopia", "deuteranopia", "tritanopia", "deuteranomaly", "protanomaly"];
        root.classList.remove(...allModes);
        if (accessibilityMode !== "none") {
            root.classList.add(accessibilityMode);
        }

        root.style.fontFamily = fontFamily === "opendyslexic" ? "'OpenDyslexic', sans-serif" : "";
        root.style.fontSize = `${fontSize}px`;

    }, [theme, accessibilityMode, fontSize, fontFamily]);

    // A lógica para salvar no localStorage agora está dentro de funções wrapper
    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
        accessibilityMode,
        setAccessibilityMode: (mode: AccessibilityMode) => {
            localStorage.setItem(accessibilityKey, mode);
            setAccessibilityMode(mode);
        },
        fontSize,
        setFontSize: (size: number) => {
            localStorage.setItem(fontSizeKey, size.toString());
            setFontSize(size);
        },
        fontFamily,
        setFontFamily: (font: FontFamily) => {
            localStorage.setItem(fontFamilyKey, font);
            setFontFamily(font);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};