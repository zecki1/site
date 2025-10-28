
"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Code, Palette, Rocket, Server, Bot, ShieldCheck, Lightbulb } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import TextTranslator from '@/components/layout/TextTranslator';
import { ElementType } from 'react';

// --- DEFINIÇÃO DE TIPOS E DADOS DIRETAMENTE NO ARQUIVO ---

type LocalizedText = {
    ptBR: string;
    en: string;
    es: string;
};

type ServiceDetail = {
    title: LocalizedText;
    content: LocalizedText;
};

type Service = {
    id: string;
    icon: ElementType;
    title: LocalizedText;
    description: LocalizedText;
    details: ServiceDetail[];
};

// Lista completa de serviços
const servicesData: Service[] = [
    {
        id: "item-1",
        icon: Code,
        title: {
            ptBR: "Desenvolvimento de Software",
            en: "Software Development",
            es: "Desarrollo de Software"
        },
        description: {
            ptBR: "Criamos soluções de software robustas e sob medida, desde aplicações web complexas a sistemas corporativos, focando sempre em escalabilidade, performance e segurança.",
            en: "We create robust and tailor-made software solutions, from complex web applications to corporate systems, always focusing on scalability, performance, and security.",
            es: "Creamos soluciones de software robustas y a medida, desde aplicaciones web complejas hasta sistemas corporativos, centrándonos siempre en la escalabilidad, el rendimiento y la seguridad."
        },
        details: [
            {
                title: {
                    ptBR: "Aplicações Web e Mobile",
                    en: "Web and Mobile Applications",
                    es: "Aplicaciones Web y Móviles"
                },
                content: {
                    ptBR: "Desenvolvimento full-stack de aplicações interativas e de alta performance utilizando as tecnologias mais recentes como React, Next.js, Node.js e React Native.",
                    en: "Full-stack development of interactive, high-performance applications using the latest technologies such as React, Next.js, Node.js, and React Native.",
                    es: "Desarrollo full-stack de aplicaciones interactivas y de alto rendimiento utilizando las últimas tecnologías como React, Next.js, Node.js y React Native."
                }
            },
        ]
    },
    {
        id: "item-2",
        icon: Palette,
        title: {
            ptBR: "UI/UX Design",
            en: "UI/UX Design",
            es: "Diseño UI/UX"
        },
        description: {
            ptBR: "Projetamos interfaces intuitivas e experiências de usuário memoráveis que não só encantam os usuários, mas também convertem visitantes em clientes e otimizam a jornada digital.",
            en: "We design intuitive interfaces and memorable user experiences that not only delight users but also convert visitors into customers and optimize the digital journey.",
            es: "Diseñamos interfaces intuitivas y experiencias de usuario memorables que no solo deleitan a los usuarios, sino que también convierten visitantes en clientes y optimizan el viaje digital."
        },
        details: [
            {
                title: {
                    ptBR: "Design de Interface e Prototipagem",
                    en: "Interface Design & Prototyping",
                    es: "Diseño de Interfaz y Prototipado"
                },
                content: {
                    ptBR: "Criação de wireframes, protótipos interativos e designs de alta fidelidade no Figma, focados em usabilidade, acessibilidade e consistência visual da marca.",
                    en: "Creation of wireframes, interactive prototypes, and high-fidelity designs in Figma, focused on usability, accessibility, and brand visual consistency.",
                    es: "Creación de wireframes, prototipos interactivos y diseños de alta fidelidad en Figma, centrados en la usabilidad, la accesibilidad y la coherencia visual de la marca."
                }
            }
        ]
    },
    {
        id: "item-3",
        icon: Rocket,
        title: {
            ptBR: "Otimização e Performance (SEO)",
            en: "Optimization & Performance (SEO)",
            es: "Optimización y Rendimiento (SEO)"
        },
        description: {
            ptBR: "Melhoramos a visibilidade do seu site nos motores de busca e otimizamos a velocidade de carregamento para oferecer a melhor experiência ao usuário, gerando mais tráfego orgânico e conversões.",
            en: "We improve your site's visibility in search engines and optimize loading speed to deliver the best user experience, generating more organic traffic and conversions.",
            es: "Mejoramos la visibilidad de tu sitio en los motores de búsqueda y optimizamos la velocidad de carga para ofrecer la mejor experiencia de usuario, generando más tráfico orgánico y conversiones."
        },
        details: [
            {
                title: {
                    ptBR: "SEO Técnico e Core Web Vitals",
                    en: "Technical SEO & Core Web Vitals",
                    es: "SEO Técnico y Core Web Vitals"
                },
                content: {
                    ptBR: "Auditoria completa do site, otimização de métricas (LCP, FID, CLS) e estrutura de dados para garantir o máximo ranqueamento e performance no Google.",
                    en: "Complete site audit, optimization of metrics (LCP, FID, CLS), and data structure to ensure maximum ranking and performance on Google.",
                    es: "Auditoría completa del sitio, optimización de métricas (LCP, FID, CLS) y estructura de datos para garantizar el máximo posicionamiento y rendimiento en Google."
                }
            }
        ]
    },
    {
        id: "item-4",
        icon: Server,
        title: {
            ptBR: "Desenvolvimento de Backend e APIs",
            en: "Backend and API Development",
            es: "Desarrollo de Backend y APIs"
        },
        description: {
            ptBR: "Construímos a espinha dorsal de suas aplicações com backends robustos, seguros e escaláveis. Desenvolvemos APIs RESTful e GraphQL eficientes para integrar sistemas e potencializar serviços.",
            en: "We build the backbone of your applications with robust, secure, and scalable backends. We develop efficient RESTful and GraphQL APIs to integrate systems and enhance services.",
            es: "Construimos la columna vertebral de sus aplicaciones con backends robustos, seguros y escalables. Desarrollamos APIs RESTful y GraphQL eficientes para integrar sistemas y potenciar servicios."
        },
        details: [
            {
                title: {
                    ptBR: "Microserviços e Arquitetura Serverless",
                    en: "Microservices and Serverless Architecture",
                    es: "Microservicios y Arquitectura Sin Servidor"
                },
                content: {
                    ptBR: "Implementação de arquiteturas modernas que garantem alta disponibilidade, escalabilidade sob demanda e otimização de custos de infraestrutura.",
                    en: "Implementation of modern architectures that ensure high availability, on-demand scalability, and optimization of infrastructure costs.",
                    es: "Implementación de arquitecturas modernas que garantizan alta disponibilidad, escalabilidad bajo demanda y optimización de los costos de infraestructura."
                }
            }
        ]
    },
    {
        id: "item-5",
        icon: Bot,
        title: {
            ptBR: "Automação e Bots",
            en: "Automation and Bots",
            es: "Automatización y Bots"
        },
        description: {
            ptBR: "Automatizamos processos repetitivos e criamos bots inteligentes para aumentar a eficiência operacional, reduzir erros e melhorar a interação com o cliente.",
            en: "We automate repetitive processes and create intelligent bots to increase operational efficiency, reduce errors, and improve customer interaction.",
            es: "Automatizamos procesos repetitivos y creamos bots inteligentes para aumentar la eficiencia operativa, reducir errores y mejorar la interacción con el cliente."
        },
        details: [
            {
                title: {
                    ptBR: "RPA e Chatbots",
                    en: "RPA and Chatbots",
                    es: "RPA y Chatbots"
                },
                content: {
                    ptBR: "Desenvolvimento de Robôs de Automação de Processos (RPA) para tarefas de back-office e Chatbots com IA para atendimento 24/7.",
                    en: "Development of Robotic Process Automation (RPA) bots for back-office tasks and AI-powered Chatbots for 24/7 customer service.",
                    es: "Desarrollo de Robots de Automatización de Procesos (RPA) para tareas de back-office y Chatbots con IA para atención al cliente 24/7."
                }
            }
        ]
    },
    {
        id: "item-6",
        icon: ShieldCheck,
        title: {
            ptBR: "Consultoria em Cibersegurança",
            en: "Cybersecurity Consulting",
            es: "Consultoría en Ciberseguridad"
        },
        description: {
            ptBR: "Protegemos seus ativos digitais com uma abordagem proativa de segurança, identificando vulnerabilidades e implementando defesas robustas contra ameaças cibernéticas.",
            en: "We protect your digital assets with a proactive security approach, identifying vulnerabilities and implementing robust defenses against cyber threats.",
            es: "Protegemos sus activos digitales con un enfoque proactivo de seguridad, identificando vulnerabilidades e implementando defensas robustas contra amenazas cibernéticas."
        },
        details: [
            {
                title: {
                    ptBR: "Análise de Vulnerabilidades e Testes de Invasão",
                    en: "Vulnerability Assessment & Penetration Testing",
                    es: "Análisis de Vulnerabilidades y Pruebas de Penetración"
                },
                content: {
                    ptBR: "Execução de testes éticos (pentests) para encontrar e corrigir falhas de segurança em suas aplicações e infraestrutura antes que sejam exploradas.",
                    en: "Execution of ethical hacking tests (pentests) to find and fix security flaws in your applications and infrastructure before they are exploited.",
                    es: "Ejecución de pruebas de hacking ético (pentests) para encontrar y corregir fallos de seguridad en sus aplicaciones e infraestructura antes de que sean explotados."
                }
            }
        ]
    },
    {
        id: "item-7",
        icon: Lightbulb,
        title: {
            ptBR: "Consultoria de Inovação Digital",
            en: "Digital Innovation Consulting",
            es: "Consultoría de Innovación Digital"
        },
        description: {
            ptBR: "Ajudamos sua empresa a navegar pela transformação digital, identificando oportunidades de inovação e desenhando estratégias tecnológicas alinhadas aos seus objetivos de negócio.",
            en: "We help your company navigate digital transformation, identifying innovation opportunities and designing technological strategies aligned with your business goals.",
            es: "Ayudamos a su empresa a navegar por la transformación digital, identificando oportunidades de innovación y diseñando estrategias tecnológicas alineadas con sus objetivos de negocio."
        },
        details: [
            {
                title: {
                    ptBR: "Roadmap Tecnológico",
                    en: "Technology Roadmap",
                    es: "Hoja de Ruta Tecnológica"
                },
                content: {
                    ptBR: "Criação de um plano estratégico para a adoção de novas tecnologias, modernização de sistemas e desenvolvimento de produtos digitais disruptivos.",
                    en: "Creation of a strategic plan for adopting new technologies, modernizing systems, and developing disruptive digital products.",
                    es: "Creación de un plan estratégico para la adopción de nuevas tecnologías, la modernización de sistemas y el desarrollo de productos digitales disruptivos."
                }
            }
        ]
    }
];

// --- FIM DA DEFINIÇÃO DE DADOS ---

// ✨ CORREÇÃO APLICADA AQUI ✨
// Adicionamos 'as const' ao valor da propriedade 'ease'. Isso garante
// que o TypeScript o interprete como o tipo literal "easeOut", compatível
// com a definição de tipo da Framer Motion.
const sectionAnimation = { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8, ease: "easeOut" as const } };

export default function ServicesPage() {
    return (
        <>
            <section className="py-24 md:py-32">
                <div className="u-container">
                    <motion.header {...sectionAnimation} className="text-center max-w-3xl mx-auto mb-16 bg-background backdrop-blur">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">
                            <TextTranslator ignoreCheck={true}>
                                {{ ptBR: "Serviços", en: "Services", es: "Servicios" }}
                            </TextTranslator>
                        </h1>
                        <h2 className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#00e1ff] to-primary mb-6 text-balance">
                            <TextTranslator ignoreCheck={true}>
                                {{ ptBR: "Soluções Personalizadas para Seu Sucesso Digital", en: "Custom Solutions for Your Digital Success", es: "Soluciones Personalizadas para Tu Éxito Digital" }}
                            </TextTranslator>
                        </h2>
                        <p className="text-lg text-muted-foreground text-balance">
                            <TextTranslator ignoreCheck={true}>
                                {{
                                    ptBR: "Cada serviço é projetado para transformar suas ideias em resultados concretos, conectando requisitos de negócio a protocolos eficientes e otimizados para performance.",
                                    en: "Each service is designed to turn your ideas into concrete results, connecting business requirements to efficient, performance-optimized protocols.",
                                    es: "Cada servicio está diseñado para transformar tus ideas en resultados concretos, conectando los requisitos del negocio con protocolos eficientes y optimizados para el rendimiento."
                                }}
                            </TextTranslator>
                        </p>
                    </motion.header >

                    <motion.div
                        {...sectionAnimation}
                        className="max-w-4xl mx-auto bg-background/70 backdrop-blur p-4 md:p-8 rounded-2xl border border-border/10"
                    >
                        <Accordion type="single" collapsible className="w-full" defaultValue={servicesData.length > 0 ? servicesData[0].id : undefined}>
                            {servicesData.map((service) => (
                                <AccordionItem value={service.id} key={service.id} className="border-b border-border/10">
                                    <AccordionTrigger className="text-left hover:no-underline">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-muted rounded-md text-primary">
                                                <service.icon className="h-6 w-6" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-foreground">
                                                <TextTranslator ignoreCheck={true}>{service.title}</TextTranslator>
                                            </h3>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-4 pb-6 px-2">
                                        <p className="text-lg text-muted-foreground mb-8">
                                            <TextTranslator ignoreCheck={true}>{service.description}</TextTranslator>
                                        </p>
                                        <div className="space-y-6 border-l-2 border-primary/20 pl-6">
                                            {service.details.map((detail, index) => (
                                                <div key={index}>
                                                    <h4 className="font-semibold text-lg mb-2 text-primary">
                                                        <TextTranslator ignoreCheck={true}>{detail.title}</TextTranslator>
                                                    </h4>
                                                    <p className="text-muted-foreground">
                                                        <TextTranslator ignoreCheck={true}>{detail.content}</TextTranslator>
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>
            </section>
        </>
    );
}