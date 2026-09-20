import {
    Accessibility,
    Blocks,
    Languages,
    PlugZap,
    Rocket,
    type LucideIcon,
} from "lucide-react";

export type Localized = { ptBR: string; en: string; es: string };

export type CodeCategory =
    | "acessibilidade"
    | "motion"
    | "integracao"
    | "performance"
    | "i18n";

export const categories: Array<{
    id: CodeCategory | "todos";
    label: Localized;
}> = [
    { id: "todos", label: { ptBR: "Todos", en: "All", es: "Todos" } },
    {
        id: "acessibilidade",
        label: { ptBR: "Acessibilidade", en: "Accessibility", es: "Accesibilidad" },
    },
    { id: "motion", label: { ptBR: "GSAP & Motion", en: "GSAP & Motion", es: "GSAP y Motion" } },
    {
        id: "integracao",
        label: { ptBR: "Integrações", en: "Integrations", es: "Integraciones" },
    },
    {
        id: "performance",
        label: { ptBR: "Performance", en: "Performance", es: "Rendimiento" },
    },
    { id: "i18n", label: { ptBR: "i18n & SSR", en: "i18n & SSR", es: "i18n y SSR" } },
];

export interface CodeHighlight {
    id: string;
    category: CodeCategory;
    icon: LucideIcon;
    title: Localized;
    intro: Localized;
    fileName: string;
    stack: string[];
    code: string;
}

// Trechos reais que estão no ar neste site (arquivo entre parênteses).
export const codeHighlights: CodeHighlight[] = [
    {
        id: "vlibras-a11y",
        category: "acessibilidade",
        icon: Accessibility,
        title: {
            ptBR: "Acessibilidade: VLibras carregado sob demanda",
            en: "Accessibility: VLibras loaded on demand",
            es: "Accesibilidad: VLibras cargado bajo demanda",
        },
        intro: {
            ptBR: "O widget de Libras (terceiros, ~200KB) só é baixado na primeira interação real do usuário. Assim a acessibilidade existe de verdade sem sacrificar o carregamento — e o TypeScript entende os atributos customizados do plugin.",
            en: "The Libras widget (third-party, ~200KB) is only downloaded on the user's first real interaction. Accessibility exists for real without sacrificing load time — and TypeScript understands the plugin's custom attributes.",
            es: "El widget de Libras (terceros, ~200KB) solo se descarga en la primera interacción real del usuario. La accesibilidad existe de verdad sin sacrificar la carga, y TypeScript entiende los atributos personalizados del plugin.",
        },
        fileName: "src/components/layout/VlibrasWidget.tsx",
        stack: ["a11y", "Libras", "Lazy loading", "TypeScript"],
        code: `declare global {
  interface Window {
    VLibras?: { Widget: new (src: string) => unknown };
  }
}

const start = () => {
  if (started) return;
  started = true;

  // Só baixa a biblioteca de Libras na primeira interação real
  scriptEl = document.createElement("script");
  scriptEl.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
  scriptEl.async = true;
  scriptEl.addEventListener("load", () => {
    if (window.VLibras?.Widget) {
      new window.VLibras.Widget("https://vlibras.gov.br/app");
    }
  });
  document.head.appendChild(scriptEl);
};

window.addEventListener("pointerdown", start);
window.addEventListener("scroll", start, { passive: true });
window.addEventListener("keydown", start);`,
    },
    {
        id: "gsap-reveals",
        category: "motion",
        icon: Blocks,
        title: {
            ptBR: "GSAP: reveals à prova de falha",
            en: "GSAP: fail-proof reveals",
            es: "GSAP: reveals a prueba de fallos",
        },
        intro: {
            ptBR: "Os cards de cada seção entram suavemente via ScrollTrigger. A chave é o immediateRender: false — o estado oculto só é aplicado quando o gatilho de verdade dispara, então nenhum conteúdo fica invisível se a medição falhar.",
            en: "Cards in each section slide in via ScrollTrigger. The key is immediateRender: false — the hidden state is only applied when the trigger actually fires, so no content stays invisible if measurement fails.",
            es: "Las tarjetas de cada sección entran suavemente vía ScrollTrigger. La clave es immediateRender: false: el estado oculto solo se aplica cuando el disparador se activa de verdad, así ningún contenido queda invisible si la medición falla.",
        },
        fileName: "src/components/effects/HomeFX.tsx",
        stack: ["GSAP", "ScrollTrigger", "Core Web Vitals"],
        code: `gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
      // Só esconde quando o gatilho dispara — nunca trava conteúdo invisível
      immediateRender: false,
      scrollTrigger: {
        trigger: el,
        start: "top 92%",
        toggleActions: "play none none none",
      },
    }
  );
});

// Rede de segurança: se qualquer trigger falhar, nada fica invisível
gsap.delayedCall(2.5, () => {
  gsap.set([".reveal", ".product-card", ".service-card"], {
    opacity: 1, y: 0, scale: 1,
    clearProps: "opacity,transform,visibility",
  });
  ScrollTrigger.refresh();
});`,
    },
    {
        id: "upload-integration",
        category: "integracao",
        icon: PlugZap,
        title: {
            ptBR: "Integração: upload autenticado (Firebase + Cloudinary)",
            en: "Integration: authenticated upload (Firebase + Cloudinary)",
            es: "Integración: subida autenticada (Firebase + Cloudinary)",
        },
        intro: {
            ptBR: "A rota de upload valida o token do Firebase no servidor antes de tocar em qualquer arquivo, sanitiza a pasta e envia o buffer em stream para o Cloudinary — sem ocupar memória e sem expor o secret.",
            en: "The upload route validates the Firebase token server-side before touching any file, sanitizes the folder, and streams the buffer to Cloudinary — no memory spikes, no secret leaks.",
            es: "La ruta de subida valida el token de Firebase en el servidor antes de tocar cualquier archivo, sanea la carpeta y envía el buffer en stream a Cloudinary, sin picos de memoria ni fugas del secreto.",
        },
        fileName: "src/app/api/upload/route.ts",
        stack: ["Next.js Route Handlers", "Firebase Admin", "Cloudinary", "Segurança"],
        code: `cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // só no servidor
});

export async function POST(request: Request) {
  // 1. Autentica antes de tocar em qualquer arquivo (Firebase Admin)
  let uid: string;
  try {
    uid = await getAuthenticatedUid(request);
  } catch {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const folder = (formData.get("folder") as string) || "clients_portfolio";

  // 2. Sanitiza a pasta: nunca sai do diretório esperado
  const safeFolder = folder
    .replace(/[^a-zA-Z0-9_\\-\\/]/g, "")
    .replace(/\\.\\./g, "")
    .replace(/^\\/+/, "");

  if (!file) {
    return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
  }

  // 3. Buffer vai em stream direto pro Cloudinary (memória estável)
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const response = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: safeFolder, public_id: \`\${uid}_\${Date.now()}\` },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    uploadStream.end(buffer);
  });

  return NextResponse.json(response);
}`,
    },
    {
        id: "lenis-gsap",
        category: "motion",
        icon: Rocket,
        title: {
            ptBR: "Smooth scroll no mesmo loop do GSAP",
            en: "Smooth scroll wired into GSAP's loop",
            es: "Scroll suave en el mismo loop de GSAP",
        },
        intro: {
            ptBR: "O Lenis cuida da rolagem suave e é plugado no ticker do GSAP. Resultado: ScrollTriggers sincronizadas, scroll com respeito a prefers-reduced-motion e tudo num único loop de animação.",
            en: "Lenis handles the smooth rolling and is plugged into GSAP's ticker. Result: perfectly synced ScrollTriggers, reduced-motion support, and a single animation loop.",
            es: "Lenis maneja el scroll suave y se conecta al ticker de GSAP. Resultado: ScrollTriggers sincronizadas, soporte de prefers-reduced-motion y un único loop de animación.",
        },
        fileName: "src/components/layout/LenisSmoothScroll.tsx",
        stack: ["Lenis", "GSAP", "ScrollTrigger", "a11y"],
        code: `const lenis = new Lenis({
  lerp: 0.09,              // suavidade da rolagem
  smoothWheel: true,
  wheelMultiplier: 0.9,
  anchors: { offset: -72 },
  respectReducedMotion: true, // a11y: sensível à rolagem convencional
});

lenis.on("scroll", ScrollTrigger.update);

// Um único loop: o ticker do GSAP roda o Lenis
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);`,
    },
    {
        id: "ssr-i18n",
        category: "i18n",
        icon: Languages,
        title: {
            ptBR: "i18n no servidor com cookies",
            en: "Server-side i18n with cookies",
            es: "i18n en el servidor con cookies",
        },
        intro: {
            ptBR: "Todo o texto deste site é traduzido no SSR. O Next lê o cookie de idioma, decide qual texto renderizar e envia HTML pronto — sem flash do idioma errado e com SEO recebendo o conteúdo final.",
            en: "All text on this site is translated at SSR. Next reads the language cookie, decides which text to render, and sends ready HTML — no wrong-language flash, and SEO gets the final content.",
            es: "Todo el texto de este sitio se traduce en el SSR. Next lee la cookie de idioma, decide qué texto renderizar y envía HTML listo, sin parpadeo del idioma incorrecto y con SEO recibiendo el contenido final.",
        },
        fileName: "src/lib/locale.ts",
        stack: ["React Server Components", "SSR", "Cookies", "SEO"],
        code: `import { cookies } from "next/headers";

export type Locale = "ptBR" | "en" | "es";
const SUPPORTED: Locale[] = ["ptBR", "en", "es"];

// 1. Lê o idioma escolhido no cookie (server-side)
export async function getLang(): Promise<Locale> {
  const chosen = (await cookies()).get("lang")?.value as Locale | undefined;
  return chosen && SUPPORTED.includes(chosen) ? chosen : "ptBR";
}

// 2. pick() devolve o texto certo na hora de renderizar
export function pick<T>(lang: Locale, obj: Record<string, T>): T {
  return obj[lang] ?? obj["ptBR"];
}`,
    },
    {
        id: "lazy-chunks",
        category: "performance",
        icon: Rocket,
        title: {
            ptBR: "Performance: chunk só quando a seção se aproxima",
            en: "Performance: chunk only when the section nears",
            es: "Rendimiento: chunk solo cuando la sección se acerca",
        },
        intro: {
            ptBR: "O TechParticles pesado (react-icons + GSAP) só é baixado quando a seção #habilidades entra numa margem de 600px da viewport. Menos JS no caminho crítico = melhor LCP e TBT.",
            en: "The heavy TechParticles chunk (react-icons + GSAP) only downloads when the #habilidades section enters a 600px viewport margin. Less JS on the critical path = better LCP and TBT.",
            es: "El chunk pesado de TechParticles (react-icons + GSAP) solo se descarga cuando la sección #habilidades entra en un margen de 600px del viewport. Menos JS en la ruta crítica = mejor LCP y TBT.",
        },
        fileName: "src/components/layout/LazyTechParticles.tsx",
        stack: ["Dynamic Import", "IntersectionObserver", "Core Web Vitals"],
        code: `const TechParticles = dynamic(
  () => import("@/components/effects/TechParticles"),
  { ssr: false, loading: () => null }
);

export function LazyTechParticles() {
  const [near, setNear] = useState(false);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = holderRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true); // chunk só baixa quando a seção se aproxima
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={holderRef} className="relative h-full w-full">
      {near ? <TechParticles /> : null}
    </div>
  );
}`,
    },
];