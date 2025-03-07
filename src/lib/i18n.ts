// src/lib/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Configuração mínima, pois o TextTranslator gerencia as traduções
i18n
    .use(LanguageDetector) // Detecta o idioma do navegador
    .use(initReactI18next) // Integra com React
    .init({
        fallbackLng: "ptBR", // Idioma padrão
        supportedLngs: ["ptBR", "en", "es"], // Idiomas suportados
        interpolation: {
            escapeValue: false, // React já escapa por padrão
        },
    });

export default i18n;