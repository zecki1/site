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
            order: ["localStorage", "navigator"],
            caches: ["localStorage"],
            lookupLocalStorage: "i18nLng",
        },
    })
    .then(() => {
        console.log("i18next inicializado. Idioma inicial:", i18n.language);
    });

export default i18n;