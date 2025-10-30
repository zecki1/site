import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                border: "var(--border)",
            },
            textShadow: {
                sm: "0 0 2px rgba(0, 0, 0, 0.3)",
            },
            keyframes: {
                // [ANIMAÇÃO DE BORDA QUE FUNCIONA]
                borderColorPulse: {
                    '0%, 100%': { borderColor: '#00e1ff' },
                    '50%': { borderColor: '#7f00ff' },
                },
                // [ANIMAÇÃO DE GRADIENTE CORRIGIDA NA APLICAÇÃO]
                'grad-flow': {
                    '0%, 100%': {
                        '--tw-gradient-from': 'theme("colors.blue.400")',
                        '--tw-gradient-to': '#00e1ff',
                    },
                    '50%': {
                        '--tw-gradient-from': '#7f00ff',
                        '--tw-gradient-to': 'theme("colors.blue.400")',
                    },
                },
            },
            animation: {
                'border-pulse': 'borderColorPulse 3s ease-in-out infinite alternate', // Exemplo
                'gradient-loop': 'grad-flow 4s ease-in-out infinite alternate',
            },
        },
    },
    plugins: [animate],
} satisfies Config;