"use client"

import React from "react"

import { ChevronDown } from "lucide-react"
import TextTranslator from '@/components/TextTranslator';

const ScrollIndicator: React.FC = () => {
    return (
        <div className="flex flex-col items-center absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30">
            {/* Opção 1: Seta para baixo */}
            <ChevronDown className="w-8 h-8 text-white animate-bounce" />

            {/* Opção 2: Círculo (comente a seta acima e descomente esta se preferir) */}
            {/* <div className="w-8 h-8 border-2 border-white rounded-full animate-bounce" /> */}

            <span className="mt-2 py-2 px-3 rounded text-white text-sm bg-black/30 border-0">
                <TextTranslator>
                    {{
                        ptBR: <>Role para baixo</>,
                        en: <>Scroll down</>,
                        es: <>Desplázate hacia abajo</>,
                    }}
                </TextTranslator>
            </span>
        </div>
    )
}

export default ScrollIndicator