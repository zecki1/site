import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // O `postcss.config.mjs` do projeto usa o plugin do Tailwind v4, que o Vite
  // não consegue carregar. Como os testes não exercitam CSS (jsdom + css:false),
  // sobrescrevemos o PostCSS com uma lista vazia.
  css: {
    postcss: { plugins: [] },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next", ".next-dev", "e2e"],
    css: false,
    coverage: {
      provider: "v8",
      // Só mede os arquivos que os testes importam (evita diluir o número com
      // a biblioteca shadcn/ui inteira e as páginas não testadas unitariamente).
      all: false,
      reporter: ["text", "json-summary"],
      exclude: ["**/*.test.*", "**/*.d.ts", "src/app/**", "src/components/ui/**"],
    },
  },
});
