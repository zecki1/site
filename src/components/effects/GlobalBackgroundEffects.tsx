"use client";

// A CORREÇÃO CRÍTICA: Importamos SEM as chaves {} porque é uma exportação 'default'.
import FloatingParticles from "./FloatingParticles";

/**
 * Este componente renderiza o efeito de partículas em canvas.
 */
export const GlobalBackgroundEffects = () => {
    return <FloatingParticles />;
}; 