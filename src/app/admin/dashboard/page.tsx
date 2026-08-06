"use client";

import { useEffect, useState, useRef, ChangeEvent, ReactNode } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import {
    Trash2,
    PlusCircle,
    LogOut,
    Loader2,
    UploadCloud,
    Image as ImageIcon,
    Sun,
    Moon,
    Globe,
    User as UserIcon,
    ExternalLink,
    Save,
    LayoutTemplate,
    UserRound,
    Images,
    Contact,
    Youtube,
    FileVideo,
    Sparkles,
} from "lucide-react";

// Definições de Tipos
type LanguageKey = "ptBR" | "en" | "es";
type MultiLangText = { [key in LanguageKey]: string; };
type MultiLangArray = { [key in LanguageKey]: string[]; };
type MediaType = "imagem" | "video" | "youtube";
type HeroData = { title: string; backgroundImage: string; typedItems: MultiLangArray; };
type SocialData = { instagram: string; whatsapp: string; behance: string; linkedin: string; };
type AboutData = { titulo: MultiLangText; subtitulo: MultiLangText; texto: MultiLangText; imagemPerfilUrl: string; };
type PortfolioItem = { id: string; titulo: MultiLangText; descricao: MultiLangText; categoria: string; tipo: MediaType; imagemUrl: string; videoUrl?: string; youtubeUrl?: string; };
type PortfolioData = { titulo: MultiLangText; subtitulo: MultiLangText; items: PortfolioItem[]; };
type ContactData = { titulo: MultiLangText; localizacao: string; email: string; telefone: string; };
interface SiteData { hero: HeroData; social: SocialData; sobre: AboutData; portfolio: PortfolioData; contato: ContactData; }
interface ClientSettings { slug?: string; siteUrl?: string; revalidateToken?: string; }

const mediaTypeLabels: Record<MediaType, { ptBR: string; en: string; es: string }> = {
    imagem: { ptBR: "Imagem", en: "Image", es: "Imagen" },
    video: { ptBR: "Vídeo", en: "Video", es: "Vídeo" },
    youtube: { ptBR: "YouTube (Reel)", en: "YouTube (Reel)", es: "YouTube (Reel)" },
};

const sectionIcons: Record<string, typeof LayoutTemplate> = {
    hero: LayoutTemplate,
    sobre: UserRound,
    portfolio: Images,
    contato: Contact,
};

const mediaTypeIcon: Record<MediaType, typeof ImageIcon> = {
    imagem: ImageIcon,
    video: FileVideo,
    youtube: Youtube,
};

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

type ImageUploadHandler = (e: ChangeEvent<HTMLInputElement>, path: string, folder?: string) => Promise<void>;
type ImageRemoveHandler = (path: string, currentUrl: string) => Promise<void>;

const ImageUploader = ({ imageUrl, onImageUpload, onImageRemove, path, label, folder }: { imageUrl: string; onImageUpload: ImageUploadHandler; onImageRemove: ImageRemoveHandler; path: string; label: string; folder?: string; }) => {
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
        await onImageUpload(e, path, folder);
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
                <div className="flex items-center gap-4">
                    <Sidebar />
                    <div className="flex flex-col leading-tight">
                        <h1 className="text-lg md:text-xl font-bold tracking-tighter">
                            <TextTranslator>{{ ptBR: "Painel de Gestão", en: "Management Panel", es: "Panel de Gestión" }}</TextTranslator>
                        </h1>
                        <span className="hidden sm:inline text-xs text-muted-foreground">
                            <TextTranslator>{{ ptBR: "Edite o conteúdo do seu site", en: "Edit your website content", es: "Edita el contenido de tu sitio" }}</TextTranslator>
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={onSave} disabled={isSaving} className="gap-2">
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        <span className="hidden sm:inline"><TextTranslator>{{ ptBR: "Salvar e Publicar", en: "Save & Publish", es: "Guardar y Publicar" }}</TextTranslator></span>
                        <span className="sm:hidden">Salvar</span>
                    </Button>
                    <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="icon"><Globe className="h-5 w-5" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={() => changeLanguage("ptBR")}><BrazilFlag className="h-5 w-5 mr-2" />Português</DropdownMenuItem><DropdownMenuItem onClick={() => changeLanguage("en")}><USFlag className="h-5 w-5 mr-2" />English</DropdownMenuItem><DropdownMenuItem onClick={() => changeLanguage("es")}><SpainFlag className="h-5 w-5 mr-2" />Español</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
                    <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /><Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /><span className="sr-only">Mudar tema</span></Button>
                    <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="icon"><UserIcon className="h-5 w-5" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-56"><DropdownMenuItem disabled className="flex flex-col items-start"><p className="text-sm font-medium">Logado como</p><p className="text-xs text-muted-foreground truncate w-full">{user?.email}</p></DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem onClick={onLogout}><LogOut className="mr-2 h-4 w-4" /><span>Sair</span></DropdownMenuItem></DropdownMenuContent></DropdownMenu>
                </div>
            </div>
        </header>
    );
};

const SectionHeader = ({ id, title }: { id: string; title: MultiLangText }) => {
    const Icon = sectionIcons[id] || LayoutTemplate;
    return (
        <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
            </span>
            <span className="flex flex-col items-start leading-tight">
                <TextTranslator>{title}</TextTranslator>
                <span className="text-xs font-normal text-muted-foreground">
                    <TextTranslator>{{ ptBR: "Preencha e salve para publicar", en: "Fill in and save to publish", es: "Completa y guarda para publicar" }}</TextTranslator>
                </span>
            </span>
        </span>
    );
};

const LanguageTabs = ({ defaultValue = "ptBR", children }: { defaultValue?: string; children: (lang: LanguageKey) => ReactNode }) => {
    const languages: LanguageKey[] = ['ptBR', 'en', 'es'];
    return (
        <Tabs defaultValue={defaultValue}>
            <TabsList className="grid w-full grid-cols-3">
                {languages.map(lang => <TabsTrigger key={lang} value={lang}>{lang.toUpperCase()}</TabsTrigger>)}
            </TabsList>
            {languages.map(lang => (
                <TabsContent key={lang} value={lang} className="mt-4 space-y-4">
                    {children(lang)}
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [siteData, setSiteData] = useState<SiteData | null>(null);
    const [clientSettings, setClientSettings] = useState<ClientSettings>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasChanges, setHasChanges] = useState(false);
    const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

    const uploadFolder = clientSettings.slug || user?.uid || 'client_portfolio';

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const docRef = doc(db, "clientes", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setSiteData(data.siteData as SiteData);
                    setClientSettings((data.settings as ClientSettings) || {});
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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: string } }, path: string) => {
        const { value } = e.target;
        setSiteData(prevData => {
            if (!prevData) return null;
            const newData: SiteData = JSON.parse(JSON.stringify(prevData));
            const processedValue = path.includes('typedItems') ? value.split(',').map(item => item.trim()) : value;
            setNestedValue(newData, path, processedValue);
            return newData;
        });
        setHasChanges(true);
    };

    const handleImageUpload: ImageUploadHandler = async (e, path, folder) => {
        if (!user || !e.target.files) return;
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder || uploadFolder);
        try {
            toast.info("Fazendo upload da imagem...");
            const idToken = await user.getIdToken();
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: { Authorization: `Bearer ${idToken}` },
                body: formData,
            });
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

    const onImageRemove: ImageRemoveHandler = async (path, currentUrl) => {
        if (!currentUrl) return;
        const originalUrl = currentUrl;
        handleInputChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>, path);
        if (!currentUrl.includes('cloudinary')) {
            toast.success("Imagem removida da lista.");
            return;
        }
        try {
            toast.info("Removendo imagem do armazenamento...");
            const idToken = await user!.getIdToken();
            const response = await fetch('/api/delete-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
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
            const newItem: PortfolioItem = { id: `new-${Date.now()}`, titulo: { ptBR: 'Novo Título', en: 'New Title', es: 'Nuevo Título' }, descricao: { ptBR: 'Nova Descrição', en: 'New Description', es: 'Nueva Descripción' }, categoria: 'geral', tipo: 'imagem', imagemUrl: '' };
            return { ...prev, portfolio: { ...prev.portfolio, items: [newItem, ...prev.portfolio.items] } };
        });
        setHasChanges(true);
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
        setHasChanges(true);
        toast.success("Item removido. Salve para confirmar as alterações.");
    };

    const handleSave = async () => {
        if (!user || !siteData) return;
        setIsSaving(true);
        toast.info("Salvando alterações...");
        try {
            const docRef = doc(db, "clientes", user.uid);
            await updateDoc(docRef, { siteData });
            const idToken = await user.getIdToken();
            const res = await fetch('/api/publish', {
                method: 'POST',
                headers: { Authorization: `Bearer ${idToken}` },
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || errorData.error || `Falha na publicação: status ${res.status}`);
            }
            toast.success("Dados salvos e site publicado com sucesso!");
            setHasChanges(false);
            setLastSavedAt(Date.now());
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

    const siteUrl = clientSettings.siteUrl || process.env.NEXT_PUBLIC_CLIENT_SITE_URL || '';

    return (
        <div className="min-h-screen bg-muted/40">
            <DashboardHeader user={user} onSave={handleSave} onLogout={handleLogout} isSaving={isSaving} />
            <main className="container mx-auto p-4 md:p-8">
                {/* Barra de status / publicação */}
                <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Card className="lg:col-span-2 bg-card">
                        <CardContent className="p-5 flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-3">
                                <span className={`flex h-3 w-3 rounded-full ${hasChanges ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                                <div>
                                    <p className="font-semibold">
                                        {hasChanges
                                            ? <TextTranslator>{{ ptBR: "Alterações não salvas", en: "Unsaved changes", es: "Cambios sin guardar" }}</TextTranslator>
                                            : <TextTranslator>{{ ptBR: "Tudo sincronizado", en: "All synced", es: "Todo sincronizado" }}</TextTranslator>}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {lastSavedAt
                                            ? <span>Última publicação: {new Date(lastSavedAt).toLocaleString('pt-BR')}</span>
                                            : <TextTranslator>{{ ptBR: "Suas alterações serão publicadas ao clicar em Salvar", en: "Your changes will be published when you click Save", es: "Tus cambios se publicarán al hacer clic en Guardar" }}</TextTranslator>}
                                    </p>
                                </div>
                            </div>
                            {hasChanges && (
                                <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                    <TextTranslator>{{ ptBR: "Publicar agora", en: "Publish now", es: "Publicar ahora" }}</TextTranslator>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                    <Card className="bg-card">
                        <CardContent className="p-5 flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                    <TextTranslator>{{ ptBR: "Site público", en: "Public site", es: "Sitio público" }}</TextTranslator>
                                </p>
                                <p className="font-semibold text-sm truncate max-w-[200px]">{siteUrl || '—'}</p>
                            </div>
                            {siteUrl && (
                                <Button asChild variant="outline" size="icon" aria-label="Abrir site público">
                                    <a href={siteUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /></a>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Accordion type="single" collapsible defaultValue="hero" className="w-full space-y-4">
                    <AccordionItem value="hero" className="border-none rounded-lg overflow-hidden shadow-sm bg-card">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                            <SectionHeader id="hero" title={{ ptBR: "Seção Hero (Início)", en: "Hero Section (Home)", es: "Sección Hero (Inicio)" }} />
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-2">
                            <Separator className="mb-6" />
                            <div className="space-y-6">
                                <ImageUploader label="Imagem de Fundo" imageUrl={siteData.hero.backgroundImage} onImageUpload={handleImageUpload} onImageRemove={onImageRemove} path="hero.backgroundImage" folder={uploadFolder} />
                                <LanguageTabs>
                                    {(lang) => (
                                        <div>
                                            <Label>Textos Animados (separados por vírgula)</Label>
                                            <Input value={siteData.hero.typedItems[lang].join(', ')} onChange={(e) => handleInputChange(e, `hero.typedItems.${lang}`)} placeholder="ex: Desenvolvedor, Design, Tech Lead" />
                                            <p className="text-xs text-muted-foreground mt-1">Cada texto aparecerá em sequência no topo do site.</p>
                                        </div>
                                    )}
                                </LanguageTabs>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="sobre" className="border-none rounded-lg overflow-hidden shadow-sm bg-card">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                            <SectionHeader id="sobre" title={{ ptBR: "Seção Sobre", en: "About Section", es: "Sección Sobre" }} />
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-2">
                            <Separator className="mb-6" />
                            <div className="space-y-6">
                                <ImageUploader label="Imagem de Perfil" imageUrl={siteData.sobre.imagemPerfilUrl} onImageUpload={handleImageUpload} onImageRemove={onImageRemove} path="sobre.imagemPerfilUrl" folder={uploadFolder} />
                                <LanguageTabs>
                                    {(lang) => (
                                        <>
                                            <div><Label>Título</Label><Input value={siteData.sobre.titulo[lang]} onChange={(e) => handleInputChange(e, `sobre.titulo.${lang}`)} /></div>
                                            <div><Label>Subtítulo</Label><Input value={siteData.sobre.subtitulo[lang]} onChange={(e) => handleInputChange(e, `sobre.subtitulo.${lang}`)} /></div>
                                            <div><Label>Texto Principal</Label><Textarea value={siteData.sobre.texto[lang]} onChange={(e) => handleInputChange(e, `sobre.texto.${lang}`)} rows={10} /></div>
                                        </>
                                    )}
                                </LanguageTabs>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="portfolio" className="border-none rounded-lg overflow-hidden shadow-sm bg-card">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                            <SectionHeader id="portfolio" title={{ ptBR: "Seção Portfólio", en: "Portfolio Section", es: "Sección Portafolio" }} />
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-2">
                            <Separator className="mb-6" />
                            <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
                                <CardDescription><TextTranslator>{{ ptBR: "Gerencie seus trabalhos (imagens, vídeos ou reels do YouTube).", en: "Manage your works (images, videos or YouTube reels).", es: "Gestiona tus trabajos (imágenes, vídeos o reels de YouTube)." }}</TextTranslator></CardDescription>
                                <Button size="sm" onClick={addPortfolioItem}><PlusCircle className="mr-2 h-4 w-4" /><TextTranslator>{{ ptBR: "Adicionar Item", en: "Add Item", es: "Añadir Elemento" }}</TextTranslator></Button>
                            </div>
                            <div className="space-y-6">
                                {siteData.portfolio.items.map((item, index) => {
                                    const TypeIcon = mediaTypeIcon[item.tipo] || ImageIcon;
                                    return (
                                        <Card key={item.id} className="p-6 relative bg-muted/30">
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild><Button variant="destructive" size="icon" className="absolute top-4 right-4 h-8 w-8"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader><AlertDialogTitle>Excluir Item?</AlertDialogTitle><AlertDialogDescription>{`Deseja realmente remover o item "${item.titulo.ptBR}"? A imagem associada será excluída permanentemente.`}</AlertDialogDescription></AlertDialogHeader>
                                                    <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => removePortfolioItem(item.id)}>Excluir</AlertDialogAction></AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                            <CardHeader className="p-0 mb-4 pr-10">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><TypeIcon className="h-5 w-5" /></span>
                                                    <div className="flex flex-col">
                                                        <CardTitle className="text-lg">Item {index + 1}</CardTitle>
                                                        <Badge variant="secondary" className="mt-1 w-fit gap-1">
                                                            <TypeIcon className="h-3 w-3" />
                                                            {mediaTypeLabels[item.tipo]?.ptBR || item.tipo}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-0 space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <Label>Tipo de Mídia</Label>
                                                        <Select value={item.tipo} onValueChange={(v) => handleInputChange({ target: { value: v } }, `portfolio.items.${index}.tipo`)}>
                                                            <SelectTrigger className="mt-1.5 w-full">
                                                                <SelectValue placeholder="Selecione o tipo" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="imagem"><span className="flex items-center gap-2"><ImageIcon className="h-4 w-4" />Imagem</span></SelectItem>
                                                                <SelectItem value="video"><span className="flex items-center gap-2"><FileVideo className="h-4 w-4" />Vídeo</span></SelectItem>
                                                                <SelectItem value="youtube"><span className="flex items-center gap-2"><Youtube className="h-4 w-4" />YouTube (Reel)</span></SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label>Categoria</Label>
                                                        <Input className="mt-1.5" value={item.categoria} onChange={(e) => handleInputChange(e, `portfolio.items.${index}.categoria`)} placeholder="ex: tatuagens, papel, editorial..." />
                                                        <p className="text-xs text-muted-foreground mt-1">Use a mesma palavra em itens da mesma categoria.</p>
                                                    </div>
                                                </div>

                                                {(item.tipo === 'imagem' || item.tipo === 'video') && (
                                                    <ImageUploader label={item.tipo === 'video' ? "Capa/Thumbnail do Vídeo" : "Imagem"} imageUrl={item.imagemUrl} onImageUpload={handleImageUpload} onImageRemove={onImageRemove} path={`portfolio.items.${index}.imagemUrl`} folder={uploadFolder} />
                                                )}

                                                {item.tipo === 'video' && (
                                                    <div>
                                                        <Label>URL do Vídeo (arquivo .mp4)</Label>
                                                        <Input className="mt-1.5" value={item.videoUrl || ''} onChange={(e) => handleInputChange(e, `portfolio.items.${index}.videoUrl`)} placeholder="https://.../video.mp4" />
                                                    </div>
                                                )}

                                                {item.tipo === 'youtube' && (
                                                    <>
                                                        <div>
                                                            <Label className="flex items-center gap-1"><Youtube className="h-4 w-4" /> URL do YouTube</Label>
                                                            <Input className="mt-1.5" value={item.youtubeUrl || ''} onChange={(e) => handleInputChange(e, `portfolio.items.${index}.youtubeUrl`)} placeholder="https://www.youtube.com/watch?v=..." />
                                                            <p className="text-xs text-muted-foreground mt-1">O vídeo será exibido como reel 9:16.</p>
                                                        </div>
                                                        <ImageUploader label="Thumbnail personalizada (opcional)" imageUrl={item.imagemUrl} onImageUpload={handleImageUpload} onImageRemove={onImageRemove} path={`portfolio.items.${index}.imagemUrl`} folder={uploadFolder} />
                                                    </>
                                                )}

                                                <LanguageTabs>
                                                    {(lang) => (
                                                        <>
                                                            <div><Label>Título ({lang})</Label><Input value={item.titulo[lang]} onChange={(e) => handleInputChange(e, `portfolio.items.${index}.titulo.${lang}`)} /></div>
                                                            <div><Label>Descrição ({lang})</Label><Textarea value={item.descricao[lang]} onChange={(e) => handleInputChange(e, `portfolio.items.${index}.descricao.${lang}`)} /></div>
                                                        </>
                                                    )}
                                                </LanguageTabs>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="contato" className="border-none rounded-lg overflow-hidden shadow-sm bg-card">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline">
                            <SectionHeader id="contato" title={{ ptBR: "Contato e Redes Sociais", en: "Contact & Social Media", es: "Contacto y Redes Sociales" }} />
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-2">
                            <Separator className="mb-6" />
                            <div className="space-y-6">
                                <Card className="bg-muted/30">
                                    <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" /> Redes Sociais & Links</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        <div><Label>Instagram</Label><Input value={siteData.social.instagram} onChange={(e) => handleInputChange(e, `social.instagram`)} placeholder="https://instagram.com/..." /></div>
                                        <div><Label>WhatsApp (Link Completo)</Label><Input value={siteData.social.whatsapp} onChange={(e) => handleInputChange(e, `social.whatsapp`)} placeholder="https://wa.me/55..." /></div>
                                        <div><Label>LinkedIn</Label><Input value={siteData.social.linkedin} onChange={(e) => handleInputChange(e, `social.linkedin`)} placeholder="https://linkedin.com/in/..." /></div>
                                        <div><Label>Behance</Label><Input value={siteData.social.behance} onChange={(e) => handleInputChange(e, `social.behance`)} placeholder="https://behance.net/..." /></div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-muted/30">
                                    <CardHeader><CardTitle className="flex items-center gap-2"><Contact className="h-5 w-5" /> Informações de Contato</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div><Label>Telefone (Visível no site)</Label><Input value={siteData.contato.telefone} onChange={(e) => handleInputChange(e, `contato.telefone`)} /></div>
                                            <div><Label>Email</Label><Input value={siteData.contato.email} onChange={(e) => handleInputChange(e, `contato.email`)} /></div>
                                        </div>
                                        <div><Label>Localização</Label><Input value={siteData.contato.localizacao} onChange={(e) => handleInputChange(e, `contato.localizacao`)} /></div>
                                        <LanguageTabs>
                                            {(lang) => (
                                                <div><Label>Título da Seção ({lang})</Label><Input value={siteData.contato.titulo[lang]} onChange={(e) => handleInputChange(e, `contato.titulo.${lang}`)} /></div>
                                            )}
                                        </LanguageTabs>
                                    </CardContent>
                                </Card>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5" />
                    <TextTranslator>{{ ptBR: "Suas alterações são publicadas automaticamente no seu site.", en: "Your changes are published automatically on your site.", es: "Tus cambios se publican automáticamente en tu sitio." }}</TextTranslator>
                </div>
            </main>
        </div>
    );
}
