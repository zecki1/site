"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils'; // Supondo que você use shadcn/ui

interface YouTubeBackgroundProps {
    videoId: string;
    className?: string;
    thumbnailQuality?: 'maxresdefault' | 'sddefault' | 'hqdefault' | 'mqdefault' | 'default';
}

export const YouTubeBackground: React.FC<YouTubeBackgroundProps> = ({
    videoId,
    className,
    thumbnailQuality = 'maxresdefault',
}) => {
    const [loadVideo, setLoadVideo] = useState(false);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&rel=0`;
    const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/${thumbnailQuality}.jpg`;

    // Efeito para carregar o vídeo apenas quando o componente estiver visível (lazy loading)
    useEffect(() => {
        // --- CORREÇÃO: Captura o valor de 'containerRef.current' em uma variável local ---
        const currentContainer = containerRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Atualiza o estado quando o elemento entra ou sai da viewport
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    // Desconecta o observador após a primeira intersecção para evitar trabalho desnecessário
                    observer.disconnect();
                }
            },
            {
                // Começa a carregar um pouco antes de o elemento ser totalmente visível
                rootMargin: '200px',
            }
        );

        // Usa a variável local para observar o elemento
        if (currentContainer) {
            observer.observe(currentContainer);
        }

        // A função de limpeza agora usa a mesma variável local, garantindo que a referência é a mesma
        // de quando o efeito foi criado, evitando o erro.
        return () => {
            if (currentContainer) {
                observer.unobserve(currentContainer);
            }
        };
    }, []); // As dependências estão corretas, pois este efeito deve rodar apenas uma vez na montagem.

    const handleInteraction = () => {
        setLoadVideo(true);
    };

    return (
        <div
            ref={containerRef}
            className={cn("absolute inset-0 overflow-hidden z-0 bg-black", className)}
            onClick={handleInteraction}
        >
            {/* O iframe só será renderizado quando o usuário clicar E o componente estiver na tela */}
            {isIntersecting && loadVideo ? (
                <iframe
                    src={videoSrc}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-1/2 left-1/2 w-full h-full min-w-[177.77vh] min-h-[56.25vw] object-cover -translate-x-1/2 -translate-y-1/2"
                />
            ) : (
                // Enquanto isso, exibe a thumbnail com um ícone de play
                <div
                    className="absolute inset-0 bg-cover bg-center cursor-pointer group"
                    style={{ backgroundImage: `url(${thumbnailUrl})` }}
                    aria-label="Play video background"
                >
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-all duration-300 group-hover:bg-black/40">
                        <svg
                            className="w-16 h-16 md:w-20 md:h-20 text-white opacity-70 group-hover:opacity-100 transition-opacity transform group-hover:scale-110"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
};