import React from "react";
import { useTranslation } from "react-i18next";

export const BrazilFlag: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" fill="#009B3A" />
        <path d="M12 4L22 12L12 20L2 12L12 4Z" fill="#FEDF00" />
        <circle cx="12" cy="12" r="4" fill="#002776" />
        <path
            d="M12 8.5C13.5 8.5 15 9.5 15 12C15 14.5 13.5 15.5 12 15.5C10.5 15.5 9 14.5 9 12C9 9.5 10.5 8.5 12 8.5Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.5"
        />
    </svg>
);

export const USFlag: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" fill="#FFFFFF" />
        <rect width="24" height="2" fill="#B22234" />
        <rect y="4" width="24" height="2" fill="#B22234" />
        <rect y="8" width="24" height="2" fill="#B22234" />
        <rect y="12" width="24" height="2" fill="#B22234" />
        <rect y="16" width="24" height="2" fill="#B22234" />
        <rect y="20" width="24" height="2" fill="#B22234" />
        <rect width="10" height="12" fill="#3C3B6E" />
        <g fill="#FFFFFF">
            <circle cx="2" cy="2" r="0.5" />
            <circle cx="4" cy="2" r="0.5" />
            <circle cx="6" cy="2" r="0.5" />
            <circle cx="8" cy="2" r="0.5" />
            <circle cx="3" cy="4" r="0.5" />
            <circle cx="5" cy="4" r="0.5" />
            <circle cx="7" cy="4" r="0.5" />
            <circle cx="2" cy="6" r="0.5" />
            <circle cx="4" cy="6" r="0.5" />
            <circle cx="6" cy="6" r="0.5" />
            <circle cx="8" cy="6" r="0.5" />
        </g>
    </svg>
);

export const SpainFlag: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="6" fill="#C60B1E" />
        <rect y="6" width="24" height="12" fill="#FFC107" />
        <rect y="18" width="24" height="6" fill="#C60B1E" />
    </svg>
);

export const Flags: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("i18nLng", lng);
    };

    return (
        <div className="flex space-x-2">
            <button
                onClick={() => changeLanguage("ptBR")}
                className={`p-2 ${i18n.language === "ptBR" ? "border-2 border-purple-500" : ""}`}
            >
                <BrazilFlag className="w-6 h-6" />
            </button>
            <button
                onClick={() => changeLanguage("en")}
                className={`p-2 ${i18n.language === "en" ? "border-2 border-purple-500" : ""}`}
            >
                <USFlag className="w-6 h-6" />
            </button>
            <button
                onClick={() => changeLanguage("es")}
                className={`p-2 ${i18n.language === "es" ? "border-2 border-purple-500" : ""}`}
            >
                <SpainFlag className="w-6 h-6" />
            </button>
        </div>
    );
};