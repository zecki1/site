"use client";

import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import TextTranslator from "@/components/layout/TextTranslator";
import { BrazilFlag, USFlag, SpainFlag } from "@/components/layout/Flags";
import { Sidebar } from "@/components/layout/Sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, PlusCircle, LogOut, Loader2, UploadCloud, Image as ImageIcon, Sun, Moon, Globe, User as UserIcon } from "lucide-react";

// Definições de Tipos
type LanguageKey = "ptBR" | "en" | "es";
type MultiLangText = { [key in LanguageKey]: string; };
type MultiLangArray = { [key in LanguageKey]: string[]; };
type HeroData = { title: string; backgroundImage: string; typedItems: MultiLangArray; };
type SocialData = { instagram: string; whatsapp: string; behance: string; linkedin: string; };
type AboutData = { titulo: MultiLangText; subtitulo: MultiLangText; texto: MultiLangText; imagemPerfilUrl: string; };
type PortfolioItem = { id: string; titulo: MultiLangText; descricao: MultiLangText; categoria: string; imagemUrl: string; };
type PortfolioData = { titulo: MultiLangText; subtitulo: MultiLangText; items: PortfolioItem[]; };
type ContactData = { titulo: MultiLangText; localizacao: string; email: string; telefone: string; };
interface SiteData { hero: HeroData; social: SocialData; sobre: AboutData; portfolio: PortfolioData; contato: ContactData; }

function setNestedValue(obj: unknown, path: string, value: string | string[]): void {
    const isIndexable = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;
    const keys = path.split('.');
    let current: unknown = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!isIndexable(current)) return;
        current = current[key];
    }
    if (isIndexable(current)) {
        current[keys[keys.length - 1]] = value;
    }
}

const ImageUploader = ({ imageUrl, onImageUpload, onImageRemove, path, label }: { imageUrl: string; onImageUpload: (e: ChangeEvent<HTMLInputElement>, path: string) => Promise<void>; onImageRemove: (path: string, currentUrl: string) => Promise<void>; path: string; label: string; }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        if (file.size > 4 * 1024 * 1024) { toast.error("Imagem muito grande!", { description: "Use imagens com menos de 4MB." }); return; }
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { toast.error("Formato inválido!", { description: "Use apenas imagens JPG, PNG ou WebP." }); return; }
        const localPreviewUrl = URL.createObjectURL(file);
        setPreviewUrl(localPreviewUrl);
        setIsUploading(true);
        await onImageUpload(e, path);
        setIsUploading(false);
        setPreviewUrl(null);
    };

    const displayUrl = previewUrl || imageUrl;

    return (
        <div>
            <Label>{label}</Label>
            <div className="mt-2 flex items-center gap-4">
                {displayUrl ? (<Image src={displayUrl} alt="Preview" width={128} height={128} className="w-32 h-32 rounded-md object-cover border" />) : (<div className="w-32 h-32 rounded-md border border-dashed flex items-center justify-center bg-muted"><ImageIcon className="h-8 w-8 text-muted-foreground" /></div>)}
                <div className="flex flex-col gap-2">
                    <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={isUploading}>
                        {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                        {imageUrl ? 'Trocar Imagem' : 'Enviar Imagem'}
                    </Button>
                    {imageUrl && (<AlertDialog><AlertDialogTrigger asChild><Button type="button" variant="destructive" size="sm" disabled={isUploading}><Trash2 className="mr-2 h-4 w-4" />Remover</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Você tem certeza?</AlertDialogTitle><AlertDialogDescription>Esta ação removerá a imagem do banco de dados e do armazenamento. Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => onImageRemove(path, imageUrl)}>Confirmar</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>)}
                </div>
                <Input ref={inputRef} type="file" accept="image/jpeg, image/png, image/webp" className="hidden" onChange={handleFileChange} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Recomendado: JPG ou WebP, max 1000x1000, até 4MB.</p>
        </div>
    );
};

const DashboardHeader = ({ user, onSave, onLogout, isSaving }: { user: User | null; onSave: () => void; onLogout: () => void; isSaving: boolean; }) => {
    const { theme, setTheme } = useTheme();
    const { i18n } = useTranslation();
    const changeLanguage = (lang: string) => i18n.changeLanguage(lang);
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4"><Sidebar /><h1 className="text-xl font-bold tracking-tighter"><TextTranslator>{{ ptBR: "Painel de Gestão", en: "Management Panel", es: "Panel de Gestión" }}</TextTranslator></h1></div>
                <div className="flex items-center gap-2">
                    <Button onClick={onSave} disabled={isSaving}>{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}<TextTranslator>{{ ptBR: "Salvar e Publicar", en: "Save & Publish", es: "Guardar y Publicar" }}</TextTranslator></Button>
                    <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="icon"><Globe className="h-5 w-5" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={() => changeLanguage("ptBR")}><BrazilFlag className="h-5 w-5 mr-2" />Português</DropdownMenuItem><DropdownMenuItem onClick={() => changeLanguage("en")}><USFlag className="h-5 w-5 mr-2" />English</DropdownMenuItem><DropdownMenuItem onClick={() => changeLanguage("es")}><SpainFlag className="h-5 w-5 mr-2" />Español</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
                    <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /><Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /><span className="sr-only">Mudar tema</span></Button>
                    <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="icon"><UserIcon className="h-5 w-5" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-56"><DropdownMenuItem disabled className="flex flex-col items-start"><p className="text-sm font-medium">Logado como</p><p className="text-xs text-muted-foreground truncate w-full">{user?.email}</p></DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem onClick={onLogout}><LogOut className="mr-2 h-4 w-4" /><span>Sair</span></DropdownMenuItem></DropdownMenuContent></DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [siteData, setSiteData] = useState<SiteData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const docRef = doc(db, "clientes", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSiteData(docSnap.data().siteData as SiteData);
                } else {
                    setError("Seus dados de site não foram encontrados. Por favor, contate o suporte.");
                }
            } else {
                router.push("/login");
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, path: string) => {
        const { value } = e.target;
        setSiteData(prevData => {
            if (!prevData) return null;
            const newData: SiteData = JSON.parse(JSON.stringify(prevData));
            const processedValue = path.includes('typedItems') ? value.split(',').map(item => item.trim()) : value;
            setNestedValue(newData, path, processedValue);
            return newData;
        });
    };

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, path: string) => {
        if (!user || !e.target.files) return;
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        try {
            toast.info("Fazendo upload da imagem...");
            const response = await fetch('/api/upload', { method: 'POST', body: formData });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Falha na resposta do servidor.');
            }
            const data = await response.json();
            const imageUrl = data.secure_url;
            handleInputChange({ target: { value: imageUrl } } as ChangeEvent<HTMLInputElement>, path);
            toast.success("Upload concluído com sucesso!");
        } catch (err) {
            const error = err as Error;
            console.error(error);
            toast.error("Falha no upload da imagem.", { description: error.message });
        }
    };

    const onImageRemove = async (path: string, currentUrl: string) => {
        if (!currentUrl) return;
        const originalUrl = currentUrl;
        handleInputChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>, path);
        if (!currentUrl.includes('cloudinary')) {
            toast.success("Imagem removida da lista.");
            return;
        }
        try {
            toast.info("Removendo imagem do armazenamento...");
            const response = await fetch('/api/delete-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl: currentUrl }),
            });
            if (!response.ok) {
                throw new Error("Falha ao deletar no servidor.");
            }
            toast.success("Imagem removida com sucesso!");
        } catch (err) {
            
            console.error("Falha na remoção da imagem:", err);
            toast.error("Falha ao remover a imagem do armazenamento.");
            handleInputChange({ target: { value: originalUrl } } as ChangeEvent<HTMLInputElement>, path);
        }
    };

    const addPortfolioItem = () => {
        setSiteData(prev => {
            if (!prev) return null;
            const newItem: PortfolioItem = { id: `new-${Date.now()}`, titulo: { ptBR: 'Novo Título', en: 'New Title', es: 'Nuevo Título' }, descricao: { ptBR: 'Nova Descrição', en: 'New Description', es: 'Nueva Descripción' }, categoria: 'geral', imagemUrl: '' };
            return { ...prev, portfolio: { ...prev.portfolio, items: [newItem, ...prev.portfolio.items] } };
        });
        toast.info("Novo item de portfólio adicionado.");
    };

    const removePortfolioItem = (id: string) => {
        const itemToRemove = siteData?.portfolio.items.find(item => item.id === id);
        if (itemToRemove && itemToRemove.imagemUrl) {
            const itemIndex = siteData!.portfolio.items.indexOf(itemToRemove);
            const path = `portfolio.items.${itemIndex}.imagemUrl`;
            onImageRemove(path, itemToRemove.imagemUrl);
        }
        setSiteData(prev => prev ? ({ ...prev, portfolio: { ...prev.portfolio, items: prev.portfolio.items.filter((item) => item.id !== id) } }) : null);
        toast.success("Item removido. Salve para confirmar as alterações.");
    };

    const handleSave = async () => {
        if (!user || !siteData) return;
        setIsSaving(true);
        toast.info("Salvando alterações...");
        try {
            const docRef = doc(db, "clientes", user.uid);
            await updateDoc(docRef, { siteData });
            const clientSiteUrl = process.env.NEXT_PUBLIC_CLIENT_SITE_URL;
            const revalidateToken = process.env.NEXT_PUBLIC_REVALIDATE_TOKEN;
            if (clientSiteUrl && revalidateToken) {
                const res = await fetch(`${clientSiteUrl}/api/revalidate?secret=${revalidateToken}`);
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || `Falha na revalidação: status ${res.status}`);
                }
                toast.success("Dados salvos e site publicado com sucesso!");
            } else {
                toast.success("Dados salvos! (Revalidação do site público não configurada)");
            }
        } catch (err) {
            const error = err as Error;
            console.error("Erro ao salvar e revalidar:", error);
            toast.error("Erro ao publicar as alterações.", { description: error.message || "Verifique o console para mais detalhes." });
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = async () => { await signOut(auth); router.push('/login'); };

    if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    if (error) return <div className="flex h-screen items-center justify-center p-4"><div className="bg-destructive/10 p-6 rounded-lg text-destructive font-bold">{error}<Button onClick={handleLogout} variant="destructive" className="mt-4 w-full">Sair</Button></div></div>;
    if (!siteData) return <div className="flex h-screen items-center justify-center">Nenhum dado do site encontrado.</div>;
    const languages: LanguageKey[] = ['ptBR', 'en', 'es'];

    return (
        <div className="min-h-screen bg-muted/40">
            <DashboardHeader user={user} onSave={handleSave} onLogout={handleLogout} isSaving={isSaving} />
            <main className="container mx-auto p-4 md:p-8">
                <Accordion type="single" collapsible defaultValue="hero" className="w-full space-y-4">
                    <AccordionItem value="hero" className="border-none rounded-lg overflow-hidden shadow-sm">
                        <AccordionTrigger className="text-xl font-semibold bg-card px-6 py-4 hover:no-underline">
                            <TextTranslator>{{ ptBR: "Seção Hero (Início)", en: "Hero Section (Home)", es: "Sección Hero (Inicio)" }}</TextTranslator>
                        </AccordionTrigger>
                        <AccordionContent className="bg-card px-6 pb-6 pt-2">
                            <div className="space-y-6">
                                <ImageUploader label="Imagem de Fundo" imageUrl={siteData.hero.backgroundImage} onImageUpload={handleImageUpload} onImageRemove={onImageRemove} path="hero.backgroundImage" />
                                <Tabs defaultValue="ptBR">
                                    <TabsList className="grid w-full grid-cols-3">{languages.map(lang => <TabsTrigger key={lang} value={lang}>{lang.toUpperCase()}</TabsTrigger>)}</TabsList>
                                    {languages.map(lang => (
                                        <TabsContent key={lang} value={lang} className="mt-4">
                                            <div>
                                                <Label>Textos Animados (separados por vírgula)</Label>
                                                <Input value={siteData.hero.typedItems[lang].join(', ')} onChange={(e) => handleInputChange(e, `hero.typedItems.${lang}`)} />
                                            </div>
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="sobre" className="border-none rounded-lg overflow-hidden shadow-sm">
                        <AccordionTrigger className="px-6 py-4 bg-card hover:no-underline">
                            <TextTranslator>{{ ptBR: "Seção Sobre", en: "About Section", es: "Sección Sobre" }}</TextTranslator>
                        </AccordionTrigger>
                        <AccordionContent className="bg-card px-6 pb-6 pt-2">
                            <div className="space-y-6">
                                <ImageUploader label="Imagem de Perfil" imageUrl={siteData.sobre.imagemPerfilUrl} onImageUpload={handleImageUpload} onImageRemove={onImageRemove} path="sobre.imagemPerfilUrl" />
                                <Tabs defaultValue="ptBR">
                                    <TabsList className="grid w-full grid-cols-3">{languages.map(lang => <TabsTrigger key={lang} value={lang}>{lang.toUpperCase()}</TabsTrigger>)}</TabsList>
                                    {languages.map(lang => (
                                        <TabsContent key={lang} value={lang} className="space-y-4 mt-4">
                                            <div><Label>Título</Label><Input value={siteData.sobre.titulo[lang]} onChange={(e) => handleInputChange(e, `sobre.titulo.${lang}`)} /></div>
                                            <div><Label>Subtítulo</Label><Input value={siteData.sobre.subtitulo[lang]} onChange={(e) => handleInputChange(e, `sobre.subtitulo.${lang}`)} /></div>
                                            <div><Label>Texto Principal</Label><Textarea value={siteData.sobre.texto[lang]} onChange={(e) => handleInputChange(e, `sobre.texto.${lang}`)} rows={10} /></div>
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="portfolio" className="border-none rounded-lg overflow-hidden shadow-sm">
                        <AccordionTrigger className="px-6 py-4 bg-card hover:no-underline">
                            <TextTranslator>{{ ptBR: "Seção Portfólio", en: "Portfolio Section", es: "Sección Portafolio" }}</TextTranslator>
                        </AccordionTrigger>
                        <AccordionContent className="bg-card px-6 pb-6 pt-2">
                            <div className="flex justify-between items-center mb-6">
                                <CardDescription>Gerencie seus trabalhos.</CardDescription>
                                <Button size="sm" onClick={addPortfolioItem}><PlusCircle className="mr-2 h-4 w-4" />Adicionar Item</Button>
                            </div>
                            <div className="space-y-6">
                                {siteData.portfolio.items.map((item, index) => (
                                    <Card key={item.id} className="p-6 relative bg-muted/30">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild><Button variant="destructive" size="icon" className="absolute top-4 right-4 h-8 w-8"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader><AlertDialogTitle>Excluir Item?</AlertDialogTitle><AlertDialogDescription>{`Deseja realmente remover o item "${item.titulo.ptBR}"? A imagem associada será excluída permanentemente.`}</AlertDialogDescription></AlertDialogHeader>
                                                <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => removePortfolioItem(item.id)}>Excluir</AlertDialogAction></AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                        <CardHeader className="p-0 mb-4"><CardTitle className="text-lg">Item {index + 1}</CardTitle></CardHeader>
                                        <CardContent className="p-0 space-y-4">
                                            <ImageUploader label="Imagem" imageUrl={item.imagemUrl} onImageUpload={handleImageUpload} onImageRemove={onImageRemove} path={`portfolio.items.${index}.imagemUrl`} />
                                            <div><Label>Categoria</Label><Input value={item.categoria} onChange={(e) => handleInputChange(e, `portfolio.items.${index}.categoria`)} placeholder="ex: character-design, editorial..." /></div>
                                            <Tabs defaultValue="ptBR">
                                                <TabsList className="w-full grid grid-cols-3">{languages.map(lang => <TabsTrigger key={lang} value={lang}>{lang.toUpperCase()}</TabsTrigger>)}</TabsList>
                                                {languages.map(lang => (
                                                    <TabsContent key={lang} value={lang} className="space-y-4 mt-4">
                                                        <div><Label>Título ({lang})</Label><Input value={item.titulo[lang]} onChange={(e) => handleInputChange(e, `portfolio.items.${index}.titulo.${lang}`)} /></div>
                                                        <div><Label>Descrição ({lang})</Label><Textarea value={item.descricao[lang]} onChange={(e) => handleInputChange(e, `portfolio.items.${index}.descricao.${lang}`)} /></div>
                                                    </TabsContent>
                                                ))}
                                            </Tabs>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="contato" className="border-none rounded-lg overflow-hidden shadow-sm">
                        <AccordionTrigger className="px-6 py-4 bg-card hover:no-underline">
                            <TextTranslator>{{ ptBR: "Contato e Redes Sociais", en: "Contact & Social Media", es: "Contacto y Redes Sociales" }}</TextTranslator>
                        </AccordionTrigger>
                        <AccordionContent className="bg-card px-6 pb-6 pt-2">
                            <div className="space-y-6">
                                <Card className="bg-muted/30">
                                    <CardHeader><CardTitle>Redes Sociais & Links</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        <div><Label>Instagram</Label><Input value={siteData.social.instagram} onChange={(e) => handleInputChange(e, `social.instagram`)} /></div>
                                        <div><Label>WhatsApp (Link Completo)</Label><Input value={siteData.social.whatsapp} onChange={(e) => handleInputChange(e, `social.whatsapp`)} /></div>
                                        <div><Label>LinkedIn</Label><Input value={siteData.social.linkedin} onChange={(e) => handleInputChange(e, `social.linkedin`)} /></div>
                                        <div><Label>Behance</Label><Input value={siteData.social.behance} onChange={(e) => handleInputChange(e, `social.behance`)} /></div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-muted/30">
                                    <CardHeader><CardTitle>Informações de Contato</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        <div><Label>Telefone (Visível no site)</Label><Input value={siteData.contato.telefone} onChange={(e) => handleInputChange(e, `contato.telefone`)} /></div>
                                        <div><Label>Email</Label><Input value={siteData.contato.email} onChange={(e) => handleInputChange(e, `contato.email`)} /></div>
                                        <div><Label>Localização</Label><Input value={siteData.contato.localizacao} onChange={(e) => handleInputChange(e, `contato.localizacao`)} /></div>
                                        <Tabs defaultValue="ptBR">
                                            <TabsList className="w-full grid grid-cols-3">{languages.map(lang => <TabsTrigger key={lang} value={lang}>{lang.toUpperCase()}</TabsTrigger>)}</TabsList>
                                            {languages.map(lang => (
                                                <TabsContent key={lang} value={lang} className="mt-4">
                                                    <div><Label>Título da Seção ({lang})</Label><Input value={siteData.contato.titulo[lang]} onChange={(e) => handleInputChange(e, `contato.titulo.${lang}`)} /></div>
                                                </TabsContent>
                                            ))}
                                        </Tabs>
                                    </CardContent>
                                </Card>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </main>
        </div>
    );
}