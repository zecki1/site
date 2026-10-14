import { test, expect, type Page } from "@playwright/test";

// O header da home só fica clicável depois que o GSAP assume a animação
// (no topo ele é a capa em 100dvh com `pointer-events: none`).
async function revealHeader(page: Page) {
  await page.mouse.wheel(0, 700);
  // Espera a rolagem suave (Lenis) e o scrub do GSAP assentarem.
  await page.waitForFunction(() => window.scrollY > 300);
  await page.waitForTimeout(1500);
  await expect(page.getByRole("button", { name: "changeTheme" })).toBeVisible();
}

test.describe("Home", () => {
  test("carrega com título, h1 e as seções principais", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Ezequiel/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      /Ezequiel Regino Monção/,
    );

    for (const id of [
      "inicio",
      "produtos",
      "servicos",
      "habilidades",
      "codigo",
      "jornada",
      "sobre",
      "contato",
    ]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test("a navegação por níveis leva à seção de contato", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: /navegação por níveis/i });
    await nav.getByRole("link", { name: "Contato" }).click();
    await expect(page.locator("#contato")).toBeInViewport();
  });
});

test.describe("Botões do header", () => {
  test("o botão de tema alterna para escuro e persiste após recarregar", async ({
    page,
  }) => {
    await page.goto("/");
    await revealHeader(page);

    await page.getByRole("button", { name: "changeTheme" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("o botão de idioma troca para inglês e atualiza o `lang`/texto", async ({
    page,
  }) => {
    await page.goto("/");
    await revealHeader(page);

    await page.getByRole("button", { name: "changeLanguage" }).click();
    await page.waitForLoadState("load");

    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(
      page.getByRole("heading", { level: 2, name: /Full-Stack Developer/ }),
    ).toBeVisible();
  });

  test("o botão de área do cliente leva ao login", async ({ page }) => {
    await page.goto("/");
    await revealHeader(page);

    await page.getByRole("link", { name: "clientArea" }).click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("o menu lateral abre e navega para /sobre", async ({ page }) => {
    await page.goto("/");
    await revealHeader(page);

    await page.getByRole("button", { name: "openMenu" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await dialog.getByRole("link", { name: "Sobre" }).click();
    await expect(page).toHaveURL(/\/sobre$/);
  });
});

test.describe("Páginas institucionais", () => {
  const pages: Array<{ path: string; heading: RegExp }> = [
    { path: "/sobre", heading: /Transformando Ideias/i },
    { path: "/servicos", heading: /^Serviços$/i },
    { path: "/curriculo", heading: /Ezequiel Regino Monção/ },
    { path: "/desafio", heading: /Teste suas Habilidades/i },
    { path: "/contato", heading: /Vamos Construir Algo Incrível/i },
    { path: "/login", heading: /Bem-vindo de volta/i },
  ];

  for (const { path, heading } of pages) {
    test(`${path} renderiza o h1 e não tem erro de console`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      page.on("pageerror", (err) => errors.push(err.message));

      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        heading,
      );
      expect(errors, errors.join("\n")).toEqual([]);
    });
  }
});
