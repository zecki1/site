import { cookies } from "next/headers";

export type Locale = "ptBR" | "en" | "es";

const SUPPORTED: Locale[] = ["ptBR", "en", "es"];

export async function getLang(): Promise<Locale> {
    const chosen = (await cookies()).get("lang")?.value as Locale | undefined;
    return chosen && SUPPORTED.includes(chosen) ? chosen : "ptBR";
}

export function pick<T>(
    lang: Locale,
    obj: Record<string, T>
): T {
    return obj[lang] ?? obj["ptBR"];
}