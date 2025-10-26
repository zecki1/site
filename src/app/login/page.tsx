"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebase";
import { Toaster, toast } from "sonner";
import { Loader2, Mail, Lock, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TextTranslator from "@/components/layout/TextTranslator";
import FloatingParticles from "@/components/effects/FloatingParticles";

const pageTexts = {
    title: { ptBR: "Área do Cliente", en: "Client Area", es: "Área de Cliente" },
    description: { ptBR: "Acesse o painel de gerenciamento do seu site.", en: "Access your website's management panel.", es: "Accede al panel de gestión de tu sitio web." },
    forgotPassword: { ptBR: "Esqueci minha senha", en: "Forgot my password", es: "Olvidé mi contraseña" },
    continueWith: { ptBR: "Ou continue com", en: "Or continue with", es: "O continuar con" },
    placeholders: {
        email: { ptBR: "seu@email.com", en: "your@email.com", es: "tu@email.com" },
        password: { ptBR: "••••••••", en: "••••••••", es: "••••••••" },
    },
    buttons: {
        logIn: { ptBR: "Entrar", en: "Log In", es: "Entrar" },
        loggingIn: { ptBR: "Entrando...", en: "Logging in...", es: "Entrando..." },
    },
    toasts: {
        titles: {
            loginFailed: { ptBR: "Falha no login", en: "Login failed", es: "Fallo de inicio de sesión" },
            loginSuccess: { ptBR: "Login bem-sucedido!", en: "Login successful!", es: "¡Inicio de sesión exitoso!" },
            googleLoginSuccess: { ptBR: "Login com Google bem-sucedido!", en: "Google login successful!", es: "¡Inicio de sesión con Google exitoso!" },
            requiredFields: { ptBR: "Campos obrigatórios", en: "Required fields", es: "Campos obligatorios" },
            provideEmail: { ptBR: "Informe seu e-mail", en: "Provide your email", es: "Informa tu correo electrónico" },
        },
        descriptions: {
            redirecting: { ptBR: "Redirecionando...", en: "Redirecting...", es: "Redirigiendo..." },
            provideEmailForReset: { ptBR: "Digite seu e-mail no campo acima para redefinir a senha.", en: "Enter your email in the field above to reset your password.", es: "Ingresa tu correo en el campo de arriba para restablecer la contraseña." },
            resetEmailSent: { ptBR: "Email de redefinição de senha enviado! Verifique sua caixa de entrada.", en: "Password reset email sent! Check your inbox.", es: "¡Correo de restablecimiento enviado! Revisa tu bandeja de entrada." },
        },
        errors: {
            invalidCredential: { ptBR: "Email ou senha inválidos.", en: "Invalid email or password.", es: "Correo o contraseña no válidos." },
            tooManyRequests: { ptBR: "Acesso bloqueado temporariamente. Tente novamente mais tarde.", en: "Access temporarily blocked. Please try again later.", es: "Acceso bloqueado temporalmente. Inténtalo de novo más tarde." },
            userDisabled: { ptBR: "Esta conta de usuário foi desativada.", en: "This user account has been disabled.", es: "Esta cuenta de usuario ha sido deshabilitada." },
            unknown: { ptBR: "Ocorreu um erro desconhecido. Tente novamente.", en: "An unknown error occurred. Please try again.", es: "Ocurrió un error desconocido. Inténtalo de nuevo." },
            fillFields: { ptBR: "Por favor, preencha o e-mail e a senha.", en: "Please fill in both email and password.", es: "Por favor, completa el correo y la contraseña." },
            resetEmailFailed: { ptBR: "Falha ao enviar o email de redefinição. Verifique o email digitado.", en: "Failed to send reset email. Please check the entered email.", es: "Fallo al enviar el correo. Verifica el correo ingresado." },
        },
    },
};

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const router = useRouter();
    const { i18n } = useTranslation();

    const getTranslatedText = (textObj: { [key: string]: string | undefined }): string => {
        const [isMounted, setIsMounted] = useState(false);
        useEffect(() => setIsMounted(true), []);
        const lang = isMounted ? i18n.language : "ptBR";
        return textObj[lang] || textObj.ptBR || "";
    };

    const handleAuthError = (err: unknown) => {
        const error = err as FirebaseError;
        let errorObj = pageTexts.toasts.errors.unknown;
        switch (error.code) {
            case 'auth/user-not-found': case 'auth/wrong-password': case 'auth/invalid-credential':
                errorObj = pageTexts.toasts.errors.invalidCredential; break;
            case 'auth/too-many-requests':
                errorObj = pageTexts.toasts.errors.tooManyRequests; break;
            case 'auth/user-disabled':
                errorObj = pageTexts.toasts.errors.userDisabled; break;
            default: console.error("Firebase Auth Error:", error); break;
        }
        toast.error(getTranslatedText(pageTexts.toasts.titles.loginFailed), { description: getTranslatedText(errorObj) });
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error(getTranslatedText(pageTexts.toasts.titles.requiredFields), { description: getTranslatedText(pageTexts.toasts.errors.fillFields) });
            return;
        }
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success(getTranslatedText(pageTexts.toasts.titles.loginSuccess), { description: getTranslatedText(pageTexts.toasts.descriptions.redirecting) });
            setTimeout(() => router.push("/admin/dashboard"), 1500);
        } catch (err) {
            handleAuthError(err);
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            toast.success(getTranslatedText(pageTexts.toasts.titles.googleLoginSuccess), { description: getTranslatedText(pageTexts.toasts.descriptions.redirecting) });
            setTimeout(() => router.push("/admin/dashboard"), 1500);
        } catch (err) {
            handleAuthError(err);
            setIsGoogleLoading(false);
        }
    };

    const handlePasswordReset = () => {
        if (!email) {
            toast.info(getTranslatedText(pageTexts.toasts.titles.provideEmail), { description: getTranslatedText(pageTexts.toasts.descriptions.provideEmailForReset) });
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => { toast.success(getTranslatedText(pageTexts.toasts.descriptions.resetEmailSent)); })
            .catch(() => { toast.error(getTranslatedText(pageTexts.toasts.errors.resetEmailFailed)); });
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen w-full bg-background overflow-hidden p-4">

            <FloatingParticles />

            <div className="absolute inset-0 z-0">
                <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,225,255,0.7),rgba(255,255,255,0))]"></div>
                <div className="absolute bottom-[-80px] right-[-30%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(127,0,255,0.7),rgba(255,255,255,0))]"></div>
            </div>

            <Toaster position="top-center" richColors />

            <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md bg-card/80 backdrop-blur-lg border border-border/20 rounded-2xl shadow-2xl z-10"
            >
                <div className="p-8 space-y-6">
                    <div className="text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-3xl font-bold text-card-foreground"
                        >
                            <TextTranslator>{pageTexts.title}</TextTranslator>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-muted-foreground mt-2"
                        >
                            <TextTranslator>{pageTexts.description}</TextTranslator>
                        </motion.p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="email" type="email" placeholder={getTranslatedText(pageTexts.placeholders.email)}
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                required disabled={isLoading || isGoogleLoading}
                                className="pl-10 h-12"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                id="password" type="password" placeholder={getTranslatedText(pageTexts.placeholders.password)}
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                required disabled={isLoading || isGoogleLoading}
                                className="pl-10 h-12"
                            />
                        </div>

                        <div className="flex justify-end text-sm">
                            <button type="button" onClick={handlePasswordReset} className="text-primary hover:underline font-medium">
                                <TextTranslator>{pageTexts.forgotPassword}</TextTranslator>
                            </button>
                        </div>

                        <Button type="submit" className="w-full h-12 font-bold text-md" disabled={isLoading || isGoogleLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5" />}
                            {isLoading ? getTranslatedText(pageTexts.buttons.loggingIn) : getTranslatedText(pageTexts.buttons.logIn)}
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
