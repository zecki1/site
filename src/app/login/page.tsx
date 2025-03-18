import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
    async function handleEmailLogin(formData: FormData) {
        "use client";
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        await signIn("email", { email, password, callbackUrl: "/admin" });
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            <form action={handleEmailLogin}>
                <Input name="email" type="email" placeholder="Email" />
                <Input name="password" type="password" placeholder="Senha" />
                <Button type="submit">Login com Email</Button>
            </form>
            <Button onClick={() => signIn("google", { callbackUrl: "/admin" })}>
                Login com Google
            </Button>
        </div>
    );
}