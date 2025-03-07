// src/app/pages/components.tsx
"use client";

import TextTranslator from "@/components/TextTranslator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Combobox } from "@/components/ui/combobox"; // Caso exista, ajuste conforme doc
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toast, ToastAction, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"; // Ajuste conforme necessário
import { Toggle } from "@/components/ui/toggle";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Components() {
    const [progress, setProgress] = useState(50);
    const form = useForm();

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">
                <TextTranslator>
                    {{
                        ptBR: "Componentes do Shadcn/ui",
                        en: "Shadcn/ui Components",
                        es: "Componentes de Shadcn/ui",
                    }}
                </TextTranslator>
            </h1>

            {/* Accordion */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Accordion</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um componente expansível para mostrar conteúdo colapsável.",
                            en: "An expandable component to show collapsible content.",
                            es: "Un componente expandible para mostrar contenido colapsable.",
                        }}
                    </TextTranslator>
                </p>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Exemplo</AccordionTrigger>
                        <AccordionContent>Conteúdo expansível aqui.</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>

            {/* Alert */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Alert</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Exibe uma mensagem de alerta ou notificação.",
                            en: "Displays an alert or notification message.",
                            es: "Muestra un mensaje de alerta o notificación.",
                        }}
                    </TextTranslator>
                </p>
                <Alert>
                    <AlertTitle>Atenção</AlertTitle>
                    <AlertDescription>Este é um exemplo de alerta.</AlertDescription>
                </Alert>
            </section>

            {/* Alert Dialog */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Alert Dialog</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um modal de confirmação ou alerta.",
                            en: "A confirmation or alert modal.",
                            es: "Un modal de confirmación o alerta.",
                        }}
                    </TextTranslator>
                </p>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline">Abrir</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirma?</AlertDialogTitle>
                            <AlertDialogDescription>Essa ação é irreversível.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction>Confirmar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </section>

            {/* Avatar */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Avatar</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Exibe uma imagem ou inicial do usuário.",
                            en: "Displays a user image or initial.",
                            es: "Muestra una imagen o inicial del usuario.",
                        }}
                    </TextTranslator>
                </p>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </section>

            {/* Badge */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Badge</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um pequeno selo para destacar informações.",
                            en: "A small badge to highlight information.",
                            es: "Una pequeña insignia para destacar información.",
                        }}
                    </TextTranslator>
                </p>
                <Badge>Novo</Badge>
            </section>

            {/* Button */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Button</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um botão clicável para ações.",
                            en: "A clickable button for actions.",
                            es: "Un botón clickable para acciones.",
                        }}
                    </TextTranslator>
                </p>
                <Button>Clique Aqui</Button>
            </section>

            {/* Calendar */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Calendar</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um calendário interativo para selecionar datas.",
                            en: "An interactive calendar to select dates.",
                            es: "Un calendario interactivo para seleccionar fechas.",
                        }}
                    </TextTranslator>
                </p>
                <Calendar mode="single" selected={new Date()} />
            </section>

            {/* Card */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Card</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um container com bordas para organizar conteúdo.",
                            en: "A bordered container to organize content.",
                            es: "Un contenedor con bordes para organizar contenido.",
                        }}
                    </TextTranslator>
                </p>
                <Card>
                    <CardHeader>
                        <CardTitle>Título</CardTitle>
                        <CardDescription>Descrição</CardDescription>
                    </CardHeader>
                    <CardContent>Conteúdo aqui</CardContent>
                    <CardFooter>
                        <Button>Rodapé</Button>
                    </CardFooter>
                </Card>
            </section>

            {/* Checkbox */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Checkbox</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Uma caixa de seleção para opções binárias.",
                            en: "A checkbox for binary options.",
                            es: "Una casilla de verificación para opciones binarias.",
                        }}
                    </TextTranslator>
                </p>
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="ml-2">Aceitar termos</Label>
            </section>

            {/* Collapsible */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Collapsible</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um conteúdo que pode ser colapsado ou expandido.",
                            en: "Content that can be collapsed or expanded.",
                            es: "Contenido que puede colapsarse o expandirse.",
                        }}
                    </TextTranslator>
                </p>
                <Collapsible>
                    <CollapsibleTrigger asChild>
                        <Button variant="outline">Toggle</Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>Conteúdo colapsável</CollapsibleContent>
                </Collapsible>
            </section>

            {/* Command */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Command</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Uma barra de comando para busca rápida.",
                            en: "A command bar for quick search.",
                            es: "Una barra de comandos para búsqueda rápida.",
                        }}
                    </TextTranslator>
                </p>
                <Command>
                    <CommandInput placeholder="Digite um comando..." />
                    <CommandEmpty>Sem resultados</CommandEmpty>
                    <CommandGroup>
                        <CommandItem>Opção 1</CommandItem>
                        <CommandItem>Opção 2</CommandItem>
                    </CommandGroup>
                </Command>
            </section>

            {/* Dialog */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Dialog</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um modal para interações do usuário.",
                            en: "A modal for user interactions.",
                            es: "Un modal para interacciones del usuario.",
                        }}
                    </TextTranslator>
                </p>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Abrir</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Modal</DialogTitle>
                            <DialogDescription>Exemplo de modal</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button>Fechar</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </section>

            {/* Drawer */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Drawer</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um painel deslizante para conteúdo adicional.",
                            en: "A sliding panel for additional content.",
                            es: "Un panel deslizante para contenido adicional.",
                        }}
                    </TextTranslator>
                </p>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="outline">Abrir</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Drawer</DrawerTitle>
                            <DrawerDescription>Conteúdo aqui</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="outline">Fechar</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </section>

            {/* Dropdown Menu */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Dropdown Menu</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um menu suspenso para opções.",
                            en: "A dropdown menu for options.",
                            es: "Un menú desplegable para opciones.",
                        }}
                    </TextTranslator>
                </p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Opções</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                        <DropdownMenuItem>Item 2</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </section>

            {/* Form */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Form</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um formulário com validação integrada.",
                            en: "A form with integrated validation.",
                            es: "Un formulario con validación integrada.",
                        }}
                    </TextTranslator>
                </p>
                <Form {...form}>
                    <form className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuário</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Seu nome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Enviar</Button>
                    </form>
                </Form>
            </section>

            {/* Hover Card */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Hover Card</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um cartão que aparece ao passar o mouse.",
                            en: "A card that appears on hover.",
                            es: "Una tarjeta que aparece al pasar el ratón.",
                        }}
                    </TextTranslator>
                </p>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Button variant="link">Hover</Button>
                    </HoverCardTrigger>
                    <HoverCardContent>Conteúdo ao passar o mouse</HoverCardContent>
                </HoverCard>
            </section>

            {/* Input */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Input</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um campo de entrada de texto.",
                            en: "A text input field.",
                            es: "Un campo de entrada de texto.",
                        }}
                    </TextTranslator>
                </p>
                <Input placeholder="Digite aqui" />
            </section>

            {/* Label */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Label</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um rótulo para campos de formulário.",
                            en: "A label for form fields.",
                            es: "Una etiqueta para campos de formulario.",
                        }}
                    </TextTranslator>
                </p>
                <Label htmlFor="example">Exemplo</Label>
                <Input id="example" placeholder="Campo" />
            </section>

            {/* Menubar */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Menubar</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Uma barra de menu horizontal.",
                            en: "A horizontal menu bar.",
                            es: "Una barra de menú horizontal.",
                        }}
                    </TextTranslator>
                </p>
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>Arquivo</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>Novo</MenubarItem>
                            <MenubarItem>Abrir</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </section>

            {/* Navigation Menu */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Navigation Menu</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um menu de navegação expansível.",
                            en: "An expandable navigation menu.",
                            es: "Un menú de navegación expandible.",
                        }}
                    </TextTranslator>
                </p>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Navegação</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>Link 1</NavigationMenuLink>
                                <NavigationMenuLink>Link 2</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </section>

            {/* Pagination */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Pagination</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Controles para navegação entre páginas.",
                            en: "Controls for navigating between pages.",
                            es: "Controles para navegar entre páginas.",
                        }}
                    </TextTranslator>
                </p>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </section>

            {/* Popover */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Popover</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um popup que aparece ao clicar.",
                            en: "A popup that appears on click.",
                            es: "Un popup que aparece al hacer clic.",
                        }}
                    </TextTranslator>
                </p>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Abrir</Button>
                    </PopoverTrigger>
                    <PopoverContent>Conteúdo do popover</PopoverContent>
                </Popover>
            </section>

            {/* Progress */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Progress</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Uma barra de progresso para indicar andamento.",
                            en: "A progress bar to indicate progress.",
                            es: "Una barra de progreso para indicar avance.",
                        }}
                    </TextTranslator>
                </p>
                <Progress value={progress} className="w-[60%]" />
            </section>

            {/* Radio Group */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Radio Group</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um grupo de opções de rádio exclusivas.",
                            en: "A group of exclusive radio options.",
                            es: "Un grupo de opciones de radio exclusivas.",
                        }}
                    </TextTranslator>
                </p>
                <RadioGroup defaultValue="option1">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option1" id="r1" />
                        <Label htmlFor="r1">Opção 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option2" id="r2" />
                        <Label htmlFor="r2">Opção 2</Label>
                    </div>
                </RadioGroup>
            </section>

            {/* Scroll Area */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Scroll Area</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Uma área com rolagem para conteúdo longo.",
                            en: "A scrollable area for long content.",
                            es: "Un área con desplazamiento para contenido largo.",
                        }}
                    </TextTranslator>
                </p>
                <ScrollArea className="h-72 w-48 rounded-md border">
                    <div className="p-4">
                        {Array(20).fill("Item").map((item, i) => (
                            <div key={i}>{item} {i + 1}</div>
                        ))}
                    </div>
                </ScrollArea>
            </section>

            {/* Select */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Select</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um dropdown para selecionar uma opção.",
                            en: "A dropdown to select an option.",
                            es: "Un desplegable para seleccionar una opción.",
                        }}
                    </TextTranslator>
                </p>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="op1">Opção 1</SelectItem>
                        <SelectItem value="op2">Opção 2</SelectItem>
                    </SelectContent>
                </Select>
            </section>

            {/* Separator */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Separator</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Uma linha para separar conteúdos.",
                            en: "A line to separate content.",
                            es: "Una línea para separar contenido.",
                        }}
                    </TextTranslator>
                </p>
                <div>
                    <p>Parte 1</p>
                    <Separator className="my-4" />
                    <p>Parte 2</p>
                </div>
            </section>

            {/* Sheet */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Sheet</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um painel lateral deslizante.",
                            en: "A sliding side panel.",
                            es: "Un panel lateral deslizante.",
                        }}
                    </TextTranslator>
                </p>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">Abrir</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Sheet</SheetTitle>
                            <SheetDescription>Conteúdo lateral</SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </section>

            {/* Skeleton */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Skeleton</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um placeholder para conteúdo em carregamento.",
                            en: "A placeholder for loading content.",
                            es: "Un marcador para contenido en carga.",
                        }}
                    </TextTranslator>
                </p>
                <Skeleton className="h-12 w-64" />
            </section>

            {/* Slider */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Slider</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um controle deslizante para valores numéricos.",
                            en: "A slider control for numeric values.",
                            es: "Un control deslizante para valores numéricos.",
                        }}
                    </TextTranslator>
                </p>
                <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
            </section>

            {/* Switch */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Switch</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um interruptor para opções ligar/desligar.",
                            en: "A switch for on/off options.",
                            es: "Un interruptor para opciones de encendido/apagado.",
                        }}
                    </TextTranslator>
                </p>
                <Switch id="switch" />
                <Label htmlFor="switch" className="ml-2">Ativar</Label>
            </section>

            {/* Table */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Table</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Uma tabela para exibir dados estruturados.",
                            en: "A table to display structured data.",
                            es: "Una tabla para mostrar datos estructurados.",
                        }}
                    </TextTranslator>
                </p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Idade</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>João</TableCell>
                            <TableCell>30</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </section>

            {/* Tabs */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Tabs</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Abas para alternar entre conteúdos.",
                            en: "Tabs to switch between content.",
                            es: "Pestañas para alternar entre contenido.",
                        }}
                    </TextTranslator>
                </p>
                <Tabs defaultValue="tab1" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="tab1">Aba 1</TabsTrigger>
                        <TabsTrigger value="tab2">Aba 2</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Conteúdo da Aba 1</TabsContent>
                    <TabsContent value="tab2">Conteúdo da Aba 2</TabsContent>
                </Tabs>
            </section>

            {/* Textarea */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Textarea</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Uma área de texto para entradas longas.",
                            en: "A text area for long inputs.",
                            es: "Un área de texto para entradas largas.",
                        }}
                    </TextTranslator>
                </p>
                <Textarea placeholder="Digite algo..." />
            </section>

            {/* Toggle */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Toggle</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Um botão de alternância para estados.",
                            en: "A toggle button for states.",
                            es: "Un botón de alternancia para estados.",
                        }}
                    </TextTranslator>
                </p>
                <Toggle>Toggle</Toggle>
            </section>

            {/* Tooltip */}
            <section>
                <h2 className="text-2xl font-semibold mb-2">Tooltip</h2>
                <p className="mb-4">
                    <TextTranslator>
                        {{
                            ptBR: "Uma dica que aparece ao passar o mouse.",
                            en: "A tooltip that appears on hover.",
                            es: "Una pista que aparece al pasar el ratón.",
                        }}
                    </TextTranslator>
                </p>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline">Hover</Button>
                        </TooltipTrigger>
                        <TooltipContent>Dica aqui</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </section>
        </div>
    );
}