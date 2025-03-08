"use client"

import ScrollIndicator from "@/components/layout/ScrollIndicator"
import { cn } from "@/lib/utils"
import TextTranslator from '@/components/layout/TextTranslator';

interface CoverProps {
    titlePT?: string
    titleES?: string
    titleEN?: string
    backgroundImage: string
    className?: string
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
                "w-full h-screen overflow-hidden relative bg-background",
                className
            )}
        >
            {/* Imagem de fundo */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Camada escura (reduzida para teste) */}

            {/* Conteúdo centralizado */}
            <div className="relative z-20 flex h-full flex-col items-center justify-center">


                <div className="mt-2  px-3 rounded text-white text-sm bg-black/50 border-0">
                    <h1 className="mt-4 px-16 py-5 text-center text-4xl text-white md:text-6xl">
                        <TextTranslator>
                            {{
                                ptBR: titlePT,
                                en: titleEN,
                                es: titleES,
                            }}
                        </TextTranslator>
                    </h1>
                </div>
            </div>
            <ScrollIndicator />
        </div>
    )
}

export default Cover