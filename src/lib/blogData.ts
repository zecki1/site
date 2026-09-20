import {
    Code2,
    Component,
    GraduationCap,
    Wrench,
    Zap,
    Rocket,
    Bot,
    Palette,
    Server,
    ShieldCheck,
    TerminalSquare,
} from "lucide-react";

export type Localized = { ptBR: string; en: string; es: string };

export type TimelineCategory = "educacao" | "carreira" | "ia" | "design";

export interface TimelineEntry {
    id: string;
    category: TimelineCategory;
    icon: React.ComponentType<{ className?: string }>;
    period: string;
    title: Localized;
    description: Localized;
    tags: string[];
}

const categoryLabel: Record<TimelineCategory, Localized> = {
    educacao: { ptBR: "Educação", en: "Education", es: "Educación" },
    carreira: { ptBR: "Carreira", en: "Career", es: "Carrera" },
    ia: { ptBR: "IA Aplicada", en: "Applied AI", es: "IA Aplicada" },
    design: { ptBR: "Design", en: "Design", es: "Diseño" },
};

export const categoryInfo: Record<TimelineCategory, { label: Localized; accent: string }> = {
    educacao: { label: categoryLabel.educacao, accent: "text-sky-400 bg-sky-400/10 border-sky-400/30" },
    carreira: { label: categoryLabel.carreira, accent: "text-[#00e1ff] bg-[#00e1ff]/10 border-[#00e1ff]/30" },
    ia: { label: categoryLabel.ia, accent: "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/30" },
    design: { label: categoryLabel.design, accent: "text-purple-400 bg-purple-400/10 border-purple-400/30" },
};

export const timeline: TimelineEntry[] = [
    {
        id: "microcamp",
        category: "educacao",
        icon: GraduationCap,
        period: "2012 – 2015",
        title: { ptBR: "Técnico em Web Design", en: "Web Design Technician", es: "Técnico en Diseño Web" },
        description: {
            ptBR: "O ponto de partida: HTML, CSS e as primeiras páginas feitas à mão. Aprendi que web é código + design funcionando juntos.",
            en: "The starting point: HTML, CSS, and the first hand-coded pages. I learned that the web is code + design working together.",
            es: "El punto de partida: HTML, CSS y las primeras páginas hechas a mano. Aprendí que la web es código + diseño trabajando juntos.",
        },
        tags: ["HTML", "CSS", "Dreamweaver"],
    },
    {
        id: "artes-plasticas",
        category: "design",
        icon: Palette,
        period: "2013 – 2019",
        title: { ptBR: "Artes plásticas e olhar criativo", en: "Fine Arts and a creative eye", es: "Artes plásticas y mirada creativa" },
        description: {
            ptBR: "Seis anos de composição visual e harmonia estética — a base de todo o meu UI/UX e das decisões de design até hoje.",
            en: "Six years of visual composition and aesthetic harmony — the foundation of all my UI/UX and design decisions to this day.",
            es: "Seis años de composición visual y armonía estética, la base de todo mi UI/UX y de las decisiones de diseño hasta hoy.",
        },
        tags: ["Composição", "Cor", "Proporção"],
    },
    {
        id: "gall",
        category: "carreira",
        icon: Wrench,
        period: "2017 – 2020",
        title: { ptBR: "Full Stack na GALL / Cia Sex", en: "Full Stack at GALL / Cia Sex", es: "Full Stack en GALL / Cia Sex" },
        description: {
            ptBR: "Laravel, PHP, Python e Node.js com bancos SQL, além de SEO técnico e CRO em landing pages de alta conversão.",
            en: "Laravel, PHP, Python, and Node.js with SQL databases, plus technical SEO and CRO on high-converting landing pages.",
            es: "Laravel, PHP, Python y Node.js con bases de datos SQL, además de SEO técnico y CRO en landing pages de alta conversión.",
        },
        tags: ["Laravel", "PHP", "Node.js", "SEO", "CRO"],
    },
    {
        id: "senai-inicio",
        category: "carreira",
        icon: Rocket,
        period: "2019 – 2023",
        title: { ptBR: "Desenvolvedor Web no SENAI", en: "Web Developer at SENAI", es: "Desarrollador Web en SENAI" },
        description: {
            ptBR: "React, Next.js e Angular em projetos de educação digital, com acessibilidade e performance como prioridade.",
            en: "React, Next.js, and Angular on digital education projects, with accessibility and performance as priority.",
            es: "React, Next.js y Angular en proyectos de educación digital, con la accesibilidad y el rendimiento como prioridad.",
        },
        tags: ["React", "Next.js", "Angular", "TypeScript"],
    },
    {
        id: "engenharia",
        category: "educacao",
        icon: Code2,
        period: "2017 – 2022",
        title: { ptBR: "Bacharel em Engenharia de Computação", en: "BSc in Computer Engineering", es: "Licenciatura en Ingeniería Informática" },
        description: {
            ptBR: "UNIVESP: fundamentos de sistemas, redes, banco de dados e engenharia de software que sustentam o trabalho como full stack.",
            en: "UNIVESP: systems foundations, networks, databases, and software engineering that support the full-stack work.",
            es: "UNIVESP: fundamentos de sistemas, redes, bases de datos e ingeniería de software que sustentan el trabajo full stack.",
        },
        tags: ["Algoritmos", "Bancos de Dados", "Redes"],
    },
    {
        id: "design-grafico",
        category: "design",
        icon: Palette,
        period: "2019 – 2021",
        title: { ptBR: "Graduação em Design Gráfico", en: "Degree in Graphic Design", es: "Grado en Diseño Gráfico" },
        description: {
            ptBR: "UNIP: tipografia, identidade visual, diagramação e os princípios que hoje viram Design Systems no Figma.",
            en: "UNIP: typography, visual identity, layout, and the principles that today become Design Systems in Figma.",
            es: "UNIP: tipografía, identidad visual, diagramación y los principios que hoy se convierten en Design Systems en Figma.",
        },
        tags: ["Figma", "Identidade Visual", "Tipografia"],
    },
    {
        id: "fullstack-senai",
        category: "carreira",
        icon: Component,
        period: "2023 – Presente",
        title: { ptBR: "Desenvolvedor Fullstack Tech Lead", en: "Full-Stack Developer & Tech Lead", es: "Desarrollador Fullstack Tech Lead" },
        description: {
            ptBR: "Liderança técnica no SENAI: APIs .NET e Node.js, microsserviços com Docker, Azure/GCP, Design System com 40% menos tempo e testes com 80% de cobertura.",
            en: "Technical leadership at SENAI: .NET and Node.js APIs, microservices with Docker, Azure/GCP, a Design System with 40% less build time, and 80% test coverage.",
            es: "Liderazgo técnico en SENAI: APIs .NET y Node.js, microservicios con Docker, Azure/GCP, Design System con un 40% menos de tiempo y pruebas con 80% de cobertura.",
        },
        tags: [".NET", "Spring Boot", "Docker", "Azure", "GCP", "GitHub Actions"],
    },
    {
        id: "pos-graduacao",
        category: "educacao",
        icon: GraduationCap,
        period: "2025 – 2026",
        title: { ptBR: "Pós-graduação em Desenvolvimento Full Stack", en: "Postgraduate in Full-Stack Development", es: "Posgrado en Desarrollo Full Stack" },
        description: {
            ptBR: "Descomplica: aprofundamento em arquitetura, microsserviços, cloud e boas práticas de engenharia.",
            en: "Descomplica: deepening in architecture, microservices, cloud, and engineering best practices.",
            es: "Descomplica: profundización en arquitectura, microservicios, nube y buenas prácticas de ingeniería.",
        },
        tags: ["Arquitetura", "Cloud", "Microsserviços"],
    },
    {
        id: "ia-agentes",
        category: "ia",
        icon: Bot,
        period: "2026",
        title: { ptBR: "IA Autônoma e Spec Driven Development", en: "Autonomous AI & Spec Driven Development", es: "IA Autónoma y Spec Driven Development" },
        description: {
            ptBR: "Certificações Anthropic aplicadas em produção: geração e padronização de testes, análise de código e agentes — sempre com curadoria humana.",
            en: "Anthropic certifications applied in production: test generation and standardization, code analysis, and agents — always with human curation.",
            es: "Certificaciones de Anthropic aplicadas en producción: generación y estandarización de pruebas, análisis de código y agentes, siempre con curaduría humana.",
        },
        tags: ["Claude", "MCP", "Agent Skills", "Jest", "Cypress"],
    },
];

export interface BlogPost {
    id: string;
    badge: string;
    icon: React.ComponentType<{ className?: string }>;
    title: Localized;
    intro: Localized;
    fileName: string;
    code: string;
    tags: string[];
}

export const blogPosts: BlogPost[] = [
    {
        id: "rsc-i18n",
        badge: "Next.js",
        icon: Server,
        title: {
            ptBR: "SSR e i18n sem jquery no Next.js",
            en: "SSR and i18n the Next.js way",
            es: "SSR e i18n a la manera de Next.js",
        },
        intro: {
            ptBR: "Todo o texto deste site é traduzido no servidor. O Next lê o cookie de idioma, decide qual texto renderizar e envia HTML pronto — nada de 'flash' de idioma errado, e o SEO recebe o conteúdo final.",
            en: "All the text on this site is translated on the server. Next reads the language cookie, decides which text to render, and sends ready HTML — no wrong-language flash, and SEO gets the final content.",
            es: "Todo el texto de este sitio se traduce en el servidor. Next lee la cookie de idioma, decide qué texto renderizar y envía HTML listo — sin parpadeo del idioma incorrecto y con SEO recibiendo el contenido final.",
        },
        fileName: "src/lib/locale.ts",
        code: `import { cookies } from "next/headers";

export type Locale = "ptBR" | "en" | "es";

export async function getLang(): Promise<Locale> {
  const chosen = (await cookies()).get("lang")?.value as Locale | undefined;
  return chosen && ["ptBR", "en", "es"].includes(chosen)
    ? chosen
    : "ptBR";
}

// pick() devolve o texto certo na hora de renderizar
export function pick<T>(lang: Locale, obj: Record<string, T>): T {
  return obj[lang] ?? obj["ptBR"];
}`,
        tags: ["React Server Components", "SSR", "Cookies", "SEO"],
    },
    {
        id: "lenis-gsap",
        badge: "UX",
        icon: Zap,
        title: {
            ptBR: "Smooth scroll conectado ao GSAP",
            en: "Smooth scroll wired to GSAP",
            es: "Scroll suave conectado a GSAP",
        },
        intro: {
            ptBR: "O Lenis cuida da rolagem suave e o GSAP é o motor das animações. Ao plugar o Lenis no ticker do GSAP, todas as ScrollTriggers ficam perfeitamente sincronizadas com a rolagem.",
            en: "Lenis handles the smooth scrolling and GSAP is the animation engine. By plugging Lenis into GSAP's ticker, every ScrollTrigger stays perfectly in sync with the scroll.",
            es: "Lenis maneja el scroll suave y GSAP es el motor de animaciones. Al conectar Lenis al ticker de GSAP, todos los ScrollTrigger quedan perfectamente sincronizados con el scroll.",
        },
        fileName: "src/components/layout/LenisSmoothScroll.tsx",
        code: `const lenis = new Lenis({
  lerp: 0.09,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  anchors: { offset: -72 },
  respectReducedMotion: true, // acessibilidade em primeiro lugar
});

lenis.on("scroll", ScrollTrigger.update);

// Um único loop: o ticker do GSAP roda o Lenis.
gsap.ticker.add((time) => lenis.raf(time * 1000));

return () => {
  gsap.ticker.remove(ticker);
  lenis.destroy();
};`,
        tags: ["Lenis", "GSAP", "ScrollTrigger", "a11y"],
    },
    {
        id: "lazy-three",
        badge: "Performance",
        icon: Rocket,
        title: {
            ptBR: "Three.js carregado só sob demanda",
            en: "Three.js loaded only on demand",
            es: "Three.js cargado solo bajo demanda",
        },
        intro: {
            ptBR: "Para não pesar o carregamento, o WebGL da home só monta depois da primeira interação do usuário. O bundle de Three.js (grande) entra via dynamic import — melhorando LCP, TBT e o PageSpeed.",
            en: "To avoid a heavy load, the home WebGL scene only mounts after the first user interaction. The big Three.js bundle loads via dynamic import — improving LCP, TBT, and PageSpeed.",
            es: "Para evitar una carga pesada, el WebGL del inicio solo se monta tras la primera interacción. El gran bundle de Three.js entra mediante import dinámico, mejorando LCP, TBT y PageSpeed.",
        },
        fileName: "src/components/effects/HomeFX.tsx",
        code: `const HeroParticles = dynamic(
  () => import("@/components/three/HeroParticles"),
  { ssr: false, loading: () => null }
);

function HomeFX() {
  const [fxOn, setFxOn] = useState(false);

  useEffect(() => {
    const enable = () => setFxOn(true);
    ["pointermove", "scroll", "keydown"].forEach((ev) =>
      window.addEventListener(ev, enable, { passive: true })
    );
  }, []);

  return <>{fxOn && <HeroParticles />}</>;
}`,
        tags: ["Dynamic Import", "WebGL", "Core Web Vitals"],
    },
    {
        id: "api-auth",
        badge: "Backend",
        icon: ShieldCheck,
        title: {
            ptBR: "API autenticada com upload em stream",
            en: "Authenticated API with stream upload",
            es: "API autenticada con subida en stream",
        },
        intro: {
            ptBR: "As rotas de upload validam o token do Firebase no servidor antes de tocar em qualquer arquivo. O buffer vai direto para o Cloudinary em stream — sem ocupar memória nem expor o secret.",
            en: "The upload routes validate the Firebase token on the server before touching any file. The buffer streams straight to Cloudinary — no memory spikes, no secret leaks.",
            es: "Las rutas de subida validan el token de Firebase en el servidor antes de tocar cualquier archivo. El buffer va directo a Cloudinary en stream, sin picos de memoria ni fuga de secretos.",
        },
        fileName: "src/app/api/upload/route.ts",
        code: `const token = authHeader.startsWith("Bearer ")
  ? authHeader.slice(7) : "";

// 401 se o token não for de um usuário válido
const uid = await verifyFirebaseToken(token);

// Sanitiza a pasta para nunca sair do diretório esperado
const safeFolder = folder
  .replace(/[^a-zA-Z0-9_\\-\\/]/g, "")
  .replace(/\\.\\./g, "")
  .replace(/^\\/+/, "");

uploadStream.end(buffer); // stream direto pro Cloudinary
public_id: \`\${uid}_\${Date.now()}\`,`,
        tags: ["JWT/Firebase Auth", "Cloudinary", "Segurança", "Stream"],
    },
    {
        id: "theme-tokens",
        badge: "CSS/Tailwind",
        icon: Palette,
        title: {
            ptBR: "Tokens de tema com Tailwind v4",
            en: "Theme tokens with Tailwind v4",
            es: "Tokens de tema con Tailwind v4",
        },
        intro: {
            ptBR: "As cores são tokens oklch definidos em @theme. O tema escuro troca --primary e --background sem tocar em um único componente — e o contraste é calculado no espaço perceptual.",
            en: "Colors are oklch tokens defined in @theme. Dark mode swaps --primary and --background without touching a single component — and contrast is computed in perceptual space.",
            es: "Los colores son tokens oklch definidos en @theme. El modo oscuro cambia --primary y --background sin tocar un solo componente, y el contraste se calcula en espacio perceptual.",
        },
        fileName: "src/app/globals.css",
        code: `@theme inline {
  --color-primary: var(--primary);   /* utilitários text-primary */
  --color-accent: var(--accent);
}

:root {
  --color-primary: oklch(83.476% 0.14531 211.713); /* ciano da marca */
  --primary: oklch(0.205 0 0);
  --background: oklch(1 0 0);
}

.dark {
  --primary: oklch(0.985 0 0);       /* texto claro no escuro */
  --background: oklch(0.145 0 0);
}`,
        tags: ["Design Tokens", "oklch", "Dark Mode"],
    },
    {
        id: "gsap-reveal",
        badge: "Motion",
        icon: TerminalSquare,
        title: {
            ptBR: "Reveals sob ScrollTrigger",
            en: "Reveals under ScrollTrigger",
            es: "Reveals con ScrollTrigger",
        },
        intro: {
            ptBR: "Cada elemento com .reveal entra suavemente quando alcança 85% da viewport. O ScrollTrigger calcula posições e o GSAP anima transform — leve e sem bloqueio de main thread.",
            en: "Every .reveal element slides in when it reaches 85% of the viewport. ScrollTrigger measures positions and GSAP animates transforms — smooth and main-thread friendly.",
            es: "Cada elemento .reveal entra suavemente al alcanzar el 85% del viewport. ScrollTrigger mide posiciones y GSAP anima transforms: fluido y sin bloquear el hilo principal.",
        },
        fileName: "HomeFX — scroll effects",
        code: `gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
});`,
        tags: ["GSAP", "ScrollTrigger", "Framer Motion"],
    },
];