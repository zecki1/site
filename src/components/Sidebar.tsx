"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
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
import { cn } from "@/lib/utils"

// Páginas principais
const pages = [
    {
        slug: "home",
        title: { ptBR: "Início", en: "Home", es: "Inicio" },
    },
    {
        slug: "about",
        title: { ptBR: "Sobre", en: "About", es: "Sobre" },
    },
    {
        slug: "components",
        title: { ptBR: "Componentes", en: "Components", es: "Componentes" },
    },
] as const

// Seções e tópicos de /components
const componentSections = [
    {
        label: "introducao",
        title: { ptBR: "Introdução", en: "Introduction", es: "Introducción" },
        subItems: [],
    },
    {
        label: "interativos",
        title: { ptBR: "Interativos", en: "Interactive", es: "Interactivos" },
        subItems: [
            { label: "button", title: { ptBR: "Botão", en: "Button", es: "Botón" } },
            { label: "dropdown-menu", title: { ptBR: "Menu Suspenso", en: "Dropdown Menu", es: "Menú Desplegable" } },
        ],
    },
    {
        label: "visualizacoes",
        title: { ptBR: "Visualizações", en: "Visualizations", es: "Visualizaciones" },
        subItems: [],
    },
    {
        label: "formularios",
        title: { ptBR: "Formulários", en: "Forms", es: "Formularios" },
        subItems: [],
    },
    {
        label: "navegacao",
        title: { ptBR: "Navegação", en: "Navigation", es: "Navegación" },
        subItems: [],
    },
    {
        label: "outros",
        title: { ptBR: "Outros", en: "Others", es: "Otros" },
        subItems: [
            { label: "toast", title: { ptBR: "Toast", en: "Toast", es: "Toast" } },
            { label: "tooltip", title: { ptBR: "Tooltip", en: "Tooltip", es: "Tooltip" } },
        ],
    },
    {
        label: "rodape",
        title: { ptBR: "Rodapé", en: "Footer", es: "Pie de página" },
        subItems: [],
    },
] as const

export const Sidebar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [visitedItems, setVisitedItems] = useState<Set<string>>(new Set())

    // Navegar para uma página ou seção
    const handleNavigation = (target: string, isSection = false) => {
        if (isSection) {
            const element = document.getElementById(target)
            if (element) {
                const offset = window.innerWidth <= 768 ? 50 : 100
                window.scrollTo({
                    top: element.offsetTop - offset,
                    behavior: "smooth",
                })
                setVisitedItems((prev) => new Set(prev).add(target))
            }
        } else {
            router.push(`/${target}`)
            setVisitedItems((prev) => new Set(prev).add(target))
        }
    }

    // Marcar páginas visitadas e observar seções em /components
    useEffect(() => {
        const currentSlug = pathname.split("/")[1] || "home"
        setVisitedItems((prev) => new Set(prev).add(currentSlug))

        if (pathname !== "/components") return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const label = entry.target.getAttribute("id")
                        if (label) {
                            setVisitedItems((prev) => new Set(prev).add(label))
                        }
                    }
                })
            },
            { threshold: 0.5 }
        )

        componentSections.forEach((item) => {
            const element = document.getElementById(item.label)
            if (element) observer.observe(element)
            item.subItems.forEach((subItem) => {
                const subElement = document.getElementById(subItem.label)
                if (subElement) observer.observe(subElement)
            })
        })

        return () => observer.disconnect()
    }, [pathname])

    // Renderizar ícone com animação
    const obterIcone = (visitado: boolean) => {
        return visitado ? (
            <BsCheckCircle className="inline-block mr-2 text-green-500 transition-transform duration-300 ease-in-out transform scale-110" />
        ) : (
            <BsCircle className="inline-block mr-2 text-gray-500 transition-colors duration-300 ease-in-out hover:text-blue-500" />
        )
    }

    const isComponentsPage = pathname === "/components"

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon">
                    <AlignJustify className="h-[1.1rem] w-[1.2rem]" />
                    <span className="sr-only">
                        <TextTranslator>
                            {{ ptBR: "Abrir Menu", en: "Open Menu", es: "Abrir Menú" }}
                        </TextTranslator>
                    </span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
                <SheetHeader className="px-4 pt-4">
                    <SheetTitle>
                        <TextTranslator>
                            {{ ptBR: "Menu de Navegação", en: "Navigation Menu", es: "Menú de Navegación" }}
                        </TextTranslator>
                    </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 pt-4 max-h-screen px-4 pb-32 overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500">
                    {pages.map((page) => (
                        <div key={page.slug}>
                            <a
                                href={`/${page.slug}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleNavigation(page.slug)
                                }}
                                className={cn(
                                    "block py-1 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400",
                                    visitedItems.has(page.slug) && "font-bold text-blue-600 dark:text-blue-400"
                                )}
                            >
                                {obterIcone(visitedItems.has(page.slug))}
                                <TextTranslator>{page.title}</TextTranslator>
                            </a>
                            {isComponentsPage && page.slug === "components" && (
                                <div className="pl-6 flex flex-col gap-1">
                                    {componentSections.map((section) => (
                                        <div key={section.label}>
                                            <a
                                                href={`#${section.label}`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleNavigation(section.label, true)
                                                }}
                                                className={cn(
                                                    "block py-1 text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-300",
                                                    visitedItems.has(section.label) && "font-semibold text-blue-500 dark:text-blue-300"
                                                )}
                                            >
                                                {obterIcone(visitedItems.has(section.label))}
                                                <TextTranslator>{section.title}</TextTranslator>
                                            </a>
                                            {section.subItems.length > 0 && (
                                                <div className="pl-4 flex flex-col gap-1">
                                                    {section.subItems.map((subItem) => (
                                                        <a
                                                            key={subItem.label}
                                                            href={`#${subItem.label}`}
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                handleNavigation(subItem.label, true)
                                                            }}
                                                            className={cn(
                                                                "block py-1 text-gray-500 hover:text-blue-400 dark:text-gray-500 dark:hover:text-blue-200 text-sm",
                                                                visitedItems.has(subItem.label) && "font-medium text-blue-400 dark:text-blue-200"
                                                            )}
                                                        >
                                                            {obterIcone(visitedItems.has(subItem.label))}
                                                            <TextTranslator>{subItem.title}</TextTranslator>
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    )
}