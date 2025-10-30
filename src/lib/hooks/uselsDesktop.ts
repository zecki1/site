import { useState, useEffect } from 'react';

export const useIsDesktop = () => {
    // Começa como 'false' para garantir que o render do servidor e do cliente inicial coincidam.
    const [isDesktop, setIsDesktop] = useState<boolean>(false);

    useEffect(() => {
        // Esta função verifica e atualiza o estado.
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 1024);
        };

        // Roda a função uma vez no início para definir o estado inicial no cliente.
        handleResize();

        // Adiciona um event listener para atualizar o estado se o tamanho da janela mudar.
        window.addEventListener('resize', handleResize);

        // Função de limpeza: remove o event listener quando o componente é desmontado.
        // Isso é crucial para evitar memory leaks.
        return () => window.removeEventListener('resize', handleResize);
    }, []); // O array vazio [] garante que este efeito rode apenas uma vez (no mount e unmount).

    return isDesktop;
};