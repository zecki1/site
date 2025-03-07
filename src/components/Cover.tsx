"use client" // Necessário para componentes interativos no Next.js

import Mouse from "./Mouse";
import { cn } from "@/lib/utils"
import TextTranslator from '@/components/TextTranslator';

interface CoverProps {
    titlePT?: string
    titleES?: string
    titleEN?: string
    backgroundImage: string
    className?: string // Adicionei para personalização extra
}

export const Cover: React.FC<CoverProps> = ({
    titlePT,
    titleES,
    titleEN,
    backgroundImage,
    className,
}) => {
    return (
        <div
            className={cn(
                "w-full h-screen overflow-hidden relative bg-background", // Adicionei bg-background para temas
                className
            )}
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Camada escura sobre a imagem */}
            <div className="absolute inset-0 z-10 bg-black bg-opacity-50 pointer-events-none" />

            {/* Conteúdo acima do fundo */}
            <div className="relative z-20 flex h-full flex-col items-center justify-center">
                <h1 className="px-16 py-5 text-center text-4xl text-white md:text-6xl">
                    <TextTranslator>
                        {{
                            ptBR: titlePT,
                            en: titleEN,
                            es: titleES,
                        }}
                    </TextTranslator>
                </h1>
            </div>

            <Mouse />
        </div>
    )
}

export default Cover