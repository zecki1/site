// src/components/LanguageProvider.tsx
"use client";

import { createContext, useContext, useState } from "react";

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
    const [selectedLanguage, setSelectedLanguage] = useState("ptBR"); // Idioma padrão: português

    return (
        <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage deve ser usado dentro de um LanguageProvider");
    }
    return context;
}