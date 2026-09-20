import { Briefcase, GraduationCap, Rocket, BookOpen, Award, Medal } from "lucide-react";

export type LocaleText = { ptBR: string; en: string; es: string };
export type EntryKind = "work" | "study" | "project";
export type StudyTrack = "graduacao" | "tecnico" | "extra" | "pos";
export type Contract = "CLT" | "PJ";
export type SkillLevel = "intro" | "applied" | "master";

export interface SkillUse {
    id: string;
    level: SkillLevel;
}

export interface JourneyEntry {
    id: string;
    kind: EntryKind;
    track?: StudyTrack;
    contract?: Contract;
    period: string;
    title: LocaleText;
    org: LocaleText;
    summary: LocaleText;
    details: LocaleText;
    skills: SkillUse[];
}

export interface SkillInfo {
    id: string;
    label: LocaleText;
    accent: string;
    dot: string;
    hex: string;
}

type IconType = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

const CYAN = "border-[#00e1ff]/40 bg-[#00e1ff]/10 text-[#00e1ff]";
const FUCHSIA = "border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-400";
const PURPLE = "border-purple-400/40 bg-purple-400/10 text-purple-400";
const AMBER = "border-amber-400/40 bg-amber-400/10 text-amber-400";
const EMERALD = "border-emerald-400/40 bg-emerald-400/10 text-emerald-400";
const ROSE = "border-rose-400/40 bg-rose-400/10 text-rose-400";
const INDIGO = "border-indigo-400/40 bg-indigo-400/10 text-indigo-400";
const PINK = "border-pink-400/40 bg-pink-400/10 text-pink-400";

export const SKILLS: SkillInfo[] = [
    { id: "html", label: { ptBR: "HTML5", en: "HTML5", es: "HTML5" }, accent: CYAN, dot: "bg-[#00e1ff]", hex: "#00e1ff" },
    { id: "css", label: { ptBR: "CSS3/SCSS", en: "CSS3/SCSS", es: "CSS3/SCSS" }, accent: CYAN, dot: "bg-[#00e1ff]", hex: "#00e1ff" },
    { id: "js", label: { ptBR: "JavaScript", en: "JavaScript", es: "JavaScript" }, accent: CYAN, dot: "bg-[#00e1ff]", hex: "#00e1ff" },
    { id: "ts", label: { ptBR: "TypeScript", en: "TypeScript", es: "TypeScript" }, accent: CYAN, dot: "bg-[#00e1ff]", hex: "#00e1ff" },
    { id: "react", label: { ptBR: "React", en: "React", es: "React" }, accent: CYAN, dot: "bg-[#00e1ff]", hex: "#00e1ff" },
    { id: "next", label: { ptBR: "Next.js", en: "Next.js", es: "Next.js" }, accent: CYAN, dot: "bg-[#00e1ff]", hex: "#00e1ff" },
    { id: "angular", label: { ptBR: "Angular", en: "Angular", es: "Angular" }, accent: CYAN, dot: "bg-[#00e1ff]", hex: "#00e1ff" },
    { id: "node", label: { ptBR: "Node.js", en: "Node.js", es: "Node.js" }, accent: FUCHSIA, dot: "bg-fuchsia-400", hex: "#e879f9" },
    { id: "dotnet", label: { ptBR: ".NET", en: ".NET", es: ".NET" }, accent: FUCHSIA, dot: "bg-fuchsia-400", hex: "#e879f9" },
    { id: "java", label: { ptBR: "Java/Spring", en: "Java/Spring", es: "Java/Spring" }, accent: FUCHSIA, dot: "bg-fuchsia-400", hex: "#e879f9" },
    { id: "php", label: { ptBR: "PHP/Laravel", en: "PHP/Laravel", es: "PHP/Laravel" }, accent: FUCHSIA, dot: "bg-fuchsia-400", hex: "#e879f9" },
    { id: "sql", label: { ptBR: "SQL", en: "SQL", es: "SQL" }, accent: PURPLE, dot: "bg-purple-400", hex: "#c084fc" },
    { id: "docker", label: { ptBR: "Docker", en: "Docker", es: "Docker" }, accent: AMBER, dot: "bg-amber-400", hex: "#fbbf24" },
    { id: "cloud", label: { ptBR: "Cloud", en: "Cloud", es: "Cloud" }, accent: AMBER, dot: "bg-amber-400", hex: "#fbbf24" },
    { id: "cicd", label: { ptBR: "CI/CD", en: "CI/CD", es: "CI/CD" }, accent: AMBER, dot: "bg-amber-400", hex: "#fbbf24" },
    { id: "git", label: { ptBR: "Git", en: "Git", es: "Git" }, accent: EMERALD, dot: "bg-emerald-400", hex: "#34d399" },
    { id: "testing", label: { ptBR: "Testes", en: "Testing", es: "Testing" }, accent: EMERALD, dot: "bg-emerald-400", hex: "#34d399" },
    { id: "a11y", label: { ptBR: "A11y (WCAG)", en: "A11y (WCAG)", es: "A11y (WCAG)" }, accent: EMERALD, dot: "bg-emerald-400", hex: "#34d399" },
    { id: "perf", label: { ptBR: "Perf. Web", en: "Web Perf", es: "Perf. Web" }, accent: EMERALD, dot: "bg-emerald-400", hex: "#34d399" },
    { id: "seo", label: { ptBR: "SEO/CRO", en: "SEO/CRO", es: "SEO/CRO" }, accent: EMERALD, dot: "bg-emerald-400", hex: "#34d399" },
    { id: "figma", label: { ptBR: "Figma", en: "Figma", es: "Figma" }, accent: ROSE, dot: "bg-rose-400", hex: "#fb7185" },
    { id: "design", label: { ptBR: "Design", en: "Design", es: "Diseño" }, accent: ROSE, dot: "bg-rose-400", hex: "#fb7185" },
    { id: "ux", label: { ptBR: "UX", en: "UX", es: "UX" }, accent: ROSE, dot: "bg-rose-400", hex: "#fb7185" },
    { id: "marketing", label: { ptBR: "Marketing", en: "Marketing", es: "Marketing" }, accent: PINK, dot: "bg-pink-400", hex: "#f472b6" },
    { id: "ia", label: { ptBR: "IA", en: "AI", es: "IA" }, accent: INDIGO, dot: "bg-indigo-400", hex: "#818cf8" },
];

export const SKILL_MAP: Record<string, SkillInfo> = Object.fromEntries(
    SKILLS.map((skill) => [skill.id, skill])
);

export const LEVELS: Record<
    SkillLevel,
    { label: LocaleText; dot: string; chip: string; steps: number }
> = {
    intro: {
        label: { ptBR: "Aprendendo", en: "Learning", es: "Aprendiendo" },
        dot: "bg-sky-400",
        chip: "border-sky-400/40 bg-sky-400/10 text-sky-400",
        steps: 1,
    },
    applied: {
        label: { ptBR: "Aplicando em projetos", en: "Applied in projects", es: "Aplicando en proyectos" },
        dot: "bg-violet-400",
        chip: "border-violet-400/40 bg-violet-400/10 text-violet-400",
        steps: 2,
    },
    master: {
        label: { ptBR: "Dominando", en: "Mastering", es: "Dominando" },
        dot: "bg-emerald-400",
        chip: "border-emerald-400/40 bg-emerald-400/10 text-emerald-400",
        steps: 3,
    },
};

export const LEVEL_ORDER: SkillLevel[] = ["intro", "applied", "master"];

export const KIND_META: Record<
    EntryKind,
    { label: LocaleText; icon: IconType; accent: string }
> = {
    work: {
        label: { ptBR: "Experiência", en: "Experience", es: "Experiencia" },
        icon: Briefcase,
        accent: "border-cyan-400/40 bg-cyan-400/10 text-cyan-400",
    },
    study: {
        label: { ptBR: "Estudo", en: "Study", es: "Estudio" },
        icon: GraduationCap,
        accent: "border-sky-400/40 bg-sky-400/10 text-sky-400",
    },
    project: {
        label: { ptBR: "Projeto", en: "Project", es: "Proyecto" },
        icon: Rocket,
        accent: "border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-400",
    },
};

export const STUDY_META: Record<
    StudyTrack,
    { label: LocaleText; icon: IconType; accent: string }
> = {
    graduacao: {
        label: { ptBR: "Graduação", en: "Degree", es: "Grado" },
        icon: GraduationCap,
        accent: "border-sky-400/40 bg-sky-400/10 text-sky-400",
    },
    tecnico: {
        label: { ptBR: "Curso técnico", en: "Technical course", es: "Curso técnico" },
        icon: BookOpen,
        accent: "border-teal-400/40 bg-teal-400/10 text-teal-400",
    },
    extra: {
        label: { ptBR: "Curso extra", en: "Extra course", es: "Curso extra" },
        icon: Medal,
        accent: "border-emerald-400/40 bg-emerald-400/10 text-emerald-400",
    },
    pos: {
        label: { ptBR: "Pós-graduação", en: "Postgraduate", es: "Posgrado" },
        icon: Award,
        accent: "border-violet-400/40 bg-violet-400/10 text-violet-400",
    },
};

export const CONTRACT_META: Record<Contract, { accent: string }> = {
    CLT: { accent: "border-blue-400/40 bg-blue-400/10 text-blue-400" },
    PJ: { accent: "border-orange-400/40 bg-orange-400/10 text-orange-400" },
};

export function getEntryMeta(entry: JourneyEntry): { label: LocaleText; icon: IconType; accent: string } {
    if (entry.kind === "study" && entry.track) return STUDY_META[entry.track];
    return KIND_META[entry.kind];
}

export const JOURNEY: JourneyEntry[] = [
    {
        id: "artes-plasticas",
        kind: "study",
        track: "extra",
        period: "2008 – 2013",
        title: { ptBR: "Artes plásticas e olhar criativo", en: "Fine arts and a creative eye", es: "Artes plásticas y mirada creativa" },
        org: { ptBR: "Formação pessoal", en: "Personal training", es: "Formación personal" },
        summary: {
            ptBR: "Dos 13 aos 18 anos: desenho, pintura e composição visual — a raiz estética que sustenta meu olhar de design até hoje.",
            en: "From ages 13 to 18: drawing, painting, and visual composition — the aesthetic root that still grounds my design eye.",
            es: "De los 13 a los 18 años: dibujo, pintura y composición visual, la raíz estética que aún sostiene mi mirada de diseño.",
        },
        details: {
            ptBR: "Prática constante de desenho de observação, cor e proporção. Esse repertório virou o fundamento do meu trabalho: hierarquia visual, contraste, equilíbrio e acessibilidade nasceram desses anos de prática manual.",
            en: "Constant practice of observational drawing, color, and proportion. That repertoire became the foundation of my work: visual hierarchy, contrast, balance, and accessibility were born from these years of hands-on practice.",
            es: "Práctica constante de dibujo de observación, color y proporción. Ese repertorio se volvió el fundamento de mi trabajo: la jerarquía visual, el contraste, el equilibrio y la accesibilidad nacieron de estos años de práctica manual.",
        },
        skills: [
            { id: "design", level: "applied" },
            { id: "ux", level: "intro" },
        ],
    },
    {
        id: "instrutor-artes",
        kind: "work",
        contract: "PJ",
        period: "2010 – 2012",
        title: { ptBR: "Instrutor de Artes Plásticas e Design", en: "Fine Arts & Design Instructor", es: "Instructor de Artes Plásticas y Diseño" },
        org: { ptBR: "Ateliê de artes", en: "Arts studio", es: "Atelier de arte" },
        summary: {
            ptBR: "Aos 15 anos comecei a ensinar o que aprendia — e descobri que ensinar é o caminho mais rápido para aprender de verdade.",
            en: "At 15 I started teaching what I was learning — and discovered that teaching is the fastest path to truly learning.",
            es: "A los 15 años empecé a enseñar lo que aprendía y descubrí que enseñar es el camino más rápido para aprender de verdad.",
        },
        details: {
            ptBR: "Como instrutor em ateliê, orientava alunos iniciantes em técnicas de desenho e design. Foi minha primeira aula prática de didática, comunicação e liderança — competências que carrego até hoje.",
            en: "As a studio instructor, I guided beginner students in drawing and design techniques. It was my first practical class in teaching, communication, and leadership — skills I still carry today.",
            es: "Como instructor de taller, guiaba a estudiantes principiantes en técnicas de dibujo y diseño. Fue mi primera clase práctica en didáctica, comunicación y liderazgo, competencias que aún llevo conmigo.",
        },
        skills: [
            { id: "design", level: "applied" },
            { id: "ux", level: "applied" },
        ],
    },
    {
        id: "microcamp",
        kind: "study",
        track: "tecnico",
        period: "2012 – 2014",
        title: { ptBR: "Técnico em Web Design", en: "Web Design Technician", es: "Técnico en Diseño Web" },
        org: { ptBR: "Microcamp · 324h", en: "Microcamp · 324h", es: "Microcamp · 324h" },
        summary: {
            ptBR: "O ponto de partida técnico: HTML, CSS e as primeiras páginas feitas à mão — o braço e o código do design.",
            en: "The technical starting point: HTML, CSS, and the first hand-coded pages — the practical side of design.",
            es: "El punto de partida técnico: HTML, CSS y las primeras páginas hechas a mano, el lado práctico del diseño.",
        },
        details: {
            ptBR: "Curso técnico que estabeleceu raízes na árvore: estruturar páginas, estilizar com CSS e entender que web é código + design funcionando juntos.",
            en: "A technical course that set roots in the tree: structuring pages, styling with CSS, and understanding that the web is code + design working together.",
            es: "Curso técnico que fijó raíces en el árbol: estructurar páginas, estilizar con CSS y entender que la web es código + diseño trabajando juntos.",
        },
        skills: [
            { id: "html", level: "intro" },
            { id: "css", level: "intro" },
        ],
    },
    {
        id: "evino",
        kind: "work",
        contract: "CLT",
        period: "2013 – 2014",
        title: { ptBR: "Auxiliar de Operações", en: "Operations Assistant", es: "Auxiliar de Operaciones" },
        org: { ptBR: "Evino", en: "Evino", es: "Evino" },
        summary: {
            ptBR: "Primeiro emprego formal, aos 18: operações de e-commerce de vinhos — e o primeiro contato real com conversão e funil de vendas.",
            en: "First formal job, at 18: e-commerce operations for wine — and the first real contact with conversion and sales funnels.",
            es: "Primer empleo formal, a los 18: operaciones de e-commerce de vinos y el primer contacto real con la conversión y el embudo de ventas.",
        },
        details: {
            ptBR: "Dentro da Evino observei na prática como um e-commerce precifica, entrega e converte. Não era área de tecnologia, mas foi ali que o 'marketing que vende' começou a fazer sentido para mim.",
            en: "Inside Evino I saw firsthand how an e-commerce prices, ships, and converts. It wasn't tech, but that's where 'marketing that sells' started making sense to me.",
            es: "En Evino observé en la práctica cómo un e-commerce fija precios, entrega y convierte. No era tecnología, pero fue allí donde el 'marketing que vende' empezó a tener sentido para mí.",
        },
        skills: [
            { id: "marketing", level: "intro" },
            { id: "seo", level: "intro" },
        ],
    },
    {
        id: "comschool",
        kind: "study",
        track: "tecnico",
        period: "2014 – 2015",
        title: { ptBR: "Cursos de Marketing Digital", en: "Digital Marketing Courses", es: "Cursos de Marketing Digital" },
        org: { ptBR: "ComSchool", en: "ComSchool", es: "ComSchool" },
        summary: {
            ptBR: "Aos 19 anos, a porta de entrada para o marketing digital com método: SEO, conteúdo, mídia e análise.",
            en: "At 19, the gateway into digital marketing done right: SEO, content, media, and analytics.",
            es: "A los 19 años, la puerta de entrada al marketing digital con método: SEO, contenido, medios y análisis.",
        },
        details: {
            ptBR: "ComSchool me deu a base de marketing digital — tráfego, SEO, conteúdo e performance — e abriu caminho direto para minha primeira vaga na área.",
            en: "ComSchool gave me the digital marketing foundation — traffic, SEO, content, and performance — and paved the way straight into my first role in the field.",
            es: "ComSchool me dio la base del marketing digital — tráfico, SEO, contenido y rendimiento — y abrió el camino directo a mi primera vacante en el área.",
        },
        skills: [
            { id: "marketing", level: "applied" },
            { id: "seo", level: "applied" },
        ],
    },
    {
        id: "diem",
        kind: "work",
        contract: "PJ",
        period: "2014 – 2016",
        title: { ptBR: "Marketing Digital & Backend", en: "Digital Marketing & Backend", es: "Marketing Digital y Backend" },
        org: { ptBR: "Diem", en: "Diem", es: "Diem" },
        summary: {
            ptBR: "Fase PJ: marketing digital na prática — SEO, conteúdo e e-mail marketing — somada a back-end, integrações com bancos de dados e marketplaces, manutenção e análise de dados.",
            en: "PJ phase: hands-on digital marketing — SEO, content, and email marketing — combined with back-end, database and marketplace integrations, maintenance, and data analysis.",
            es: "Fase PJ: marketing digital en la práctica — SEO, contenido y email marketing — junto a back-end, integraciones con bases de datos y marketplaces, mantenimiento y análisis de datos.",
        },
        details: {
            ptBR: "Como PJ, era responsável pelo ciclo marketing + tecnologia: planejamento e automação de e-mail marketing (segmentação de listas, fluxos de nutrição e métricas de entrega), SEO, conteúdo e landing pages de conversão. No back-end, construía e mantinha integrações e sincronização de dados entre lojas, marketplaces e sistemas internos, além de manutenção de aplicações, controle de envios/logística e análise de dados para apoiar a tomada de decisão. Foi onde design, marketing e código passaram a andar juntos.",
            en: "As a contractor (PJ), I owned the marketing + technology loop: email marketing planning and automation (list segmentation, nurture flows, and delivery metrics), SEO, content, and conversion landing pages. On the back-end, I built and maintained integrations and data sync across stores, marketplaces, and internal systems, plus application maintenance, shipping/logistics control, and data analysis to support decision-making. That's where design, marketing, and code started to move together.",
            es: "Como contratista (PJ), era responsable del ciclo marketing + tecnología: planificación y automatización de email marketing (segmentación de listas, flujos de nutrición y métricas de entrega), SEO, contenido y landing pages de conversión. En el back-end, creaba y mantenía integraciones y sincronización de datos entre tiendas, marketplaces y sistemas internos, además de mantenimiento de aplicaciones, control de envíos/logística y análisis de datos para apoyar la toma de decisiones. Fue donde diseño, marketing y código empezaron a caminar juntos.",
        },
        skills: [
            { id: "marketing", level: "master" },
            { id: "seo", level: "applied" },
            { id: "php", level: "applied" },
            { id: "sql", level: "applied" },
            { id: "node", level: "applied" },
            { id: "js", level: "applied" },
            { id: "ux", level: "applied" },
        ],
    },
    {
        id: "wortsman",
        kind: "work",
        contract: "PJ",
        period: "2016 – 2017",
        title: { ptBR: "Desenvolvedor Júnior → Pleno · Backend & Integrações", en: "Junior → Full Developer · Backend & Integrations", es: "Desarrollador Junior → Pleno · Backend e Integraciones" },
        org: { ptBR: "Wortsman", en: "Wortsman", es: "Wortsman" },
        summary: {
            ptBR: "A virada para o desenvolvimento, em regime PJ: mais back-end do que design — integrações com bancos de dados, marketplaces e controle de envios. Dev júnior promovido a pleno em 6 meses.",
            en: "The pivot into development, as a contractor (PJ): more back-end than design — integrations with databases, marketplaces, and shipping control. Junior dev promoted to full in 6 months.",
            es: "El giro hacia el desarrollo, como contratista (PJ): más back-end que diseño — integraciones con bases de datos, marketplaces y control de envíos. Dev junior ascendido a pleno en 6 meses.",
        },
        details: {
            ptBR: "Atuei mais em back-end do que em design: integrações e sincronização entre sistemas, bancos de dados, marketplaces e logística (controle de envios), manutenção de aplicações, análise de dados e entregas web com HTML, CSS e JavaScript. Construí a base técnica que consolidou minha transição para desenvolvimento — e a promoção a pleno em seis meses.",
            en: "I worked more on back-end than design: integrations and data sync across systems, databases, marketplaces, and logistics (shipping control), application maintenance, data analysis, and web delivery with HTML, CSS, and JavaScript. I built the technical foundation that consolidated my move into development — and my promotion to full within six months.",
            es: "Trabajé más en back-end que en diseño: integraciones y sincronización entre sistemas, bases de datos, marketplaces y logística (control de envíos), mantenimiento de aplicaciones, análisis de datos y entregas web con HTML, CSS y JavaScript. Construí la base técnica que consolidó mi transición al desarrollo — y el ascenso a pleno en seis meses.",
        },
        skills: [
            { id: "html", level: "applied" },
            { id: "css", level: "applied" },
            { id: "js", level: "applied" },
            { id: "php", level: "applied" },
            { id: "sql", level: "applied" },
            { id: "node", level: "applied" },
            { id: "git", level: "intro" },
            { id: "testing", level: "intro" },
            { id: "design", level: "applied" },
        ],
    },
    {
        id: "gall",
        kind: "work",
        contract: "CLT",
        period: "2017 – 2019",
        title: { ptBR: "Marketing Júnior → Pleno & Full Stack", en: "Junior → Full Marketing & Full Stack", es: "Marketing Junior → Pleno y Full Stack" },
        org: { ptBR: "CiaSex / GALL · Moda Íntima", en: "CiaSex / GALL · Intimate Apparel", es: "CiaSex / GALL · Moda Íntima" },
        summary: {
            ptBR: "Comecei como marketing júnior e saí como marketing pleno um ano e meio depois — SEO, CRO e, de quebra, full stack com Laravel/PHP.",
            en: "I started as a marketing junior and left as a full marketing professional a year and a half later — SEO, CRO, and, as a bonus, full stack with Laravel/PHP.",
            es: "Empecé como marketing junior y salí como marketing pleno año y medio después — SEO, CRO y, de paso, full stack con Laravel/PHP.",
        },
        details: {
            ptBR: "Em uma casa de moda íntima vivi o ciclo completo: marketing de conversão (SEO técnico, CRO) e, com o tempo, desenvolvimento full stack — landing pages de alta conversão com Laravel/PHP, Python, Node.js e bancos SQL.",
            en: "At an intimate apparel company I lived the full cycle: conversion marketing (technical SEO, CRO) and, over time, full-stack development — high-converting landing pages with Laravel/PHP, Python, Node.js, and SQL databases.",
            es: "En una empresa de moda íntima viví el ciclo completo: marketing de conversión (SEO técnico, CRO) y, con el tiempo, desarrollo full stack — landing pages de alta conversión con Laravel/PHP, Python, Node.js y bases de datos SQL.",
        },
        skills: [
            { id: "marketing", level: "master" },
            { id: "seo", level: "applied" },
            { id: "php", level: "applied" },
            { id: "js", level: "applied" },
            { id: "node", level: "intro" },
            { id: "sql", level: "applied" },
            { id: "design", level: "applied" },
            { id: "ux", level: "applied" },
        ],
    },
    {
        id: "univesp",
        kind: "study",
        track: "graduacao",
        period: "2017 – 2022",
        title: { ptBR: "Bacharel em Engenharia de Computação", en: "BSc in Computer Engineering", es: "Licenciatura en Ingeniería Informática" },
        org: { ptBR: "UNIVESP", en: "UNIVESP", es: "UNIVESP" },
        summary: {
            ptBR: "A base acadêmica do que eu já praticava: sistemas, redes, banco de dados e engenharia de software.",
            en: "The academic foundation of what I was already practicing: systems, networks, databases, and software engineering.",
            es: "La base académica de lo que ya practicaba: sistemas, redes, bases de datos e ingeniería de software.",
        },
        details: {
            ptBR: "Fundamentos que sustentam o trabalho full stack: algoritmos, estrutura de dados, redes e arquitetura — transformando intuição em base sólida.",
            en: "Foundations that support full-stack work: algorithms, data structures, networks, and architecture — turning intuition into a solid base.",
            es: "Fundamentos que sustentan el trabajo full stack: algoritmos, estructuras de datos, redes y arquitectura, convirtiendo la intuición en una base sólida.",
        },
        skills: [
            { id: "js", level: "applied" },
            { id: "sql", level: "applied" },
            { id: "ts", level: "intro" },
            { id: "git", level: "intro" },
        ],
    },
    {
        id: "unip",
        kind: "study",
        track: "graduacao",
        period: "2019 – 2021",
        title: { ptBR: "Graduação em Design Gráfico", en: "Degree in Graphic Design", es: "Grado en Diseño Gráfico" },
        org: { ptBR: "UNIP", en: "UNIP", es: "UNIP" },
        summary: {
            ptBR: "O método do design: tipografia, identidade visual, diagramação e os princípios que hoje viram Design Systems.",
            en: "The design method: typography, visual identity, layout, and the principles that today become Design Systems.",
            es: "El método del diseño: tipografía, identidad visual, diagramación y los principios que hoy se convierten en Design Systems.",
        },
        details: {
            ptBR: "Grid, cor, contraste e legibilidade — a ponte que faz a estética também ser acessível e funcional, aplicada todos os dias no Figma.",
            en: "Grid, color, contrast, and legibility — the bridge that makes aesthetics accessible and functional too, applied every day in Figma.",
            es: "Retícula, color, contraste y legibilidad — el puente que hace que la estética también sea accesible y funcional, aplicado a diario en Figma.",
        },
        skills: [
            { id: "figma", level: "applied" },
            { id: "design", level: "master" },
            { id: "ux", level: "applied" },
        ],
    },
    {
        id: "senai-inicio",
        kind: "work",
        contract: "CLT",
        period: "2019 – 2022",
        title: { ptBR: "Desenvolvedor Web", en: "Web Developer", es: "Desarrollador Web" },
        org: { ptBR: "SENAI São Paulo", en: "SENAI São Paulo", es: "SENAI São Paulo" },
        summary: {
            ptBR: "Entre no SENAI em 2019 como desenvolvedor web — e o front moderno (React, Next.js, Angular) virou rotina na educação digital.",
            en: "Joined SENAI in 2019 as a web developer — and modern front-end (React, Next.js, Angular) became routine in digital education.",
            es: "Entré al SENAI en 2019 como desarrollador web, y el front-end moderno (React, Next.js, Angular) se volvió rutina en la educación digital.",
        },
        details: {
            ptBR: "Interfaces responsivas, integração com APIs REST, versionamento em equipe e a cultura de WCAG virando hábito. Foi o período em que os frameworks entraram para sempre no meu fluxo.",
            en: "Responsive interfaces, REST API integration, team versioning, and a WCAG culture that became habit. It was the period when frameworks permanently entered my flow.",
            es: "Interfaces responsivas, integración con APIs REST, versionado en equipo y la cultura WCAG convertida en hábito. Fue el período en que los frameworks entraron para siempre en mi flujo.",
        },
skills: [
            { id: "dotnet", level: "master" },
            { id: "node", level: "master" },
            { id: "docker", level: "master" },
            { id: "cloud", level: "master" },
            { id: "ts", level: "master" },
            { id: "react", level: "master" },
            { id: "angular", level: "master" },
            { id: "next", level: "master" },
            { id: "testing", level: "master" },
            { id: "ux", level: "master" },
        ],
    },
    {
        id: "cms",
        kind: "project",
        period: "2022 – Hoje",
        title: { ptBR: "CMS Multi-Site Headless", en: "Multi-Site Headless CMS", es: "CMS Headless Multi-Sitio" },
        org: { ptBR: "Produto próprio", en: "Own product", es: "Producto propio" },
        summary: {
            ptBR: "Criado em 2022: ISR, edição em tempo real e um design system compartilhado entre vários sites com publicação em um clique.",
            en: "Created in 2022: ISR, real-time editing, and a shared design system across multiple sites with one-click publishing.",
            es: "Creado en 2022: ISR, edición en tiempo real y un design system compartido entre varios sitios con publicación en un clic.",
        },
        details: {
            ptBR: "Painel único para gerir hero, sobre, portfólio e contato — login por cliente, upload na nuvem e publicação imediata no site.",
            en: "Single panel to manage hero, about, portfolio, and contact — per-client login, cloud uploads, and instant publishing to the site.",
            es: "Panel único para gestionar hero, sobre, portafolio y contacto: inicio de sesión por cliente, subida a la nube y publicación inmediata en el sitio.",
        },
        skills: [
            { id: "next", level: "master" },
            { id: "react", level: "master" },
            { id: "ts", level: "master" },
            { id: "a11y", level: "master" },
            { id: "design", level: "master" },
            { id: "seo", level: "master" },
            { id: "cloud", level: "master" },
        ],
    },
    {
        id: "fullstack-senai",
        kind: "work",
        contract: "CLT",
        period: "2022 – Presente",
        title: { ptBR: "Desenvolvedor Fullstack Sênior", en: "Senior Full-Stack Developer", es: "Desarrollador Full-Stack Senior" },
        org: { ptBR: "SENAI São Paulo", en: "SENAI São Paulo", es: "SENAI São Paulo" },
        summary: {
            ptBR: "Promovido em 2022: APIs .NET e Node.js, microsserviços com Docker, Azure/GCP, Design System com 40% menos de tempo e testes com 80% de cobertura. Mais de 8 anos somando desenvolvimento e design.",
            en: "Promoted in 2022: .NET and Node.js APIs, microservices with Docker, Azure/GCP, a Design System with 40% less build time, and 80% test coverage. 8+ years combining development and design.",
            es: "Ascendido en 2022: APIs .NET y Node.js, microservicios con Docker, Azure/GCP, Design System con un 40% menos de tiempo y pruebas con 80% de cobertura. Más de 8 años sumando desarrollo y diseño.",
        },
        details: {
            ptBR: "Liderança técnica: code review, mentoria, CI/CD com GitHub Actions, observabilidade (Datadog/Dynatrace) e IA aplicada no fluxo de desenvolvimento. Do front ao back, do banco à nuvem — com o olhar de design que vem desde 2008.",
            en: "Technical leadership: code review, mentoring, CI/CD with GitHub Actions, observability (Datadog/Dynatrace), and AI applied to the development workflow. Front to back, database to cloud — with the design eye I've had since 2008.",
            es: "Liderazgo técnico: code review, mentoría, CI/CD con GitHub Actions, observabilidad (Datadog/Dynatrace) e IA aplicada al flujo de desarrollo. Del front al back, de la base de datos a la nube — con la mirada de diseño que tengo desde 2008.",
        },
        skills: [
            { id: "html", level: "master" },
            { id: "css", level: "master" },
            { id: "js", level: "master" },
            { id: "ts", level: "master" },
            { id: "react", level: "master" },
            { id: "next", level: "master" },
            { id: "angular", level: "master" },
            { id: "node", level: "master" },
            { id: "dotnet", level: "master" },
            { id: "java", level: "master" },
            { id: "php", level: "master" },
            { id: "sql", level: "master" },
            { id: "docker", level: "master" },
            { id: "cloud", level: "master" },
            { id: "git", level: "master" },
            { id: "testing", level: "master" },
            { id: "cicd", level: "master" },
            { id: "a11y", level: "master" },
            { id: "perf", level: "master" },
            { id: "figma", level: "master" },
            { id: "design", level: "master" },
            { id: "seo", level: "master" },
        ],
    },
    {
        id: "dashboard",
        kind: "project",
        period: "2025 – Hoje",
        title: { ptBR: "Zecki Dashboard", en: "Zecki Dashboard", es: "Zecki Dashboard" },
        org: { ptBR: "SaaS próprio", en: "Own SaaS", es: "SaaS propio" },
        summary: {
            ptBR: "Criado em 2025: meu SaaS de produtividade — tarefas, kanban, métricas em tempo real e gráficos.",
            en: "Created in 2025: my productivity SaaS — tasks, kanban, real-time metrics, and charts.",
            es: "Creado en 2025: mi SaaS de productividad — tareas, kanban, métricas en tiempo real y gráficos.",
        },
        details: {
            ptBR: "Meu laboratório de arquitetura: autenticação, multi-workspace, permissões e painéis analíticos. Cada reescrita foi um degrau de maturidade.",
            en: "My architecture lab: authentication, multi-workspace, permissions, and analytics panels. Each rewrite was a step in maturity.",
            es: "Mi laboratorio de arquitectura: autenticación, multi-espacio, permisos y paneles analíticos. Cada reescritura fue un peldaño de madurez.",
        },
        skills: [
            { id: "ts", level: "master" },
            { id: "react", level: "master" },
            { id: "next", level: "master" },
            { id: "angular", level: "master" },
            { id: "node", level: "master" },
            { id: "sql", level: "master" },
        ],
    },
    {
        id: "pos-graduacao",
        kind: "study",
        track: "pos",
        period: "2025 – 2026",
        title: { ptBR: "Pós-graduação em Desenvolvimento Full Stack", en: "Postgraduate in Full-Stack Development", es: "Posgrado en Desarrollo Full Stack" },
        org: { ptBR: "Descomplica", en: "Descomplica", es: "Descomplica" },
        summary: {
            ptBR: "Aprofundamento em arquitetura, microsserviços, cloud e boas práticas de engenharia.",
            en: "Deepening in architecture, microservices, cloud, and engineering best practices.",
            es: "Profundización en arquitectura, microservicios, nube y buenas prácticas de ingeniería.",
        },
        details: {
            ptBR: "Formalizar o que o dia a dia ensina: arquitetura de software, padrões de API e qualidade, fechando o ciclo entre estudo e experiência.",
            en: "Formalizing what day-to-day teaches: software architecture, API patterns, and quality, closing the loop between study and experience.",
            es: "Formalizar lo que el día a día enseña: arquitectura de software, patrones de API y calidad, cerrando el ciclo entre estudio y experiencia.",
        },
        skills: [
            { id: "ts", level: "master" },
            { id: "node", level: "master" },
            { id: "dotnet", level: "master" },
            { id: "docker", level: "master" },
            { id: "cloud", level: "master" },
            { id: "cicd", level: "master" },
        ],
    },
    {
        id: "teleprompt",
        kind: "project",
        period: "2026 – Hoje",
        title: { ptBR: "Teleprompt B2B", en: "Teleprompt B2B", es: "Teleprompt B2B" },
        org: { ptBR: "Produto multi-tenant", en: "Multi-tenant product", es: "Producto multi-inquilino" },
        summary: {
            ptBR: "Criado em 2026: plataforma de roteiros e teleprompter — três frontends consumindo uma API .NET em Clean Architecture.",
            en: "Created in 2026: script and teleprompter platform — three frontends consuming a .NET API in Clean Architecture.",
            es: "Creado en 2026: plataforma de guiones y teleprompter — tres frontends consumiendo una API .NET en Clean Architecture.",
        },
        details: {
            ptBR: "JWT com isolamento por workspace, SignalR para tempo real e deploy em Docker/GCP — onde .NET e cloud encontram o produto real.",
            en: "JWT with workspace isolation, SignalR for real-time, and deployment on Docker/GCP — where .NET and cloud meet a real product.",
            es: "JWT con aislamiento por espacio de trabajo, SignalR para tiempo real y deploy en Docker/GCP, donde .NET y la nube encuentran un producto real.",
        },
        skills: [
            { id: "dotnet", level: "master" },
            { id: "node", level: "master" },
            { id: "docker", level: "master" },
            { id: "cloud", level: "master" },
            { id: "ts", level: "master" },
            { id: "react", level: "master" },
            { id: "angular", level: "master" },
            { id: "next", level: "master" },
            { id: "testing", level: "master" },
            { id: "ux", level: "master" },
        ],
    },
    {
        id: "ia-agentes",
        kind: "study",
        track: "extra",
        period: "2026",
        title: { ptBR: "IA Autônoma & Spec Driven Dev", en: "Autonomous AI & Spec Driven Dev", es: "IA Autónoma y Spec Driven Dev" },
        org: { ptBR: "Certificações Anthropic", en: "Anthropic certifications", es: "Certificaciones Anthropic" },
        summary: {
            ptBR: "Certificações aplicadas em produção: geração e padronização de testes, análise de código e agentes — sempre com curadoria humana.",
            en: "Certifications applied in production: test generation and standardization, code analysis, and agents — always with human curation.",
            es: "Certificaciones aplicadas en producción: generación y estandarización de pruebas, análisis de código y agentes, siempre con curaduría humana.",
        },
        details: {
            ptBR: "Spec Driven Development, Model Context Protocol e agentes seguros aceleram o ciclo: mais cobertura, menos retrabalho e decisões com contexto.",
            en: "Spec Driven Development, Model Context Protocol, and safe agents speed up the loop: more coverage, less rework, and context-driven decisions.",
            es: "Spec Driven Development, Model Context Protocol y agentes seguros aceleran el ciclo: más cobertura, menos retrabajo y decisiones con contexto.",
        },
        skills: [
            { id: "ia", level: "master" },
            { id: "testing", level: "master" },
            { id: "cicd", level: "master" },
            { id: "git", level: "master" },
            { id: "ts", level: "master" },
            { id: "next", level: "master" },
            { id: "js", level: "master" },
        ],
    },
];