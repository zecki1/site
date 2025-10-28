"use client";

// A importação está correta, pois FloatingParticles tem um 'export default'.
import FloatingParticles from "./FloatingParticles";

/**
 * Este componente renderiza o efeito de partículas em toda a aplicação.
 */
export const GlobalBackgroundEffects = () => {
    return <FloatingParticles />;
};