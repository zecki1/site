"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ScrollSmootherHeader } from "@/components/gsap/ScrollSmootherHeader";
import "../../lib/i18n"; // Ajuste o caminho relativo

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { i18n } = useTranslation();

    useEffect(() => {
        const savedLang = localStorage.getItem("i18nLng");
        if (!savedLang || savedLang !== "ptBR") {
            i18n.changeLanguage("ptBR");
        }
    }, [i18n]);

    const handleLogin = () => {
        if (username === "cleriston" && password === "12345") {
            router.push("/admin/cleristonribeiro/dashboard");
        } else {
            alert("Credenciais inválidas");
        }
    };

    return (
        <div>
            <ScrollSmootherHeader />
            <div id="main-content" className="pt-[100vh] min-h-screen flex items-center justify-center" style={{ opacity: 0, pointerEvents: "none" }}>
                <div className="bg-white p-8 rounded shadow-md">
                    <h1 className="text-2xl mb-4">Login</h1>
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2 mb-4 w-full"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 mb-4 w-full"
                    />
                    <button onClick={handleLogin} className="bg-blue-600 text-white p-2 rounded w-full">
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    );
}