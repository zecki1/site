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
<<<<<<< HEAD
=======
            keyframes: {
                borderColorPulse: {
                    '0%, 100%': { borderColor: '#00e1ff' }, // Cor inicial e final (azul)
                    '50%': { borderColor: '#7f00ff' },     // Cor do meio (roxo)
                },
            },
            // E adicione a animação que usa os keyframes
            animation: {
                'border-pulse': 'borderColorPulse 4s ease-in-out infinite', // 4s de duração, loop infinito
            },
>>>>>>> refazendo-header
        },
    },
    plugins: [animate],
} satisfies Config;