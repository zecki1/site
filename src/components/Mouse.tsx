"use client" // Componente cliente para animações ou interatividade

import React from "react"
import TextTranslator from '@/components/TextTranslator';

const Mouse: React.FC = () => {
    return (
        <div className="flex flex-col items-center absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
            {/* Mouse com bolinha de scroll */}
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center items-start">
                <div className="w-1 h-2 bg-white rounded-full animate-scroll" />
            </div>
            {/* Texto abaixo */}
            <span className="py-2 px-3 rounded text-white text-sm bg-black/30 border-0">
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

export default Mouse