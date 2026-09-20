"use client";

import Link from "next/link";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Settings, Languages, Palette, User, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import TextTranslator from "@/components/layout/TextTranslator";
import { setLanguage } from "@/lib/setLanguage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const MobileOptions = () => {
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();

  const languages = ["ptBR", "en", "es"];
  const handleLanguageCycle = () => {
    const currentIndex = languages.indexOf(i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const clearCache = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-[#00e1ff] hover:bg-[#00e1ff]/20 transition-colors"
          aria-label={i18n.t("openSettings")}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel><TextTranslator>{{ ptBR: "Opções", en: "Options", es: "Opciones" }}</TextTranslator></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLanguageCycle}>
          <Languages className="mr-2 h-4 w-4" />
          <span><TextTranslator>{{ ptBR: "Mudar Idioma", en: "Change Language", es: "Cambiar Idioma" }}</TextTranslator> ({i18n.language})</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleTheme}>
          <Palette className="mr-2 h-4 w-4" />
          <span><TextTranslator>{{ ptBR: "Mudar Tema", en: "Change Theme", es: "Cambiar Tema" }}</TextTranslator> ({theme})</span>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/login">
            <User className="mr-2 h-4 w-4" />
            <span><TextTranslator>{{ ptBR: "Área do Cliente", en: "Client Area", es: "Área de Cliente" }}</TextTranslator></span>
          </Link>
        </DropdownMenuItem>
        {process.env.NODE_ENV === "development" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={clearCache} className="text-red-500 focus:text-red-500 focus:bg-red-500/10">
              <Trash2 className="mr-2 h-4 w-4" />
              <span><TextTranslator>{{ ptBR: "Limpar Cache", en: "Clear Cache", es: "Limpiar Caché" }}</TextTranslator></span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileOptions;