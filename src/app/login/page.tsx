
"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebase";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Loader2, Mail, Lock, LogIn, Phone, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextTranslator from "@/components/layout/TextTranslator";

const pageTexts = {
    title: { ptBR: "Área do Cliente", en: "Client Area", es: "Área de Cliente" },
    description: { ptBR: "Acesse o painel de gerenciamento do seu site.", en: "Access your website's management panel.", es: "Accede al panel de gestión de tu sitio web." },
    forgotPassword: { ptBR: "Esqueci minha senha", en: "Forgot my password", es: "Olvidé mi contraseña" },
    placeholders: {
        email: { ptBR: "seu@email.com", en: "your@email.com", es: "tu@email.com" },
        password: { ptBR: "••••••••", en: "••••••••", es: "••••••••" },
    },
    buttons: {
        logIn: { ptBR: "Entrar", en: "Log In", es: "Entrar" },
        loggingIn: { ptBR: "Entrando...", en: "Logging in...", es: "Entrando..." },
    },
    toasts: {
        errors: {
            invalidCredential: { ptBR: "Credenciais inválidas", en: "Invalid credentials", es: "Credenciales inválidas" },
            tooManyRequests: { ptBR: "Muitas tentativas", en: "Too many requests", es: "Demasiadas solicitudes" },
            userDisabled: { ptBR: "Usuário desabilitado", en: "User disabled", es: "Usuario deshabilitado" },
            unknown: { ptBR: "Ocorreu um erro", en: "An error occurred", es: "Ocurrió un error" }
        }
    }
};

const sectionAnimation = { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: "easeOut" } };
const staggerContainer = { animate: { transition: { staggerChildren: 0.15 } } };
const itemAnimation = { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } };

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { i18n } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => { setIsMounted(true); }, []);

    const getTranslatedText = (textObj: { [key: string]: string | undefined }): string => {
        const lang = isMounted ? i18n.language : "ptBR";
        return textObj[lang] || textObj.ptBR || "";
    };

    const handleAuthError = (err: unknown) => {
        const error = err as FirebaseError;
        let errorKey: keyof typeof pageTexts.toasts.errors = 'unknown';

        switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                errorKey = 'invalidCredential';
                break;
            case 'auth/too-many-requests':
                errorKey = 'tooManyRequests';
                break;
            case 'auth/user-disabled':
                errorKey = 'userDisabled';
                break;
            default:
                console.error("Firebase Auth Error:", error);
                break;
        }

        const errorMessage = getTranslatedText(pageTexts.toasts.errors[errorKey]);
        toast.error(errorMessage);
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Campos obrigatórios", { description: "Por favor, preencha o e-mail e a senha." });
            return;
        }
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login bem-sucedido!", { description: "Redirecionando para o painel..." });
            setTimeout(() => router.push("/admin/dashboard"), 1500);
        } catch (err) {
            handleAuthError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = () => {
        if (!email) {
            toast.info("Informe seu e-mail", { description: "Digite seu e-mail no campo acima para redefinir a senha." });
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => toast.success("E-mail de redefinição enviado!", { description: "Verifique sua caixa de entrada." }))
            .catch(() => toast.error("Falha no envio", { description: "Verifique o e-mail digitado e tente novamente." }));
    };

    return (
        <>
            <Toaster position="bottom-center" richColors />

            <section className="min-h-screen flex items-center justify-center py-12">
                <div className="max-w-7xl mx-auto p-4 md:p-8 u-container">
                    <motion.header
                        variants={sectionAnimation}
                        initial="initial"
                        animate="animate"
                        className="text-center mb-16 bg-background/70 backdrop-blur"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-background/70 backdrop-blu">
                            <TextTranslator>{pageTexts.title}</TextTranslator>
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                            <TextTranslator>{pageTexts.description}</TextTranslator>
                        </p>
                    </motion.header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
                        <motion.aside
                            variants={sectionAnimation}
                            initial="initial"
                            animate="animate"
                            className="lg:col-span-1 flex flex-col gap-8 bg-background/70 backdrop-blur"
                        >
                            <div>
                                <h3 className="flex items-center gap-3 text-2xl font-bold border-b pb-2 mb-4">
                                    <ShieldCheck size={22} />
                                    <TextTranslator>{{ ptBR: "Plataforma Segura", en: "Secure Platform", es: "Plataforma Segura" }}</TextTranslator>
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    <TextTranslator>{{
                                        ptBR: "Este é o seu centro de controle dedicado para gerenciar todo o conteúdo do seu site de forma simples e intuitiva. Seus dados estão protegidos.",
                                        en: "This is your dedicated control center for managing all your website's content simply and intuitively. Your data is protected.",
                                        es: "Este es tu centro de control dedicado para gestionar todo el contenido de tu sitio web de forma simple e intuitiva. Tus datos están protegidos."
                                    }}</TextTranslator>
                                </p>
                            </div>
                            <div>
                                <h3 className="flex items-center gap-3 text-2xl font-bold border-b pb-2 mb-4">
                                    <TextTranslator>{{ ptBR: "Precisa de Ajuda?", en: "Need Help?", es: "¿Necesitas Ayuda?" }}</TextTranslator>
                                </h3>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li className="flex items-center gap-3"><Send size={16} /> <a href="mailto:zecki1@hotmail.com" className="hover:text-primary transition-colors">zecki1@hotmail.com</a></li>
                                    <li className="flex items-center gap-3"><Phone size={16} /> <a href="tel:+5511982101630" className="hover:text-primary transition-colors">+55 (11) 9 8210-1630</a></li>
                                </ul>
                            </div>
                        </motion.aside>

                        <motion.main
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                            className="lg:col-span-2 bg-card/50 backdrop-blur border rounded-2xl p-6 md:p-8 shadow-lg"
                        >
                            <form onSubmit={handleLogin} className="space-y-6">
                                <motion.div variants={itemAnimation} className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            id="email" type="email" placeholder={getTranslatedText(pageTexts.placeholders.email)}
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            required disabled={isLoading}
                                            className="pl-10 h-12"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div variants={itemAnimation} className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            id="password" type="password" placeholder={getTranslatedText(pageTexts.placeholders.password)}
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                            required disabled={isLoading}
                                            className="pl-10 h-12"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div variants={itemAnimation} className="flex justify-end text-sm">
                                    <button type="button" onClick={handlePasswordReset} className="text-primary hover:underline font-medium disabled:opacity-50" disabled={isLoading}>
                                        <TextTranslator>{pageTexts.forgotPassword}</TextTranslator>
                                    </button>
                                </motion.div>

                                <motion.div variants={itemAnimation}>
                                    <Button type="submit" className="w-full h-12 font-bold text-md" disabled={isLoading}>
                                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5" />}
                                        {isLoading ? getTranslatedText(pageTexts.buttons.loggingIn) : getTranslatedText(pageTexts.buttons.logIn)}
                                    </Button>
                                </motion.div>
                            </form>
                        </motion.main>
                    </div>
                </div>
            </section>
        </>
    );
}