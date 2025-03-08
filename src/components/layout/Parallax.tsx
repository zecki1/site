"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

interface ParallaxProps {
    backgroundImage?: string // Opcional, para fundo estático
    videoSrc?: string       // Opcional, para vídeo parallax
    children: React.ReactNode
    height?: string
    className?: string
}

export const Parallax: React.FC<ParallaxProps> = ({
    backgroundImage,
    videoSrc,
    children,
    height = "100vh",
    className,
}) => {
    const parallaxRef = useRef<HTMLDivElement>(null)
    const backgroundRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const parallaxElement = parallaxRef.current

        if (parallaxElement) {
            if (videoSrc && videoRef.current) {
                const video = videoRef.current

                // Aguarda os metadados do vídeo para garantir que a duração esteja disponível
                video.onloadedmetadata = () => {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: parallaxElement,
                            start: "top top",
                            end: "bottom+=200% bottom",
                            scrub: 2, // Suaviza a animação com a rolagem
                        },
                    })

                    tl.to(video, { currentTime: video.duration })

                    // Para dispositivos móveis: força play/pause para carregar o vídeo
                    const isTouchDevice = () =>
                        "ontouchstart" in window ||
                        navigator.maxTouchPoints > 0 ||
                        navigator.msMaxTouchPoints > 0

                    if (isTouchDevice()) {
                        video.play().then(() => video.pause())
                    }
                }
            } else if (backgroundImage && backgroundRef.current) {
                // Efeito parallax para imagem estática
                gsap.to(backgroundRef.current, {
                    yPercent: 20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: parallaxElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                })
            }
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        }
    }, [backgroundImage, videoSrc])

    return (
        <div
            ref={parallaxRef}
            className={cn("relative overflow-hidden", className)}
            style={{ height }}
        >
            {/* Vídeo ou Imagem de fundo */}
            {videoSrc ? (
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    playsInline
                    webkit-playsinline="true"
                    preload="auto"
                    muted
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
            ) : (
                backgroundImage && (
                    <div
                        ref={backgroundRef}
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "120%",
                            top: "-10%",
                        }}
                    />
                )
            )}
            {/* Conteúdo em primeiro plano */}
            <div className="relative z-10 flex items-center justify-center h-full">
                {children}
            </div>
        </div>
    )
}

export default Parallax