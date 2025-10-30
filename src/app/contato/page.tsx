
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Loader2, Send, Github, Linkedin } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import TextTranslator from "@/components/layout/TextTranslator";

const sectionAnimation = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" as const }
};


export default function ContactPage() {
    const { i18n } = useTranslation();
    const form = useRef<HTMLFormElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const currentLanguage = isMounted ? i18n.language : 'ptBR';

    const pageTexts = {
        title: { ptBR: "Vamos Construir Algo Incrível", en: "Let's Build Something Amazing", es: "Construyamos Algo Increíble" },
        subtitle: { ptBR: "Tem um projeto em mente ou apenas quer dizer oi? Use o formulário abaixo ou escolha um dos canais de contato.", en: "Have a project in mind or just want to say hi? Use the form below or choose one of the contact channels.", es: "¿Tienes un proyecto en mente o simplemente quieres saludar? Usa el formulario de abajo o elige uno de los canales de contacto." },
        location: { ptBR: 'Localização', en: 'Location', es: 'Ubicación' },
        email: { ptBR: 'Email', en: 'Email', es: 'Correo Electrónico' },
        phone: { ptBR: 'Telefone', en: 'Phone', es: 'Teléfono' },
        nameLabel: { ptBR: 'Seu Nome', en: 'Your Name', es: 'Tu Nombre' },
        emailLabel: { ptBR: 'Seu Email', en: 'Your Email', es: 'Tu Correo' },
        subjectLabel: { ptBR: 'Assunto', en: 'Subject', es: 'Asunto' },
        messageLabel: { ptBR: 'Sua Mensagem', en: 'Your Message', es: 'Tu Mensaje' },
        buttonText: { ptBR: 'Enviar Mensagem', en: 'Send Message', es: 'Enviar Mensaje' },
        submittingText: { ptBR: 'Enviando...', en: 'Sending...', es: 'Enviando...' },
        successTitle: { ptBR: "Mensagem Enviada!", en: "Message Sent!", es: "¡Mensaje Enviado!" },
        successDescription: { ptBR: "Obrigado por entrar em contato. Retornarei em breve!", en: "Thank you for getting in touch. I will get back to you soon!", es: "Gracias por ponerte en contacto. ¡Te responderé pronto!" },
        errorTitle: { ptBR: "Falha no Envio", en: "Submission Failed", es: "Error al Enviar" },
        errorDescription: { ptBR: "Ocorreu um erro ao enviar sua mensagem. Tente novamente.", en: "An error occurred while sending your message. Please try again.", es: "Ocurrió un error al enviar tu mensaje. Por favor, inténtalo de nuevo." },
    };

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;
        setIsSubmitting(true);

        emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            form.current,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        ).then(() => {
            toast.success(pageTexts.successTitle[currentLanguage as keyof typeof pageTexts.successTitle], {
                description: pageTexts.successDescription[currentLanguage as keyof typeof pageTexts.successDescription],
            });
            form.current?.reset();
        }, (error) => {
            console.error("FAILED...", error);
            toast.error(pageTexts.errorTitle[currentLanguage as keyof typeof pageTexts.errorTitle], {
                description: pageTexts.errorDescription[currentLanguage as keyof typeof pageTexts.errorDescription],
            });
        }).finally(() => {
            setIsSubmitting(false);
        });
    }

    return (
        <>
            <section className="py-24 md:py-32">
                <motion.header {...sectionAnimation} className="text-center max-w-3xl mx-auto bg-background/70 backdrop-blur py-2 u-container">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                        <TextTranslator ignoreCheck={true}>{pageTexts.title}</TextTranslator>
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        <TextTranslator ignoreCheck={true}>{pageTexts.subtitle}</TextTranslator>
                    </p>
                </motion.header>
            </section>

            <section className="pb-24 md:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto u-container">
                    <motion.div {...sectionAnimation} transition={{ delay: 0.2 }} className="lg:col-span-1 flex flex-col space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 text-primary p-3 rounded-full mt-1"><MapPin /></div>
                            <div>
                                <h3 className="font-semibold text-lg"><TextTranslator ignoreCheck={true}>{pageTexts.location}</TextTranslator></h3>
                                <p className="text-muted-foreground">São Paulo - SP, Brasil</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 text-primary p-3 rounded-full mt-1"><Mail /></div>
                            <div>
                                <h3 className="font-semibold text-lg"><TextTranslator ignoreCheck={true}>{pageTexts.email}</TextTranslator></h3>
                                <a href="mailto:zecki1@hotmail.com" className="text-muted-foreground hover:text-primary transition-colors">zecki1@hotmail.com</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 text-primary p-3 rounded-full mt-1"><Phone /></div>
                            <div>
                                <h3 className="font-semibold text-lg"><TextTranslator ignoreCheck={true}>{pageTexts.phone}</TextTranslator></h3>
                                <a href="https://wa.me/5511982101630" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">+55 (11) 9 8210-1630</a>
                            </div>
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
                            <a href="https://github.com/zecki1" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="w-7 h-7 transition-transform hover:scale-110" />
                            </a>
                            <a href="https://linkedin.com/in/zecki1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="w-7 h-7 transition-transform hover:scale-110" />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div {...sectionAnimation} transition={{ delay: 0.4 }} className="lg:col-span-2">
                        <div className="bg-background/70 backdrop-blur p-6 md:p-8 rounded-2xl shadow-lg border border-white/10">
                            <form ref={form} onSubmit={sendEmail} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name"><TextTranslator ignoreCheck={true}>{pageTexts.nameLabel}</TextTranslator></Label>
                                        <Input id="name" name="name" required placeholder="Seu nome completo" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email"><TextTranslator ignoreCheck={true}>{pageTexts.emailLabel}</TextTranslator></Label>
                                        <Input id="email" name="email" type="email" required placeholder="seu.email@exemplo.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject"><TextTranslator ignoreCheck={true}>{pageTexts.subjectLabel}</TextTranslator></Label>
                                    <Input id="subject" name="subject" required placeholder="Qual o motivo do contato?" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message"><TextTranslator ignoreCheck={true}>{pageTexts.messageLabel}</TextTranslator></Label>
                                    <Textarea id="message" name="message" required rows={5} placeholder="Digite sua mensagem aqui..." />
                                </div>
                                <div className="text-center pt-4">
                                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                <TextTranslator ignoreCheck={true}>{pageTexts.submittingText}</TextTranslator>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-4 w-4" />
                                                <TextTranslator ignoreCheck={true}>{pageTexts.buttonText}</TextTranslator>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}