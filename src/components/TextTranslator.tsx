// src/components/TextTranslator.tsx
"use client";

import React, { useMemo } from "react";
import { useLanguage } from "@/hooks/useLanguage";

interface LocalizedText {
  ptBR?: React.ReactNode;
  en?: React.ReactNode;
  es?: React.ReactNode;
  [key: string]: React.ReactNode | undefined;
}

interface TextTranslatorProps {
  children: LocalizedText;
  ignoreCheck?: boolean;
}

const TextTranslator: React.FC<TextTranslatorProps> = ({ children, ignoreCheck = false }) => {
  const { selectedLanguage } = useLanguage();

  const translatedText = children[selectedLanguage];
  const fallbackText = children.ptBR ?? "[SEM TEXTO PT-BR]";

  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (React.isValidElement(node)) {
      return React.Children.toArray(node.props.children)
        .map((child) => extractText(child))
        .join(" ");
    }
    if (Array.isArray(node)) return node.map(extractText).join(" ");
    return "";
  };

  const validateTranslation = useMemo(() => {
    const extractedText = extractText(translatedText).trim();
    if (!translatedText || extractedText === "") return "empty";
    if (translatedText === "#" || extractedText === "#") return "hasHash";
    if (/lorem ipsum/i.test(extractedText)) return "loremIpsum";
    if (/^\s|\s$/.test(extractedText)) return "hasExtraSpaces";
    return "valid";
  }, [translatedText]);

  const hasRepeatedTranslations = useMemo(() => {
    if (ignoreCheck) return false;

    const texts = Object.entries(children)
      .map(([key, value]) => [key, extractText(value).toLowerCase().trim()])
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as { [key: string]: string });

    const ptBRText = texts["ptBR"] || "";
    const currentText = texts[selectedLanguage] || "";

    if (selectedLanguage !== "ptBR" && currentText === ptBRText && currentText !== "") {
      return true;
    }

    const textValues = Object.values(texts).filter((v) => v !== "");
    if (textValues.length > 1) {
      const firstValue = textValues[0];
      return textValues.every((value) => value === firstValue);
    }

    return false;
  }, [children, selectedLanguage, ignoreCheck]);

  const isMissing =
    !ignoreCheck &&
    (translatedText === undefined ||
      translatedText === null ||
      validateTranslation !== "valid" ||
      hasRepeatedTranslations);

  return (
    <span
      className={isMissing ? "text-red-500 font-bold bg-red-100 px-2 py-1 rounded" : ""}
      aria-live="polite"
    >
      {isMissing ? (
        <>
          <span className="text-red-600 mr-1">[TRADUZIR]</span>
          {fallbackText}
        </>
      ) : (
        translatedText
      )}
    </span>
  );
};

export default TextTranslator;