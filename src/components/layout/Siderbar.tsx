"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import TextTranslator from "@/components/TextTranslator";
import { BsCircle, BsCheckCircle } from "react-icons/bs";

// Tipo para as aulas
interface Titulo {
    label: string;
    nivel: number;
    titulo: { ptBR: string; en: string; es: string };
}
interface Aula {
    aula: string;
    titulos: Titulo[];
}

// Função fictícia para obter aulas e títulos
const obterAulasETitulos = (): Aula[] => {
    return [
        {
            aula: "introducao",
            titulos: [
                { label: "inicio", nivel: 1, titulo: { ptBR: "Início", en: "Start", es: "Inicio" } },
                { label: "conceitos", nivel: 1, titulo: { ptBR: "Conceitos", en: "Concepts", es: "Conceptos" } },
            ],
        },
        {
            aula: "avancado",
            titulos: [
                { label: "tecnicas", nivel: 1, titulo: { ptBR: "Técnicas", en: "Techniques", es: "Técnicas" } },
            ],
        },
    ];
};

export const Sidebar = () => {
    const [aulas, setAulas] = useState<Aula[]>([]);
    const [titulosVisitados, setTitulosVisitados] = useState<Set<string>>(
        new Set(JSON.parse(localStorage.getItem("titulosVisitados") || "[]"))
    );
    const [expandido, setExpandido] = useState<number | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setAulas(obterAulasETitulos());
    }, []);

    const calcularMargem = (nivel: number) => `ml-${nivel * 4}`;

    const obterIcone = (visitado: boolean) => {
        return visitado ? (
            <BsCheckCircle className="inline-block mr-2 text-accent-foreground" />
        ) : (
            <BsCircle className="inline-block mr-2 text-muted-foreground" />
        );
    };

    const handlePageNavigation = (aula: string, titulo: string) => {
        const currentPath = pathname.split("/")[1];
        const targetPath = `/${aula}`;

        if (currentPath === aula) {
            router.push(`${targetPath}#${titulo}`);
            setTimeout(() => {
                requestAnimationFrame(() => {
                    const element = document.getElementById(titulo);
                    if (element) {
                        const offset = window.innerWidth <= 768 ? 50 : 100;
                        window.scrollTo({
                            top: element.offsetTop - offset,
                            behavior: "smooth",
                        });
                    }
                });
            }, 200);
        } else {
            window.scrollTo(0, 0);
            setTimeout(() => {
                router.push(`${targetPath}#${titulo}`);
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        const element = document.getElementById(titulo);
                        if (element) {
                            const offset = window.innerWidth <= 768 ? 50 : 100;
                            window.scrollTo({
                                top: element.offsetTop - offset,
                                behavior: "smooth",
                            });
                        }
                    });
                }, 200);
            }, 700);
        }
    };

    const handleAulaClick = (aulaIndex: number) => {
        setExpandido(aulaIndex === expandido ? null : aulaIndex);
    };

    const isAulaCompleta = (aulaObj: Aula) => {
        return aulaObj.titulos.every((titulo) => titulosVisitados.has(titulo.label));
    };

    useEffect(() => {
        localStorage.setItem("titulosVisitados", JSON.stringify([...titulosVisitados]));
    }, [titulosVisitados]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const titulo = entry.target.getAttribute("id");
                        if (titulo) {
                            setTitulosVisitados((prev) => new Set(prev).add(titulo));
                        }
                    }
                });
            },
            { threshold: 0.25 }
        );

        const artigos = document.querySelectorAll("article[id]");
        artigos.forEach((artigo) => observer.observe(artigo));

        return () => observer.disconnect();
    }, [pathname]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon">
                    <AlignJustify className="h-[1.1rem] w-[1.2rem]" />
                    <span className="sr-only">Abrir Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-sidebar-background text-sidebar-foreground">
                <SheetHeader className="px-4 pt-4">
                    <SheetTitle>Menu</SheetTitle>
                    {/* Removido ProgressoCurso até ser implementado */}
                </SheetHeader>
                <nav className="flex flex-col gap-2 pt-4 max-h-screen px-4 pb-32 overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 dark:scrollbar-thumb-gray-700">
                    {aulas.map((aulaObj, index) => (
                        <div key={aulaObj.aula}>
                            <button
                                onClick={() => handleAulaClick(index)}
                                className="flex w-full items-center justify-between text-left text-lg font-semibold text-foreground select-none"
                            >
                                <div className="flex items-center">
                                    {isAulaCompleta(aulaObj) ? (
                                        <BsCheckCircle className="mr-2 text-accent-foreground" />
                                    ) : (
                                        <BsCircle className="mr-2 text-muted-foreground" />
                                    )}
                                    <TextTranslator>
                                        {{
                                            ptBR: `Aula ${index + 1}`,
                                            en: `Lesson ${index + 1}`,
                                            es: `Lección ${index + 1}`,
                                        }}
                                    </TextTranslator>
                                </div>
                                <span className="ml-2 text-muted-foreground mr-1">
                                    {expandido === index ? "−" : "+"}
                                </span>
                            </button>
                            <div
                                className={`ml-4 transition-all duration-300 ease-in-out overflow-y-auto ${expandido === index
                                    ? "max-h-[400px] opacity-100 overflow-auto"
                                    : "max-h-0 opacity-0"
                                    } overflow-hidden`}
                            >
                                {aulaObj.titulos.map((titulo) => (
                                    <div key={titulo.label}>
                                        <a
                                            href={`#${titulo.label}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageNavigation(aulaObj.aula, titulo.label);
                                            }}
                                            className={`block hover:underline py-1 ${calcularMargem(titulo.nivel)} 
                                                ${titulosVisitados.has(titulo.label) ? "text-accent-foreground font-bold" : "text-muted-foreground"}`}
                                        >
                                            {obterIcone(titulosVisitados.has(titulo.label))}
                                            <TextTranslator>{titulo.titulo}</TextTranslator>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default Sidebar;