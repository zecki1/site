<<<<<<< HEAD
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
=======

"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, BookOpen, Send, Trophy, Star, Shield, Laptop } from "lucide-react";
import TextTranslator from "@/components/layout/TextTranslator";

// ✨ CORREÇÃO APLICADA AQUI ✨
// Adicionamos 'as const' ao final da string de 'ease'.
// Isso força o TypeScript a entender 'easeOut' como um tipo literal,
// e não como uma 'string' genérica, satisfazendo a tipagem da Framer Motion.
const sectionAnimation = { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8, ease: "easeOut" as const } };
const staggerContainer = { whileInView: { transition: { staggerChildren: 0.1 } } };
const staggerItem = { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true } };

export default function ResumePage() {
    return (
        <>
            {/* Seção 1: Cabeçalho */}
            <section className="py-24 md:py-32 ">
                <div className="u-container">
                    <motion.header {...sectionAnimation} className="text-center bg-background/70 backdrop-blur py-8 rounded-lg">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Ezequiel Regino Monção</h1>
                        <h2 className="mt-2 text-xl md:text-2xl text-primary">
                            <TextTranslator ignoreCheck={true}>{{ ptBR: "Desenvolvedor Full-Stack & Designer", en: "Full-Stack Developer & Designer", es: "Desarrollador Full-Stack & Diseñador" }}</TextTranslator>
                        </h2>
                        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                            <TextTranslator ignoreCheck={true}>{{ ptBR: "Com mais de 17 anos de experiência, combino expertise em desenvolvimento web, design gráfico e marketing digital para criar soluções digitais acessíveis, escaláveis e visualmente impactantes. Como tech lead, lidero equipes na criação de interfaces mobile-first, otimizadas para SEO e conformes com padrões de acessibilidade (WCAG 2.1). Minha paixão é transformar ideias em experiências digitais intuitivas e robustas, utilizando ferramentas modernas como React, Next.js, Laravel e Figma. Projetos como Cleriston Ribeiro, Dashboard Zecki e Calendário Alpha exemplificam meu compromisso com qualidade, performance e inclusão.", en: "With over 17 years of experience, I combine expertise in web development, graphic design, and digital marketing to create accessible, scalable, and visually impactful digital solutions. As a tech lead, I lead teams in creating mobile-first interfaces, optimized for SEO, and compliant with accessibility standards (WCAG 2.1). My passion is to turn ideas into intuitive and robust digital experiences using modern tools like React, Next.js, Laravel, and Figma. Projects like Cleriston Ribeiro, Dashboard Zecki, and Calendário Alpha exemplify my commitment to quality, performance, and inclusion.", es: "Con más de 17 años de experiencia, combino mi pericia en desarrollo web, diseño gráfico y marketing digital para crear soluciones digitales accesibles, escalables y visualmente impactantes. Como líder técnico, dirijo equipos en la creación de interfaces mobile-first, optimizadas para SEO y conformes con los estándares de accesibilidad (WCAG 2.1). Mi pasión es transformar ideas en experiencias digitales intuitivas y robustas, utilizando herramientas modernas como React, Next.js, Laravel y Figma. Proyectos como Cleriston Ribeiro, Dashboard Zecki y Calendário Alpha ejemplifican mi compromiso con la calidad, el rendimiento y la inclusión." }}</TextTranslator>
                        </p>
                    </motion.header>
                </div>
            </section>

            {/* Seção 2: Conteúdo Principal */}
            <section className="pb-24 md:pb-32 bg-background/70 backdrop-blur container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 u-container py-16">
                    <motion.aside {...sectionAnimation} className="lg:col-span-1 flex flex-col gap-12  mx-10">
                        <div>
                            <h3 className="flex items-center gap-3 text-2xl font-bold border-b pb-2 mb-4"><Mail size={20} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "Contato", en: "Contact", es: "Contacto" }}</TextTranslator></h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-3"><Send size={16} /> <a href="mailto:zecki1@hotmail.com" className="hover:text-primary">zecki1@hotmail.com</a></li>
                                <li className="flex items-center gap-3"><Phone size={16} /> <a href="tel:+5511982101630" className="hover:text-primary">+55 (11) 9 8210-1630</a></li>
                                <li className="flex items-center gap-3"><MapPin size={16} /> <span>São Paulo - SP, Brasil</span></li>
                                <li className="flex items-center gap-3"><Github size={16} /> <a href="https://github.com/zecki1" target="_blank" rel="noopener noreferrer" className="hover:text-primary">github.com/zecki1</a></li>
                                <li className="flex items-center gap-3"><Linkedin size={16} /> <a href="https://linkedin.com/in/zecki1" target="_blank" rel="noopener noreferrer" className="hover:text-primary">linkedin.com/in/zecki1</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="flex items-center gap-3 text-2xl font-bold border-b pb-2 mb-4"><BookOpen size={20} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "Formação", en: "Education", es: "Formación" }}</TextTranslator></h3>
                            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="space-y-4">
                                <motion.div variants={staggerItem}><p className="font-semibold">Pós-Graduação, Desenvolvedor Full-Stack</p><p className="text-sm text-muted-foreground">Impacta | 2024 - 2025</p></motion.div>
                                <motion.div variants={staggerItem}><p className="font-semibold">Pós-Graduação, Desenvolvedor Full-Stack</p><p className="text-sm text-muted-foreground">Descomplica | 2025 - 2026</p></motion.div>
                                <motion.div variants={staggerItem}><p className="font-semibold">Graduação, Design Gráfico</p><p className="text-sm text-muted-foreground">Unip | 2018 - 2020</p></motion.div>
                                <motion.div variants={staggerItem}><p className="font-semibold">Graduação, Engenharia da Computação</p><p className="text-sm text-muted-foreground">Univesp | 2014 - 2018 (Trancada)</p></motion.div>
                                <motion.div variants={staggerItem}><p className="font-semibold">Técnico, Web Design</p><p className="text-sm text-muted-foreground">Microcamp | 2010 - 2012</p></motion.div>
                                <motion.div variants={staggerItem}><p className="font-semibold">Curso Técnico, Artes Plásticas</p><p className="text-sm text-muted-foreground">2008 - 2014</p></motion.div>
                                <motion.div variants={staggerItem}><p className="font-semibold">Curso Técnico, Marketing Digital</p><p className="text-sm text-muted-foreground">2012 - 2015</p></motion.div>
                            </motion.div>
                        </div>
                        <div>
                            <h3 className="flex items-center gap-3 text-2xl font-bold border-b pb-2 mb-4"><Star size={20} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "Cursos Complementares", en: "Complementary Courses", es: "Cursos Complementarios" }}</TextTranslator></h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                                <li>Acessibilidade Digital e Handoff</li>
                                <li>Marketing Digital</li>
                                <li>Exposição e Tratamento de Imagem</li>
                                <li>Desenvolvimento de Jogos com C#</li>
                                <li>React, Next.js, Vue, Angular</li>
                                <li>JavaScript, TypeScript, PHP, Laravel</li>
                                <li>Design System</li>
                                <li>Lógica de Programação (C++, Java, C#)</li>
                            </ul>
                        </div>
                    </motion.aside>

                    <div className="lg:col-span-2 flex flex-col gap-12">
                        <motion.section {...sectionAnimation}>
                            <h3 className="flex items-center gap-3 text-3xl font-bold border-b pb-2 mb-4"><Trophy size={24} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "Experiências Profissionais", en: "Professional Experience", es: "Experiencia Profesional" }}</TextTranslator></h3>
                            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="space-y-8">
                                <motion.div variants={staggerItem}>
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline"><h4 className="text-xl font-semibold">Tech Lead - Desenvolvedor e Designer</h4><p className="text-sm text-muted-foreground">2020 - Atual</p></div>
                                    <p className="text-primary mb-2">Senai</p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                                        <li>Desenvolvimento de interfaces escaláveis e de alta performance com React, Next.js, Tailwind CSS e Vite, otimizadas para plataformas LMS no padrão SCORM.</li>
                                        <li>Criação de templates mobile-first responsivos e acessíveis, com integração multilinguagem e validação de dados via Zod.</li>
                                        <li>Gestão de equipes, definindo cronogramas, separando demandas e garantindo entregas pontuais com pipelines CI/CD (GitHub Actions).</li>
                                        <li>Integração de APIs RESTful/GraphQL para sistemas educacionais interativos, com foco em usabilidade e performance.</li>
                                    </ul>
                                </motion.div>
                                <motion.div variants={staggerItem}>
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline"><h4 className="text-xl font-semibold">Desenvolvedor Front-End, Designer e Marketing</h4><p className="text-sm text-muted-foreground">2019 - 2020</p></div>
                                    <p className="text-primary mb-2">Gall</p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                                        <li>Criação de páginas promocionais com HTML5, CSS3 e Bootstrap, otimizadas para SEO e conversão.</li>
                                        <li>Fotografia de produtos e tratamento de imagens com Adobe Photoshop para campanhas digitais e impressas.</li>
                                    </ul>
                                </motion.div>
                                <motion.div variants={staggerItem}>
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline"><h4 className="text-xl font-semibold">Desenvolvedor Full-Stack (Laravel)</h4><p className="text-sm text-muted-foreground">2017 - 2019</p></div>
                                    <p className="text-primary mb-2">Wortsman</p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                                        <li>Manutenção e otimização de plataformas web em Laravel (PHP), com foco em performance e segurança.</li>
                                        <li>Integração de APIs com WhatsApp para notificações automatizadas, reduzindo tempo de resposta ao cliente em 40%.</li>
                                    </ul>
                                </motion.div>
                            </motion.div>
                        </motion.section>

                        <motion.section {...sectionAnimation}>
                            <h3 className="flex items-center gap-3 text-3xl font-bold border-b pb-2 mb-4"><Shield size={24} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "Habilidades", en: "Skills", es: "Habilidades" }}</TextTranslator></h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Desenvolvimento Web:</h4>
                                    <p className="text-muted-foreground text-sm">React, Next.js, Vue, Angular, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, PHP, Laravel.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Design:</h4>
                                    <p className="text-muted-foreground text-sm">Figma, Adobe Photoshop, Design Systems, identidade visual, harmonização de cores, diagramação.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Outras Tecnologias:</h4>
                                    <p className="text-muted-foreground text-sm">C++, Java, C#, Unity, Git, CI/CD, Docker.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Marketing e Gestão:</h4>
                                    <p className="text-muted-foreground text-sm">SEO, Google Analytics, A/B Testing, Liderança Técnica, Gestão de Projetos.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Acessibilidade:</h4>
                                    <p className="text-muted-foreground text-sm">WCAG 2.1, ARIA, Navegação por Teclado, Testes com Lighthouse, NVDA e VoiceOver.</p>
                                </div>
                            </div>
                        </motion.section>

                        <motion.section {...sectionAnimation}>
                            <h3 className="flex items-center gap-3 text-3xl font-bold border-b pb-2 mb-4"><Laptop size={24} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "Projetos Destacados", en: "Featured Projects", es: "Proyectos Destacados" }}</TextTranslator></h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-lg">Cleriston Ribeiro</h4>
                                    <p className="text-muted-foreground text-sm">Site de portfólio para ilustrador, com design mobile-first, SEO otimizado e acessibilidade WCAG 2.1, garantindo navegação fluida e visibilidade no Google.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Dashboard Zecki</h4>
                                    <p className="text-muted-foreground text-sm">Aplicação de gerenciamento de tarefas com React, autenticação JWT e interface modular, otimizada para performance e acessibilidade.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Calendário Alpha</h4>
                                    <p className="text-muted-foreground text-sm">Ferramenta de agendamento com Next.js, integração de APIs e design responsivo, focada em usabilidade e escalabilidade.</p>
                                </div>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </section>
        </>
>>>>>>> refazendo-header
    );
}