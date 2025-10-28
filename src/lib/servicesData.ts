import { Smartphone, Search, Accessibility, UserCheck, GanttChartSquare, Rocket, Camera, Video, Code, BarChart3, Users, Palette } from 'lucide-react';

export const servicesData = [
    {
        id: "mobile-first",
        icon: Smartphone,
        title: { ptBR: "Desenvolvimento Mobile-First", en: "Mobile-First Development", es: "Desarrollo Mobile-First" },
        description: { ptBR: "Construção de sites e aplicações com prioridade para dispositivos móveis, utilizando frameworks como React, Next.js ou Tailwind CSS para criar interfaces responsivas que se adaptam dinamicamente a diferentes tamanhos de tela, garantindo carregamento rápido e interação fluida.", en: "Building sites and applications with a mobile-first priority, using frameworks like React, Next.js, or Tailwind CSS to create responsive interfaces that dynamically adapt to different screen sizes, ensuring fast loading and smooth interaction.", es: "Construcción de sitios y aplicaciones con prioridad en dispositivos móviles, utilizando frameworks como React, Next.js o Tailwind CSS para crear interfaces responsivas que se adaptan dinámicamente a diferentes tamaños de pantalla, garantizando una carga rápida e interacción fluida." },
        details: [
            { title: "Boas práticas", content: "Implementação de media queries CSS, otimização de imagens com formatos WebP e SVG, lazy loading para recursos não críticos, e testes em emuladores como Chrome DevTools para simular dispositivos reais." },
            { title: "Benefícios", content: "Experiência de usuário otimizada em smartphones (onde mais de 50% do tráfego global ocorre), redução de taxas de rejeição em até 30% e melhoria no ranqueamento do Google Mobile-Friendly Test." },
            { title: "Exemplos práticos", content: "Criação de dashboards responsivos, como o Dashboard Zecki, que ajusta layouts automaticamente para telas pequenas, e o Calendário Alpha, otimizado para visualização móvel de agendas." }
        ]
    },
    {
        id: "seo",
        icon: Search,
        title: { ptBR: "Otimização de SEO", en: "SEO Optimization", es: "Optimización SEO" },
        description: { ptBR: "Estratégias técnicas e de conteúdo para elevar a visibilidade orgânica no Google, incluindo análise de palavras-chave, estruturação de metadados e otimização on-page/off-page, com ferramentas como Google Search Console e Ahrefs para monitoramento contínuo.", en: "Technical and content strategies to boost organic visibility on Google, including keyword analysis, metadata structuring, and on-page/off-page optimization, with tools like Google Search Console and Ahrefs for continuous monitoring.", es: "Estrategias técnicas y de contenido para elevar la visibilidad orgánica en Google, incluyendo análisis de palabras clave, estructuración de metadatos y optimización on-page/off-page, con herramientas como Google Search Console y Ahrefs para monitoreo continuo." },
        details: [
            { title: "Boas práticas", content: "Uso de tags semânticas HTML5 (header, section, article), criação de sitemaps XML e robots.txt, compressão de recursos para velocidades abaixo de 3 segundos, e integração de schema markup para rich snippets." },
            { title: "Benefícios", content: "Aumento de tráfego orgânico em até 200%, melhor posicionamento em SERPs (Search Engine Results Pages) e ROI (Return on Investment) superior a campanhas pagas, com foco em conversões qualificadas." },
            { title: "Exemplos práticos", content: "Otimização de sites de portfólio, como o Cleriston Ribeiro, que alcançou ranqueamento para termos como 'ilustrador brasileiro' através de metadados personalizados e conteúdo otimizado." }
        ]
    },
    {
        id: "accessibility",
        icon: Accessibility,
        title: { ptBR: "Acessibilidade Digital", en: "Digital Accessibility", es: "Accesibilidad Digital" },
        description: { ptBR: "Desenvolvimento de interfaces inclusivas, alinhadas às diretrizes WCAG 2.1, com foco em usuários com deficiências visuais, auditivas ou motoras, utilizando testes automatizados e manuais para conformidade AA ou AAA.", en: "Developing inclusive interfaces aligned with WCAG 2.1 guidelines, focusing on users with visual, auditory, or motor impairments, using automated and manual testing for AA or AAA compliance.", es: "Desarrollo de interfaces inclusivas, alineadas con las directrices WCAG 2.1, con foco en usuarios con discapacidades visuales, auditivas o motoras, utilizando pruebas automatizadas y manuales para conformidad AA o AAA." },
        details: [
            { title: "Boas práticas", content: "Aplicação de ARIA (Accessible Rich Internet Applications) roles e landmarks, garantia de contraste mínimo de 4.5:1 para textos, suporte a navegação por teclado e leitores de tela como NVDA ou VoiceOver, e alt texts descritivos para elementos visuais." },
            { title: "Benefícios", content: "Expansão de alcance para até 15% da população global com deficiências, conformidade com leis como a LGPD e ADA, e bônus em SEO devido à preferência do Google por sites acessíveis." },
            { title: "Exemplos práticos", content: "Implementação em ferramentas como o Dashboard Zecki, com navegação por teclado em modais, e o Calendário Alpha, com alt texts em elementos interativos para leitores de tela." }
        ]
    },
    // ... Adicione os outros serviços aqui no mesmo formato ...
    // Vou adicionar os restantes para você:
    {
        id: "ux-ui",
        icon: UserCheck,
        title: { ptBR: "Usabilidade e UX", en: "Usability & UX", es: "Usabilidad y UX" },
        description: { ptBR: "Criação de interfaces intuitivas através de prototipagem e testes iterativos, com foco em heurísticas de Nielsen, para otimizar fluxos de navegação e maximizar engajamento.", en: "Creating intuitive interfaces through prototyping and iterative testing, focusing on Nielsen's heuristics to optimize navigation flows and maximize user engagement.", es: "Creación de interfaces intuitivas a través de prototipado y pruebas iterativas, con un enfoque en las heurísticas de Nielsen, para optimizar los flujos de navegación y maximizar el engagement." },
        details: [
            { title: "Boas práticas", content: "Wireframing e prototipagem em Figma ou Adobe XD, realização de A/B testing com Google Optimize, mapeamento de jornadas do usuário e aplicação de princípios de Gestalt." },
            { title: "Benefícios", content: "Redução de erros de usuário em até 50%, aumento de taxas de conversão em 20-30% e fidelização de clientes através de experiências eficientes." },
            { title: "Exemplos práticos", content: "Design de fluxos no Dashboard Zecki, com CTAs claros, e interfaces personalizadas para sites como o Cleriston Ribeiro." }
        ]
    },
    {
        id: "task-managers",
        icon: GanttChartSquare,
        title: { ptBR: "Gerenciadores de Tarefas", en: "Custom Task Managers", es: "Gestores de Tareas a Medida" },
        description: { ptBR: "Desenvolvimento de aplicações personalizadas para gerenciamento de projetos, integrando regras de negócio com Firebase ou MongoDB, e interfaces modulares para rastreamento em tempo real.", en: "Developing custom applications for project management, integrating specific business rules with databases like Firebase or MongoDB, and modular interfaces for real-time tracking.", es: "Desarrollo de aplicaciones personalizadas para la gestión de proyectos, integrando reglas de negocio específicas con bases de datos como Firebase o MongoDB, e interfaces modulares para el seguimiento en tiempo real." },
        details: [
            { title: "Boas práticas", content: "Uso de React Hooks para estado, integração com APIs RESTful/GraphQL, validação com Zod e autenticação segura via JWT/OAuth." },
            { title: "Benefícios", content: "Aumento de produtividade em equipes em até 40%, redução de gargalos e relatórios automatizados para decisões baseadas em dados." },
            { title: "Exemplos práticos", content: "Criação do Dashboard Zecki, com módulos de tarefas e permissões, e o Calendário Alpha, para gerenciamento de agendas." }
        ]
    },
    {
        id: "performance",
        icon: Rocket,
        title: { ptBR: "Performance e Escalabilidade", en: "Performance & Scalability", es: "Rendimiento y Escalabilidad" },
        description: { ptBR: "Otimização de código e infraestrutura para aplicações de alto desempenho, utilizando code splitting, caching e hospedagem em plataformas serverless como Vercel ou AWS.", en: "Optimizing code and infrastructure for high-performance applications, using code splitting, caching, and hosting on serverless platforms like Vercel or AWS.", es: "Optimización de código e infraestructura para aplicaciones de alto rendimiento, utilizando code splitting, caching y alojamiento en plataformas serverless como Vercel o AWS." },
        details: [
            { title: "Boas práticas", content: "Minificação e bundling com Vite, implementação de CDNs, monitoramento com Lighthouse e escalabilidade horizontal com Docker." },
            { title: "Benefícios", content: "Tempos de carregamento abaixo de 2 segundos, suporte a milhares de usuários simultâneos e redução de custos operacionais em até 30%." },
            { title: "Exemplos práticos", content: "Otimização no Dashboard Zecki, com lazy loading, e no Calendário Alpha, para renderização rápida de dados dinâmicos." }
        ]
    },
    {
        id: "image-editing",
        icon: Camera,
        title: { ptBR: "Edição e Tratamento de Imagens", en: "Image Editing & Retouching", es: "Edición y Tratamiento de Imágenes" },
        description: { ptBR: "Serviços de manipulação digital, incluindo restauração, correção de cores e aprimoramento, utilizando Adobe Photoshop para resultados profissionais em alta resolução.", en: "Digital manipulation services, including restoration, color correction, and enhancement, using Adobe Photoshop for professional high-resolution results.", es: "Servicios de manipulación digital, incluyendo restauración, corrección de color y mejora, utilizando Adobe Photoshop para resultados profesionales en alta resolución." },
        details: [
            { title: "Boas práticas", content: "Aplicação de camadas não destrutivas, calibração de histogramas, remoção de ruídos e exportação otimizada para web ou impressão." },
            { title: "Benefícios", content: "Melhoria na qualidade visual de ativos, preservação de memórias e integração perfeita em projetos digitais para maior impacto estético." },
            { title: "Exemplos práticos", content: "Restauração de imagens para portfólios como o Cleriston Ribeiro e tratamento de ilustrações vetoriais." }
        ]
    },
    {
        id: "video-editing",
        icon: Video,
        title: { ptBR: "Gravação e Edição de Vídeos", en: "Video Recording & Editing", es: "Grabación y Edición de Vídeos" },
        description: { ptBR: "Produção e pós-produção de vídeos, desde captura até edição em Adobe Premiere, incluindo cortes, transições, correção de cores e efeitos sonoros.", en: "Production and post-production of videos, from capture to editing in Adobe Premiere, including cuts, transitions, color correction, and sound effects.", es: "Producción y postproducción de videos, desde la captura hasta la edición en Adobe Premiere, incluyendo cortes, transiciones, corrección de color y efectos de sonido." },
        details: [
            { title: "Boas práticas", content: "Uso de storyboards, estabilização de footage, exportação em H.264/HEVC e otimização de bitrate para streaming." },
            { title: "Benefícios", content: "Conteúdos envolventes que aumentam o tempo de retenção, melhoria na narrativa visual e versatilidade para redes sociais." },
            { title: "Exemplos práticos", content: "Edição de vídeos promocionais para projetos digitais, alinhados com a identidade visual da marca." }
        ]
    },
    {
        id: "code-analysis",
        icon: Code,
        title: { ptBR: "Análise e Refatoração de Código", en: "Code Analysis & Refactoring", es: "Análisis y Refactorización de Código" },
        description: { ptBR: "Criação e manutenção de código limpo em JavaScript/TypeScript, com refatoração para modularidade, análise de desempenho e code reviews, seguindo padrões como SOLID e DRY.", en: "Creating and maintaining clean code in JavaScript/TypeScript, with refactoring for modularity, performance analysis, and code reviews, following standards like SOLID and DRY.", es: "Creación y mantenimiento de código limpio en JavaScript/TypeScript, con refactorización para modularidad, análisis de rendimiento y revisiones de código, siguiendo estándares como SOLID y DRY." },
        details: [
            { title: "Boas práticas", content: "Uso de ESLint, testes unitários com Jest, versionamento com Git e integração contínua (CI/CD) via GitHub Actions." },
            { title: "Benefícios", content: "Código mais manutenível, redução de bugs em 40% e escalabilidade para equipes, com orientação como tech lead." },
            { title: "Exemplos práticos", content: "Refatoração no Dashboard Zecki, com análise de permissões e correções de TypeScript." }
        ]
    },
    {
        id: "digital-marketing",
        icon: BarChart3,
        title: { ptBR: "Consultoria em Marketing Digital", en: "Digital Marketing Consulting", es: "Consultoría en Marketing Digital" },
        description: { ptBR: "Planejamento estratégico de campanhas, incluindo SEO avançado, otimização de sites e análise com Google Analytics para maximizar ROI e conversões.", en: "Strategic campaign planning, including advanced SEO, website optimization, and performance analysis with Google Analytics to maximize ROI and conversions.", es: "Planificación estratégica de campañas, incluyendo SEO avanzado, optimización de sitios web y análisis con Google Analytics para maximizar el ROI y las conversiones." },
        details: [
            { title: "Boas práticas", content: "Auditorias de funil de vendas, A/B testing de landing pages, integração de pixel tracking e relatórios KPI." },
            { title: "Benefícios", content: "Aumento de leads qualificados, otimização de orçamentos e estratégias data-driven para crescimento sustentável." },
            { title: "Exemplos práticos", content: "Consultoria para sites como o Cleriston Ribeiro, com planejamento de SEO para visibilidade." }
        ]
    },
    {
        id: "social-media",
        icon: Users,
        title: { ptBR: "Gestão de Mídias Sociais", en: "Social Media Management", es: "Gestión de Redes Sociales" },
        description: { ptBR: "Criação de conteúdos, desenvolvimento de cronogramas editoriais e análise de métricas com Meta Business Suite para engajamento em Instagram e LinkedIn.", en: "Content creation, editorial calendar development, and metric analysis with Meta Business Suite for engagement on Instagram and LinkedIn.", es: "Creación de contenidos, desarrollo de calendarios editoriales y análisis de métricas con Meta Business Suite para el engagement en Instagram y LinkedIn." },
        details: [
            { title: "Boas práticas", content: "Segmentação de audiência, uso de hashtags e CTAs, monitoramento de engajamento e A/B testing de horários." },
            { title: "Benefícios", content: "Crescimento de seguidores, melhoria na interação comunitária e insights para refinamento de estratégias." },
            { title: "Exemplos práticos", content: "Cronogramas para promoção de portfólios, integrados com conteúdos visuais editados." }
        ]
    },
    {
        id: "visual-identity",
        icon: Palette,
        title: { ptBR: "Diagramação e Identidade Visual", en: "Layout & Visual Identity", es: "Diagramación e Identidad Visual" },
        description: { ptBR: "Criação de layouts para PDFs, catálogos e manuais de marca, com foco em harmonização de cores e desenvolvimento de logos vetoriais em Adobe Illustrator.", en: "Creating layouts for PDFs, catalogs, and brand manuals, focusing on color harmonization and developing vector logos in Adobe Illustrator.", es: "Creación de diseños para PDFs, catálogos y manuales de marca, con un enfoque en la armonización de colores y el desarrollo de logotipos vectoriales en Adobe Illustrator." },
        details: [
            { title: "Boas práticas", content: "Grid systems, tipografia responsiva, exportação em alta resolução e testes de impressão." },
            { title: "Benefícios", content: "Fortalecimento da identidade de marca, materiais profissionais e versatilidade para usos digitais ou impressos." },
            { title: "Exemplos práticos", content: "Diagramação de portfólios como o Cleriston Ribeiro, com criação de elementos visuais." }
        ]
    }
];