"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"

interface LocalizedText {
    ptBR?: React.ReactNode
    en?: React.ReactNode
    es?: React.ReactNode
    [key: string]: React.ReactNode | undefined
}

export interface TextTranslatorProps {
    children: LocalizedText
    ignoreCheck?: boolean
}

const TextTranslator: React.FC<TextTranslatorProps> = ({ children, ignoreCheck = false }) => {
    const { i18n } = useTranslation()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const selectedLanguage = isMounted ? i18n.language : "ptBR"

    const translatedText = children[selectedLanguage]
    const fallbackText = children.ptBR ?? "[SEM TEXTO PT-BR]"

    const extractText = (node: React.ReactNode): string => {
        if (typeof node === "string") return node
        if (typeof node === "number") return node.toString()
        if (React.isValidElement(node)) {
            const element = node as React.ReactElement<{ children?: React.ReactNode }>
            return React.Children.toArray(element.props.children)
                .map((child) => extractText(child))
                .join(" ")
        }
        if (Array.isArray(node)) return node.map(extractText).join(" ")
        return ""
    }

    const validateTranslation = (text: React.ReactNode): string => {
        const extractedText = extractText(text).trim()
        if (!text || extractedText === "") return "empty"
        if (text === "#" || extractedText === "#") return "hasHash"
        if (/lorem ipsum/i.test(extractedText)) return "loremIpsum"
        if (/^\s|\s$/.test(extractedText)) return "hasExtraSpaces"
        return "valid"
    }

    const hasRepeatedTranslations = (): boolean => {
        if (ignoreCheck) return false
        const texts = Object.entries(children)
            .map(([key, value]) => [key, extractText(value).toLowerCase().trim()])
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as { [key: string]: string })

        const ptBRText = texts["ptBR"] || ""
        const currentText = texts[selectedLanguage] || ""

        if (selectedLanguage !== "ptBR" && currentText === ptBRText && currentText !== "") {
            return true
        }

        const textValues = Object.values(texts).filter((v) => v !== "")
        if (textValues.length > 1) {
            const firstValue = textValues[0]
            const allSame = textValues.every((value) => value === firstValue)
            if (allSame) return true
        }
        return false
    }

    const isMissing =
        !ignoreCheck &&
        (translatedText === undefined ||
            translatedText === null ||
            validateTranslation(translatedText) !== "valid" ||
            hasRepeatedTranslations())

    return (
        <span className={isMissing ? "text-red-500 font-bold bg-red-200 px-2 rounded" : ""}>
            {isMissing ? (
                <>
                    <span className="text-red-600">[TRADUZIR]</span> {fallbackText}
                </>
            ) : (
                translatedText
            )}
        </span>
    )
}

export default TextTranslator