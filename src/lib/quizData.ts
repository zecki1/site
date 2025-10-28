// /lib/quizData.ts

export const quizData = {
    design: [
        {
            type: 'UnicChoice', // Difícil
            question: { ptBR: "Qual é o foco principal do design UI em comparação ao UX?", en: "What is the main focus of UI design compared to UX?", es: "¿Cuál es el enfoque principal del diseño UI en comparación con UX?" },
            options: [
                { text: { ptBR: "Criar uma experiência de usuário perfeita", en: "Creating a seamless user experience", es: "Crear una experiencia de usuario perfecta" } },
                { text: { ptBR: "Projetar os aspectos visuais e interativos de um produto", en: "Designing the visual and interactive aspects of a product", es: "Diseñar los aspectos visuales e interactivos de un producto" } },
                { text: { ptBR: "Realizar pesquisas com usuários", en: "Conducting user research", es: "Realizar investigaciones con usuarios" } },
                { text: { ptBR: "Construir um sistema de design", en: "Building a design system", es: "Construir un sistema de diseño" } },
            ],
            correctAnswer: "1"
        },
        {
            type: 'DraginDrop', // Intermediário
            question: { ptBR: "O propósito de um fluxo de usuário é visualizar os ____ que um usuário toma para completar uma ____.", en: "The purpose of a user flow is to visualize the ____ a user takes to complete a ____.", es: "El propósito de un flujo de usuario es visualizar los ____ que un usuario toma para completar una ____." },
            sentences: [{
                text: { ptBR: "O propósito de um fluxo de usuário é visualizar os ____ que um usuário toma para completar uma ____.", en: "The purpose of a user flow is to visualize the ____ a user takes to complete a ____.", es: "El propósito de un flujo de usuario es visualizar los ____ que un usuario toma para completar una ____." },
                correctOrder: [1, 2],
                wordsPerSentence: 2,
            }],
            words: [
                { id: 1, text: { ptBR: "passos", en: "steps", es: "pasos" } },
                { id: 2, text: { ptBR: "tarefa", en: "task", es: "tarea" } },
                { id: 3, text: { ptBR: "protótipos", en: "prototypes", es: "prototipos" } },
            ]
        },
        {
            type: 'UnicChoice', // Difícil
            question: { ptBR: "Qual é a diferença chave entre protótipos de baixa fidelidade e alta fidelidade?", en: "What is the key difference between low-fidelity and high-fidelity prototypes?", es: "¿Cuál es la diferencia clave entre prototipos de baja y alta fidelidad?" },
            options: [
                { text: { ptBR: "Protótipos de baixa fidelidade são usados para lançamentos finais", en: "Low-fidelity prototypes are used for final releases", es: "Los prototipos de baja fidelidad se usan para lanzamientos finales" } },
                { text: { ptBR: "Protótipos de alta fidelidade faltam detalhes e são abstratos", en: "High-fidelity prototypes lack detail and are abstract", es: "Los prototipos de alta fidelidad carecen de detalles y son abstractos" } },
                { text: { ptBR: "Protótipos de baixa fidelidade são rústicos e básicos, enquanto os de alta fidelidade são detalhados e refinados", en: "Low-fidelity prototypes are rough and basic, while high-fidelity ones are detailed and refined", es: "Los prototipos de baja fidelidad son toscos y básicos, mientras que los de alta fidelidad son detallados y refinados" } },
            ],
            correctAnswer: "2"
        },
        {
            type: 'TrueOrFalse', // Fácil
            question: { ptBR: "Um sistema de design escalável deve evitar diretrizes para permitir mais liberdade criativa.", en: "A scalable design system should avoid guidelines to allow for more creative freedom.", es: "Un sistema de diseño escalable debe evitar directrices para permitir más libertad creativa." },
            options: {
                true: { text: { ptBR: "Verdadeiro", en: "True", es: "Verdadero" } },
                false: { text: { ptBR: "Falso", en: "False", es: "Falso" } },
            },
            correctAnswer: false
        },
    ],
    code: [
        {
            type: 'UnicChoice', // Difícil
            question: { ptBR: "O que é um closure em JavaScript?", en: "What is a closure in JavaScript?", es: "¿Qué es un closure en JavaScript?" },
            options: [
                { text: { ptBR: "Uma função que é executada imediatamente", en: "A function that is executed immediately", es: "Una función que se ejecuta inmediatamente" } },
                { text: { ptBR: "Uma função que tem acesso ao seu próprio escopo e ao escopo das funções externas", en: "A function that has access to its own scope and the scope of outer functions", es: "Una función que tiene acceso a su propio ámbito y al ámbito de las funciones externas" } },
                { text: { ptBR: "Uma função que é vinculada a um elemento do DOM", en: "A function that is bound to a DOM element", es: "Una función que está vinculada a un elemento del DOM" } },
            ],
            correctAnswer: "1"
        },
        {
            type: 'TrueOrFalse', // Fácil
            question: { ptBR: "O hook `useEffect` no React é executado apenas na primeira renderização por padrão.", en: "In React, the `useEffect` hook runs only on the first render by default.", es: "En React, el hook `useEffect` se ejecuta solo en el primer renderizado por defecto." },
            options: {
                true: { text: { ptBR: "Verdadeiro", en: "True", es: "Verdadero" } },
                false: { text: { ptBR: "Falso", en: "False", es: "Falso" } },
            },
            correctAnswer: false
        },
        {
            type: 'DraginDrop', // Intermediário
            question: { ptBR: "O Virtual DOM do React minimiza manipulações diretas no ____, o que melhora a ____.", en: "React's Virtual DOM minimizes direct manipulations to the ____, which improves ____.", es: "El DOM Virtual de React minimiza las manipulaciones directas en el ____, lo que mejora el ____." },
            sentences: [{
                text: { ptBR: "O Virtual DOM do React minimiza manipulações diretas no ____, o que melhora a ____.", en: "React's Virtual DOM minimizes direct manipulations to the ____, which improves ____.", es: "El DOM Virtual de React minimiza las manipulaciones directas en el ____, lo que mejora el ____." },
                correctOrder: [1, 2],
                wordsPerSentence: 2,
            }],
            words: [
                { id: 1, text: { ptBR: "DOM real", en: "real DOM", es: "DOM real" } },
                { id: 2, text: { ptBR: "performance", en: "performance", es: "rendimiento" } },
                { id: 3, text: { ptBR: "estilização", en: "styling", es: "estilo" } },
            ]
        },
    ],
    marketing: [
        {
            type: 'TrueOrFalse', // Fácil
            question: { ptBR: "SEO significa 'Social Engine Optimization'.", en: "SEO stands for 'Social Engine Optimization'.", es: "SEO significa 'Social Engine Optimization'." },
            options: {
                true: { text: { ptBR: "Verdadeiro", en: "True", es: "Verdadero" } },
                false: { text: { ptBR: "Falso", en: "False", es: "Falso" } },
            },
            correctAnswer: false
        },
        {
            type: 'UnicChoice', // Difícil
            question: { ptBR: "Qual dos seguintes é um exemplo de White Hat SEO?", en: "Which of the following is an example of White Hat SEO?", es: "¿Cuál de los siguientes es un ejemplo de White Hat SEO?" },
            options: [
                { text: { ptBR: "Keyword Stuffing", en: "Keyword Stuffing", es: "Keyword Stuffing" } },
                { text: { ptBR: "Cloaking", en: "Cloaking", es: "Cloaking" } },
                { text: { ptBR: "Produção de Conteúdo de Qualidade", en: "Producing Quality Content", es: "Producción de Contenido de Calidad" } },
            ],
            correctAnswer: "2"
        },
        {
            type: 'UnicChoice', // Difícil
            question: { ptBR: "Qual código de status HTTP indica um redirecionamento permanente?", en: "Which HTTP status code indicates a permanent redirect?", es: "¿Qué código de estado HTTP indica una redirección permanente?" },
            options: [
                { text: { ptBR: "301", en: "301", es: "301" } },
                { text: { ptBR: "302", en: "302", es: "302" } },
                { text: { ptBR: "404", en: "404", es: "404" } },
            ],
            correctAnswer: "0"
        },
    ]
};