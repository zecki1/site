// src/app/page.tsx
"use client";

import { Header } from "@/components/Header";
import TextTranslator from '@/components/TextTranslator';

const Mark: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-bold text-primary">{children}</span>
);

export default function Page() {
  return (
    <div className="pt-16">
      <Header />
      <main className="p-4 bg-background text-foreground min-h-screen">
        <h2 className="text-2xl font-bold text-primary">
          <TextTranslator>
            {{
              ptBR: "Bem-vindo ao Meu CMS",
              en: "Welcome to My CMS",
              es: "Bienvenido a Mi CMS",
            }}
          </TextTranslator>
        </h2>
        <p className="mt-2">
          <TextTranslator>
            {{
              ptBR: (
                <>
                  O componente <Mark>Accordion</Mark> é muito utilizado com a função de agrupar
                  conceitos com explicações breves sobre cada item.
                </>
              ),
              en: (
                <>
                  The <Mark>Accordion</Mark> component is widely used to group concepts with brief
                  explanations for each item.
                </>
              ),
              es: (
                <>
                  El componente <Mark>Accordion</Mark> se utiliza mucho con la función de agrupar
                  conceptos con explicaciones breves sobre cada elemento.
                </>
              ),
            }}
          </TextTranslator>
        </p>
      </main>
    </div>
  );
}