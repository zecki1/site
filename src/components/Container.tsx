// src/components/Container.tsx
import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    fluid?: boolean; // Opcional, padrão é false (container limitado)
    className?: string; // Para estilos adicionais, se necessário
}

export default function Container({ children, fluid = false, className = "" }: ContainerProps) {
    const baseStyles = "pt-16"; // Espaço para o Header
    const fluidStyles = "w-full px-4 sm:px-6 lg:px-8"; // Largura total com padding responsivo
    const limitedStyles = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"; // Largura limitada e centralizada

    return (
        <div className={`${baseStyles} ${fluid ? fluidStyles : limitedStyles} ${className}`}>
            {children}
        </div>
    );
}