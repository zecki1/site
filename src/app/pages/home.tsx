// src/pages/home.tsx
"use client";

import TextTranslator from "@/components/TextTranslator";

const Mark: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="font-bold text-primary">{children}</span>
);

export default function Home() {
    return (
        <>
            <div className="pt-16">
                <h1 className="text-3xl font-bold text-primary mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Bem-vindo ao Meu CMS",
                            en: "Welcome to Zecki1",
                            es: "Bienvenido a Mi CMS",
                        }}
                    </TextTranslator>
                </h1>
                <p>
                    <TextTranslator>
                        {{
                            ptBR: (
                                <>
                                    Este é um <Mark>CMS</Mark> simples construído com Next.js.
                                </>
                            ),
                            en: (
                                <>
                                    This is a simple <Mark>CMS</Mark> built with Next.js.
                                </>
                            ),
                            es: (
                                <>
                                    Este es un <Mark>CMS</Mark> simple construido con Next.js.
                                </>
                            ),
                        }}
                    </TextTranslator>
                </p>
            </div>
        </>
    );
}