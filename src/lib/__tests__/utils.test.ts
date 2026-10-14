import { describe, it, expect } from "vitest";
import { cn, navSections } from "@/lib/utils";

describe("cn", () => {
  it("junta classes e resolve conflitos do Tailwind", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
    // twMerge: a última classe do mesmo grupo vence
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("ignora valores falsy (padrão clsx)", () => {
    expect(cn("a", false, undefined, null, "", "b")).toBe("a b");
  });

  it("aceita objetos e arrays condicionais", () => {
    expect(cn(["a", "b"], { c: true, d: false })).toBe("a b c");
  });
});

describe("navSections", () => {
  it("expõe as âncoras do playground com id e título", () => {
    expect(navSections.length).toBeGreaterThan(0);
    navSections.forEach((section) => {
      expect(section).toHaveProperty("id");
      expect(section).toHaveProperty("title");
      expect(typeof section.id).toBe("string");
    });
  });
});
