// src/pages/about.tsx
"use client";

import TextTranslator from "@/components/layout/TextTranslator";

const Mark: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="font-bold text-primary">{children}</span>
);

export default function About() {
    return (
        <>
            <div className="pt-16"> 
                <h1 className="text-3xl font-bold text-primary mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Sobre Nós",
                            en: "About Us",
                            es: "Sobre Nosotros",
                        }}
                    </TextTranslator>
                </h1>
                <p>
                    <TextTranslator>
                        {{
                            ptBR: (
                                <>
                                    Somos uma equipe dedicada a criar soluções com <Mark>Next.js</Mark>.
                                </>
                            ),
                            en: (
                                <>
                                    We are a team dedicated to building solutions with <Mark>Next.js</Mark>.
                                </>
                            ),
                            es: (
                                <>
                                    Somos un equipo dedicado a crear soluciones con <Mark>Next.js</Mark>.
                                </>
                            ),
                        }}
                    </TextTranslator>
                </p>
          </div>
        </>
    );
}