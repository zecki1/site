"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";

import { Cover } from "@/components/layout/Cover";
import { Section, SectionFluid } from "@/components/layout/Sections";
import { Topic } from "@/components/layout/Topic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StaggeredText } from "@/components/gsap/StaggeredText";
import { images } from "@/components/layout/ImageContainer";
import TextTranslator from "@/components/layout/TextTranslator";
import Image from "next/image"; // Adicionado

// Componente Mark ajustado pra ser usado
const Mark: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="font-bold text-purple-600">{children}</span>
);

function AosInit() {
    useEffect(() => {
        AOS.init({
            duration: 800,
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
            paddingTop: "100vh", // Começa abaixo do header
            opacity: 1,
        });

        gsap.to(main, {
            paddingTop: "4rem", // Reduz o padding ao rolar
            scrollTrigger: {
                trigger: main,
                start: "top top",
                end: "top+=50vh top", // Sincroniza com o header
                scrub: 0.6,
                onEnter: () => console.log("Main entrou na tela"),
            },
        });
    }, []);

    return (
        <div className="min-h-screen pt-[80vh]">
            <AosInit />
            <main ref={mainRef} className="relative z-10">
                <Cover
                    titlePT="Ezequiel Regino Monção"
                    titleEN="Ezequiel Regino Monção"
                    titleES="Ezequiel Regino Monção"
                    backgroundImage={images.capa}
                    className="flex flex-col items-center justify-center text-center"
                    ignoreCheck={true} // Adicionado aqui pra ignorar a verificação no título
                >
                    <p className="text-xl md:text-3xl mb-6">
                        <TextTranslator ignoreCheck={true}>
                            {{
                                ptBR: "Designer Gráfico | Front-End | Ilustrador",
                                en: "Graphic Designer | Front-End | Illustrator",
                                es: "Diseñador Gráfico | Front-End | Ilustrador",
                            }}
                        </TextTranslator>
                    </p>
                </Cover>

                {/* Seção Sobre Mim */}
                <Section label="sobre" className="py-20">
                    <Topic label="quem-sou">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
                            <StaggeredText text="Quem Sou Eu" />
                        </h2>
                        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                            <TextTranslator>
                                {{
                                    ptBR: (
                                        <>
                                            Oi, eu sou o Zecki! Tenho 26 anos e há <Mark>13 anos</Mark> vivo mergulhado no mundo das artes e da tecnologia. Sou um designer gráfico, desenvolvedor front-end e ilustrador que adora misturar criatividade com código. Minha missão? Criar coisas que sejam <Mark>bonitas</Mark>, fáceis de usar e que todo mundo entenda — do simples ao grandioso, sempre com um toque de diversão!
                                        </>
                                    ),
                                    en: (
                                        <>
                                            Hey, I’m Zecki! I’m 26 and for the past <Mark>13 years</Mark>, I’ve been diving deep into art and tech. I’m a graphic designer, front-end dev, and illustrator who loves blending creativity with code. My mission? Crafting stuff that’s <Mark>beautiful</Mark>, user-friendly, and easy to get — from simple to epic, always with a sprinkle of fun!
                                        </>
                                    ),
                                    es: (
                                        <>
                                            ¡Hola, soy Zecki! Tengo 26 años y hace <Mark>13 años</Mark> que vivo inmerso en el mundo del arte y la tecnología. Soy diseñador gráfico, desarrollador front-end e ilustrador, y me encanta mezclar creatividad con código. ¿Mi misión? Crear cosas <Mark>hermosas</Mark>, fáciles de usar y que todos entiendan — desde lo simple hasta lo épico, ¡siempre con un toque de diversión!
                                        </>
                                    ),
                                }}
                            </TextTranslator>
                        </p>
                    </Topic>
                </Section>

                {/* Seção de Projetos */}
                <Section label="projetos" className="py-20">
                    <Topic label="meus-projetos">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
                            <StaggeredText text="Meus Projetos" />
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <Card className="hover:shadow-xl transition" data-aos="fade-up" data-aos-delay="100">
                                <CardHeader>
                                    <Image
                                        src="/project-app.jpg"
                                        alt="App Design"
                                        width={800}
                                        height={600}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                </CardHeader>
                                <CardContent>
                                    <CardTitle>
                                        <TextTranslator>
                                            {{ ptBR: "Design de App", en: "App Design", es: "Diseño de App" }}
                                        </TextTranslator>
                                    </CardTitle>
                                    <p className="text-gray-600">
                                        <TextTranslator>
                                            {{
                                                ptBR: (
                                                    <>
                                                        Interfaces <Mark>modernas</Mark> e responsivas que até o seu avô vai adorar usar!
                                                    </>
                                                ),
                                                en: (
                                                    <>
                                                        <Mark>Modern</Mark> and responsive interfaces even your grandpa would love!
                                                    </>
                                                ),
                                                es: (
                                                    <>
                                                        Interfaces <Mark>modernas</Mark> y responsivas que hasta tu abuelo amará usar!
                                                    </>
                                                ),
                                            }}
                                        </TextTranslator>
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="hover:shadow-xl transition" data-aos="fade-up" data-aos-delay="200">
                                <CardHeader>
                                    <Image
                                        src="/project-brand.jpg"
                                        alt="Visual Identity"
                                        width={800}
                                        height={600}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                </CardHeader>
                                <CardContent>
                                    <CardTitle>
                                        <TextTranslator>
                                            {{ ptBR: "Identidade Visual", en: "Visual Identity", es: "Identidad Visual" }}
                                        </TextTranslator>
                                    </CardTitle>
                                    <p className="text-gray-600">
                                        <TextTranslator>
                                            {{
                                                ptBR: (
                                                    <>
                                                        Marcas com <Mark>alma</Mark> que contam histórias e conquistam corações.
                                                    </>
                                                ),
                                                en: (
                                                    <>
                                                        Brands with <Mark>soul</Mark> that tell stories and win hearts.
                                                    </>
                                                ),
                                                es: (
                                                    <>
                                                        Marcas con <Mark>alma</Mark> que cuentan historias y conquistan corazones.
                                                    </>
                                                ),
                                            }}
                                        </TextTranslator>
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="hover:shadow-xl transition" data-aos="fade-up" data-aos-delay="300">
                                <CardHeader>
                                    <Image
                                        src="/project-illustration.jpg"
                                        alt="Illustration"
                                        width={800}
                                        height={600}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                </CardHeader>
                                <CardContent>
                                    <CardTitle>
                                        <TextTranslator>
                                            {{ ptBR: "Ilustrações", en: "Illustrations", es: "Ilustraciones" }}
                                        </TextTranslator>
                                    </CardTitle>
                                    <p className="text-gray-600">
                                        <TextTranslator>
                                            {{
                                                ptBR: (
                                                    <>
                                                        Arte com <Mark>criatividade</Mark> que dá vida a qualquer ideia maluca!
                                                    </>
                                                ),
                                                en: (
                                                    <>
                                                        Art with <Mark>creativity</Mark> that brings any wild idea to life!
                                                    </>
                                                ),
                                                es: (
                                                    <>
                                                        Arte con <Mark>creatividad</Mark> que da vida a cualquier idea loca!
                                                    </>
                                                ),
                                            }}
                                        </TextTranslator>
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </Topic>
                </Section>

                {/* Seção de Experiência */}
                <SectionFluid label="experiencia" className="py-20">
                    <Topic label="minha-jornada">
                        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12">
                            <TextTranslator>
                                {{ ptBR: "Minha Jornada Épica", en: "My Epic Journey", es: "Mi Viaje Épico" }}
                            </TextTranslator>
                        </h2>
                        <p className="text-xl md:text-2xl text-center mb-12" data-aos="fade-up">
                            <TextTranslator>
                                {{
                                    ptBR: (
                                        <>
                                            <Mark>13 anos</Mark> de criatividade, código e café — uma aventura que mistura arte e tech!
                                        </>
                                    ),
                                    en: (
                                        <>
                                            <Mark>13 years</Mark> of creativity, code, and coffee — an adventure blending art and tech!
                                        </>
                                    ),
                                    es: (
                                        <>
                                            <Mark>13 años</Mark> de creatividad, código y café — ¡una aventura que mezcla arte y tecnología!
                                        </>
                                    ),
                                }}
                            </TextTranslator>
                        </p>
                        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                            <AccordionItem value="senai" data-aos="fade-up" data-aos-delay="200">
                                <AccordionTrigger>
                                    <TextTranslator>
                                        {{
                                            ptBR: "Web Design | Front-End - Senai (Out 2020 - Atualmente)",
                                            en: "Web Design | Front-End - Senai (Oct 2020 - Present)",
                                            es: "Diseño Web | Front-End - Senai (Oct 2020 - Actualidad)",
                                        }}
                                    </TextTranslator>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <TextTranslator>
                                        {{
                                            ptBR: (
                                                <>
                                                    Aqui eu crio cursos EAD que são puro <Mark>rock’n’roll</Mark>! Uso HTML5, CSS, Bootstrap e JavaScript pra transformar storyboards em experiências web incríveis, com ilustrações de mestres do traço.
                                                </>
                                            ),
                                            en: (
                                                <>
                                                    Here, I whip up EAD courses that are pure <Mark>rock’n’roll</Mark>! I use HTML5, CSS, Bootstrap, and JavaScript to turn storyboards into awesome web experiences, with illustrations from top-notch artists.
                                                </>
                                            ),
                                            es: (
                                                <>
                                                    ¡Aquí creo cursos EAD que son puro <Mark>rock’n’roll</Mark>! Uso HTML5, CSS, Bootstrap y JavaScript para convertir storyboards en experiencias web geniales, con ilustraciones de maestros del trazo.
                                                </>
                                            ),
                                        }}
                                    </TextTranslator>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="ciasex" data-aos="fade-up" data-aos-delay="300">
                                <AccordionTrigger>
                                    <TextTranslator>
                                        {{
                                            ptBR: "Marketing Pleno | Design - Ciasex (Nov 2019 - Out 2020)",
                                            en: "Marketing Specialist | Design - Ciasex (Nov 2019 - Oct 2020)",
                                            es: "Marketing Pleno | Diseño - Ciasex (Nov 2019 - Oct 2020)",
                                        }}
                                    </TextTranslator>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <TextTranslator>
                                        {{
                                            ptBR: (
                                                <>
                                                    Desenvolvi campanhas que brilham e cuidei do site com <Mark>JavaScript</Mark>, JSON, jQuery, HTML, CSS e Bootstrap. Tirei fotos, criei layouts e fiz o e-commerce bombar com ideias fora da curva!
                                                </>
                                            ),
                                            en: (
                                                <>
                                                    I built shiny campaigns and kept the site rocking with <Mark>JavaScript</Mark>, JSON, jQuery, HTML, CSS, and Bootstrap. Snapped pics, designed layouts, and made the e-commerce pop with wild ideas!
                                                </>
                                            ),
                                            es: (
                                                <>
                                                    Desarrollé campañas brillantes y mantuve el sitio en marcha con <Mark>JavaScript</Mark>, JSON, jQuery, HTML, CSS y Bootstrap. Tomé fotos, diseñé layouts e hice que el e-commerce despegara con ideas locas!
                                                </>
                                            ),
                                        }}
                                    </TextTranslator>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="wortsman" data-aos="fade-up" data-aos-delay="400">
                                <AccordionTrigger>
                                    <TextTranslator>
                                        {{
                                            ptBR: "Desenvolvedor | Design - Wortsman (Ago 2018 - Nov 2019)",
                                            en: "Developer | Design - Wortsman (Aug 2018 - Nov 2019)",
                                            es: "Desarrollador | Diseño - Wortsman (Ago 2018 - Nov 2019)",
                                        }}
                                    </TextTranslator>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <TextTranslator>
                                        {{
                                            ptBR: (
                                                <>
                                                    Mergulhei em sistemas com <Mark>PHP</Mark>, WordPress e Laravel, além de criar visuais online e offline que mandam um “uau” pra quem vê. Tudo com aquele toque de automação pra facilitar a vida!
                                                </>
                                            ),
                                            en: (
                                                <>
                                                    I dove into systems with <Mark>PHP</Mark>, WordPress, and Laravel, plus crafted online and offline visuals that scream “wow” to anyone who sees them. All with a dash of automation to make life easier!
                                                </>
                                            ),
                                            es: (
                                                <>
                                                    Me sumergí en sistemas con <Mark>PHP</Mark>, WordPress y Laravel, además de crear visuales online y offline que gritan “¡guau!” a quien los ve. ¡Todo con un toque de automatización para facilitar la vida!
                                                </>
                                            ),
                                        }}
                                    </TextTranslator>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </Topic>
                </SectionFluid>

                {/* Seção de Educação */}
                <Section label="educacao" className="py-16">
                    <Topic label="formacao">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                            <TextTranslator>
                                {{ ptBR: "Minha Caixa de Ferramentas", en: "My Toolbox", es: "Mi Caja de Herramientas" }}
                            </TextTranslator>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            <Card data-aos="fade-up">
                                <CardContent className="pt-6">
                                    <p className="font-semibold">
                                        <TextTranslator>
                                            {{ ptBR: "Design Gráfico - Unip", en: "Graphic Design - Unip", es: "Diseño Gráfico - Unip" }}
                                        </TextTranslator>
                                    </p>
                                    <p className="text-gray-600">Jul 2019 - Ago 2021</p>
                                    <p>
                                        <TextTranslator>
                                            {{
                                                ptBR: "Aprendi a dar vida às ideias com <Mark>cores</Mark> e formas!",
                                                en: "Learned to bring ideas to life with <Mark>colors</Mark> and shapes!",
                                                es: "¡Aprendí a dar vida a las ideas con <Mark>colores</Mark> y formas!",
                                            }}
                                        </TextTranslator>
                                    </p>
                                </CardContent>
                            </Card>
                            <Card data-aos="fade-up" data-aos-delay="100">
                                <CardContent className="pt-6">
                                    <p className="font-semibold">
                                        <TextTranslator>
                                            {{
                                                ptBR: "Engenharia da Computação - Univesp",
                                                en: "Computer Engineering - Univesp",
                                                es: "Ingeniería de Computación - Univesp",
                                            }}
                                        </TextTranslator>
                                    </p>
                                    <p className="text-gray-600">Fev 2017 - Ago 2020</p>
                                    <p>
                                        <TextTranslator>
                                            {{
                                                ptBR: "Dominei o código e a lógica pra construir coisas <Mark>épicas</Mark>!",
                                                en: "Mastered code and logic to build <Mark>epic</Mark> stuff!",
                                                es: "¡Dominé el código y la lógica para crear cosas <Mark>épicas</Mark>!",
                                            }}
                                        </TextTranslator>
                                    </p>
                                </CardContent>
                            </Card>
                            <Card data-aos="fade-up" data-aos-delay="200">
                                <CardContent className="pt-6">
                                    <p className="font-semibold">
                                        <TextTranslator>
                                            {{
                                                ptBR: "Marketing Digital - Comschool",
                                                en: "Digital Marketing - Comschool",
                                                es: "Marketing Digital - Comschool",
                                            }}
                                        </TextTranslator>
                                    </p>
                                    <p className="text-gray-600">Jun 2017</p>
                                    <p>
                                        <TextTranslator>
                                            {{
                                                ptBR: "Descobri como fazer o mundo ver minhas ideias com <Mark>estilo</Mark>!",
                                                en: "Figured out how to show the world my ideas with <Mark>style</Mark>!",
                                                es: "¡Descubrí cómo mostrarle al mundo mis ideas con <Mark>estilo</Mark>!",
                                            }}
                                        </TextTranslator>
                                    </p>
                                </CardContent>
                            </Card>
                            <Card data-aos="fade-up" data-aos-delay="300">
                                <CardContent className="pt-6">
                                    <p className="font-semibold">
                                        <TextTranslator>
                                            {{ ptBR: "Web Design - Microcamp", en: "Web Design - Microcamp", es: "Diseño Web - Microcamp" }}
                                        </TextTranslator>
                                    </p>
                                    <p className="text-gray-600">Jan 2012 - Dez 2015</p>
                                    <p>
                                        <TextTranslator>
                                            {{
                                                ptBR: "Onde tudo começou: minha paixão por sites <Mark>irados</Mark>!",
                                                en: "Where it all began: my passion for <Mark>awesome</Mark> websites!",
                                                es: "¡Donde todo empezó: mi pasión por sitios web <Mark>geniales</Mark>!",
                                            }}
                                        </TextTranslator>
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </Topic>
                </Section>

                {/* Call to Action */}
                <Section label="cta" className="py-16 text-center">
                    <Topic label="contato">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">
                            <TextTranslator>
                                {{
                                    ptBR: "Vamos Criar Algo Incrível Juntos?",
                                    en: "Let’s Create Something Awesome Together?",
                                    es: "¿Creamos Algo Increíble Juntos?",
                                }}
                            </TextTranslator>
                        </h2>
                        <Button
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <TextTranslator>
                                {{ ptBR: "Me Chama!", en: "Hit Me Up!", es: "¡Contáctame!" }}
                            </TextTranslator>
                        </Button>
                    </Topic>
                </Section>

                {/* Footer */}
                <SectionFluid label="footer" className="py-8 text-center">
                    <Topic label="rodape">
                        <p data-aos="fade-up">
                            <TextTranslator>
                                {{
                                    ptBR: "© 2025 Zecki. Feito com <Mark>paixão</Mark>, código e muito café!",
                                    en: "© 2025 Zecki. Made with <Mark>passion</Mark>, code, and lots of coffee!",
                                    es: "© 2025 Zecki. ¡Hecho con <Mark>pasión</Mark>, código y mucho café!",
                                }}
                            </TextTranslator>
                        </p>
                    </Topic>
                </SectionFluid>
            </main>
        </div>
    );
}