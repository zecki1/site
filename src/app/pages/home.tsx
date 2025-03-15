"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import { Cover } from "@/components/layout/Cover";
import { Section, SectionFluid } from "@/components/layout/Sections";
import { Topic } from "@/components/layout/Topic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StaggeredText } from "@/components/gsap/StaggeredText";
import { images } from "@/components/layout/ImageContainer";
import TextTranslator from "@/components/layout/TextTranslator";

// Componente Mark pra destaque
const Mark: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="font-bold text-purple-500 dark:text-purple-400">{children}</span>
);

// Inicialização do AOS
function AosInit() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
    return null;
}

export default function Home() {
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const main = mainRef.current;
        if (!main) return;

        gsap.set(main, {
            paddingTop: "80vh",
            opacity: 1,
        });

        gsap.to(main, {
            paddingTop: "4rem",
            scrollTrigger: {
                trigger: main,
                start: "top top",
                end: "top+=50vh top",
                scrub: 0.6,
                onEnter: () => console.log("Main entrou na tela"),
            },
        });
    }, []);

    return (
        <div className="min-h-screen font-sans">
            <AosInit />
            <main ref={mainRef} className="relative z-10">
                {/* Cover */}
                <Cover
                    titlePT="Ezequiel Regino Monção"
                    titleEN="Ezequiel Regino Monção"
                    titleES="Ezequiel Regino Monção"
                    backgroundImage={images.capa}
                    className="flex flex-col items-center justify-center text-center bg-gradient-to-b from-muted/70 to-muted-foreground/70"
                    ignoreCheck={true}
                >
                    <p className="text-foreground text-xl md:text-3xl mb-10 font-light max-w-3xl tracking-tight">
                        <TextTranslator>
                            {{
                                ptBR: "Transformando ideias em experiências digitais acessíveis, dinâmicas e visualmente impactantes com mais de uma década de paixão por código e design.",
                                en: "Turning ideas into accessible, dynamic, and visually stunning digital experiences with over a decade of passion for code and design.",
                                es: "Convirtiendo ideas en experiencias digitales accesibles, dinámicas y visualmente impactantes con más de una década de pasión por el código y el diseño.",
                            }}
                        </TextTranslator>
                    </p>
                    <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full shadow-md transform hover:scale-105 transition-all duration-300 text-lg tracking-tight">
                        <TextTranslator>
                            {{ ptBR: "Explore Meu Universo Criativo", en: "Explore My Creative Universe", es: "Explora Mi Universo Creativo" }}
                        </TextTranslator>
                    </Button>
                </Cover>

                {/* Sobre Mim */}
                <Section label="sobre" className="py-32 bg-background">
                    <Topic label="quem-sou">
                        <h2 className="text-5xl md:text-7xl font-bold text-center text-foreground mb-16 tracking-tight">
                            <StaggeredText text="Quem Sou Eu" />
                        </h2>
                        <p className="text-foreground text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
                            <TextTranslator>
                                {{
                                    ptBR: (
                                        <>
                                            Eu sou Ezequiel Regino Monção, mais conhecido como Zecki, um profissional movido por uma paixão incansável por criar soluções digitais que unem <Mark>arte</Mark> e <Mark>tecnologia</Mark>. Há <Mark>13 anos</Mark>, venho trilhando uma jornada única no universo do <Mark>desenvolvimento web front-end</Mark> e do <Mark>design gráfico</Mark>, com um olhar atento para <Mark>usabilidade</Mark>, <Mark>acessibilidade</Mark> e <Mark>inovação</Mark>. Minha trajetória me levou por diferentes empresas e nichos — de startups ágeis a projetos corporativos complexos —, onde aprendi a equilibrar <Mark>criatividade</Mark> com <Mark>funcionalidade</Mark>, entregando desde interfaces simples e intuitivas até sistemas robustos que impressionam pela escala e detalhe.<br /><br />
                                            Minha filosofia é clara: o digital deve ser <Mark>bonito</Mark>, mas acima de tudo <Mark>acessível</Mark> e <Mark>útil</Mark>. Seja codificando componentes dinâmicos com <Mark>React</Mark>, desenhando layouts no <Mark>Illustrator</Mark> ou animando vídeos no <Mark>After Effects</Mark>, eu busco sempre o ponto onde a estética encontra a praticidade. Trabalho com dedicação total, guiado por um café forte e uma mente inquieta que não para de explorar novas possibilidades. Meu objetivo? Fazer o mundo digital mais <Mark>inclusivo</Mark>, mais <Mark>interativo</Mark> e, por que não, mais <Mark>colorido</Mark>!
                                        </>
                                    ),
                                    en: (
                                        <>
                                            I’m Ezequiel Regino Monção, better known as Zecki, a professional fueled by an unrelenting passion for crafting digital solutions that blend <Mark>art</Mark> and <Mark>technology</Mark>. For <Mark>13 years</Mark>, I’ve been carving a unique path in the world of <Mark>front-end web development</Mark> and <Mark>graphic design</Mark>, with a keen eye on <Mark>usability</Mark>, <Mark>accessibility</Mark>, and <Mark>innovation</Mark>. My journey has taken me through diverse companies and niches — from agile startups to complex corporate projects — teaching me to balance <Mark>creativity</Mark> with <Mark>functionality</Mark>, delivering everything from simple, intuitive interfaces to robust systems that stand out for their scale and detail.<br /><br />
                                            My philosophy is straightforward: the digital world should be <Mark>beautiful</Mark>, but above all <Mark>accessible</Mark> and <Mark>useful</Mark>. Whether I’m coding dynamic components with <Mark>React</Mark>, designing layouts in <Mark>Illustrator</Mark>, or animating videos in <Mark>After Effects</Mark>, I’m always chasing the sweet spot where aesthetics meet practicality. I pour my all into my work, driven by strong coffee and a restless mind that’s constantly exploring new possibilities. My goal? To make the digital space more <Mark>inclusive</Mark>, more <Mark>interactive</Mark>, and, why not, more <Mark>colorful</Mark>!
                                        </>
                                    ),
                                    es: (
                                        <>
                                            Soy Ezequiel Regino Monção, más conocido como Zecki, un profesional impulsado por una pasión incansable por crear soluciones digitales que combinan <Mark>arte</Mark> y <Mark>tecnología</Mark>. Durante <Mark>13 años</Mark>, he trazado un camino único en el universo del <Mark>desarrollo web front-end</Mark> y el <Mark>diseño gráfico</Mark>, con una mirada atenta a la <Mark>usabilidad</Mark>, la <Mark>accesibilidad</Mark> y la <Mark>innovación</Mark>. Mi trayectoria me ha llevado por diversas empresas y nichos — desde startups ágiles hasta proyectos corporativos complejos —, enseñándome a equilibrar <Mark>creatividad</Mark> con <Mark>funcionalidad</Mark>, entregando desde interfaces simples e intuitivas hasta sistemas robustos que destacan por su escala y detalle.<br /><br />
                                            Mi filosofía es clara: lo digital debe ser <Mark>hermoso</Mark>, pero sobre todo <Mark>accesible</Mark> y <Mark>útil</Mark>. Ya sea programando componentes dinámicos con <Mark>React</Mark>, diseñando layouts en <Mark>Illustrator</Mark> o animando videos en <Mark>After Effects</Mark>, siempre busco el punto donde la estética se encuentra con la practicidad. Trabajo con dedicación total, guiado por un café fuerte y una mente inquieta que no para de explorar nuevas posibilidades. ¿Mi objetivo? Hacer el mundo digital más <Mark>inclusivo</Mark>, más <Mark>interactivo</Mark> y, ¿por qué no?, más <Mark>colorido</Mark>!
                                        </>
                                    ),
                                }}
                            </TextTranslator>
                        </p>
                    </Topic>
                </Section>

                {/* Projetos */}
                <Section label="projetos" className="py-32 bg-background">
                    <Topic label="meus-projetos">
                        <h2 className="text-5xl md:text-7xl font-bold text-center text-foreground mb-20 tracking-tight">
                            <StaggeredText text="Projetos que Fazem a Diferença" />
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
                            <Card className="bg-card hover:shadow-xl transition-all duration-300 rounded-xl" data-aos="fade-up">
                                <CardHeader>
                                    <img src="/fozzy.jpg" alt="Fozzy Estética" className="w-full h-64 object-cover rounded-t-xl" />
                                </CardHeader>
                                <CardContent className="p-8">
                                    <CardTitle className="text-2xl font-semibold text-foreground mb-4 tracking-tight">
                                        Fozzy Estética Automotiva
                                    </CardTitle>
                                    <p className="text-muted-foreground mb-4">
                                        <TextTranslator>
                                            {{
                                                ptBR: "Desenvolvi do zero a identidade visual e o site da Fozzy, uma empresa de estética automotiva, com foco total em navegabilidade fluida, acessibilidade universal e um design que reflete a energia da marca. Utilizei HTML5, CSS3, Bootstrap e Firebase pra criar uma experiência interativa e otimizada, com SEO implementado na raiz pra destacar a presença online.",
                                                en: "Built the visual identity and website for Fozzy, an automotive aesthetics company, from scratch, with a full focus on fluid navigation, universal accessibility, and a design that mirrors the brand’s energy. Used HTML5, CSS3, Bootstrap, and Firebase to craft an interactive, optimized experience, with root-level SEO to boost online presence.",
                                                es: "Desarrollé desde cero la identidad visual y el sitio web de Fozzy, una empresa de estética automotriz, con un enfoque total en una navegación fluida, accesibilidad universal y un diseño que refleja la energía de la marca. Utilicé HTML5, CSS3, Bootstrap y Firebase para crear una experiencia interactiva y optimizada, con SEO implementado en la raíz para destacar su presencia online.",
                                            }}
                                        </TextTranslator>
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Tecnologias:</strong> <Mark>HTML5</Mark> e <Mark>CSS3</Mark> pra estrutura e estilo responsivo, <Mark>Bootstrap</Mark> pra layouts rápidos e consistentes, <Mark>Firebase</Mark> pra dados em tempo real.<br />
                                        <strong>Design:</strong> Criei logotipos e banners no <Mark>Illustrator</Mark>, ajustando cores pra acessibilidade visual.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-card hover:shadow-xl transition-all duration-300 rounded-xl" data-aos="fade-up" data-aos-delay="200">
                                <CardHeader>
                                    <img src="/cleriston.jpg" alt="Cleriston Ilustrador" className="w-full h-64 object-cover rounded-t-xl" />
                                </CardHeader>
                                <CardContent className="p-8">
                                    <CardTitle className="text-2xl font-semibold text-foreground mb-4 tracking-tight">
                                        Cleriston Ilustrador
                                    </CardTitle>
                                    <p className="text-muted-foreground mb-4">
                                        <TextTranslator>
                                            {{
                                                ptBR: "Projetei um portfólio interativo pra Cleriston, um ilustrador talentoso, com uma estética editorial que valoriza suas obras. Priorizei a navegabilidade intuitiva e a acessibilidade, usando HTML5, CSS3, Bootstrap e Firebase, além de SEO otimizado pra destacar seu trabalho artístico no Google e garantir que o site fosse inclusivo pra todos os públicos.",
                                                en: "Designed an interactive portfolio for Cleriston, a talented illustrator, with an editorial aesthetic that showcases his work. Focused on intuitive navigation and accessibility, using HTML5, CSS3, Bootstrap, and Firebase, plus optimized SEO to highlight his art on Google and ensure the site was inclusive for all audiences.",
                                                es: "Diseñé un portafolio interactivo para Cleriston, un ilustrador talentoso, con una estética editorial que resalta sus obras. Prioricé la navegación intuitiva y la accesibilidad, usando HTML5, CSS3, Bootstrap y Firebase, además de SEO optimizado para destacar su trabajo artístico en Google y asegurar que el sitio fuera inclusivo para todos los públicos.",
                                            }}
                                        </TextTranslator>
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Tecnologias:</strong> <Mark>Firebase</Mark> pra gerenciar o portfólio dinamicamente, <Mark>Bootstrap</Mark> pra responsividade, <Mark>CSS3</Mark> pra animações sutis.<br />
                                        <strong>Design:</strong> Usei <Mark>Photoshop</Mark> pra mockups e <Mark>Illustrator</Mark> pra elementos visuais personalizados.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-card hover:shadow-xl transition-all duration-300 rounded-xl" data-aos="fade-up" data-aos-delay="400">
                                <CardHeader>
                                    <img src="/arktop.jpg" alt="Arktop Sistema" className="w-full h-64 object-cover rounded-t-xl" />
                                </CardHeader>
                                <CardContent className="p-8">
                                    <CardTitle className="text-2xl font-semibold text-foreground mb-4 tracking-tight">
                                        Arktop (Wortsman)
                                    </CardTitle>
                                    <p className="text-muted-foreground mb-4">
                                        <TextTranslator>
                                            {{
                                                ptBR: "Liderado na Wortsman, desenvolvi o Arktop, um sistema de gestão de obras em Laravel e PHP que monitora custos, progresso e atualizações em tempo real. Combinei um backend robusto com um front-end acessível, criando uma ferramenta que simplifica processos complexos e entrega valor real ao usuário final.",
                                                en: "Led at Wortsman, I developed Arktop, a Laravel and PHP-based construction management system that tracks costs, progress, and updates in real time. Paired a robust backend with an accessible front-end, creating a tool that simplifies complex processes and delivers real value to end users.",
                                                es: "Liderado en Wortsman, desarrollé Arktop, un sistema de gestión de obras en Laravel y PHP que monitorea costos, progreso y actualizaciones en tiempo real. Combiné un backend robusto con un front-end accesible, creando una herramienta que simplifica procesos complejos y entrega valor real al usuario final.",
                                            }}
                                        </TextTranslator>
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Tecnologias:</strong> <Mark>Laravel</Mark> pra lógica backend, <Mark>PHP</Mark> pra automação, <Mark>CSS</Mark> pra interface limpa.<br />
                                        <strong>Design:</strong> Layouts no <Mark>Illustrator</Mark> pra wireframes iniciais.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </Topic>
                </Section>

                {/* Experiência */}
                <SectionFluid label="experiencia" className="py-32 bg-gradient-to-r from-muted to-muted-foreground text-foreground">
                    <Topic label="minha-jornada">
                        <h2 className="text-5xl md:text-7xl font-bold text-center mb-20 tracking-tight">
                            <TextTranslator>
                                {{ ptBR: "Minha Jornada Épica pelo Digital", en: "My Epic Digital Journey", es: "Mi Viaje Épico por lo Digital" }}
                            </TextTranslator>
                        </h2>
                        <Accordion type="single" collapsible className="w-full max-w-5xl mx-auto">
                            <AccordionItem value="senai" data-aos="fade-up">
                                <AccordionTrigger className="text-2xl hover:text-purple-500 dark:hover:text-purple-400 tracking-tight">
                                    <TextTranslator>
                                        {{
                                            ptBR: "Web Design | Front-End - Senai (Out 2020 - Atualmente)",
                                            en: "Web Design | Front-End - Senai (Oct 2020 - Present)",
                                            es: "Diseño Web | Front-End - Senai (Oct 2020 - Actualidad)",
                                        }}
                                    </TextTranslator>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed">
                                    <p className="mb-6 text-lg">
                                        <TextTranslator>
                                            {{
                                                ptBR: (
                                                    <>
                                                        Desde outubro de 2020, no Senai, eu lidero a criação de <Mark>cursos EAD que redefinem o aprendizado online</Mark>. Meu papel é transformar storyboards detalhados em plataformas web interativas, acessíveis e visualmente ricas, trabalhando em colaboração com uma equipe de designers e ilustradores profissionais. Utilizo <Mark>HTML5</Mark>, <Mark>CSS</Mark>, <Mark>Bootstrap</Mark> e <Mark>JavaScript</Mark> como base pra construir interfaces responsivas que funcionam perfeitamente em qualquer dispositivo. Além disso, implemento <Mark>React</Mark> com <Mark>Tailwind CSS</Mark> e <Mark>Shadcn/UI</Mark> pra desenvolver templates dinâmicos e componentes reutilizáveis, como quizzes interativos, barras de progresso e dashboards de desempenho, todos integrados via API com ambientes virtuais de aprendizagem (AVA). Meu foco é garantir que cada curso seja <Mark>inclusivo</Mark>, seguindo padrões de acessibilidade WCAG, e <Mark>engajador</Mark>, com interações que prendem o aluno do início ao fim.<br /><br />
                                                        Fora do código, eu também produzo <Mark>assets visuais</Mark> com o pacote <Mark>Adobe</Mark>, criando desde banners digitais otimizados pra web (72dpi) até materiais impressos de alta resolução (300dpi) pra divulgação offline. Animações e vídeos também fazem parte do pacote: uso <Mark>After Effects</Mark> pra criar introduções animadas que capturam a atenção e <Mark>Premiere Pro</Mark> pra editar aulas com transições suaves, legendas acessíveis e áudio impecável, tratado no <Mark>Audition</Mark>.
                                                    </>
                                                ),
                                                en: (
                                                    <>
                                                        Since October 2020 at Senai, I’ve been leading the creation of <Mark>EAD courses that redefine online learning</Mark>. My role is to turn detailed storyboards into interactive, accessible, and visually rich web platforms, collaborating with a team of designers and professional illustrators. I leverage <Mark>HTML5</Mark>, <Mark>CSS</Mark>, <Mark>Bootstrap</Mark>, and <Mark>JavaScript</Mark> as the foundation to build responsive interfaces that work seamlessly across devices. On top of that, I implement <Mark>React</Mark> with <Mark>Tailwind CSS</Mark> and <Mark>Shadcn/UI</Mark> to develop dynamic templates and reusable components — think interactive quizzes, progress bars, and performance dashboards — all integrated via API with virtual learning environments (AVA). My focus is ensuring every course is <Mark>inclusive</Mark>, adhering to WCAG accessibility standards, and <Mark>engaging</Mark>, with interactions that keep students hooked from start to finish.<br /><br />
                                                        Beyond code, I also produce <Mark>visual assets</Mark> with the <Mark>Adobe</Mark> suite, crafting everything from web-optimized digital banners (72dpi) to high-resolution print materials (300dpi) for offline promotion. Animations and videos are part of the mix too: I use <Mark>After Effects</Mark> to create captivating animated intros and <Mark>Premiere Pro</Mark> to edit lessons with smooth transitions, accessible captions, and pristine audio polished in <Mark>Audition</Mark>.
                                                    </>
                                                ),
                                                es: (
                                                    <>
                                                        Desde octubre de 2020 en Senai, he liderado la creación de <Mark>cursos EAD que redefinen el aprendizaje en línea</Mark>. Mi rol es convertir storyboards detallados en plataformas web interactivas, accesibles y visualmente ricas, colaborando con un equipo de diseñadores e ilustradores profesionales. Utilizo <Mark>HTML5</Mark>, <Mark>CSS</Mark>, <Mark>Bootstrap</Mark> y <Mark>JavaScript</Mark> como base para construir interfaces responsivas que funcionan perfectamente en cualquier dispositivo. Además, implemento <Mark>React</Mark> con <Mark>Tailwind CSS</Mark> y <Mark>Shadcn/UI</Mark> para desarrollar plantillas dinámicas y componentes reutilizables — como quizzes interactivos, barras de progreso y paneles de rendimiento — todos integrados vía API con entornos virtuales de aprendizaje (AVA). Mi enfoque es garantizar que cada curso sea <Mark>inclusivo</Mark>, siguiendo los estándares de accesibilidad WCAG, y <Mark>atractivo</Mark>, con interacciones que mantienen a los estudiantes enganchados de principio a fin.<br /><br />
                                                        Más allá del código, también produzco <Mark>activos visuales</Mark> con el paquete <Mark>Adobe</Mark>, creando desde banners digitales optimizados para web (72dpi) hasta materiales impresos de alta resolución (300dpi) para promoción offline. Las animaciones y videos también forman parte: uso <Mark>After Effects</Mark> para crear intros animadas que captan la atención y <Mark>Premiere Pro</Mark> para editar lecciones con transiciones suaves, subtítulos accesibles y audio impecable tratado en <Mark>Audition</Mark>.
                                                    </>
                                                ),
                                            }}
                                        </TextTranslator>
                                    </p>
                                    <p className="text-sm">
                                        <strong>Tecnologias de Programação:</strong> No front-end, <Mark>React</Mark> é meu carro-chefe pra criar componentes modulares, como formulários com validação em tempo real e animações de feedback pro usuário. <Mark>Tailwind CSS</Mark> me dá flexibilidade pra estilizar interfaces modernas com rapidez, enquanto <Mark>Shadcn/UI</Mark> adiciona uma camada de componentes acessíveis prontos pra uso. <Mark>Bootstrap</Mark> entra pra acelerar layouts responsivos, e <Mark>JavaScript</Mark> traz a mágica das interações, como gatilhos de scroll e validações dinâmicas. As integrações com AVA via <Mark>API REST</Mark> garantem que os dados fluam sem interrupções, mantendo tudo sincronizado e funcional.<br />
                                        <strong>Imagens e Ilustrações (Adobe):</strong> No <Mark>Photoshop</Mark>, trabalho ajustes finos em imagens, como correção de cores e recorte de elementos pra banners interativos que carregam rápido na web (72dpi). Já no <Mark>Illustrator</Mark>, crio ilustrações vetoriais e layouts pra materiais impressos (300dpi), como guias de curso e cartazes, garantindo precisão e escalabilidade.<br />
                                        <strong>Vídeos (After Effects e Premiere):</strong> Com <Mark>After Effects</Mark>, produzo motion graphics pra introduções de cursos, como logos animados e transições temáticas que reforçam a identidade visual. No <Mark>Premiere Pro</Mark>, edito vídeos completos, alinhando cortes com narração, adicionando legendas com contraste pra acessibilidade e tratando áudio no <Mark>Audition</Mark> pra remover ruídos e equilibrar volumes.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="ciasex" data-aos="fade-up" data-aos-delay="200">
                                <AccordionTrigger className="text-2xl hover:text-purple-500 dark:hover:text-purple-400 tracking-tight">
                                    <TextTranslator>
                                        {{
                                            ptBR: "Marketing Pleno | Design - Gall/Ciasex (Nov 2019 - Out 2020)",
                                            en: "Marketing Specialist | Design - Gall/Ciasex (Nov 2019 - Oct 2020)",
                                            es: "Marketing Pleno | Diseño - Gall/Ciasex (Nov 2019 - Oct 2020)",
                                        }}
                                    </TextTranslator>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed">
                                    <p className="mb-6 text-lg">
                                        <TextTranslator>
                                            {{
                                                ptBR: (
                                                    <>
                                                        Na Gall/Ciasex, entre novembro de 2019 e outubro de 2020, eu fui o cérebro por trás de <Mark>campanhas de marketing que capturaram olhares e impulsionaram vendas</Mark>. Meu trabalho ia além do design: eu mantinha o site e-commerce vivo e funcional, usando <Mark>JavaScript</Mark>, <Mark>JSON</Mark>, <Mark>jQuery</Mark>, <Mark>HTML</Mark>, <Mark>CSS</Mark> e <Mark>Bootstrap</Mark> pra criar experiências responsivas que convertiam visitantes em clientes. Desenvolvi desde carrosséis de produtos até páginas de checkout otimizadas, sempre com foco em <Mark>navegabilidade intuitiva</Mark> e <Mark>usabilidade</Mark>. Além disso, liderei a criação de peças visuais únicas pra campanhas, fotografando produtos com cuidado pra destacar cada detalhe e elaborando layouts que equilibravam estética e funcionalidade.<br /><br />
                                                        No lado multimídia, eu editava <Mark>imagens</Mark> e <Mark>vídeos</Mark> pra dar vida às estratégias de marketing. Com <Mark>After Effects</Mark>, produzia animações promocionais que chamavam atenção nas redes sociais, enquanto no <Mark>Premiere Pro</Mark> montava vídeos institucionais com narrativa clara e acabamento profissional, usando <Mark>Audition</Mark> pra garantir um som limpo e impactante. Tudo isso contribuiu pra fortalecer a presença digital da marca e engajar o público de forma consistente.
                                                    </>
                                                ),
                                                en: (
                                                    <>
                                                        At Gall/Ciasex, from November 2019 to October 2020, I was the mastermind behind <Mark>marketing campaigns that grabbed attention and drove sales</Mark>. My work went beyond design: I kept the e-commerce site alive and functional, using <Mark>JavaScript</Mark>, <Mark>JSON</Mark>, <Mark>jQuery</Mark>, <Mark>HTML</Mark>, <Mark>CSS</Mark>, and <Mark>Bootstrap</Mark> to build responsive experiences that turned visitors into customers. I developed everything from product carousels to optimized checkout pages, always prioritizing <Mark>intuitive navigation</Mark> and <Mark>usability</Mark>. On top of that, I led the creation of unique visual assets for campaigns, photographing products with care to highlight every detail and designing layouts that balanced aesthetics and functionality.<br /><br />
                                                        On the multimedia front, I edited <Mark>images</Mark> and <Mark>videos</Mark> to bring marketing strategies to life. With <Mark>After Effects</Mark>, I produced promotional animations that stood out on social media, while in <Mark>Premiere Pro</Mark>, I crafted institutional videos with clear storytelling and professional polish, using <Mark>Audition</Mark> to ensure clean, impactful sound. All of this helped strengthen the brand’s digital presence and consistently engage its audience.
                                                    </>
                                                ),
                                                es: (
                                                    <>
                                                        En Gall/Ciasex, desde noviembre de 2019 hasta octubre de 2020, fui el cerebro detrás de <Mark>campañas de marketing que captaron miradas e impulsaron ventas</Mark>. Mi trabajo iba más allá del diseño: mantenía el sitio de e-commerce vivo y funcional, usando <Mark>JavaScript</Mark>, <Mark>JSON</Mark>, <Mark>jQuery</Mark>, <Mark>HTML</Mark>, <Mark>CSS</Mark> y <Mark>Bootstrap</Mark> para crear experiencias responsivas que convertían visitantes en clientes. Desarrollé desde carruseles de productos hasta páginas de checkout optimizadas, siempre priorizando <Mark>navegación intuitiva</Mark> y <Mark>usabilidad</Mark>. Además, lideré la creación de piezas visuales únicas para campañas, fotografiando productos con cuidado para resaltar cada detalle y elaborando diseños que equilibraban estética y funcionalidad.<br /><br />
                                                        En el ámbito multimedia, editaba <Mark>imágenes</Mark> y <Mark>videos</Mark> para dar vida a las estrategias de marketing. Con <Mark>After Effects</Mark>, producía animaciones promocionales que destacaban en redes sociales, mientras que en <Mark>Premiere Pro</Mark> montaba videos institucionales con narrativa clara y acabado profesional, usando <Mark>Audition</Mark> para garantizar un sonido limpio e impactante. Todo esto ayudó a fortalecer la presencia digital de la marca y a conectar con el público de manera consistente.
                                                    </>
                                                ),
                                            }}
                                        </TextTranslator>
                                    </p>
                                    <p className="text-sm">
                                        <strong>Tecnologias de Programação:</strong> <Mark>jQuery</Mark> foi essencial pra interações rápidas, como animações de hover em botões e sliders de produtos, enquanto <Mark>JSON</Mark> gerenciava dados dinâmicos, como listas de itens no carrinho. <Mark>Bootstrap</Mark> acelerou o desenvolvimento de layouts responsivos, e <Mark>CSS</Mark> personalizado trouxe a identidade visual da marca pro front-end, com transições suaves e tipografia acessível. <Mark>JavaScript</Mark> cuidou de funcionalidades como filtros de busca e validação de formulários.<br />
                                        <strong>Imagens e Ilustrações (Adobe):</strong> No <Mark>Photoshop</Mark>, tratei fotos de produtos com ajustes de luz, sombra e recorte pra banners promocionais que carregam rápido (72dpi). No <Mark>Illustrator</Mark>, desenhei ícones vetoriais e layouts pra campanhas impressas (300dpi), como flyers e cartazes, garantindo consistência visual.<br />
                                        <strong>Vídeos (After Effects e Premiere):</strong> Usei <Mark>After Effects</Mark> pra criar motion graphics, como transições animadas de texto e logos giratórios pra anúncios de 15 segundos. No <Mark>Premiere Pro</Mark>, editei vídeos com storytelling claro, sincronizando cortes com música e adicionando legendas pra acessibilidade, enquanto o <Mark>Audition</Mark> limpava ruídos e ajustava volumes pra um áudio profissional.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="wortsman" data-aos="fade-up" data-aos-delay="400">
                                <AccordionTrigger className="text-2xl hover:text-purple-500 dark:hover:text-purple-400 tracking-tight">
                                    <TextTranslator>
                                        {{
                                            ptBR: "Desenvolvedor | Design - Wortsman (Ago 2018 - Nov 2019)",
                                            en: "Developer | Design - Wortsman (Aug 2018 - Nov 2019)",
                                            es: "Desarrollador | Diseño - Wortsman (Ago 2018 - Nov 2019)",
                                        }}
                                    </TextTranslator>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed">
                                    <p className="mb-6 text-lg">
                                        <TextTranslator>
                                            {{
                                                ptBR: (
                                                    <>
                                                        Na Wortsman, entre agosto de 2018 e novembro de 2019, eu abracei o desafio de unir <Mark>desenvolvimento full-stack</Mark> com <Mark>design multiplataforma</Mark>, criando soluções que iam do código ao impacto visual. Desenvolvi e mantive sistemas complexos com <Mark>PHP</Mark>, <Mark>WordPress</Mark> e <Mark>Laravel</Mark>, como o Arktop, uma ferramenta de gestão de obras que monitorava custos, prazos e atualizações em tempo real, simplificando processos pra equipes de construção. Minha abordagem foi além da funcionalidade: implementei automações que reduziram tarefas manuais e criei interfaces front-end acessíveis que tornavam os dados fáceis de entender, mesmo pra usuários não técnicos.<br /><br />
                                                        No design, eu produzi <Mark>materiais visuais</Mark> pra divulgação online e offline, incluindo peças digitais pra redes sociais e impressos pra eventos como CasaCor. Isso envolvia desde a concepção de layouts no <Mark>Illustrator</Mark> até a edição de imagens no <Mark>Photoshop</Mark>, sempre com foco em <Mark>impacto visual</Mark> e <Mark>coerência de marca</Mark>. Também trabalhei em vídeos promocionais, usando <Mark>After Effects</Mark> pra animações e <Mark>Premiere Pro</Mark> pra edições finais, entregando conteúdos que conectavam a Wortsman ao seu público de forma memorável.
                                                    </>
                                                ),
                                                en: (
                                                    <>
                                                        At Wortsman, from August 2018 to November 2019, I embraced the challenge of blending <Mark>full-stack development</Mark> with <Mark>multi-platform design</Mark>, creating solutions that spanned code to visual impact. I built and maintained complex systems with <Mark>PHP</Mark>, <Mark>WordPress</Mark>, and <Mark>Laravel</Mark>, like Arktop, a construction management tool that tracked costs, timelines, and real-time updates, streamlining processes for construction teams. My approach went beyond functionality: I implemented automations that cut down manual tasks and designed accessible front-end interfaces that made data easy to grasp, even for non-technical users.<br /><br />
                                                        In design, I produced <Mark>visual materials</Mark> for online and offline promotion, including digital assets for social media and print pieces for events like CasaCor. This ranged from crafting layouts in <Mark>Illustrator</Mark> to editing images in <Mark>Photoshop</Mark>, always focusing on <Mark>visual impact</Mark> and <Mark>brand consistency</Mark>. I also worked on promotional videos, using <Mark>After Effects</Mark> for animations and <Mark>Premiere Pro</Mark> for final edits, delivering content that connected Wortsman with its audience in a memorable way.
                                                    </>
                                                ),
                                                es: (
                                                    <>
                                                        En Wortsman, desde agosto de 2018 hasta noviembre de 2019, abracé el desafío de unir <Mark>desarrollo full-stack</Mark> con <Mark>diseño multiplataforma</Mark>, creando soluciones que abarcaban desde el código hasta el impacto visual. Construí y mantuve sistemas complejos con <Mark>PHP</Mark>, <Mark>WordPress</Mark> y <Mark>Laravel</Mark>, como Arktop, una herramienta de gestión de obras que monitoreaba costos, plazos y actualizaciones en tiempo real, simplificando procesos para equipos de construcción. Mi enfoque fue más allá de la funcionalidad: implementé automatizaciones que redujeron tareas manuales y diseñé interfaces front-end accesibles que hacían los datos fáciles de entender, incluso para usuarios no técnicos.<br /><br />
                                                        En diseño, produje <Mark>materiales visuales</Mark> para promoción online y offline, incluyendo activos digitales para redes sociales e impresos para eventos como CasaCor. Esto abarcaba desde la creación de layouts en <Mark>Illustrator</Mark> hasta la edición de imágenes en <Mark>Photoshop</Mark>, siempre con un enfoque en <Mark>impacto visual</Mark> y <Mark>coherencia de marca</Mark>. También trabajé en videos promocionales, usando <Mark>After Effects</Mark> para animaciones y <Mark>Premiere Pro</Mark> para ediciones finales, entregando contenidos que conectaban a Wortsman con su público de manera memorable.
                                                    </>
                                                ),
                                            }}
                                        </TextTranslator>
                                    </p>
                                    <p className="text-sm">
                                        <strong>Tecnologias de Programação:</strong> <Mark>Laravel</Mark> foi o coração do Arktop, com rotas seguras e modelos Eloquent pra gerenciar dados complexos de obras. <Mark>PHP</Mark> alimentou automações server-side, como relatórios automáticos, enquanto <Mark>WordPress</Mark> foi usado pra sites promocionais rápidos, com temas customizados pra SEO e acessibilidade. No front-end, <Mark>CSS</Mark> trouxe interfaces limpas e responsivas, com foco em tipografia legível.<br />
                                        <strong>Imagens e Ilustrações (Adobe):</strong> No <Mark>Illustrator</Mark>, desenhei layouts vetoriais pra eventos, como plantas estilizadas e logotipos, exportados em 300dpi pra impressão. No <Mark>Photoshop</Mark>, editei fotos de projetos pra peças digitais (72dpi) e impressas, ajustando contraste e saturação pra destaque visual.<br />
                                        <strong>Vídeos (After Effects e Premiere):</strong> Usei <Mark>After Effects</Mark> pra criar animações de branding, como intros com partículas e transições 3D pra eventos. No <Mark>Premiere Pro</Mark>, editei vídeos promocionais com cortes dinâmicos, legendas sincronizadas e áudio ajustado no <Mark>Audition</Mark> pra clareza máxima.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </Topic>
                </SectionFluid>

                {/* Formação */}
                <Section label="formacao" className="py-32 bg-background">
                    <Topic label="minha-caixa">
                        <h2 className="text-5xl md:text-7xl font-bold text-center text-foreground mb-20 tracking-tight">
                            <TextTranslator>
                                {{ ptBR: "Minha Caixa de Ferramentas", en: "My Toolbox", es: "Mi Caja de Herramientas" }}
                            </TextTranslator>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                            <Card data-aos="fade-up" className="bg-card shadow-md rounded-xl">
                                <CardContent className="pt-8">
                                    <p className="font-semibold text-xl text-foreground mb-2 tracking-tight">Design Gráfico - Unip</p>
                                    <p className="text-muted-foreground mb-4">Jul 2019 - Ago 2021</p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        <TextTranslator>
                                            {{
                                                ptBR: "Na Unip, mergulhei no universo do design gráfico, onde refinei minha capacidade de criar experiências visuais que comunicam ideias com clareza e emoção. Aprendi a dominar <Mark>cores</Mark>, <Mark>formas</Mark> e <Mark>tipografia</Mark>, aplicando esses elementos pra construir identidades visuais memoráveis e layouts acessíveis. Desenvolvi habilidades em ferramentas como <Mark>Photoshop</Mark> e <Mark>Illustrator</Mark>, criando desde ilustrações vetoriais até peças publicitárias que equilibram estética e funcionalidade, sempre com um olhar atento pra usabilidade e inclusão visual.",
                                                en: "At Unip, I dove into the world of graphic design, sharpening my ability to create visual experiences that communicate ideas with clarity and emotion. I mastered <Mark>colors</Mark>, <Mark>shapes</Mark>, and <Mark>typography</Mark>, applying them to build memorable visual identities and accessible layouts. I honed skills in tools like <Mark>Photoshop</Mark> and <Mark>Illustrator</Mark>, crafting everything from vector illustrations to advertising pieces that balance aesthetics and functionality, always with a keen eye on usability and visual inclusion.",
                                                es: "En Unip, me sumergí en el universo del diseño gráfico, donde perfeccioné mi capacidad para crear experiencias visuales que comunican ideas con claridad y emoción. Dominé <Mark>colores</Mark>, <Mark>formas</Mark> y <Mark>tipografía</Mark>, aplicándolos para construir identidades visuales memorables y diseños accesibles. Desarrollé habilidades en herramientas como <Mark>Photoshop</Mark> y <Mark>Illustrator</Mark>, creando desde ilustraciones vectoriales hasta piezas publicitarias que equilibran estética y funcionalidad, siempre con una mirada atenta a la usabilidad e inclusión visual.",
                                            }}
                                        </TextTranslator>
                                    </p>
                                </CardContent>
                            </Card>
                            <Card data-aos="fade-up" data-aos-delay="100" className="bg-card shadow-md rounded-xl">
                                <CardContent className="pt-8">
                                    <p className="font-semibold text-xl text-foreground mb-2 tracking-tight">Engenharia da Computação - Univesp</p>
                                    <p className="text-muted-foreground mb-4">Fev 2017 - Ago 2020</p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        <TextTranslator>
                                            {{
                                                ptBR: "Na Univesp, construí uma base técnica sólida em <Mark>Engenharia da Computação</Mark>, explorando profundamente <Mark>lógica</Mark>, <Mark>algoritmos</Mark> e <Mark>programação</Mark>. Esse curso me deu o alicerce pra desenvolver sistemas eficientes e interfaces dinâmicas, entendendo como o código pode resolver problemas reais. Aprendi a trabalhar com linguagens como <Mark>JavaScript</Mark> e <Mark>PHP</Mark>, além de frameworks como <Mark>Laravel</Mark>, aplicando esses conhecimentos pra criar soluções que unem performance, escalabilidade e uma experiência de usuário fluida e acessível.",
                                                en: "At Univesp, I built a strong technical foundation in <Mark>Computer Engineering</Mark>, diving deep into <Mark>logic</Mark>, <Mark>algorithms</Mark>, and <Mark>programming</Mark>. This course gave me the groundwork to develop efficient systems and dynamic interfaces, understanding how code can solve real-world problems. I learned to work with languages like <Mark>JavaScript</Mark> and <Mark>PHP</Mark>, plus frameworks like <Mark>Laravel</Mark>, applying this knowledge to create solutions that blend performance, scalability, and a seamless, accessible user experience.",
                                                es: "En Univesp, construí una base técnica sólida en <Mark>Ingeniería de Computación</Mark>, explorando profundamente <Mark>lógica</Mark>, <Mark>algoritmos</Mark> y <Mark>programación</Mark>. Este curso me dio el fundamento para desarrollar sistemas eficientes e interfaces dinámicas, entendiendo cómo el código puede resolver problemas reales. Aprendí a trabajar con lenguajes como <Mark>JavaScript</Mark> y <Mark>PHP</Mark>, además de frameworks como <Mark>Laravel</Mark>, aplicando estos conocimientos para crear soluciones que combinan rendimiento, escalabilidad y una experiencia de usuario fluida y accesible.",
                                            }}
                                        </TextTranslator>
                                    </p>
                                </CardContent>
                            </Card>
                            <Card data-aos="fade-up" data-aos-delay="200" className="bg-card shadow-md rounded-xl">
                                <CardContent className="pt-8">
                                    <p className="font-semibold text-xl text-foreground mb-2 tracking-tight">Marketing Digital - Comschool</p>
                                    <p className="text-muted-foreground mb-4">Jun 2017</p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        <TextTranslator>
                                            {{
                                                ptBR: "O curso de Marketing Digital na Comschool me abriu as portas pra estratégias que conectam criações digitais ao mundo. Aprendi a usar <Mark>SEO</Mark> pra posicionar sites no topo das buscas, técnicas de <Mark>marketing de conteúdo</Mark> pra engajar audiências e ferramentas analíticas pra medir impacto. Esse conhecimento me permite amplificar o alcance dos meus projetos de design e desenvolvimento, garantindo que eles não só funcionem bem, mas também sejam vistos e valorizados por quem importa.",
                                                en: "The Digital Marketing course at Comschool opened the door to strategies that connect digital creations to the world. I learned to use <Mark>SEO</Mark> to rank sites at the top of searches, <Mark>content marketing</Mark> techniques to engage audiences, and analytics tools to measure impact. This knowledge lets me amplify the reach of my design and development projects, ensuring they don’t just work well but are also seen and valued by the right people.",
                                                es: "El curso de Marketing Digital en Comschool me abrió las puertas a estrategias que conectan creaciones digitales con el mundo. Aprendí a usar <Mark>SEO</Mark> para posicionar sitios en la cima de las búsquedas, técnicas de <Mark>marketing de contenido</Mark> para enganchar audiencias y herramientas analíticas para medir impacto. Este conocimiento me permite amplificar el alcance de mis proyectos de diseño y desarrollo, asegurando que no solo funcionen bien, sino que también sean vistos y valorados por quien importa.",
                                            }}
                                        </TextTranslator>
                                    </p>
                                </CardContent>
                            </Card>
                            <Card data-aos="fade-up" data-aos-delay="300" className="bg-card shadow-md rounded-xl">
                                <CardContent className="pt-8">
                                    <p className="font-semibold text-xl text-foreground mb-2 tracking-tight">Web Design - Microcamp</p>
                                    <p className="text-muted-foreground mb-4">Jan 2012 - Dez 2015</p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        <TextTranslator>
                                            {{
                                                ptBR: "Foi na Microcamp que minha jornada começou, onde descobri minha paixão por <Mark>interfaces web</Mark> e plantei as sementes da minha carreira. Aprendi os fundamentos de <Mark>HTML</Mark>, <Mark>CSS</Mark> e design responsivo, explorando como criar sites que fossem ao mesmo tempo <Mark>funcionais</Mark> e <Mark>visualmente atraentes</Mark>. Esse curso me deu as primeiras ferramentas pra entender navegabilidade, usabilidade e a importância de layouts que se adaptam a diferentes telas, moldando minha abordagem criativa e técnica que uso até hoje.",
                                                en: "It was at Microcamp where my journey began, discovering my passion for <Mark>web interfaces</Mark> and planting the seeds of my career. I learned the basics of <Mark>HTML</Mark>, <Mark>CSS</Mark>, and responsive design, exploring how to create sites that were both <Mark>functional</Mark> and <Mark>visually appealing</Mark>. This course gave me my first tools to understand navigation, usability, and the importance of layouts that adapt to different screens, shaping the creative and technical approach I still use today.",
                                                es: "Fue en Microcamp donde comenzó mi viaje, descubriendo mi pasión por las <Mark>interfaces web</Mark> y sembrando las semillas de mi carrera. Aprendí los fundamentos de <Mark>HTML</Mark>, <Mark>CSS</Mark> y diseño responsivo, explorando cómo crear sitios que fueran tanto <Mark>funcionales</Mark> como <Mark>visualmente atractivos</Mark>. Este curso me dio mis primeras herramientas para entender la navegabilidad, la usabilidad y la importancia de diseños que se adaptan a diferentes pantallas, moldeando mi enfoque creativo y técnico que uso hasta hoy.",
                                            }}
                                        </TextTranslator>
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </Topic>
                </Section>

                {/* Depoimentos */}
                <Section label="depoimentos" className="py-32 bg-background">
                    <Topic label="o-que-dizem">
                        <h2 className="text-5xl md:text-7xl font-bold text-center text-foreground mb-20 tracking-tight">
                            <TextTranslator>
                                {{ ptBR: "Vozes que Contam Minha História", en: "Voices That Tell My Story", es: "Voces que Cuentan Mi Historia" }}
                            </TextTranslator>
                        </h2>
                        <div className="flex gap-8 overflow-x-auto max-w-7xl mx-auto pb-4 scrollbar-thin scrollbar-thumb-purple-500">
                            <Card data-aos="fade-up" className="min-w-[400px] bg-card shadow-md rounded-xl">
                                <CardContent className="pt-8">
                                    <p className="text-muted-foreground italic leading-relaxed">
                                        <TextTranslator>
                                            {{
                                                ptBR: (
                                                    <>
                                                        Zecki é um parceiro de longa data, com quem trabalho há mais de <Mark>10 anos</Mark>, desde os tempos da Evino. Hoje, na Fozzy, ele é o único profissional em quem confio pra desenvolver nosso site e identidade visual. Sua <Mark>proatividade</Mark>, abertura ao feedback e capacidade de sugerir melhorias são impressionantes. Ele entrega um trabalho ético e de altíssima qualidade, tornando a colaboração um verdadeiro prazer pra mim e minha equipe.
                                                    </>
                                                ),
                                                en: (
                                                    <>
                                                        Zecki has been a long-time partner, working with me for over <Mark>10 years</Mark> since the Evino days. Today at Fozzy, he’s the only professional I trust to develop our website and visual identity. His <Mark>proactivity</Mark>, openness to feedback, and ability to suggest improvements are remarkable. He delivers ethical, top-quality work, making collaboration a true pleasure for me and my team.
                                                    </>
                                                ),
                                                es: (
                                                    <>
                                                        Zecki ha sido un compañero de largo tiempo, trabajando conmigo por más de <Mark>10 años</Mark> desde los días de Evino. Hoy en Fozzy, es el único profesional en quien confío para desarrollar nuestro sitio web e identidad visual. Su <Mark>proactividad</Mark>, apertura a los comentarios y capacidad para sugerir mejoras son impresionantes. Entrega un trabajo ético y de altísima calidad, haciendo que la colaboración sea un verdadero placer para mí y mi equipo."
                                                    </>
                                                ),
                                            }}
                                        </TextTranslator>
                                    </p>
                                    <p className="mt-6 font-semibold text-foreground tracking-tight">Renato Ferreira</p>
                                    <p className="text-muted-foreground text-sm">Founder e CEO, Fozzy Estética Automotiva</p>
                                </CardContent>
                            </Card>
                            <Card data-aos="fade-up" data-aos-delay="200" className="min-w-[400px] bg-card shadow-md rounded-xl">
                                <CardContent className="pt-8">
                                    <p className="text-muted-foreground italic leading-relaxed">
                                        <TextTranslator>
                                            {{
                                                ptBR: (
                                                    <>
                                                        Zecki é um dos melhores profissionais com quem já trabalhei. Sua dedicação e versatilidade são fora da curva. Ele desenvolveu meu site com um cuidado único, sempre buscando as <Mark>melhores ferramentas</Mark> e propondo soluções que superaram minhas expectativas. Além disso, sua habilidade de trabalhar em equipe e criar um ambiente leve é algo que faz diferença no dia a dia.
                                                    </>
                                                ),
                                                en: (
                                                    <>
                                                        Zecki is one of the best professionals I’ve ever worked with. His dedication and versatility are off the charts. He developed my website with unique care, always seeking the <Mark>best tools</Mark> and proposing solutions that exceeded my expectations. Plus, his ability to collaborate and create a light, positive environment makes a real difference every day.
                                                    </>
                                                ),
                                                es: (
                                                    <>
                                                        Zecki es uno de los mejores profesionales con los que he trabajado. Su dedicación y versatilidad están fuera de lo común. Desarrolló mi sitio web con un cuidado único, siempre buscando las <Mark>mejores herramientas</Mark> y proponiendo soluciones que superaron mis expectativas. Además, su habilidad para trabajar en equipo y crear un ambiente ligero es algo que marca la diferencia cada día.
                                                    </>
                                                ),
                                            }}
                                        </TextTranslator>
                                    </p>
                                    <p className="mt-6 font-semibold text-foreground tracking-tight">Cleriston Ribeiro</p>
                                    <p className="text-muted-foreground text-sm">Ilustrador Profissional</p>
                                </CardContent>
                            </Card>
                            <Card data-aos="fade-up" data-aos-delay="400" className="min-w-[400px] bg-card shadow-md rounded-xl">
                                <CardContent className="pt-8">
                                    <p className="text-muted-foreground italic leading-relaxed">
                                        <TextTranslator>
                                            {{
                                                ptBR: (
                                                    <>
                                                       Zecki é um talento excepcional: <Mark>autodidata</Mark>, <Mark>determinado</Mark> e incrivelmente <Mark>confiável</Mark>. Ele enfrenta qualquer desafio com uma energia única e transforma ideias em resultados impressionantes. Trabalhar com ele foi uma experiência que me marcou pela qualidade do seu trabalho e pela forma como ele eleva o padrão em tudo que faz.
                                                    </>
                                                ),
                                                en: (
                                                    <>
                                                        Zecki is an exceptional talent: <Mark>self-taught</Mark>, <Mark>determined</Mark>, and incredibly <Mark>reliable</Mark>. He tackles any challenge with unique energy and turns ideas into impressive results. Working with him was an experience that stood out for the quality of his work and the way he raises the bar in everything he does.
                                                    </>
                                                ),
                                                es: (
                                                    <>
                                                        Zecki es un talento excepcional: <Mark>autodidacta</Mark>, <Mark>determinado</Mark> e increíblemente <Mark>confiable</Mark>. Enfrenta cualquier desafío con una energía única y transforma ideas en resultados impresionantes. Trabajar con él fue una experiencia que me marcó por la calidad de su trabajo y la forma en que eleva el estándar en todo lo que hace.
                                                    </>
                                                ),
                                            }}
                                        </TextTranslator>
                                    </p>
                                    <p className="mt-6 font-semibold text-foreground tracking-tight">Carlos Castro</p>
                                    <p className="text-muted-foreground text-sm">Colaborador Profissional</p>
                                </CardContent>
                            </Card>
                        </div>
                    </Topic>
                </Section>

                {/* Call to Action */}
                <Section label="cta" className="py-32 text-center bg-gradient-to-t from-muted to-muted-foreground text-foreground">
                    <Topic label="contato">
                        <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight" data-aos="fade-up">
                            <TextTranslator>
                                {{
                                    ptBR: "Vamos Construir Algo Extraordinário Juntos?",
                                    en: "Shall We Build Something Extraordinary Together?",
                                    es: "¿Construimos Algo Extraordinario Juntos?",
                                }}
                            </TextTranslator>
                        </h2>
                        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                            <TextTranslator>
                                {{
                                    ptBR: "Estou pronto pra transformar suas ideias em soluções digitais que combinam inovação, acessibilidade e um toque de criatividade. Vamos conversar e dar vida ao seu próximo projeto?",
                                    en: "I’m ready to turn your ideas into digital solutions that blend innovation, accessibility, and a splash of creativity. Let’s chat and bring your next project to life?",
                                    es: "Estoy listo para convertir tus ideas en soluciones digitales que combinen innovación, accesibilidad y un toque de creatividad. ¿Hablamos y damos vida a tu próximo proyecto?",
                                }}
                            </TextTranslator>
                        </p>
                        <Button
                            className="bg-purple-500 hover:bg-purple-600 text-white px-10 py-5 rounded-full shadow-md transform hover:scale-105 transition-all duration-300 text-lg tracking-tight"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <TextTranslator>
                                {{ ptBR: "Fale Comigo Agora!", en: "Talk to Me Now!", es: "¡Habla Conmigo Ahora!" }}
                            </TextTranslator>
                        </Button>
                    </Topic>
                </Section>

                {/* Footer */}
                <SectionFluid label="footer" className="py-16 bg-muted text-muted-foreground text-center">
                    <Topic label="rodape">
                        <p data-aos="fade-up" className="text-lg tracking-tight">
                            <TextTranslator>
                                {{
                                    ptBR: "© 2025 Zecki. Criado com <Mark>paixão incansável</Mark>, linhas de código e uma dose generosa de café forte!",
                                    en: "© 2025 Zecki. Built with <Mark>relentless passion</Mark>, lines of code, and a generous dose of strong coffee!",
                                    es: "© 2025 Zecki. ¡Creado con <Mark>pasión incansable</Mark>, líneas de código y una generosa dosis de café fuerte!",
                                }}
                            </TextTranslator>
                        </p>
                    </Topic>
                </SectionFluid>
            </main>
        </div>
    );
}