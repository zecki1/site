"use client"

import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import Image from "next/image" // Adicionado

const generateId = (label: string): string => {
    return label
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .toLowerCase()
}

interface TopicProps {
    children: React.ReactNode
    label: string
    className?: string
    asChild?: boolean
}

export const Topic: React.FC<TopicProps> = ({ children, label, className, asChild }) => {
    const Comp = asChild ? Slot : "article"
    return (
        <Comp
            id={generateId(label)}
            aria-label={label}
            className={cn("", className)}
        >
            {children}
        </Comp>
    )
}

interface Topic2Props extends TopicProps {
    svgComponent?: string
    showSvg?: boolean
    bgColor?: string
}

export const Topic2: React.FC<Topic2Props> = ({
    children,
    label,
    className,
    svgComponent,
    showSvg = false,
    bgColor = "",
}) => {
    return (
        <>
            <article
                id={generateId(label)}
                aria-label={label}
                className={cn("relative", bgColor, className)}
            >
                <div className="py-8 px-2 container mx-auto">{children}</div>
            </article>
            {showSvg && svgComponent && (
                <div className="w-full">
                    <Image
                        src={svgComponent}
                        alt="Divisor"
                        width={1920}
                        height={100}
                        className="w-full h-auto"
                    />
                </div>
            )}
        </>
    )
}