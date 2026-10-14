import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";
import TextTranslator from "@/components/layout/TextTranslator";

const texts = {
  ptBR: "Olá mundo",
  en: "Hello world",
  es: "Hola mundo",
};

function renderTranslated(ui: React.ReactNode) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
}

describe("TextTranslator", () => {
  beforeEach(async () => {
    await i18n.changeLanguage("ptBR");
  });

  afterEach(async () => {
    await i18n.changeLanguage("ptBR");
  });

  it("mostra o texto no idioma ativo", () => {
    renderTranslated(<TextTranslator>{texts}</TextTranslator>);
    expect(screen.getByText("Olá mundo")).toBeInTheDocument();
  });

  it("troca o texto ao mudar o idioma", async () => {
    await i18n.changeLanguage("en");
    renderTranslated(<TextTranslator>{texts}</TextTranslator>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("avisa e usa o fallback pt-BR quando falta a tradução", () => {
    renderTranslated(
      <TextTranslator>{{ en: "Only english" }}</TextTranslator>,
    );
    expect(screen.getByText("[TRADUZIR]")).toBeInTheDocument();
    expect(screen.getByText(/SEM TEXTO PT-BR/)).toBeInTheDocument();
  });

  it("marca como ausente quando todas as traduções são iguais", () => {
    renderTranslated(
      <TextTranslator>{{ ptBR: "Igual", en: "Igual", es: "Igual" }}</TextTranslator>,
    );
    expect(screen.getByText("[TRADUZIR]")).toBeInTheDocument();
  });

  it("não marca quando ignoreCheck está ativo", () => {
    renderTranslated(
      <TextTranslator ignoreCheck>
        {{ ptBR: "Igual", en: "Igual", es: "Igual" }}
      </TextTranslator>,
    );
    expect(screen.getByText("Igual")).toBeInTheDocument();
    expect(screen.queryByText("[TRADUZIR]")).not.toBeInTheDocument();
  });
});
