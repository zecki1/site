"use client";

import { ComponentType, useEffect, useState } from "react";

// Porteiro da cena 3D: o chunk pesado do three.js só é baixado em telas
// ≥768px. No mobile jamais chega a ser buscado (Lighthouse / CPU), e a cena
// é desmontada se a janela encolher.
export function Ambient3D() {
    const [Scene, setScene] = useState<ComponentType<{ className?: string }> | null>(null);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        let alive = true;

        const sync = async () => {
            if (!alive) return;
            if (mq.matches) {
                const mod = await import("@/components/three/NetworkScene");
                if (!alive) return;
                setScene(() => mod.NetworkScene);
            } else {
                setScene(null);
            }
        };

        const onChange = () => sync();
        mq.addEventListener("change", onChange);
        void sync();

        return () => {
            alive = false;
            mq.removeEventListener("change", onChange);
        };
    }, []);

    if (!Scene) return null;
    return <Scene />;
}