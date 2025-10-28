"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

// Páginas principais atualizadas para a nova estrutura
const pages = [
    { slug: "home", title: { ptBR: "Início", en: "Home", es: "Inicio" } },
    { slug: "servicos", title: { ptBR: "Serviços", en: "Services", es: "Servicios" } },
    { slug: "curriculo", title: { ptBR: "Currículo", en: "Resume", es: "Currículum" } },
    { slug: "contato", title: { ptBR: "Contato", en: "Contact", es: "Contacto" } },
] as const;

export const Sidebar = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleNavigation = (target: string) => {
        setIsOpen(false); // Fecha o menu ao clicar
        router.push(`/${target}`);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="border-color1">
                    <AlignJustify className="h-[1.2rem] w-[1.2rem] text-color1" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
                <SheetHeader className="px-4 pt-4">
                    <SheetTitle>
                        <TextTranslator>{{ ptBR: "Navegação", en: "Navigation", es: "Navegación" }}</TextTranslator>
                    </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 pt-4 px-4">
                    {pages.map((page) => (
                        <a
                            key={page.slug}
                            href={`/${page.slug}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigation(page.slug);
                            }}
                            className="block py-2 text-lg text-muted-foreground hover:text-primary transition-colors"
                        >
                            <TextTranslator>{page.title}</TextTranslator>
                        </a>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
};