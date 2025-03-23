// src/components/layout/Sidebar.tsx (ajuste o caminho conforme sua estrutura)
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import TextTranslator from "@/components/layout/TextTranslator";
import { BsCircle, BsCheckCircle } from "react-icons/bs";
import { cn } from "@/lib/utils";

// Páginas principais atualizadas
const pages = [
    {
        slug: "home",
        title: { ptBR: "Início", en: "Home", es: "Inicio" },
    },
    {
        slug: "freelancer",
        title: { ptBR: "Freelancer", en: "Freelancer", es: "Freelancer" },
    },
    {
        slug: "servicos",
        title: { ptBR: "Serviços", en: "Services", es: "Servicios" },
    },
] as const;

export const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [visitedItems, setVisitedItems] = useState<Set<string>>(new Set());

    // Navegar para uma página
    const handleNavigation = (target: string) => {
        router.push(`/${target}`);
        setVisitedItems((prev) => new Set(prev).add(target));
    };

    // Marcar páginas visitadas
    useEffect(() => {
        const currentSlug = pathname.split("/")[1] || "home";
        setVisitedItems((prev) => new Set(prev).add(currentSlug));
    }, [pathname]);

    // Renderizar ícone com animação
    const obterIcone = (visitado: boolean) => {
        return visitado ? (
            <BsCheckCircle className="inline-block mr-2 text-green-500 transition-transform duration-300 ease-in-out transform scale-110" />
        ) : (
            <BsCircle className="inline-block mr-2 text-gray-500 transition-colors duration-300 ease-in-out hover:text-blue-500" />
        );
    };

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
                                    e.preventDefault();
                                    handleNavigation(page.slug);
                                }}
                                className={cn(
                                    "block py-1 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400",
                                    visitedItems.has(page.slug) && "font-bold text-blue-600 dark:text-blue-400"
                                )}
                            >
                                {obterIcone(visitedItems.has(page.slug))}
                                <TextTranslator>{page.title}</TextTranslator>
                            </a>
                        </div>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
};