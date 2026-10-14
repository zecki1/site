import { describe, it, expect, vi, beforeEach } from "vitest";
import { setLanguage } from "@/lib/setLanguage";

// O `window.location` do jsdom é unforgeable; substituímos o objeto inteiro
// para observar o `reload()` que o `setLanguage` dispara.
function stubReload() {
  const reload = vi.fn();
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: { ...window.location, reload, href: "http://localhost/" },
  });
  return reload;
}

describe("setLanguage", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("lang");
    document.cookie = "lang=; path=/; max-age=0";
  });

  it("grava a preferência no localStorage", () => {
    stubReload();
    setLanguage("en");
    expect(localStorage.getItem("i18nLng")).toBe("en");
  });

  it("sincroniza o atributo lang do documento (a11y)", () => {
    stubReload();
    setLanguage("es");
    expect(document.documentElement.getAttribute("lang")).toBe("es");
  });

  it("persiste o idioma no cookie `lang` e recarrega a página", () => {
    const reload = stubReload();
    setLanguage("ptBR");
    expect(document.cookie).toContain("lang=ptBR");
    expect(reload).toHaveBeenCalledTimes(1);
  });
});
