// app/login/page.tsx
"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin");
        } catch (error) {
            console.error("Erro ao logar:", error);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
            />
            <Button onClick={handleLogin}>Entrar</Button>
        </div>
    );
}