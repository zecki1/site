// src/app/home/page.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import { Cover } from "@/components/layout/Cover";
import { Section, SectionFluid } from "@/components/layout/Sections";
import { Topic } from "@/components/layout/Topic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StaggeredText } from "@/components/gsap/StaggeredText";
import { images } from "@/components/layout/ImageContainer";
import TextTranslator from "@/components/layout/TextTranslator";

// Componente Mark pra destaque
const Mark: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="font-bold text-purple-500 dark:text-purple-400">{children}</span>
);

// Inicialização do AOS
function AosInit() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
    return null;
}

export default function Home() {
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const main = mainRef.current;
        if (!main) return;

        document.body.style.minHeight = "200vh";

        gsap.set(main, {
            paddingTop: "80vh",
            opacity: 1,
        });

        gsap.to(main, {
            paddingTop: "4rem",
            duration: 1,
            scrollTrigger: {
                trigger: main,
                start: "top top",
                end: "bottom 20%",
                scrub: 0.6,
                onEnter: () => console.log("Main entrou na tela"),
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="font-sans">
            <AosInit />
            <main ref={mainRef} className="relative z-10">
                <Cover
                    titlePT="Ezequiel Regino Monção"
                    titleEN="Ezequiel Regino Monção"
                    titleES="Ezequiel Regino Monção"
                    backgroundImage={images.capa}
                    className="flex flex-col items-center justify-center text-center bg-gradient-to-b from-muted/70 to-muted-foreground/70"
                    ignoreCheck={true}
                >
                    <p className="text-foreground text-xl md:text-3xl mb-10 font-light max-w-3xl tracking-tight">
                        <TextTranslator>
                            {{
                                ptBR: "Transformando ideias em experiências digitais acessíveis, dinâmicas e visualmente impactantes com mais de uma década de paixão por código e design.",
                                en: "Turning ideas into accessible, dynamic, and visually stunning digital experiences with over a decade of passion for code and design.",
                                es: "Convirtiendo ideas en experiencias digitales accesibles, dinámicas y visualmente impactantes con más de una década de pasión por el código y el diseño.",
                            }}
                        </TextTranslator>
                    </p>
                    <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full shadow-md transform hover:scale-105 transition-all duration-300 text-lg tracking-tight">
                        <TextTranslator>
                            {{ ptBR: "Explore Meu Universo Criativo", en: "Explore My Creative Universe", es: "Explora Mi Universo Creativo" }}
                        </TextTranslator>
                    </Button>
                </Cover>

                <Section label="sobre" className="py-32 bg-background">
                    <Topic label="quem-sou">
                        <h2 className="text-5xl md:text-7xl font-bold text-center text-foreground mb-16 tracking-tight">
                            <StaggeredText text="Quem Sou Eu" />
                        </h2>
                        <p className="text-foreground text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
                            <TextTranslator>
                                {{
                                    ptBR: (
                                        <>
                                            Eu sou Ezequiel Regino Monção, mais conhecido como Zecki, um profissional movido por uma paixão incansável por criar soluções digitais que unem <Mark>arte</Mark> e <Mark>tecnologia</Mark>. Há <Mark>13 anos</Mark>, venho trilhando uma jornada única no universo do <Mark>desenvolvimento web front-end</Mark> e do <Mark>design gráfico</Mark>, com um olhar atento para <Mark>usabilidade</Mark>, <Mark>acessibilidade</Mark> e <Mark>inovação</Mark>. Minha trajetória me levou por diferentes empresas e nichos — de startups ágeis a projetos corporativos complexos —, onde aprendi a equilibrar <Mark>criatividade</Mark> com <Mark>funcionalidade</Mark>, entregando desde interfaces simples e intuitivas até sistemas robustos que impressionam pela escala e detalhe.<br /><br />
                                            Minha filosofia é clara: o digital deve ser <Mark>bonito</Mark>, mas acima de tudo <Mark>acessível</Mark> e <Mark>útil</Mark>. Seja codificando componentes dinâmicos com <Mark>React</Mark>, desenhando layouts no <Mark>Illustrator</Mark> ou animando vídeos no <Mark>After Effects</Mark>, eu busco sempre o ponto onde a estética encontra a praticidade. Trabalho com dedicação total, guiado por um café forte e uma mente inquieta que não para de explorar novas possibilidades. Meu objetivo? Fazer o mundo digital mais <Mark>inclusivo</Mark>, mais <Mark>interativo</Mark> e, por que não, mais <Mark>colorido</Mark>!
                                        </>
                                    ),
                                    // ... (outros idiomas conforme o original)
                                }}
                            </TextTranslator>
                        </p>
                    </Topic>
                </Section>

                {/* Adicione as outras seções (Projetos, Experiência, etc.) conforme o original */}
            </main>
        </div>
    );
}