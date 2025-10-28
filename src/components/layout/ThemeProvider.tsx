"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

type Theme = "dark" | "light" | "system";
type AccessibilityMode = "monocromatic" | "protanopia" | "deuteranopia" | "tritanopia" | "deuteranomaly" | "protanomaly" | "none";
type FontFamily = "default" | "opendyslexic";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
    accessibilityKey?: string;
    fontSizeKey?: string;
    fontFamilyKey?: string;
};

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
    // CORREÇÃO: Usamos a função de inicialização do useState para ler o localStorage
    // apenas uma vez, na primeira renderização, de forma segura no servidor e no cliente.
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === 'undefined') {
            return defaultTheme;
        }
        return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    });

    const [accessibilityMode, setAccessibilityMode] = useState<AccessibilityMode>(() => {
        if (typeof window === 'undefined') {
            return "none";
        }
        return (localStorage.getItem(accessibilityKey) as AccessibilityMode) || "none";
    });

    const [fontSize, setFontSize] = useState<number>(() => {
        if (typeof window === 'undefined') {
            return 16;
        }
        return parseInt(localStorage.getItem(fontSizeKey) || "16", 10);
    });

    const [fontFamily, setFontFamily] = useState<FontFamily>(() => {
        if (typeof window === 'undefined') {
            return "default";
        }
        return (localStorage.getItem(fontFamilyKey) as FontFamily) || "default";
    });

    // O useEffect de inicialização foi removido, pois a lógica agora está nos useStates.

    // Este useEffect continua, pois ele precisa ser executado sempre que um dos valores mudar.
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