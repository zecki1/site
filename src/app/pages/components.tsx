"use client"

import TextTranslator from "@/components/layout/TextTranslator"
import { Section, SectionFluid } from "@/components/layout/Sections"
import { Topic, Topic2 } from "@/components/layout/Topic"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/sonner"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { images } from "@/components/layout/ImageContainer"
import Parallax from "@/components/layout/Parallax"
import { ScrollTriggerClamp } from "@/components/gsap/ScrollTriggerClamp"
import { ScrollSmootherThree } from "@/components/gsap/ScrollSmootherThree"
import { GsapParallax } from "@/components/gsap/GsapParallax"
import { GsapImageParallax } from "@/components/gsap/GsapImageParallax"
import { SmoothScrollyImages } from "@/components/gsap/SmoothScrollyImages"
import { ScrollSmootherHeader } from "@/components/gsap/ScrollSmootherHeader"
import { StaggeredText } from "@/components/gsap/StaggeredText"
import { NavigationScrollTrigger } from "@/components/gsap/NavigationScrollTrigger"
// import { CanvasParticles } from "@/components/gsap/CanvasParticles"
import { Cover } from "@/components/layout/Cover"
import { navSections } from "@/lib/navSections"
import { parallaxImages } from "@/lib/parallaxImages"

const Mark = ({ children }: { children: React.ReactNode }) => (
    <span className="font-semibold text-blue-600">{children}</span>
)

export default function Components() {
    return (
        <main>
            <Cover
                titlePT="Nossos componentes"
                titleEN="Our components"
                titleES="Nuestros componentes"
                backgroundImage={images.capa}
            />

            {/* <section id="header">
                <ScrollSmootherHeader />
                <div className="h-[200vh] bg-gray-200" />
            </section> */}
            {/* <NavigationScrollTrigger sections={navSections} /> */}

            {/* <section id="parallax">
                <GsapParallax videoSrc="https://www.dropbox.com/scl/fi/qejf5dgqiv6m77d71r2ec/abstract-background-ink-water.mp4?rlkey=cf5xf73grwr5olszcyjghc5pt&st=ycgfiqec&raw=1">
                    <div className="text-white text-center">
                        <h1 className="text-4xl">Parallax Video</h1>
                    </div>
                </GsapParallax>
            </section> */}

            {/* <section id="header">
                <ScrollSmootherHeader />
                <div className="h-[200vh] bg-gray-200" />
            </section> */}


            {/* <section id="three">
                <ScrollSmootherThree />
            </section> */}

            {/* 
           
                  <section id="clamp">
                <ScrollTriggerClamp />
            </section>

                      <section id="scrolly">
                <SmoothScrollyImages images={parallaxImages} />
            </section>
            <section id="image-parallax">
                <GsapImageParallax images={parallaxImages} />
            </section>
        
            

           */}

            <section id="text" className="h-screen flex items-center justify-center">
                <StaggeredText text="Design Gráfico" />
            </section>

            <SectionFluid label="introducao" className="bg-blue-500 py-16">
                <Topic label="bem-vindo">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">
                            <TextTranslator>
                                {{
                                    ptBR: "Bem-vindo aos Componentes",
                                    en: "Welcome to Components",
                                    es: "Bienvenido a los Componentes",
                                }}
                            </TextTranslator>
                        </h1>
                        <p>
                            <TextTranslator>
                                {{
                                    ptBR: "Uma vitrine de todos os componentes do shadcn/ui com animações GSAP.",
                                    en: "A showcase of all shadcn/ui components with GSAP animations.",
                                    es: "Una vitrina de todos los componentes de shadcn/ui con animaciones GSAP.",
                                }}
                            </TextTranslator>
                        </p>
                    </div>
                </Topic>
            </SectionFluid>

            <Section label="interativos" className="pt-8">
                <Topic label="accordion">
                    <h2 className="text-2xl font-semibold mb-2">
                        <TextTranslator>{{ ptBR: "Accordion", en: "Accordion", es: "Acordeón" }}</TextTranslator>
                    </h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Accordion</Mark> é um conjunto de cabeçalhos interativos que revelam conteúdo.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Accordion</Mark> is a set of interactive headings that reveal content.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Acordeón</Mark> es un conjunto de encabezados interactivos que revelan contenido.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>

                    <h3 className="text-xl font-medium mt-6 mb-2">
                        <TextTranslator>
                            {{ ptBR: "Accordion com Ícones", en: "Accordion with Icons", es: "Acordeón con Iconos" }}
                        </TextTranslator>
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="flex items-center gap-2">
                                <Star className="h-4 w-4" />
                                <TextTranslator>{{ ptBR: "Item 1", en: "Item 1", es: "Ítem 1" }}</TextTranslator>
                            </AccordionTrigger>
                            <AccordionContent>
                                <TextTranslator>
                                    {{ ptBR: "Conteúdo do item 1 com ícone.", en: "Item 1 content with icon.", es: "Contenido del ítem 1 con ícono." }}
                                </TextTranslator>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="flex items-center gap-2">
                                <Star className="h-4 w-4" />
                                <TextTranslator>{{ ptBR: "Item 2", en: "Item 2", es: "Ítem 2" }}</TextTranslator>
                            </AccordionTrigger>
                            <AccordionContent>
                                <TextTranslator>
                                    {{ ptBR: "Conteúdo do item 2 com ícone.", en: "Item 2 content with icon.", es: "Contenido del ítem 2 con ícono." }}
                                </TextTranslator>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <h3 className="text-xl font-medium mt-6 mb-2">
                        <TextTranslator>
                            {{ ptBR: "Accordion Múltiplo", en: "Multiple Accordion", es: "Acordeón Múltiple" }}
                        </TextTranslator>
                    </h3>
                    <Accordion type="multiple" className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <TextTranslator>{{ ptBR: "Item 1", en: "Item 1", es: "Ítem 1" }}</TextTranslator>
                            </AccordionTrigger>
                            <AccordionContent>
                                <TextTranslator>
                                    {{ ptBR: "Pode abrir vários itens ao mesmo tempo.", en: "Can open multiple items at once.", es: "Puede abrir varios ítems a la vez." }}
                                </TextTranslator>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                <TextTranslator>{{ ptBR: "Item 2", en: "Item 2", es: "Ítem 2" }}</TextTranslator>
                            </AccordionTrigger>
                            <AccordionContent>
                                <TextTranslator>
                                    {{ ptBR: "Outro conteúdo aqui.", en: "Another content here.", es: "Otro contenido aquí." }}
                                </TextTranslator>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <h3 className="text-xl font-medium mt-6 mb-2">
                        <TextTranslator>
                            {{ ptBR: "Accordion Padrão", en: "Standard Accordion", es: "Acordeón Estándar" }}
                        </TextTranslator>
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <TextTranslator>{{ ptBR: "É acessível?", en: "Is it accessible?", es: "¿Es accesible?" }}</TextTranslator>
                            </AccordionTrigger>
                            <AccordionContent>
                                <TextTranslator>
                                    {{ ptBR: "Sim, segue o padrão WAI-ARIA.", en: "Yes, it follows the WAI-ARIA pattern.", es: "Sí, sigue el patrón WAI-ARIA." }}
                                </TextTranslator>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <h3 className="text-xl font-medium mt-6 mb-2">
                        <TextTranslator>
                            {{ ptBR: "Accordion Simples", en: "Simple Accordion", es: "Acordeón Simple" }}
                        </TextTranslator>
                    </h3>
                    <Accordion type="single" collapsible className="w-full [data-state=open]:animate-none">
                        <AccordionItem value="item-1" className="border-b">
                            <AccordionTrigger className="py-2 hover:no-underline">
                                <TextTranslator>{{ ptBR: "Item Simples", en: "Simple Item", es: "Ítem Simple" }}</TextTranslator>
                            </AccordionTrigger>
                            <AccordionContent className="py-2">
                                <TextTranslator>
                                    {{ ptBR: "Conteúdo sem animação.", en: "Content without animation.", es: "Contenido sin animación." }}
                                </TextTranslator>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <h3 className="text-xl font-medium mt-6 mb-2">
                        <TextTranslator>
                            {{ ptBR: "Accordion com Conteúdo Rico", en: "Rich Content Accordion", es: "Acordeón con Contenido Rico" }}
                        </TextTranslator>
                    </h3>
                    <Accordion type="single" collapsible className="w-full rounded-md border bg-card">
                        <AccordionItem value="item-1" className="border-b-0">
                            <AccordionTrigger className="px-4 py-3">
                                <TextTranslator>{{ ptBR: "Item Rico", en: "Rich Item", es: "Ítem Rico" }}</TextTranslator>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 py-3">
                                <div className="flex flex-col gap-2">
                                    <TextTranslator>
                                        {{ ptBR: "Este é um conteúdo mais elaborado.", en: "This is a more elaborate content.", es: "Este es un contenido más elaborado." }}
                                    </TextTranslator>
                                    <div className="flex gap-2">
                                        <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                                            <TextTranslator>{{ ptBR: "Tag 1", en: "Tag 1", es: "Etiqueta 1" }}</TextTranslator>
                                        </span>
                                        <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                                            <TextTranslator>{{ ptBR: "Tag 2", en: "Tag 2", es: "Etiqueta 2" }}</TextTranslator>
                                        </span>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Topic>

                <Topic label="button">
                    <h2 className="text-2xl font-semibold mb-2">Button</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Button</Mark> é usado para ações clicáveis.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Button</Mark> is used for clickable actions.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Button</Mark> se usa para acciones clicables.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Button>Clique Aqui</Button>
                </Topic>

                <Topic label="checkbox">
                    <h2 className="text-2xl font-semibold mb-2">Checkbox</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Checkbox</Mark> permite seleções múltiplas.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Checkbox</Mark> allows multiple selections.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Checkbox</Mark> permite selecciones múltiples.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Checkbox />
                </Topic>
            </Section>

            <SectionFluid label="visualizacoes" className="py-12">
                <Topic2 label="alert" bgColor="">
                    <h2 className="text-2xl font-semibold mb-2">Alert</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Alert</Mark> exibe mensagens de notificação ou aviso.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Alert</Mark> displays notification or warning messages.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Alert</Mark> muestra mensajes de notificación o advertencia.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Alert>
                        <AlertTitle>Atenção</AlertTitle>
                        <AlertDescription>Este é um alerta.</AlertDescription>
                    </Alert>
                </Topic2>

                <Topic2 label="avatar" bgColor="">
                    <h2 className="text-2xl font-semibold mb-2">Avatar</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Avatar</Mark> representa usuários com imagens ou iniciais.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Avatar</Mark> represents users with images or initials.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Avatar</Mark> representa a usuarios con imágenes o iniciales.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Topic2>

                <Topic2 label="badge" bgColor="">
                    <h2 className="text-2xl font-semibold mb-2">Badge</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Badge</Mark> é um pequeno rótulo para destacar informações.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Badge</Mark> is a small label to highlight information.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Badge</Mark> es una pequeña etiqueta para resaltar información.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Badge>Novo</Badge>
                </Topic2>
            </SectionFluid>

            <Section label="formularios" className="py-8">
                <Topic label="input">
                    <h2 className="text-2xl font-semibold mb-2">Input</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Input</Mark> permite entrada de texto.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Input</Mark> allows text input.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Input</Mark> permite la entrada de texto.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Input placeholder="Digite algo..." />
                </Topic>

                <Topic label="textarea">
                    <h2 className="text-2xl font-semibold mb-2">Textarea</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Textarea</Mark> permite entrada de texto multilinha.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Textarea</Mark> allows multiline text input.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Textarea</Mark> permite la entrada de texto multilínea.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Textarea placeholder="Digite algo..." />
                </Topic>

                <Topic label="select">
                    <h2 className="text-2xl font-semibold mb-2">Select</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Select</Mark> é um menu suspenso para escolhas.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Select</Mark> is a dropdown for choices.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Select</Mark> es un menú desplegable para elecciones.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="option1">Opção 1</SelectItem>
                        </SelectContent>
                    </Select>
                </Topic>
            </Section>

            <Section label="navegacao" className="py-12">
                <Topic label="menubar">
                    <h2 className="text-2xl font-semibold mb-2">Menubar</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Menubar</Mark> cria barras de menu horizontais.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Menubar</Mark> creates horizontal menu bars.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Menubar</Mark> crea barras de menú horizontales.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger>Arquivo</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>Novo</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </Topic>

                <Topic label="navigation-menu">
                    <h2 className="text-2xl font-semibold mb-2">Navigation Menu</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Navigation Menu</Mark> organiza links de navegação.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Navigation Menu</Mark> organizes navigation links.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Navigation Menu</Mark> organiza enlaces de navegación.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink>Home</NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </Topic>

                <Topic label="dropdown-menu">
                    <h2 className="text-2xl font-semibold mb-2">Dropdown Menu</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Dropdown Menu</Mark> exibe opções em um menu suspenso.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Dropdown Menu</Mark> displays options in a dropdown.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Dropdown Menu</Mark> muestra opciones en un menú desplegable.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>Abrir</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Opção 1</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </Topic>
            </Section>

            <Section label="outros" className="py-8">
                <Topic label="calendar">
                    <h2 className="text-2xl font-semibold mb-2">Calendar</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Calendar</Mark> permite selecionar datas.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Calendar</Mark> allows date selection.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Calendar</Mark> permite seleccionar fechas.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Calendar mode="single" selected={new Date()} />
                </Topic>

                <Topic label="card">
                    <h2 className="text-2xl font-semibold mb-2">Card</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Card</Mark> organiza conteúdo em um contêiner.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Card</Mark> organizes content in a container.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Card</Mark> organiza contenido en un contenedor.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Card>
                        <CardHeader>
                            <CardTitle>Título</CardTitle>
                        </CardHeader>
                        <CardContent>Conteúdo aqui</CardContent>
                    </Card>
                </Topic>

                <Topic label="collapsible">
                    <h2 className="text-2xl font-semibold mb-2">Collapsible</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Collapsible</Mark> esconde ou mostra conteúdo.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Collapsible</Mark> hides or shows content.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Collapsible</Mark> oculta o muestra contenido.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Collapsible>
                        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                        <CollapsibleContent>Conteúdo oculto</CollapsibleContent>
                    </Collapsible>
                </Topic>

                <Topic label="command">
                    <h2 className="text-2xl font-semibold mb-2">Command</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Command</Mark> cria menus de comando interativos.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Command</Mark> creates interactive command menus.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Command</Mark> crea menús de comandos interactivos.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Command>
                        <CommandInput placeholder="Digite..." />
                        <CommandList>
                            <CommandItem>Opção 1</CommandItem>
                        </CommandList>
                    </Command>
                </Topic>
            </Section>

            <SectionFluid label="outros" className="py-8">
                <Topic label="parallax">
                    <div className="container mx-auto py-8">
                        <h2 className="text-2xl font-semibold mb-2">
                            <TextTranslator ignoreCheck={true}>
                                {{ ptBR: "Parallax", en: "Parallax", es: "Parallax" }}
                            </TextTranslator>
                        </h2>
                        <p>
                            <TextTranslator>
                                {{
                                    ptBR: "Como funciona: O Parallax cria um efeito de parallax ao mover uma imagem de fundo em uma velocidade diferente do conteúdo em primeiro plano enquanto o usuário rola. Ele usa o GSAP com o plugin ScrollTrigger para animar a posição do fundo com base na rolagem, garantindo um desempenho suave. O componente aceita uma imagem de fundo, conteúdo (como texto ou outros elementos) e uma altura personalizável.",
                                    en: "How it works: The Parallax creates a parallax effect by moving a background image at a different speed from the foreground content as the user scrolls. It uses GSAP with the ScrollTrigger plugin to animate the background position based on scrolling, ensuring smooth performance. The component accepts a background image, content (such as text or other elements), and a customizable height.",
                                    es: "Cómo funciona: El Parallax crea un efecto de parallax al mover una imagen de fondo a una velocidad diferente del contenido en primer plano mientras el usuario desplaza. Utiliza GSAP con el plugin ScrollTrigger para animar la posición del fondo según el desplazamiento, garantizando un rendimiento suave. El componente acepta una imagen de fondo, contenido (como texto u otros elementos) y una altura personalizable.",
                                }}
                            </TextTranslator>
                        </p>
                        <p>
                            <TextTranslator>
                                {{
                                    ptBR: "Para que serve: Adiciona um efeito visual dinâmico a seções da página, como cabeçalhos ou áreas de destaque, criando profundidade e engajamento visual.",
                                    en: "What it’s for: Adds a dynamic visual effect to page sections, such as headers or highlighted areas, creating depth and visual engagement.",
                                    es: "Para qué sirve: Agrega un efecto visual dinámico a secciones de la página, como encabezados o áreas destacadas, creando profundidad y compromiso visual.",
                                }}
                            </TextTranslator>
                        </p>
                    </div>
                    <Parallax backgroundImage={images.parallax || images.capa}>
                        <div className="mt-2 px-3 rounded text-white text-sm bg-black/50 border-0">
                            <div className="text-white text-center">
                                <h1 className="text-4xl md:text-6xl font-bold">
                                    <TextTranslator>
                                        {{ ptBR: "Bem-vindo ao Parallax", en: "Welcome to Parallax", es: "Bienvenido a Parallax" }}
                                    </TextTranslator>
                                </h1>
                                <p className="mt-4 text-lg">
                                    <TextTranslator>
                                        {{ ptBR: "Um efeito visual incrível", en: "An amazing visual effect", es: "Un efecto visual increíble" }}
                                    </TextTranslator>
                                </p>
                            </div>
                        </div>
                    </Parallax>
                    <Parallax videoSrc="https://www.dropbox.com/scl/fi/qejf5dgqiv6m77d71r2ec/abstract-background-ink-water.mp4?rlkey=cf5xf73grwr5olszcyjghc5pt&st=ycgfiqec&raw=1">
                        <div className="mt-2 px-3 rounded text-white text-sm bg-black/50 border-0">
                            <div className="text-white text-center">
                                <h1 className="text-4xl md:text-6xl font-bold">
                                    <TextTranslator>
                                        {{ ptBR: "Vídeo Parallax", en: "Video Parallax", es: "Parallax de Video" }}
                                    </TextTranslator>
                                </h1>
                                <p className="mt-4 text-lg">
                                    <TextTranslator>
                                        {{ ptBR: "Um efeito dinâmico com vídeo", en: "A dynamic effect with video", es: "Un efecto dinámico con video" }}
                                    </TextTranslator>
                                </p>
                            </div>
                        </div>
                    </Parallax>
                </Topic>

                <Topic2 label="popover">
                    <h2 className="text-2xl font-semibold mb-2">Popover</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Popover</Mark> exibe conteúdo flutuante ao clicar.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Popover</Mark> displays floating content on click.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Popover</Mark> muestra contenido flotante al hacer clic.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button>Abrir</Button>
                        </PopoverTrigger>
                        <PopoverContent>Conteúdo aqui</PopoverContent>
                    </Popover>
                </Topic2>

                <Topic2 label="progress">
                    <h2 className="text-2xl font-semibold mb-2">Progress</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Progress</Mark> mostra o progresso de uma tarefa.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Progress</Mark> shows task progress.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Progress</Mark> muestra el progreso de una tarea.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Progress value={50} />
                </Topic2>

                <Topic2 label="radio-group">
                    <h2 className="text-2xl font-semibold mb-2">Radio Group</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Radio Group</Mark> permite uma única seleção entre opções.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Radio Group</Mark> allows single selection among options.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Radio Group</Mark> permite una sola selección entre opciones.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <RadioGroup defaultValue="option1">
                        <RadioGroupItem value="option1">Opção 1</RadioGroupItem>
                        <RadioGroupItem value="option2">Opção 2</RadioGroupItem>
                    </RadioGroup>
                </Topic2>

                <Topic2 label="scroll-area">
                    <h2 className="text-2xl font-semibold mb-2">Scroll Area</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Scroll Area</Mark> adiciona barras de rolagem personalizadas.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Scroll Area</Mark> adds custom scrollbars.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Scroll Area</Mark> agrega barras de desplazamiento personalizadas.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <ScrollArea className="h-20 w-48">
                        <div>Conteúdo longo aqui...</div>
                    </ScrollArea>
                </Topic2>

                <Topic2 label="separator">
                    <h2 className="text-2xl font-semibold mb-2">Separator</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Separator</Mark> divide conteúdos visualmente.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Separator</Mark> visually divides content.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Separator</Mark> divide visualmente el contenido.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Separator />
                </Topic2>

                <Topic2 label="sheet">
                    <h2 className="text-2xl font-semibold mb-2">Sheet</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Sheet</Mark> é um painel lateral deslizante.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Sheet</Mark> is a sliding side panel.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Sheet</Mark> es un panel lateral deslizante.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button>Abrir</Button>
                        </SheetTrigger>
                        <SheetContent>Conteúdo lateral</SheetContent>
                    </Sheet>
                </Topic2>

                <Topic2 label="skeleton">
                    <h2 className="text-2xl font-semibold mb-2">Skeleton</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Skeleton</Mark> mostra placeholders durante o carregamento.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Skeleton</Mark> shows placeholders during loading.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Skeleton</Mark> muestra marcadores durante la carga.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Skeleton className="w-32 h-4" />
                </Topic2>

                <Topic2 label="slider">
                    <h2 className="text-2xl font-semibold mb-2">Slider</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Slider</Mark> permite ajustar valores em um intervalo.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Slider</Mark> allows adjusting values in a range.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Slider</Mark> permite ajustar valores en un rango.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Slider defaultValue={[50]} max={100} step={1} />
                </Topic2>

                <Topic2 label="switch">
                    <h2 className="text-2xl font-semibold mb-2">Switch</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Switch</Mark> alterna entre dois estados.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Switch</Mark> toggles between two states.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Switch</Mark> alterna entre dos estados.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Switch />
                </Topic2>

                <Topic2 label="table">
                    <h2 className="text-2xl font-semibold mb-2">Table</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Table</Mark> organiza dados em linhas e colunas.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Table</Mark> organizes data in rows and columns.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Table</Mark> organiza datos en filas y columnas.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Coluna 1</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Dado</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Topic2>

                <Topic2 label="tabs">
                    <h2 className="text-2xl font-semibold mb-2">Tabs</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Tabs</Mark> organiza conteúdo em abas.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Tabs</Mark> organizes content in tabs.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Tabs</Mark> organiza contenido en pestañas.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Tabs defaultValue="tab1">
                        <TabsList>
                            <TabsTrigger value="tab1">Aba 1</TabsTrigger>
                            <TabsTrigger value="tab2">Aba 2</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tab1">Conteúdo 1</TabsContent>
                    </Tabs>
                </Topic2>

                <Topic2 label="toast">
                    <h2 className="text-2xl font-semibold mb-2">Toast</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Toast</Mark> exibe notificações temporárias.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Toast</Mark> displays temporary notifications.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Toast</Mark> muestra notificaciones temporales.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Button onClick={() => toast("Notificação!")}>Mostrar Toast</Button>
                </Topic2>

                <Topic2 label="toggle">
                    <h2 className="text-2xl font-semibold mb-2">Toggle</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Toggle</Mark> alterna estados como um botão.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Toggle</Mark> toggles states like a button.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Toggle</Mark> alterna estados como un botón.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <Toggle>Toggle</Toggle>
                </Topic2>

                <Topic2 label="tooltip">
                    <h2 className="text-2xl font-semibold mb-2">Tooltip</h2>
                    <p>
                        <TextTranslator>
                            {{
                                ptBR: (
                                    <>
                                        O <Mark>Tooltip</Mark> mostra dicas ao passar o mouse.
                                    </>
                                ),
                                en: (
                                    <>
                                        The <Mark>Tooltip</Mark> shows tips on hover.
                                    </>
                                ),
                                es: (
                                    <>
                                        El <Mark>Tooltip</Mark> muestra consejos al pasar el ratón.
                                    </>
                                ),
                            }}
                        </TextTranslator>
                    </p>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button>
                                    <span>Passe o mouse</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Dica</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Topic2>
            </SectionFluid>

            <SectionFluid label="rodape" className="py-16">
                <Topic label="final">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            <TextTranslator>{{ ptBR: "Rodapé", en: "Footer", es: "Pie de página" }}</TextTranslator>
                        </h2>
                        <p>
                            <TextTranslator>
                                {{ ptBR: "Seção fluida no final da página.", en: "Fluid section at the end of the page.", es: "Sección fluida al final de la página." }}
                            </TextTranslator>
                        </p>
                    </div>
                </Topic>
            </SectionFluid>
        </main>
    )
}