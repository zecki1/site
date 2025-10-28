"use client";

import Script from 'next/script';

// Estende a interface global do Window para incluir a propriedade VLibras.
// A tipagem agora reflete a estrutura correta: VLibras é um objeto
// que contém a classe (construtor) 'Widget'.
// O tipo 'any' foi substituído por 'unknown' para maior segurança de tipo.
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
                    // Verifica se o objeto VLibras e seu método Widget existem
                    if (window.VLibras && window.VLibras.Widget) {
                        // A chamada agora corresponde perfeitamente à tipagem,
                        // eliminando erros de lint e TypeScript.
                        new window.VLibras.Widget('https://vlibras.gov.br/app');
                    }
                }}
            />
        </>
    );
}