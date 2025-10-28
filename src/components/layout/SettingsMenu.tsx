"use client";

import { useTheme } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import TextTranslator from "@/components/layout/TextTranslator";
import { Accessibility, Text } from "lucide-react";

type AccessibilityMode = "monocromatic" | "protanopia" | "deuteranopia" | "tritanopia" | "deuteranomaly" | "protanomaly" | "none";

export const SettingsMenu = () => {
    const { accessibilityMode, setAccessibilityMode, fontSize, setFontSize, fontFamily, setFontFamily } = useTheme();

    const resetSettings = () => {
        setAccessibilityMode("none");
        setFontSize(16);
        setFontFamily("default");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10 border-color1">
                    <Accessibility className="h-4 w-4 md:h-5 md:w-5 text-color1" />
                    <span className="sr-only">
                        <TextTranslator>{{ ptBR: "Acessibilidade", en: "Accessibility", es: "Accesibilidad" }}</TextTranslator>
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
                <DropdownMenuGroup>
                    <div className="px-2 py-1.5 text-sm font-semibold">
                        <TextTranslator>{{ ptBR: "Acessibilidade", en: "View mode", es: "Modo de visualización" }}</TextTranslator>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="flex items-center justify-between p-2">
                        <label htmlFor="monochrome-switch" className="text-sm font-medium pr-2">
                            <TextTranslator>{{ ptBR: "Monocromático", en: "Monochrome", es: "Monocromático" }}</TextTranslator>
                        </label>
                        <Switch
                            id="monochrome-switch"
                            checked={accessibilityMode === "monocromatic"}
                            onCheckedChange={(checked) => setAccessibilityMode(checked ? "monocromatic" : "none")}
                        />
                    </div>
                    <div className="px-2">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="daltonism" className="border-b-0">
                                <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                                    <TextTranslator>{{ ptBR: "Daltonismo", en: "Colorblind", es: "Daltonismo" }}</TextTranslator>
                                </AccordionTrigger>
                                <AccordionContent className="pb-1">
                                    {[
                                        { id: "protanopia", ptBR: "Protanopia", en: "Protanopia", es: "Protanopía" },
                                        { id: "protanomaly", ptBR: "Protanomalia", en: "Protanomaly", es: "Protanomalía" },
                                        { id: "deuteranopia", ptBR: "Deuteranopia", en: "Deuteranopia", es: "Deuteranopía" },
                                        { id: "deuteranomaly", ptBR: "Deuteranomalia", en: "Deuteranomaly", es: "Deuteranomalía" },
                                        { id: "tritanopia", ptBR: "Tritanopia", en: "Tritanopia", es: "Tritanopía" },
                                    ].map(mode => (
                                        <div key={mode.id} className="flex items-center justify-between py-1.5 pl-4">
                                            <label htmlFor={`${mode.id}-switch`} className="text-sm pr-2">
                                                <TextTranslator>{{ ptBR: mode.ptBR, en: mode.en, es: mode.es }}</TextTranslator>
                                            </label>
                                            <Switch
                                                id={`${mode.id}-switch`}
                                                checked={accessibilityMode === mode.id}
                                                onCheckedChange={(checked) => setAccessibilityMode(checked ? (mode.id as AccessibilityMode) : "none")}
                                            />
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-semibold">
                        <Text className="h-4 w-4" />
                        <TextTranslator>{{ ptBR: "Tamanho da fonte", en: "Font size", es: "Tamaño de fuente" }}</TextTranslator>
                    </div>
                    <div className="p-2 pt-1">
                        <Slider value={[fontSize]} onValueChange={(value) => setFontSize(value[0])} min={12} max={22} step={1} />
                    </div>
                    <div className="flex items-center justify-between p-2">
                        <label htmlFor="dyslexic-font-switch" className="text-sm font-medium pr-2">
                            <TextTranslator>{{ ptBR: "Fonte OpenDyslexic", en: "OpenDyslexic Font", es: "Fuente OpenDyslexic" }}</TextTranslator>
                        </label>
                        <Switch
                            id="dyslexic-font-switch"
                            checked={fontFamily === "opendyslexic"}
                            onCheckedChange={(checked) => setFontFamily(checked ? "opendyslexic" : "default")}
                        />
                    </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <div className="p-1">
                        <Button variant="ghost" className="w-full" onClick={resetSettings}>
                            <TextTranslator>{{ ptBR: "Redefinir configurações", en: "Reset settings", es: "Restablecer ajustes" }}</TextTranslator>
                        </Button>
                    </div>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};