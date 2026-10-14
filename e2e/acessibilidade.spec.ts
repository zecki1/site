import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const ROUTES = [
  "/",
  "/sobre",
  "/servicos",
  "/curriculo",
  "/desafio",
  "/contato",
  "/login",
] as const;

type RouteReport = Record<
  string,
  { violations: Array<{ id: string; impact: string | null; nodes: number }> }
>;

const report: RouteReport = {};

test.describe("Acessibilidade (axe — WCAG 2.0/2.1 A+AA)", () => {
  for (const route of ROUTES) {
    test(`${route} não tem violações graves/críticas`, async ({ page }) => {
      await page.goto(route);
      // Dá tempo dos componentes client (framer-motion, GSAP) assentarem.
      await page.waitForLoadState("load");
      await page.waitForTimeout(1500);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      report[route] = {
        violations: results.violations.map((violation) => ({
          id: violation.id,
          impact: violation.impact ?? null,
          nodes: violation.nodes.length,
        })),
      };

      const serious = results.violations.filter(
        (violation) =>
          violation.impact === "serious" || violation.impact === "critical",
      );
      expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
    });
  }

  test.afterAll(() => {
    const file = resolve(process.cwd(), "docs/a11y/relatorio-axe.json");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(
      file,
      JSON.stringify(
        { generatedAt: new Date().toISOString(), routes: report },
        null,
        2,
      ),
    );
  });
});
