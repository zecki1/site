"use client";

import { useState, useEffect, useRef } from "react";
import { Paintbrush } from "lucide-react";
import TextTranslator from "@/components/layout/TextTranslator";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const colors = [
    { name: "Cyan", value: "#00e1ff" },
    { name: "Pink", value: "#ff00ff" },
    { name: "Green", value: "#22c55e" },
    { name: "Purple", value: "#a855f7" },
    { name: "Orange", value: "#f97316" },
];

export const ColorSwitcher = () => {
    const [activeColor, setActiveColor] = useState(colors[0].value);
    const lottiePlayerRef = useRef<any>(null);

    // Função auxiliar para converter HEX para o formato de array que o Lottie usa [R, G, B]
    const hexToRgbArray = (hex: string) => {
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
        if (!player) return;

        // Nomes das camadas do seu arquivo Lottie que você deseja colorir
        const layersToColor = [
            'Layer 21', 'Layer 19', 'Layer 16', 'Layer 14', 'Layer 7',
            'Layer 6', 'Layer 5', 'Layer 4', 'Layer 3'
        ];

        try {
            const colorArray = hexToRgbArray(activeColor);

            player.getLottie().layers.forEach((layer: any) => {
                if (layersToColor.includes(layer.nm)) {
                    if (layer.shapes && layer.shapes.length > 0) {
                        layer.shapes[0].it.forEach((item: any) => {
                            // Procura por propriedades de preenchimento ('fl')
                            if (item.ty === 'fl' && item.c && item.c.k) {
                                item.c.k = colorArray;
                            }
                        });
                    }
                }
            });
            // Recarrega o player para aplicar as mudanças de cor
            player.load(player.getLottie());

        } catch (e) {
            console.error("Failed to update Lottie colors:", e);
        }

    }, [activeColor, lottiePlayerRef.current]); // Depende da cor e da existência do player

    return (
        <div className="flex flex-col items-center gap-6 my-16 p-8 bg-muted/20 rounded-2xl border border-border/10">
            <div className="w-64 h-64">
                <DotLottieReact
                    // CORREÇÃO: Usa a propriedade `lottieRef` para obter a instância do player
                    lottieRef={lottiePlayerRef}
                    // CORREÇÃO: Aponta para o caminho correto do arquivo na pasta public
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