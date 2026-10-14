import { describe, it, expect } from "vitest";
import { servicesData } from "@/lib/servicesData";
import { quizData } from "@/lib/quizData";
import { categories, codeHighlights } from "@/lib/codeShowcaseData";
import {
  getEntryMeta,
  KIND_META,
  STUDY_META,
  SKILL_MAP,
  LEVELS,
  LEVEL_ORDER,
  type JourneyEntry,
  type StudyTrack,
} from "@/lib/journeyData";

const LOCALES = ["ptBR", "en", "es"] as const;

function hasAllLocales(obj: Record<string, unknown>) {
  return LOCALES.every((lng) => typeof obj[lng] === "string" && obj[lng] !== "");
}

describe("servicesData", () => {
  it("tem serviços com id único, ícone e textos nos três idiomas", () => {
    expect(servicesData.length).toBeGreaterThan(0);
    const ids = servicesData.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);

    servicesData.forEach((service) => {
      expect(service.icon).toBeTruthy();
      expect(hasAllLocales(service.title)).toBe(true);
      expect(hasAllLocales(service.description)).toBe(true);
      expect(Array.isArray(service.details)).toBe(true);
      expect(service.details.length).toBeGreaterThan(0);
    });
  });
});

describe("quizData", () => {
  it("tem as três trilhas (design, code, marketing)", () => {
    expect(Object.keys(quizData)).toEqual(
      expect.arrayContaining(["design", "code", "marketing"]),
    );
  });

  it("cada questão tem tipo e enunciado traduzido", () => {
    Object.values(quizData)
      .flat()
      .forEach((question) => {
        expect(question.type).toBeTruthy();
        expect(hasAllLocales(question.question)).toBe(true);
      });
  });

  it("questões de escolha/verdadeiro-falso trazem a resposta; drag-and-drop traz as peças", () => {
    Object.values(quizData)
      .flat()
      .forEach((question) => {
        if (question.type === "UnicChoice" || question.type === "TrueOrFalse") {
          expect(question.correctAnswer).toBeDefined();
        }
        if (question.type === "DraginDrop") {
          expect(Array.isArray(question.words)).toBe(true);
          expect(Array.isArray(question.sentences)).toBe(true);
        }
      });
  });
});

describe("codeShowcaseData", () => {
  it("categorias incluem 'todos' e textos traduzidos", () => {
    expect(categories[0].id).toBe("todos");
    categories.forEach((category) => {
      expect(hasAllLocales(category.label)).toBe(true);
    });
  });

  it("destaques de código têm arquivo, stack e trecho de código", () => {
    expect(codeHighlights.length).toBeGreaterThan(0);
    codeHighlights.forEach((highlight) => {
      expect(highlight.fileName).toMatch(/\.tsx?$/);
      expect(highlight.stack.length).toBeGreaterThan(0);
      expect(highlight.code.length).toBeGreaterThan(0);
      expect(hasAllLocales(highlight.title)).toBe(true);
    });
  });
});

describe("journeyData", () => {
  it("SKILL_MAP indexa as habilidades pelo id", () => {
    Object.entries(SKILL_MAP).forEach(([id, skill]) => {
      expect(skill.id).toBe(id);
    });
  });

  it("LEVELS cobre intro/applied/master na ordem", () => {
    LEVEL_ORDER.forEach((level) => {
      expect(LEVELS[level]).toBeTruthy();
    });
  });

  it("getEntryMeta devolve a trilha de estudo quando informada", () => {
    const work: JourneyEntry = {
      id: "w",
      kind: "work",
      period: "2020",
      title: { ptBR: "a", en: "a", es: "a" },
      org: { ptBR: "b", en: "b", es: "b" },
      summary: { ptBR: "c", en: "c", es: "c" },
      details: { ptBR: "d", en: "d", es: "d" },
      skills: [],
    };
    expect(getEntryMeta(work)).toBe(KIND_META.work);

    const study = { ...work, kind: "study" as const, track: "pos" as StudyTrack };
    expect(getEntryMeta(study)).toBe(STUDY_META.pos);

    // estudo sem trilha cai no meta genérico de "study"
    const studyNoTrack = { ...work, kind: "study" as const };
    expect(getEntryMeta(studyNoTrack)).toBe(KIND_META.study);
  });
});
