
"use client";

import { useState, useEffect, CSSProperties } from "react";
import { Paintbrush } from "lucide-react";
import TextTranslator from "@/components/layout/TextTranslator";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// --- Interfaces de Tipo para a estrutura completa do Lottie ---
interface LottieShapeItem {
    ty: string;
    c?: { k: number[] };
}

interface LottieShape {
    it: LottieShapeItem[];
}

interface LottieLayer {
    nm: string;
    shapes?: LottieShape[];
    ind?: number;
    ty?: number;
    ip?: number;
    op?: number;
    st?: number;
    ks?: object;
}

// ✨ CORREÇÃO 1: Evita o erro 'no-explicit-any' do ESLint.
// Tipamos 'assets' de forma mais segura que 'any'.
interface LottieAnimation {
    v?: string;
    fr?: number;
    ip?: number;
    op?: number;
    w?: number;
    h?: number;
    nm?: string;
    ddd?: number;
    assets: Record<string, unknown>[];
    layers: LottieLayer[];
    // ✨ CORREÇÃO 2: Adiciona uma assinatura de índice.
    // Isso resolve o erro de atribuição na prop 'data', informando ao TypeScript
    // que este objeto pode ter qualquer chave de string, como a biblioteca espera.
    [key: string]: unknown;
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
    const [lottieData, setLottieData] = useState<LottieAnimation | null>(null);
    const [modifiedLottie, setModifiedLottie] = useState<LottieAnimation | null>(null);

    // Efeito para buscar os dados do Lottie apenas uma vez, quando o componente montar.
    useEffect(() => {
        fetch('/lottie/background.json')
            .then(response => response.json())
            .then((data: LottieAnimation) => {
                setLottieData(data);
            })
            .catch(error => console.error("Failed to fetch Lottie animation:", error));
    }, []);

    // Função auxiliar para converter HEX para o formato de array que o Lottie usa [R, G, B]
    const hexToRgbArray = (hex: string): number[] => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? [
                parseFloat((parseInt(result[1], 16) / 255).toFixed(3)),
                parseFloat((parseInt(result[2], 16) / 255).toFixed(3)),
                parseFloat((parseInt(result[3], 16) / 255).toFixed(3)),
                1 // Canal Alpha
            ]
            : [0, 0, 0, 1];
    };

    // Efeito que recalcula a animação com a nova cor sempre que a cor ativa ou os dados originais mudarem.
    useEffect(() => {
        if (!lottieData) return;

        const layersToColor = [
            'Layer 21', 'Layer 19', 'Layer 16', 'Layer 14', 'Layer 7',
            'Layer 6', 'Layer 5', 'Layer 4', 'Layer 3'
        ];

        const colorArray = hexToRgbArray(activeColor);

        const clonedData: LottieAnimation = JSON.parse(JSON.stringify(lottieData));

        clonedData.layers.forEach((layer: LottieLayer) => {
            if (layersToColor.includes(layer.nm) && layer.shapes?.[0]?.it) {
                layer.shapes[0].it.forEach((item: LottieShapeItem) => {
                    if (item.ty === 'fl' && item.c?.k) {
                        item.c.k = colorArray;
                    }
                });
            }
        });
        setModifiedLottie(clonedData);
    }, [activeColor, lottieData]);

    return (
        <div className="flex flex-col items-center gap-6 my-16 p-8 bg-muted/20 rounded-2xl border border-border/10">
            <div className="w-64 h-64 flex items-center justify-center">
                {modifiedLottie ? (
                    <DotLottieReact
                        data={modifiedLottie} // Agora o tipo 'modifiedLottie' é compatível
                        loop
                        autoplay
                    />
                ) : (
                    // Adicionado um placeholder de carregamento para melhor experiência do usuário
                    <div className="text-muted-foreground">Loading Animation...</div>
                )}
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
                            style={{
                                backgroundColor: color.value,
                                '--tw-ring-color': color.value,
                            } as CSSProperties}
                            aria-label={`Switch to ${color.name} theme`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};