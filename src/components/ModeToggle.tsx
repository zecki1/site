// src/components/ModeToggle.tsx (ou SettingsMenu.tsx, dependendo do nome)
"use client";

import { Moon, Sun } from "lucide-react";
import { IoTvOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";
import TextTranslator from "@/components/TextTranslator";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    const handleThemeChange = (newTheme: string) => {
        console.log("Mudando tema para:", newTheme); // Log para depuração
        setTheme(newTheme);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div id="paleta">
                    <Button size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Alternar tema</span>
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleThemeChange("light")}>
                    <Sun className="mr-2 h-5 w-5" />
                    <span>
                        <TextTranslator>
                            {{
                                ptBR: "Claro",
                                en: "Light",
                                es: "Claro",
                            }}
                        </TextTranslator>
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
                    <Moon className="mr-2 h-5 w-5" />
                    <span>
                        <TextTranslator>
                            {{
                                ptBR: "Escuro",
                                en: "Dark",
                                es: "Oscuro",
                            }}
                        </TextTranslator>
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("system")}>
                    <IoTvOutline className="mr-2 h-5 w-5" />
                    <span>
                        <TextTranslator ignoreCheck={true}>
                            {{
                                ptBR: "Sistema",
                                en: "System",
                                es: "Sistema",
                            }}
                        </TextTranslator>
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ModeToggle;