import { describe, it, expect, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIsDesktop } from "@/lib/hooks/uselsDesktop";
import { useIsMobile } from "@/lib/hooks/use-mobile";

function setWidth(width: number) {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
}

describe("useIsDesktop", () => {
  afterEach(() => setWidth(1024));

  it("retorna true em telas acima de 1024px", () => {
    setWidth(1440);
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(true);
  });

  it("retorna false em telas estreitas", () => {
    setWidth(390);
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(false);
  });

  it("reage ao redimensionamento da janela", () => {
    setWidth(390);
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(false);

    act(() => {
      setWidth(1600);
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current).toBe(true);
  });
});

describe("useIsMobile", () => {
  afterEach(() => setWidth(1024));

  it("retorna true abaixo do breakpoint de 768px", () => {
    setWidth(390);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("retorna false em telas largas", () => {
    setWidth(1440);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });
});
