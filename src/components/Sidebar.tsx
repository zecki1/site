"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify } from "lucide-react"
import TextTranslator from "@/components/TextTranslator"
import { BsCircle, BsCheckCircle } from "react-icons/bs"

// Função para extrair labels das seções na página
const getSectionLabels = () => {
    const sections = document.querySelectorAll("section[id]")
    const labels = Array.from(sections).map((section) => ({
        label: section.id,
        title: {
            ptBR: section.id.charAt(0).toUpperCase() + section.id.slice(1), // Capitaliza o label como fallback
            en: section.id.charAt(0).toUpperCase() + section.id.slice(1),
            es: section.id.charAt(0).toUpperCase() + section.id.slice(1),
        },
    }))
    return labels
}

export const Sidebar = () => {
    const [visitedComponents, setVisitedComponents] = useState<Set<string>>(new Set())
    const [sections, setSections] = useState<{ label: string; title: Record<string, string> }[]>([])

    useEffect(() => {
        setSections(getSectionLabels()) // Carrega os labels das seções ao montar
    }, [])

    const handleNavigation = (label: string) => {
        const element = document.getElementById(label)
        if (element) {
            const offset = window.innerWidth <= 768 ? 50 : 100
            window.scrollTo({
                top: element.offsetTop - offset,
                behavior: "smooth",
            })
            setVisitedComponents((prev) => new Set(prev).add(label))
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const label = entry.target.getAttribute("id")
                        if (label) {
                            setVisitedComponents((prev) => new Set(prev).add(label))
                        }
                    }
                })
            },
            { threshold: 0.5 }
        )

        sections.forEach((section) => {
            const element = document.getElementById(section.label)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [sections])

    const obterIcone = (visitado: boolean) => {
        return visitado ? (
            <BsCheckCircle className="inline-block mr-2 text-green-500" />
        ) : (
            <BsCircle className="inline-block mr-2 text-gray-500" />
        )
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon">
                    <AlignJustify className="h-[1.1rem] w-[1.2rem]" />
                    <span className="sr-only">
                        <TextTranslator>
                            {{
                                ptBR: "Abrir Menu",
                                en: "Open Menu",
                                es: "Abrir Menú",
                            }}
                        </TextTranslator>
                    </span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader className="px-4 pt-4">
                    <SheetTitle>
                        <TextTranslator>
                            {{
                                ptBR: "Menu de Componentes",
                                en: "Components Menu",
                                es: "Menú de Componentes",
                            }}
                        </TextTranslator>
                    </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 pt-4 max-h-screen px-4 pb-32 overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500">
                    {sections.map((section) => (
                        <a
                            key={section.label}
                            href={`#${section.label}`}
                            onClick={(e) => {
                                e.preventDefault()
                                handleNavigation(section.label)
                            }}
                            className={`block py-1 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 ${visitedComponents.has(section.label) ? "font-bold text-blue-600 dark:text-blue-400" : ""
                                }`}
                        >
                            {obterIcone(visitedComponents.has(section.label))}
                            <TextTranslator>{section.title}</TextTranslator>
                        </a>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    )
}