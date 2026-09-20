"use client";

// Troca de idioma em todo o site. A home é server-rendered a partir do cookie
// `lang`, então mudar o idioma recarrega a página para o texto atualizar.
export function setLanguage(lng: string) {
    try {
        localStorage.setItem("i18nLng", lng);
    } catch {
        /* localStorage indisponível (SSR) */
    }
    document.cookie = `lang=${lng}; path=/; samesite=lax; max-age=31536000`;
    window.location.reload();
}