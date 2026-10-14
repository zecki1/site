import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "@/components/layout/ThemeProvider";

function Probe() {
  const { theme, setTheme, fontSize, setFontSize } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="font-size">{fontSize}</span>
      <button onClick={() => setTheme("dark")}>escuro</button>
      <button onClick={() => setFontSize(20)}>fonte 20</button>
    </div>
  );
}

function renderProbe() {
  return render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>,
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
    document.documentElement.style.fontSize = "";
  });

  it("começa no tema do sistema (claro por padrão no jsdom)", () => {
    renderProbe();
    expect(screen.getByTestId("theme")).toHaveTextContent("system");
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("troca o tema, marca a classe e persiste no localStorage", async () => {
    const user = userEvent.setup();
    renderProbe();

    await user.click(screen.getByRole("button", { name: "escuro" }));

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.classList.contains("light")).toBe(false);
    expect(localStorage.getItem("zecki1-ui-theme")).toBe("dark");
  });

  it("ajusta o tamanho da fonte no elemento raiz e persiste", async () => {
    const user = userEvent.setup();
    renderProbe();

    await user.click(screen.getByRole("button", { name: "fonte 20" }));

    expect(screen.getByTestId("font-size")).toHaveTextContent("20");
    expect(document.documentElement.style.fontSize).toBe("20px");
    expect(localStorage.getItem("zecki1-ui-font-size")).toBe("20");
  });
});
