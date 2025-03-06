/** @type {import('tailwindcss').Config} */
module.exports = {
    // Configuração de conteúdo (mantida e otimizada)
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    // Ativa o modo escuro baseado na classe "dark"
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Cores existentes mantidas
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                // Adicionando cores específicas para modo claro/escuro (opcional)
                dark: {
                    DEFAULT: "hsl(var(--dark, 0 0% 10%))",
                    foreground: "hsl(var(--dark-foreground, 0 0% 95%))",
                },
            },
            borderRadius: {
                // Mantido como está
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            // Opcional: Adicionar transições suaves para mudanças de tema
            transitionProperty: {
                "colors": "background-color, border-color, color, fill, stroke",
            },
        },
    },
    plugins: [
        // Opcional: Adicionar plugin para animações (se desejar)
        require("tailwindcss-animate"),
    ],
};