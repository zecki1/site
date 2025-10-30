"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, BookOpen, Send, Trophy, Star, Shield, Laptop, Globe } from "lucide-react";
import TextTranslator from "@/components/layout/TextTranslator";

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
                        <h3 className="text-2xl md:text-4xl font-bold mb-8
             bg-linear-to-r 
             from-blue-400 via-[#00e1ff] to-blue-400
             bg-clip-text 
             text-transparent 
             animate-gradient-loop">
                            <TextTranslator ignoreCheck={true}>{{ ptBR: "Desenvolvedor Full-Stack & Designer", en: "Full-Stack Developer & Designer", es: "Desarrollador Full-Stack & Diseñador" }}</TextTranslator>
                        </h3>
                        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                            <TextTranslator ignoreCheck={true}>{{ ptBR: "Desenvolvedor Full-Stack e Tech Lead com mais de 17 anos de experiência na criação de soluções digitais de ponta. Especialista em unir desenvolvimento web, design (UI/UX) e liderança técnica para entregar produtos escaláveis, acessíveis (WCAG 2.1) e visualmente impactantes. Sólida vivência na liderança de equipes, arquitetura de sistemas com React, Next.js e Laravel, e na otimização de performance e SEO. Busco desafios que me permitam transformar ideias complexas em experiências digitais intuitivas e robustas.", en: "Full-Stack Developer and Tech Lead with over 17 years of experience in creating cutting-edge digital solutions. Specialist in combining web development, design (UI/UX), and technical leadership to deliver scalable, accessible (WCAG 2.1), and visually impactful products. Solid experience in leading teams, architecting systems with React, Next.js, and Laravel, and in performance and SEO optimization. I seek challenges that allow me to transform complex ideas into intuitive and robust digital experiences.", es: "Desarrollador Full-Stack y Líder Técnico con más de 17 años de experiencia en la creación de soluciones digitales de vanguardia. Especialista en combinar desarrollo web, diseño (UI/UX) y liderazgo técnico para entregar productos escalables, accesibles (WCAG 2.1) y visualmente impactantes. Sólida experiencia en la dirección de equipos, arquitectura de sistemas con React, Next.js y Laravel, y en la optimización del rendimiento y SEO. Busco desafíos que me permitan transformar ideas complexas en experiencias digitales intuitivas y robustas." }}</TextTranslator>
                        </p>
                    </motion.header>
                </div>
            </section>

            {/* Seção 2: Conteúdo Principal */}
            <section className="pb-24 md:pb-32 bg-background/70 backdrop-blur container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 u-container py-16">
                    <motion.aside {...sectionAnimation} className="lg:col-span-1 flex flex-col gap-12  mx-10">
                        <div>
                            <h3 className="flex items-center gap-3 text-2xl font-bold border-b pb-2 mb-4"><Mail size={20} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "CONTATO", en: "CONTACT", es: "CONTACTO" }}</TextTranslator></h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-3"><Send size={16} /> <a href="mailto:zecki1@hotmail.com" className="hover:text-primary">zecki1@hotmail.com</a></li>
                                <li className="flex items-center gap-3"><Phone size={16} /> <a href="tel:+5511982101630" className="hover:text-primary">+55 11 98210-1630</a></li>
                                <li className="flex items-center gap-3"><Globe size={16} /> <a href="https://zecki1.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-primary">zecki1.com.br</a></li>
                                <li className="flex items-center gap-3"><Github size={16} /> <a href="https://github.com/zecki1" target="_blank" rel="noopener noreferrer" className="hover:text-primary">github.com/zecki1</a></li>
                                <li className="flex items-center gap-3"><Linkedin size={16} /> <a href="https://linkedin.com/in/zecki1" target="_blank" rel="noopener noreferrer" className="hover:text-primary">linkedin.com/in/zecki1</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="flex items-center gap-3 text-2xl font-bold border-b pb-2 mb-4"><BookOpen size={20} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "FORMAÇÃO", en: "EDUCATION", es: "FORMACIÓN" }}</TextTranslator></h3>
                            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="space-y-4">
                                <motion.div variants={staggerItem}><p className="font-semibold">Pós-Graduação, Desenvolvedor Full-Stack</p><p className="text-sm text-muted-foreground">Descomplica | 2025 - 2026</p></motion.div>
                                <motion.div variants={staggerItem}><p className="font-semibold">Graduação, Design Gráfico</p><p className="text-sm text-muted-foreground">Unip | 2018 - 2020</p></motion.div>
                                <motion.div variants={staggerItem}><p className="font-semibold">Técnico, Web Design</p><p className="text-sm text-muted-foreground">Microcamp | 2010 - 2012</p></motion.div>
                                <motion.div variants={staggerItem}><p className="font-semibold">Curso Técnico, Artes Plástica</p><p className="text-sm text-muted-foreground">INCCAS | 2008 - 2014</p></motion.div>
                            </motion.div>
                        </div>
                        <div>
                            <h3 className="flex items-center gap-3 text-2xl font-bold border-b pb-2 mb-4"><Star size={20} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "CURSOS", en: "COURSES", es: "CURSOS" }}</TextTranslator></h3>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                                <li>Acessibilidade Digital e Handoff</li>
                                <li>Marketing Digital</li>
                                <li>Exposição e Tratamento de Imagem</li>
                                <li>Desenvolvimento de Jogos com C#</li>
                                <li>React, Next.js, Vue, Angular</li>
                                <li>JavaScript, TypeScript, PHP, Laravel</li>
                                <li>Design System UX| UI</li>
                                <li>Lógica de Programação (C++, Java, C#)</li>
                            </ul>
                        </div>
                    </motion.aside>

                    <div className="lg:col-span-2 flex flex-col gap-12">
                        <motion.section {...sectionAnimation}>
                            <h3 className="flex items-center gap-3 text-3xl font-bold border-b pb-2 mb-4 mx-8"><Trophy size={24} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "EXPERIÊNCIAS PROFISSIONAIS", en: "PROFESSIONAL EXPERIENCE", es: "EXPERIENCIA PROFESIONAL" }}</TextTranslator></h3>
                            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="space-y-8 mx-8">
                                <motion.div variants={staggerItem}>
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline"><h4 className="text-xl font-semibold">TECH LEAD - DESENVOLVEDOR E DESIGNER</h4><p className="text-sm text-muted-foreground">2020 - ATUAL</p></div>
                                    <p className="text-primary mb-2">Senai</p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                                        <li>Lidero o desenvolvimento de interfaces educacionais de alta performance com React, Next.js e Tailwind CSS, garantindo escalabilidade para plataformas LMS (padrão SCORM).</li>
                                        <li>Gerencio equipes de desenvolvimento, definindo cronogramas, distribuindo tarefas e assegurando a qualidade e pontualidade das entregas através de pipelines CI/CD.</li>
                                        <li>Arquiteteto templates <i>mobile-first</i> responsivos e acessíveis (WCAG 2.1), com suporte multilinguagem e validação de dados robusta utilizando Zod.</li>
                                        <li>Integro APIs RESTful e GraphQL para criar sistemas interativos, focando em otimização de performance e usabilidade.</li>
                                    </ul>
                                </motion.div>
                                <motion.div variants={staggerItem}>
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline"><h4 className="text-xl font-semibold">DESENVOLVEDOR FRONT-END, DESIGNER E MARKETING</h4><p className="text-sm text-muted-foreground">2017 - 2018</p></div>
                                    <p className="text-primary mb-2">Gall</p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                                        <li>Criei páginas promocionais e landing pages utilizando HTML5, CSS3 e Bootstrap, com foco em SEO e otimização da taxa de conversão.</li>
                                        <li>Fui responsável pela fotografia de produtos e tratamento de imagens com Adobe Photoshop para campanhas de marketing digital e materiais impressos.</li>
                                    </ul>
                                </motion.div>
                                <motion.div variants={staggerItem}>
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline"><h4 className="text-xl font-semibold">DESENVOLVEDOR FULL-STACK (LARAVEL)</h4><p className="text-sm text-muted-foreground">2015 - 2017</p></div>
                                    <p className="text-primary mb-2">Wortsman</p>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                                        <li>Realizei a manutenção e otimização de plataformas web desenvolvidas em Laravel (PHP), melhorando a segurança e a performance do sistema.</li>
                                        <li>Desenvolvi e integrei APIs com o WhatsApp para notificações automatizadas, <strong>reduzindo o tempo de resposta ao cliente em 40%</strong>.</li>
                                        <li>Atuei no desenvolvimento de novas funcionalidades e na correção de bugs, garantindo a estabilidade da aplicação.</li>
                                    </ul>
                                </motion.div>
                            </motion.div>
                        </motion.section>

                        <motion.section {...sectionAnimation}>
                            <h3 className="flex items-center gap-3 text-3xl font-bold border-b pb-2 mb-4  mx-8"><Shield size={24} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "COMPETÊNCIAS TÉCNICAS", en: "TECHNICAL SKILLS", es: "COMPETENCIAS TÉCNICAS" }}</TextTranslator></h3>
                            <div className="space-y-4  mx-8">
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Linguagens de Programação:</h4>
                                    <p className="text-muted-foreground text-sm">TypeScript, JavaScript (ES6+), PHP.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Front-End:</h4>
                                    <p className="text-muted-foreground text-sm">React, Next.js, Vue.js, Angular, HTML5, CSS3, Tailwind CSS, Vite.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Back-End:</h4>
                                    <p className="text-muted-foreground text-sm">Node.js, Laravel.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Desenvolvimento de Jogos (OOP):</h4>
                                    <p className="text-muted-foreground text-sm">Unity, C#, C++.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Bancos de Dados & BaaS:</h4>
                                    <p className="text-muted-foreground text-sm">MySQL, SQL Server, Firebase, Firestore.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">DevOps, Cloud & Ferramentas:</h4>
                                    <p className="text-muted-foreground text-sm">Git, GitHub Actions (CI/CD), Docker, Vercel.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Design & UI/UX:</h4>
                                    <p className="text-muted-foreground text-sm">Figma, Pacote Adobe (Photoshop, Illustrator, etc.), Design Systems, Identidade Visual, Prototipação.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Acessibilidade:</h4>
                                    <p className="text-muted-foreground text-sm">WCAG 2.1, ARIA, Testes com NVDA/VoiceOver, Navegação por Teclado.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Gestão & Estratégia:</h4>
                                    <p className="text-muted-foreground text-sm">Liderança Técnica, Gestão de Projetos, SEO, Google Analytics.</p>
                                </div>
                            </div>
                        </motion.section>

                        <motion.section {...sectionAnimation}>
                            <h3 className="flex items-center gap-3 text-3xl font-bold border-b pb-2 mb-4  mx-8"><Laptop size={24} /> <TextTranslator ignoreCheck={true}>{{ ptBR: "PROJETOS DESTACADOS", en: "FEATURED PROJECTS", es: "PROYECTOS DESTACADOS" }}</TextTranslator></h3>
                            <div className="space-y-6 mx-8">
                                <div>
                                    <h4 className="font-semibold text-lg">Cleriston Ribeiro</h4>
                                    <p className="text-muted-foreground text-sm mb-1">Portfólio full-stack construído com <strong>Next.js</strong>, <strong>React</strong> e <strong>TypeScript</strong>. A interface utiliza <strong>Tailwind CSS</strong> e componentes <strong>ShadCN/UI</strong>, com animações dinâmicas via <strong>Framer Motion</strong>. Integra um sistema de gerenciamento de conteúdo (CMS) com <strong>Firebase/Firestore</strong> para atualizações dinâmicas. A validação de formulários é robustecida com <strong>Zod</strong>.</p>
                                    <a href="https://www.cleristonribeiro.com.br" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">www.cleristonribeiro.com.br</a>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Dashboard Zecki</h4>
                                    <p className="text-muted-foreground text-sm mb-1">Aplicação SPA (Single Page Application) desenvolvida com <strong>Next.js</strong> e <strong>TypeScript</strong>. Evidencia o uso de autenticação, manipulação de estado e um design system modular com <strong>ShadCN/UI</strong>. A integração com <strong>Firebase/Firestore</strong> serve como backend (BaaS) para persistência de dados em tempo real, demonstrando arquitetura serverless.</p>
                                    <a href="https://dashboard-zecki.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">dashboard-zecki.vercel.app</a>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Calendário de Agendamento</h4>
                                    <p className="text-muted-foreground text-sm mb-1">Ferramenta interativa que demonstra a aplicação prática de <strong>React</strong> para criar UIs complexas. Utiliza manipulação de estado para gerenciar datas e horários, integrando-se com <strong>Firebase</strong> para salvar os agendamentos e demonstrar a capacidade de criar soluções full-stack com um backend serverless (BaaS) via <strong>Vercel</strong>.</p>
                                    <a href="https://agendamento-salao.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">agendamento-salao.vercel.app</a>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg">Nick Gomes</h4>
                                    <p className="text-muted-foreground text-sm mb-1">Website institucional que destaca a proficiência nas tecnologias fundamentais: <strong>HTML5</strong>, <strong>CSS3</strong> e <strong>JavaScript (ES6+)</strong>. O projeto foca em design responsivo (mobile-first), otimização de performance para carregamento de imagens e interatividade com JS puro, demonstrando uma base sólida em desenvolvimento web.</p>
                                    <a href="https://www.nickgomes.com.br" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">www.nickgomes.com.br</a>
                                </div>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </section>
        </>
    );
}