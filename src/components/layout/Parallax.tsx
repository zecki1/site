"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

interface ParallaxProps {
    backgroundImage?: string
    videoSrc?: string
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

                video.onloadedmetadata = () => {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: parallaxElement,
                            start: "top top",
                            end: "bottom+=200% bottom",
                            scrub: 2,
                        },
                    })

                    tl.to(video, { currentTime: video.duration })

                    const isTouchDevice = () =>
                        "ontouchstart" in window ||
                        navigator.maxTouchPoints > 0

                    if (isTouchDevice()) {
                        video.play().then(() => video.pause())
                    }
                }
            } else if (backgroundImage && backgroundRef.current) {
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
            <div className="relative z-10 flex items-center justify-center h-full">
                {children}
            </div>
        </div>
    )
}

export default Parallax