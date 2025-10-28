
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
    );
}