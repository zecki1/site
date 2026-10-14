import { test, expect, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve(process.cwd(), "docs/screenshots");
const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
} as const;

// Garante que os reveals (GSAP) já assentaram antes do print — o HomeFX tem
// um fallback de 2,5s que força tudo visível.
async function settle(page: Page) {
  await page.waitForLoadState("load");
  await page.waitForTimeout(3000);
}

test.describe("Screenshots", () => {
  test.beforeAll(() => mkdirSync(OUT, { recursive: true }));

  for (const [device, viewport] of Object.entries(VIEWPORTS)) {
    test(`home - ${device}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");
      await settle(page);
      await expect(page.locator("h1")).toBeVisible();
      await page.screenshot({
        path: `${OUT}/home-${device}.jpg`,
        fullPage: true,
        type: "jpeg",
        quality: 80,
      });
    });

    test(`servicos - ${device}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/servicos");
      await settle(page);
      await expect(page.locator("h1")).toBeVisible();
      await page.screenshot({
        path: `${OUT}/servicos-${device}.jpg`,
        fullPage: true,
        type: "jpeg",
        quality: 80,
      });
    });

    test(`contato - ${device}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/contato");
      await settle(page);
      await expect(page.locator("h1")).toBeVisible();
      await page.screenshot({
        path: `${OUT}/contato-${device}.jpg`,
        fullPage: true,
        type: "jpeg",
        quality: 80,
      });
    });

    test(`login - ${device}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/login");
      await settle(page);
      await expect(page.locator("h1")).toBeVisible();
      await page.screenshot({
        path: `${OUT}/login-${device}.jpg`,
        fullPage: true,
        type: "jpeg",
        quality: 80,
      });
    });
  }
});
