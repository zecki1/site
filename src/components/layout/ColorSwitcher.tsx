"use client";

import { useState, useEffect, useRef } from "react";
import { Paintbrush } from "lucide-react";
import TextTranslator from "@/components/layout/TextTranslator";
// CORREÇÃO: Importa o tipo 'DotLottie' para a ref
import { DotLottieReact, DotLottie } from '@lottiefiles/dotlottie-react';

// --- Interfaces de Tipo para a estrutura do Lottie ---
// Isso substitui o uso de 'any' e torna o código mais seguro e legível.
interface LottieShapeItem {
    ty: string;
    c?: {
        k: number[];
    };
}

interface LottieShape {
    it: LottieShapeItem[];
}

interface LottieLayer {
    nm: string; // nm = name
    shapes?: LottieShape[];
}

const colors = [
    { name: "Cyan", value: "#00e1ff" },
    { name: "Pink", value: "#ff00ff" },
    { name: "Green", value: "#22c55e" },
    { name: "Purple", value: "#a855f7" },
    { name: "Orange", value: "#f97316" },
];

export const ColorSwitcher = () => {
    const [activeColor, setActiveColor] = useState(colors[0].value);
    // CORREÇÃO: Usa o tipo importado 'DotLottie' e permite 'null' como valor inicial.
    const lottiePlayerRef = useRef<DotLottie | null>(null);

    // Função auxiliar para converter HEX para o formato de array que o Lottie usa [R, G, B]
    const hexToRgbArray = (hex: string): number[] => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        // Retorna a cor normalizada entre 0 e 1
        return result
            ? [
                parseInt(result[1], 16) / 255,
                parseInt(result[2], 16) / 255,
                parseInt(result[3], 16) / 255,
                1 // Canal Alpha
            ]
            : [0, 0, 0, 1]; // Cor padrão em caso de erro
    };

    // Efeito que é acionado quando a cor ativa muda, para atualizar a animação
    useEffect(() => {
        const player = lottiePlayerRef.current;
        const lottieInstance = player?.getLottie();
        if (!player || !lottieInstance) return;

        const layersToColor = [
            'Layer 21', 'Layer 19', 'Layer 16', 'Layer 14', 'Layer 7',
            'Layer 6', 'Layer 5', 'Layer 4', 'Layer 3'
        ];

        try {
            const colorArray = hexToRgbArray(activeColor);

            // CORREÇÃO: Usa a interface 'LottieLayer' para tipar o parâmetro 'layer'.
            lottieInstance.layers.forEach((layer: LottieLayer) => {
                if (layersToColor.includes(layer.nm) && layer.shapes?.[0]?.it) {
                    // CORREÇÃO: Usa a interface 'LottieShapeItem' para tipar o parâmetro 'item'.
                    layer.shapes[0].it.forEach((item: LottieShapeItem) => {
                        // Procura por propriedades de preenchimento ('fl') e usa optional chaining para segurança.
                        if (item.ty === 'fl' && item.c?.k) {
                            item.c.k = colorArray;
                        }
                    });
                }
            });
            // Recarrega o player para aplicar as mudanças de cor
            player.load(lottieInstance);

        } catch (e) {
            console.error("Failed to update Lottie colors:", e);
        }

        // CORREÇÃO: A ref não deve estar no array de dependências.
        // O efeito só precisa ser re-executado quando a cor mudar.
    }, [activeColor]);

    return (
        <div className="flex flex-col items-center gap-6 my-16 p-8 bg-muted/20 rounded-2xl border border-border/10">
            <div className="w-64 h-64">
                <DotLottieReact
                    lottieRef={lottiePlayerRef}
                    src="/lottie/background.json"
                    loop
                    autoplay
                />
            </div>
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                    <Paintbrush className="h-5 w-5" />
                    <p>
                        <TextTranslator ignoreCheck={true}>
                            {{ ptBR: "Teste uma Cor", en: "Test a Color", es: "Prueba un Color" }}
                        </TextTranslator>
                    </p>
                </div>
                <div className="flex gap-3">
                    {colors.map(color => (
                        <button
                            key={color.name}
                            onClick={() => setActiveColor(color.value)}
                            className={`w-8 h-8 rounded-full transition-all duration-200 border-2 border-transparent ${activeColor === color.value ? 'ring-2 ring-offset-2 ring-offset-background' : ''}`}
                            style={{ backgroundColor: color.value, ringColor: color.value }}
                            aria-label={`Switch to ${color.name} theme`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};