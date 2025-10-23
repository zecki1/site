"use client";

import Link from "next/link";
import TextTranslator from "@/components/layout/TextTranslator";
import { BentoCard } from "@/components/layout/BentoCard";
import { SkillsMarquee } from "@/components/layout/SkillsMarquee";
import { ArrowRight, Mail, Video, Copy, ExternalLink, Github, Linkedin } from "lucide-react";

// --- COMPONENTE DA PÁGINA ---
export default function ServicesPage() {
    return (
        <div className="bg-background text-foreground min-h-screen py-24 px-4 md:px-8">
            <main className="w-full max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h2 className="font-sans text-lg font-light text-muted-foreground mb-4">
                        <TextTranslator>{{ ptBR: "MEUS SERVIÇOS", en: "MY SERVICES", es: "MIS SERVICIOS" }}</TextTranslator>
                    </h2>
                    <p className="font-serif text-2xl md:text-3xl text-foreground">
                        <TextTranslator>
                            {{
                                ptBR: "CONSTRUINDO SOLUÇÕES DE ALTO NÍVEL QUE RESOLVEM PROBLEMAS REAIS",
                                en: "BUILDING PRODUCTION SYSTEMS THAT SOLVE REAL PROBLEMS",
                                es: "CONSTRUYENDO SISTEMAS DE PRODUCCIÓN QUE RESUELVEN PROBLEMAS REALES"
                            }}
                        </TextTranslator>
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">

                    {/* Card 1: Metodologia */}
                    <BentoCard className="lg:col-span-1">
                        <h3 className="font-serif text-xl mb-2"><TextTranslator>{{ ptBR: "Metodologia", en: "Methodology", es: "Metodología" }}</TextTranslator></h3>
                        <p className="font-sans text-sm text-[#b3b3b3] mb-7"><TextTranslator>{{ ptBR: "Uso entrega Ágil e estou disponível em:", en: "I use lightweight Agile delivery and I'm available in:", es: "Uso entrega Ágil y estoy disponible en:" }}</TextTranslator></p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-1 content-center">
                            <div className="flex flex-col items-center justify-center gap-2 w-full h-22 border border-[#353739] rounded-2xl hover:border-[#555759] transition-colors duration-300 p-2">
                                <Mail className="w-9 h-9 text-yellow-300" />
                                <span className="font-sans text-sm text-[#b3b3b3] font-light">Email</span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2 w-full h-22 border border-[#353739] rounded-2xl hover:border-[#555759] transition-colors duration-300 p-2">
                                <Video className="w-9 h-9 text-green-500" />
                                <span className="font-sans text-sm text-[#b3b3b3] font-light">Video</span>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Card 2: Resultados */}
                    <BentoCard className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 items-center">
                        <div className="flex items-center justify-center">
                            {/* Você pode substituir este SVG por um mais complexo se desejar */}
                            <svg className="w-28 h-28" viewBox="0 0 102 110" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M87.125 0C81.26 0 76.5 4.73846 76.5 10.5769V99.4231C76.5 105.262 81.26 110 87.125 110H91.375C97.24 110 102 105.262 102 99.4231V10.5769C102 4.73282 97.24 0 91.375 0H87.125ZM38.25 35.9615C38.25 30.1174 43.01 25.3846 48.875 25.3846H53.125C58.9957 25.3846 63.75 30.1231 63.75 35.9615V99.4231C63.75 105.262 58.99 110 53.125 110H48.875C46.0571 110 43.3546 108.886 41.362 106.902C39.3694 104.919 38.25 102.228 38.25 99.4231V35.9615ZM0 61.3462C0 55.5021 4.76 50.7692 10.625 50.7692H14.875C20.7457 50.7692 25.5 55.5077 25.5 61.3462V99.4231C25.5 105.262 20.74 110 14.875 110H10.625C7.80707 110 5.10456 108.886 3.11199 106.902C1.11942 104.919 0 102.228 0 99.4231V61.3462Z" fill="url(#paint0_linear_results)" /><defs><linearGradient id="paint0_linear_results" x1="51" y1="-13" x2="51" y2="110" gradientUnits="userSpaceOnUse"><stop stop-color="#56CCF2" /><stop offset="1" stop-color="#2F80ED" /></linearGradient></defs></svg>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="font-serif text-2xl mb-2"><TextTranslator>{{ ptBR: "Resultados", en: "Results", es: "Resultados" }}</TextTranslator></h3>
                            <p className="text-[#b3b3b3] font-sans text-base font-light"><TextTranslator>{{ ptBR: "Soluções que geram resultados mensuráveis para o negócio.", en: "Solutions that drive measurable business results.", es: "Soluciones que impulsan resultados de negocio medibles." }}</TextTranslator></p>
                        </div>
                    </BentoCard>

                    {/* Card 3: Capabilities (Skills Marquee) */}
                    <BentoCard className="lg:col-span-3">
                        <h3 className="font-serif text-xl mb-4"><TextTranslator>{{ ptBR: "Habilidades", en: "Capabilities", es: "Capacidades" }}</TextTranslator></h3>
                        <div className="flex-1 flex items-center">
                            <SkillsMarquee />
                        </div>
                        <div className="mt-4">
                            <p className="font-sans font-light text-sm text-[#b3b3b3] mb-2"><TextTranslator>{{ ptBR: "Não encontrou sua stack?", en: "Don't see your stack?", es: "¿No ves tu stack?" }}</TextTranslator></p>
                            <Link href="/contato" className="font-serif text-[#f2f2f2] hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer">
                                <TextTranslator>{{ ptBR: "Vamos Conversar", en: "Let's Talk", es: "Hablemos" }}</TextTranslator>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </BentoCard>

                    {/* Card 4: CTA Final (Request Service) */}
                    <BentoCard className="lg:col-span-3">
                        <Link href="/contato" className="group w-full h-full flex items-center justify-between">
                            <h3 className="font-serif text-2xl md:text-4xl text-[#f2f2f2]">
                                <TextTranslator>
                                    {{ ptBR: "Solicitar um Serviço", en: "Request a Service", es: "Solicitar un Servicio" }}
                                </TextTranslator>
                            </h3>
                            <ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-muted-foreground transition-transform duration-300 group-hover:translate-x-2" />
                        </Link>
                    </BentoCard>

                </div>
            </main>
        </div>
    );
}