// src/lib/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "ptBR",
        supportedLngs: ["ptBR", "en", "es"],
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ["localStorage", "navigator"], // Prioriza localStorage
            caches: ["localStorage"], // Salva no localStorage
            lookupLocalStorage: "i18nLng", // Nome da chave no localStorage
        },
    });

export default i18n;