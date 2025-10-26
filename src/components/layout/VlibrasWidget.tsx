"use client";

import Script from 'next/script';

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
                    if (window.VLibras) {
                        // @ts-ignore
                        new window.VLibras.Widget('https://vlibras.gov.br/app');
                    }
                }}
            />
        </>
    );
}