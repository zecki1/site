
"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebase";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Loader2, Mail, Lock, LogIn, Phone, Send, ShieldCheck, Sparkles, LayoutDashboard, Images, Globe2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextTranslator from "@/components/layout/TextTranslator";

const pageTexts = {
    title: { ptBR: "Bem-vindo de volta", en: "Welcome back", es: "Bienvenido de nuevo" },
    subtitle: { ptBR: "Acesse o painel de gerenciamento do seu site.", en: "Access your website's management panel.", es: "Accede al panel de gestión de tu sitio web." },
    brandName: { ptBR: "Painel de Gestão", en: "Management Panel", es: "Panel de Gestión" },
    brandSub: { ptBR: "Sua plataforma para gerenciar o conteúdo do seu site.", en: "Your platform to manage your website content.", es: "Tu plataforma para gestionar el contenido de tu sitio web." },
    forgotPassword: { ptBR: "Esqueci minha senha", en: "Forgot my password", es: "Olvidé mi contraseña" },
    placeholders: {
        email: { ptBR: "seu@email.com", en: "your@email.com", es: "tu@email.com" },
        password: { ptBR: "Sua senha", en: "Your password", es: "Tu contraseña" },
    },
    buttons: {
        logIn: { ptBR: "Entrar no Painel", en: "Sign in", es: "Entrar" },
        loggingIn: { ptBR: "Entrando...", en: "Signing in...", es: "Entrando..." },
    },
    toasts: {
        errors: {
            invalidCredential: { ptBR: "Credenciais inválidas", en: "Invalid credentials", es: "Credenciales inválidas" },
            tooManyRequests: { ptBR: "Muitas tentativas", en: "Too many requests", es: "Demasiadas solicitudes" },
            userDisabled: { ptBR: "Usuário desabilitado", en: "User disabled", es: "Usuario deshabilitado" },
            unknown: { ptBR: "Ocorreu um erro", en: "An error occurred", es: "Ocurrió un error" }
        }
    },
    features: [
        {
            icon: LayoutDashboard,
            title: { ptBR: "Edição simples e intuitiva", en: "Simple, intuitive editing", es: "Edición simple e intuitiva" },
            desc: { ptBR: "Altere textos, imagens e portfólio sem precisar de código.", en: "Change texts, images and portfolio without needing code.", es: "Cambia textos, imágenes y portafolio sin necesidad de código." },
        },
        {
            icon: Images,
            title: { ptBR: "Portfólio completo", en: "Complete portfolio", es: "Portafolio completo" },
            desc: { ptBR: "Imagens, vídeos e reels do YouTube em poucos cliques.", en: "Images, videos and YouTube reels in a few clicks.", es: "Imágenes, vídeos y reels de YouTube en pocos clics." },
        },
        {
            icon: Globe2,
            title: { ptBR: "Publicação instantânea", en: "Instant publishing", es: "Publicación instantánea" },
            desc: { ptBR: "Salve e veja as mudanças no ar imediatamente.", en: "Save and see changes live immediately.", es: "Guarda y ve los cambios publicados al instante." },
        },
    ] as const,
};

const sectionAnimation = { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: "easeOut" as const } };
const staggerContainer = { animate: { transition: { staggerChildren: 0.12 } } };
const itemAnimation = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

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
            setTimeout(() => router.push("/admin/dashboard"), 1000);
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

            <div className="relative min-h-screen w-full overflow-hidden bg-background">
                {/* Fundo decorativo */}
                <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl" aria-hidden="true" />

                <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center p-4 md:p-8">
                    <div className="grid w-full grid-cols-1 overflow-hidden rounded-3xl border bg-card/60 shadow-2xl backdrop-blur lg:grid-cols-2">
                        {/* Painel de marca (lado esquerdo) */}
                        <motion.aside
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-700 p-10 text-white lg:flex"
                        >
                            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
                            <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-black/10 blur-2xl" aria-hidden="true" />

                            <div className="relative">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                                        <Sparkles className="h-6 w-6" />
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-black tracking-tight">zecki1</span>
                                        <span className="text-xs text-white/80"><TextTranslator>{pageTexts.brandSub}</TextTranslator></span>
                                    </div>
                                </div>

                                <div className="mt-16 space-y-8">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="h-6 w-6 text-white/90" />
                                        <h2 className="text-2xl font-bold leading-tight">
                                            <TextTranslator>{pageTexts.brandName}</TextTranslator>
                                        </h2>
                                    </div>
                                    <div className="space-y-6">
                                        {pageTexts.features.map((feature) => {
                                            const Icon = feature.icon;
                                            return (
                                                <div key={feature.title.ptBR} className="flex items-start gap-4">
                                                    <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
                                                        <Icon className="h-5 w-5" />
                                                    </span>
                                                    <div>
                                                        <p className="font-semibold"><TextTranslator>{feature.title}</TextTranslator></p>
                                                        <p className="text-sm text-white/80"><TextTranslator>{feature.desc}</TextTranslator></p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="relative mt-16 flex items-center gap-3 text-sm text-white/80">
                                <CheckCircle2 className="h-5 w-5" />
                                <span><TextTranslator>{{ ptBR: "Seus dados estão protegidos e seguros.", en: "Your data is protected and secure.", es: "Tus datos están protegidos y seguros." }}</TextTranslator></span>
                            </div>
                        </motion.aside>

                        {/* Formulário (lado direito) */}
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                            className="p-6 sm:p-10 lg:p-14"
                        >
                            <div className="mb-8 lg:hidden">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                        <Sparkles className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-xl font-black tracking-tight">zecki1</p>
                                        <p className="text-xs text-muted-foreground"><TextTranslator>{pageTexts.brandName}</TextTranslator></p>
                                    </div>
                                </div>
                            </div>

                            <motion.div variants={sectionAnimation}>
                                <h1 className="text-3xl font-bold tracking-tight">
                                    <TextTranslator>{pageTexts.title}</TextTranslator>
                                </h1>
                                <p className="mt-2 text-muted-foreground">
                                    <TextTranslator>{pageTexts.subtitle}</TextTranslator>
                                </p>
                            </motion.div>

                            <form onSubmit={handleLogin} className="mt-8 space-y-5">
                                <motion.div variants={itemAnimation} className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="email" type="email" placeholder={getTranslatedText(pageTexts.placeholders.email)}
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            required disabled={isLoading}
                                            className="h-12 pl-11"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div variants={itemAnimation} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
                                        <button type="button" onClick={handlePasswordReset} className="text-sm font-medium text-primary hover:underline disabled:opacity-50" disabled={isLoading}>
                                            <TextTranslator>{pageTexts.forgotPassword}</TextTranslator>
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="password" type="password" placeholder={getTranslatedText(pageTexts.placeholders.password)}
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                            required disabled={isLoading}
                                            className="h-12 pl-11"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div variants={itemAnimation}>
                                    <Button type="submit" className="h-12 w-full gap-2 text-base font-semibold" disabled={isLoading}>
                                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogIn className="h-5 w-5" />}
                                        {isLoading ? getTranslatedText(pageTexts.buttons.loggingIn) : getTranslatedText(pageTexts.buttons.logIn)}
                                    </Button>
                                </motion.div>
                            </form>

                            <motion.div variants={itemAnimation} className="mt-10 rounded-xl border bg-muted/40 p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    <TextTranslator>{{ ptBR: "Precisa de ajuda?", en: "Need help?", es: "¿Necesitas ayuda?" }}</TextTranslator>
                                </p>
                                <div className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
                                    <span className="flex items-center gap-2"><Send className="h-4 w-4" /><a href="mailto:zecki1@hotmail.com" className="hover:text-primary transition-colors">zecki1@hotmail.com</a></span>
                                    <span className="flex items-center gap-2"><Phone className="h-4 w-4" /><a href="tel:+5511982101630" className="hover:text-primary transition-colors">+55 (11) 9 8210-1630</a></span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
