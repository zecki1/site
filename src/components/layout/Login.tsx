"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        if (username === "cleriston" && password === "12345") {
            router.push("/admin/cleriston/dashboard");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="bg-white p-8 rounded shadow-md">
            <h1 className="text-2xl-4 mb-6">Login</h1>
            <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-4"
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4"
            />
            <Button onClick={handleLogin} className="w-full">
                Login
            </Button>
        </div>
    );
}