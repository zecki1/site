"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin, Github, Linkedin, BookOpen, Briefcase, Send } from "lucide-react";
import TextTranslator from "@/components/layout/TextTranslator";
import { YouTubeBackground } from "@/components/layout/YouTubeBackground";

// --- DADOS DO CURRÍCULO (SEM JSX DENTRO) ---
const resumeData = {
    personalInfo: {
        name: "Ezequiel Regino Monção",
        title: { ptBR: "Desenvolvedor & Designer", en: "Developer & Designer", es: "Desarrollador & Diseñador" },
        email: "zecki1@hotmail.com",
        phone: "+55 (11) 9 8210 1630",
        address: { ptBR: "São Paulo - SP, Brasil", en: "São Paulo - SP, Brazil", es: "São Paulo - SP, Brasil" },
        summary: {
            ptBR: "Desenvolvedor e Fullstack com mais de 10 anos de experiência, combinando expertise em design com sólidas habilidades de desenvolvimento. Com um background multidisciplinar que abrange design gráfico, engenharia da computação e marketing digital, sou apaixonado por criar interfaces de usuário intuitivas, visualmente atraentes e tecnicamente robustas. Experiência comprovada no desenvolvimento de sistemas web complexos utilizando React, Next.js e Laravel.",
            en: "and Fullstack Developer with over 10 years of experience, combining design expertise with strong development skills. With a multidisciplinary background spanning graphic design, computer engineering, and digital marketing, I am passionate about creating intuitive, visually appealing, and technically robust user interfaces. Proven experience in developing complex web systems using React, Next.js, and Laravel.",
            es: "Desarrollador y Fullstack con más de 10 años de experiencia, combinando pericia en diseño com sólidas habilidades de desarrollo. Con una formación multidisciplinar que abarca diseño gráfico, ingeniería informática y marketing digital, me apasiona crear interfaces de usuario intuitivas, visualmente atractivas y técnicamente robustas. Experiencia demostrada en el desarrollo de sistemas web complexos utilizando React, Next.js y Laravel."
        },
        socials: { github: "/zecki1", linkedin: "/in/zecki1" }
    },
    sections: {
        contact: { ptBR: "Contato", en: "Contact", es: "Contacto" },
        education: { ptBR: "Formação", en: "Education", es: "Formación" },
        courses: { ptBR: "Cursos", en: "Courses", es: "Cursos" },
        about: { ptBR: "Sobre", en: "About", es: "Sobre mí" },
        experience: { ptBR: "Experiências", en: "Experience", es: "Experiencia" },
        skills: { ptBR: "Habilidades", en: "Skills", es: "Habilidades" },
        nextStep: { ptBR: "Qual o próximo passo?", en: "What's Next?", es: "¿Cuál es el siguiente paso?" }
    },
    experiences: [
        {
            role: { ptBR: "Desenvolvedor e Design", en: "Developer and Designer", es: "Desarrollador y Diseño" },
            company: "Senai", period: { ptBR: "2020 - Atual", en: "2020 - Present", es: "2020 - Actualidad" },
            tasks: [
                { ptBR: "Desenvolvimento de interfaces escaláveis e de alta performance com React, Next.js, Tailwind CSS e Vite.", en: "Development of scalable, high-performance user interfaces with React, Next.js, Tailwind CSS, and Vite.", es: "Desarrollo de interfaces de usuario escalables y de alto rendimiento con React, Next.js, Tailwind CSS y Vite." },
                { ptBR: "Criação de templates web responsivos com foco em otimização, acessibilidade e integração SCORM para Moodle.", en: "Creation of responsive web templates focusing on optimization, accessibility, and SCORM integration for Moodle.", es: "Creación de plantillas web responsivas con enfoque en optimización, accesibilidad e integración SCORM para Moodle." },
                { ptBR: "Implementação de funcionalidades multilinguagem e integração de APIs para enriquecer as aplicações.", en: "Implementation of multilingual features and API integration to enhance applications.", es: "Implementación de funcionalidades multilingües e integración de APIs para enriquecer las aplicaciones." },
                { ptBR: "Gestão de projetos, elaboração de cronogramas e organização da equipe para entregas pontuais.", en: "Project management, schedule creation, and team organization for timely deliveries.", es: "Gestión de proyectos, elaboración de cronogramas y organización del equipo para entregas puntuales." },
            ]
        },
        {
            role: { ptBR: "Desenvolvedor Front-end, Design e Marketing", en: "Developer, Design & Marketing", es: "Desarrollador Front-end, Diseño y Marketing" },
            company: "Gall",
            period: { ptBR: "2019 - 2020", en: "2019 - 2020", es: "2019 - 2020" },
            tasks: [
                { ptBR: "Desenvolvimento de páginas promocionais utilizando HTML5, CSS3 e Bootstrap.", en: "Development of promotional pages using HTML5, CSS3, and Bootstrap.", es: "Desarrollo de páginas promocionales utilizando HTML5, CSS3 y Bootstrap." },
                { ptBR: "Fotografia de produtos, tratamento de imagens e criação de campanhas de marketing digital.", en: "Product photography, image editing, and creation of digital marketing campaigns.", es: "Fotografía de productos, edición de imágenes y creación de campañas de marketing digital." },
            ]
        },
        {
            role: { ptBR: "Desenvolvedor Fullstack (Laravel)", en: "Fullstack Developer (Laravel)", es: "Desarrollador Fullstack (Laravel)" },
            company: "Wortsman",
            period: { ptBR: "2017 - 2019", en: "2017 - 2019", es: "2017 - 2019" },
            tasks: [
                { ptBR: "Manutenção e otimização da plataforma em Laravel (PHP) e manipulação do banco de dados.", en: "Maintenance and optimization of the Laravel (PHP) platform and database manipulation.", es: "Mantenimiento y optimización de la plataforma en Laravel (PHP) y manipulación de la base de datos." },
                { ptBR: "Integração da API do site com WhatsApp para notificações automatizadas a clientes.", en: "Integration of the site's API with WhatsApp for automated client notifications.", es: "Integración de la API del sitio con WhatsApp para notificaciones automatizadas a clientes." },
            ]
        }
    ],
    education: [
        { degree: { ptBR: "Pós-Graduação, Desenvolvedor Fullstack", en: "Postgraduate, Fullstack Developer", es: "Posgrado, Desarrollador Fullstack" }, institution: "Impacta", period: "2024 - 2025" },
        { degree: { ptBR: "Pós-Graduação, Desenvolvedor Fullstack", en: "Postgraduate, Fullstack Developer", es: "Posgrado, Desarrollador Fullstack" }, institution: "Descomplica", period: "2025 - 2026" },
        { degree: { ptBR: "Graduação, Design Gráfico", en: "Bachelor's, Graphic Design", es: "Grado, Diseño Gráfico" }, institution: "Unip", period: "2018 - 2020" },
        { degree: { ptBR: "Graduação, Engenharia da Computação", en: "Bachelor's, Computer Engineering", es: "Grado, Ingeniería Informática" }, institution: "Univesp", period: "2014 - 2018" },
        { degree: { ptBR: "Técnico, Web Design", en: "Technical, Web Design", es: "Técnico, Diseño Web" }, institution: "Microcamp", period: "2010 - 2012" },
    ],
    skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "PHP", "Laravel", "Java", "C++", "C#", "Design System", "Figma"],
    courses: ["Unity", "Design System", "Lógica de Programação", "Handoff & Acessibilidade", "React", "Next", "Vue", "Angular", "JavaScript"],
    cards: [
        // **A CORREÇÃO PRINCIPAL ESTÁ AQUI**: Armazenamos a referência ao componente (Briefcase), não o JSX.
        { icon: Briefcase, title: { ptBR: "Ver Meus Projetos", en: "View My Projects", es: "Ver Mis Proyectos" }, description: { ptBR: "Explore uma seleção dos meus melhores trabalhos e estudos de caso.", en: "Explore a selection of my best works and case studies.", es: "Explora una selección de mis mejores trabajos y casos de estudio." }, link: "/projetos" },
        { icon: Send, title: { ptBR: "Entrar em Contato", en: "Get in Touch", es: "Contactar" }, description: { ptBR: "Tem uma ideia ou oportunidade? Vamos conversar.", en: "Have an idea or an opportunity? Let's talk.", es: "Tienes una idea o una oportunidad? Hablemos." }, link: "/contato" }
    ]
};

const sectionAnimation = { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: "easeOut" } };
const staggerContainer = { animate: { transition: { staggerChildren: 0.1 } } };
const staggerItem = { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } };

export default function ResumePage() {
    return (
        <div className="bg-background text-foreground">
            <div className="relative pt-40 pb-24 text-center text-white overflow-hidden">
                <YouTubeBackground videoId="BqFSHbzSs7U" />
                <div className="absolute inset-0 bg-black/70 z-10" />
                <div className="relative z-20">
                    <motion.h1 {...sectionAnimation} className="text-5xl md:text-7xl font-bold tracking-tighter">{resumeData.personalInfo.name}</motion.h1>
                    <motion.p {...sectionAnimation} transition={{ delay: 0.2 }} className="mt-2 text-xl md:text-2xl text-purple-400">
                        <TextTranslator>{resumeData.personalInfo.title}</TextTranslator>
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <motion.div {...sectionAnimation} className="lg:col-span-1 flex flex-col gap-12">
                        <div>
                            <h2 className="text-2xl font-bold border-b pb-2 mb-4"><TextTranslator>{resumeData.sections.contact}</TextTranslator></h2>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-3"><Mail size={16} /> <a href={`mailto:${resumeData.personalInfo.email}`} className="hover:text-purple-500">{resumeData.personalInfo.email}</a></li>
                                <li className="flex items-center gap-3"><Phone size={16} /> <a href={`tel:${resumeData.personalInfo.phone.replace(/\D/g, '')}`} className="hover:text-purple-500">{resumeData.personalInfo.phone}</a></li>
                                <li className="flex items-center gap-3"><MapPin size={16} /> <TextTranslator>{resumeData.personalInfo.address}</TextTranslator></li>
                                <li className="flex items-center gap-3"><Github size={16} /> <a href={`https://github.com${resumeData.personalInfo.socials.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">github.com{resumeData.personalInfo.socials.github}</a></li>
                                <li className="flex items-center gap-3"><Linkedin size={16} /> <a href={`https://linkedin.com${resumeData.personalInfo.socials.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">linkedin.com{resumeData.personalInfo.socials.linkedin}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold border-b pb-2 mb-4"><TextTranslator>{resumeData.sections.education}</TextTranslator></h2>
                            <motion.ul variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
                                {resumeData.education.map((edu, i) => (
                                    <motion.li variants={staggerItem} key={i}>
                                        <p className="font-semibold"><TextTranslator>{edu.degree}</TextTranslator></p>
                                        <p className="text-sm text-muted-foreground">{edu.institution} {edu.period && `| ${edu.period}`}</p>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold border-b pb-2 mb-4"><TextTranslator>{resumeData.sections.courses}</TextTranslator></h2>
                            <ul className="space-y-3 text-muted-foreground">
                                {resumeData.courses.map((course, i) => <li key={i} className="flex items-center gap-3"><BookOpen size={16} /> {course}</li>)}
                            </ul>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-2 flex flex-col gap-12">
                        <motion.div {...sectionAnimation}>
                            <h2 className="text-3xl font-bold border-b pb-2 mb-4"><TextTranslator>{resumeData.sections.about}</TextTranslator></h2>
                            <p className="text-muted-foreground leading-relaxed"><TextTranslator>{resumeData.personalInfo.summary}</TextTranslator></p>
                        </motion.div>

                        <motion.div {...sectionAnimation}>
                            <h2 className="text-3xl font-bold border-b pb-2 mb-4"><TextTranslator>{resumeData.sections.experience}</TextTranslator></h2>
                            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
                                {resumeData.experiences.map((exp, i) => (
                                    <motion.div variants={staggerItem} key={i}>
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                                            <h3 className="text-xl font-semibold"><TextTranslator>{exp.role}</TextTranslator></h3>
                                            <p className="text-sm text-muted-foreground"><TextTranslator>{exp.period}</TextTranslator></p>
                                        </div>
                                        <p className="text-purple-500 mb-2">{exp.company}</p>
                                        <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                                            {exp.tasks.map((task, j) => <li key={j}><TextTranslator>{task}</TextTranslator></li>)}
                                        </ul>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                <motion.div {...sectionAnimation} className="mt-16 text-center">
                    <h2 className="text-3xl font-bold mb-8"><TextTranslator>{resumeData.sections.skills}</TextTranslator></h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {resumeData.skills.map((skill, i) => <div key={i} className="bg-muted text-secondary-foreground py-2 px-4 rounded-lg text-sm font-medium">{skill}</div>)}
                    </div>
                </motion.div>

                <motion.div {...sectionAnimation} className="mt-24 py-16 text-center">
                    <h2 className="text-3xl font-bold mb-8"><TextTranslator>{resumeData.sections.nextStep}</TextTranslator></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        {resumeData.cards.map((card, i) => {
                            // Renderiza o componente do ícone dinamicamente a partir da referência
                            const IconComponent = card.icon;
                            return (
                                <Link href={card.link} key={i}>
                                    <div className="p-8 border rounded-lg h-full hover:bg-muted hover:border-purple-500 transition-all duration-300 flex flex-col items-center">
                                        <div className="text-purple-500 mb-4">
                                            <IconComponent size={32} />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2"><TextTranslator>{card.title}</TextTranslator></h3>
                                        <p className="text-muted-foreground text-sm"><TextTranslator>{card.description}</TextTranslator></p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}