// tailwind.config.ts
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
        },
    },
    plugins: [animate],
} satisfies Config;