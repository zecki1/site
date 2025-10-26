"use client";

import FloatingParticles from "./FloatingParticles";
import FloatingScrollIcons from "./FloatingScrollIcons";

/**
 * Este componente renderiza os efeitos visuais de fundo em uma camada fixa.
 * Ele deve ser colocado no layout principal para cobrir toda a página.
 * A propriedade `z-[-1]` garante que ele fique atrás de todo o conteúdo.
 */
export const GlobalBackgroundEffects = () => {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <FloatingParticles />
            <FloatingScrollIcons />
        </div>
    );
};