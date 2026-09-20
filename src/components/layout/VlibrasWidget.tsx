"use client";

import React, { useEffect } from 'react';

// ✨ CORREÇÃO APLICADA AQUI ✨
// Estende as definições de tipo do React para incluir os atributos customizados do VLibras.
// Isso informa ao TypeScript que 'vw', 'vw-access-button' e 'vw-plugin-wrapper'
// são propriedades válidas para elementos HTML como <div>.
declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        vw?: string;
        'vw-access-button'?: string;
        'vw-plugin-wrapper'?: string;
    }
}

// Estende a interface global do Window para incluir a propriedade VLibras.
declare global {
    interface Window {
        VLibras?: {
            Widget: new (src: string) => unknown;
        };
    }
}

export function VlibrasWidget() {
    useEffect(() => {
        // O widget VLibras só é carregado quando o usuário interage de fato com a
        // página (primeiro clique/toque, rolagem ou tecla). Assim a biblioteca de
        // terceiros não entra no caminho crítico nem interfere no desempenho inicial.
        let scriptEl: HTMLScriptElement | null = null;
        let started = false;

        const start = () => {
            if (started) return;
            started = true;
            cleanupListeners();

            if (window.VLibras && window.VLibras.Widget) {
                new window.VLibras.Widget('https://vlibras.gov.br/app');
                return;
            }

            // Garante que o script do VLibras exista antes de instanciar.
            scriptEl = document.createElement('script');
            scriptEl.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
            scriptEl.async = true;
            scriptEl.addEventListener('load', () => {
                if (window.VLibras && window.VLibras.Widget) {
                    new window.VLibras.Widget('https://vlibras.gov.br/app');
                }
            });
            document.head.appendChild(scriptEl);
        };

        const cleanupListeners = () => {
            window.removeEventListener('pointerdown', start);
            window.removeEventListener('scroll', start);
            window.removeEventListener('keydown', start);
        };

        window.addEventListener('pointerdown', start);
        window.addEventListener('scroll', start, { passive: true });
        window.addEventListener('keydown', start);

        return () => {
            cleanupListeners();
            scriptEl?.remove();
        };
    }, []);

    return (
        <>
            {/* Atributos 'vw' são reconhecidos pelo TypeScript graças ao declare module acima. */}
            <div vw="true" className="enabled">
                <div vw-access-button="true" className="active"></div>
                <div vw-plugin-wrapper="true">
                    <div className="vw-plugin-top-wrapper"></div>
                </div>
            </div>
        </>
    );
}