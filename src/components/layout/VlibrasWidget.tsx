
"use client";

import React from 'react'; // Import React para que a declaração do módulo funcione corretamente
import Script from 'next/script';

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
        VLibras: {
            Widget: new (src: string) => unknown;
        };
    }
}

export function VlibrasWidget() {
    return (
        <>
            {/* Agora TypeScript reconhece os atributos 'vw' como válidos. */}
            <div vw="true" className="enabled">
                <div vw-access-button="true" className="active"></div>
                <div vw-plugin-wrapper="true">
                    <div className="vw-plugin-top-wrapper"></div>
                </div>
            </div>
            <Script
                id="vlibras-plugin-script"
                src="https://vlibras.gov.br/app/vlibras-plugin.js"
                strategy="afterInteractive"
                onLoad={() => {
                    // Verifica se o objeto VLibras e seu método Widget existem antes de instanciá-lo
                    if (window.VLibras && window.VLibras.Widget) {
                        new window.VLibras.Widget('https://vlibras.gov.br/app');
                    }
                }}
            />
        </>
    );
}