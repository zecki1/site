"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

interface SectionProps {
    children: React.ReactNode
    label: string
    className?: string
}

export const Section: React.FC<SectionProps> = ({ children, label, className }) => {
    useEffect(() => {
        gsap.fromTo(
            `.section-${label}`,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
        )
    }, [label])

    return (
        <section id={label} className={cn(`section-${label}`, className)}>
            <div className="container mx-auto">{children}</div>
        </section>
    )
}

interface SectionFluidProps {
    children: React.ReactNode
    label: string
    className?: string
}

export const SectionFluid: React.FC<SectionFluidProps> = ({ children, label, className }) => {
    useEffect(() => {
        gsap.fromTo(
            `.section-fluid-${label}`,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
        )
    }, [label])

    return (
        <section id={label} className={cn(`section-fluid-${label} w-full`, className)}>
            {children}
        </section>
    )
}