"use client";

import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, PlusCircle, LogOut, Loader2, UploadCloud, Image as ImageIcon } from "lucide-react";

// --- Tipagens ---
type LanguageKey = "ptBR" | "en" | "es";
type MultiLangText = { [key in LanguageKey]: string; };
type MultiLangArray = { [key in LanguageKey]: string[]; };

type HeroData = { title: string; backgroundImage: string; typedItems: MultiLangArray; };
type SocialData = { instagram: string; whatsapp: string; behance: string; linkedin: string; };
type AboutData = { titulo: MultiLangText; subtitulo: MultiLangText; texto: MultiLangText; imagemPerfilUrl: string; };
type PortfolioItem = { id: string; titulo: MultiLangText; descricao: MultiLangText; categoria: string; imagemUrl: string; };
type PortfolioData = { titulo: MultiLangText; subtitulo: MultiLangText; items: PortfolioItem[]; };
type ContactData = { titulo: MultiLangText; localizacao: string; email: string; telefone: string; };

interface SiteData {
    hero: HeroData;
    social: SocialData;
    sobre: AboutData;
    portfolio: PortfolioData;
    contato: ContactData;
}

// --- Componente Auxiliar de Upload ---
const ImageUploader = ({ imageUrl, onImageUpload, onImageRemove, path, label }: { imageUrl: string; onImageUpload: (e: ChangeEvent<HTMLInputElement>, path: string) => Promise<void>; onImageRemove: (path: string, currentUrl: string) => Promise<void>; path: string; label: string; }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        if (file.size > 2 * 1024 * 1024) { toast.error("Imagem muito grande!", { description: "Use imagens com menos de 2MB." }); return; }
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { toast.error("Formato inválido!", { description: "Use apenas imagens JPG, PNG ou WebP." }); return; }
        setIsUploading(true);
        await onImageUpload(e, path);
        setIsUploading(false);
    };

    return (
        <div>
            <Label>{label}</Label>
            <div className="mt-2 flex items-center gap-4">
                {imageUrl ? (
                    <Image src={imageUrl} alt="Preview" width={128} height={128} className="w-32 h-32 rounded-md object-cover border" />
                ) : (
                    <div className="w-32 h-32 rounded-md border border-dashed flex items-center justify-center bg-muted"><ImageIcon className="h-8 w-8 text-muted-foreground" /></div>
                )}
                <div className="flex flex-col gap-2">
                    <Button type="button" variant="outline" onClick={() => inputRef.current?.click()} disabled={isUploading}>
                        {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                        {imageUrl ? 'Trocar Imagem' : 'Enviar Imagem'}
                    </Button>
                    {imageUrl && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button type="button" variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4" />Remover</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                    <AlertDialogDescription>Esta ação removerá a imagem permanentemente. Não pode ser desfeita.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => onImageRemove(path, imageUrl)}>Confirmar</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
                <Input ref={inputRef} type="file" accept="image/jpeg, image/png, image/webp" className="hidden" onChange={handleFileChange} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Recomendado: JPG ou WebP, max 1000x1000, até 2MB.</p>
        </div>
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
        const keys = path.split('.');
        setSiteData(prevData => {
            if (!prevData) return null;
            const newData = JSON.parse(JSON.stringify(prevData));
            let current: any = newData;
            for (let i = 0; i < keys.length - 1; i++) { current = current[keys[i]]; }
            if (keys.length > 0 && keys[keys.length - 2] === 'typedItems') {
                current[keys[keys.length - 1]] = value.split(',').map(item => item.trim());
            } else {
                current[keys[keys.length - 1]] = value;
            }
            return newData;
        });
    };

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, path: string) => {
        if (!user || !e.target.files) return;
        const file = e.target.files[0];
        const filePath = `${user.uid}/${file.name}-${Date.now()}`;
        const storageRef = ref(storage, filePath);
        try {
            toast.info("Fazendo upload...");
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            handleInputChange({ target: { value: downloadURL } } as ChangeEvent<HTMLInputElement>, path);
            toast.success("Upload concluído!");
        } catch { toast.error("Falha no upload."); }
    };

    const onImageRemove = async (path: string, currentUrl: string) => {
        if (!currentUrl) return;
        handleInputChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>, path);
        try {
            if (currentUrl.includes('firebasestorage')) {
                const imageRef = ref(storage, currentUrl);
                await deleteObject(imageRef);
            }
            toast.success("Imagem removida!");
        } catch { toast.warning("Imagem removida do cadastro (arquivo pode já não existir)."); }
    };

    const addPortfolioItem = () => {
        setSiteData(prev => {
            if (!prev) return null;
            const newItem: PortfolioItem = {
                id: `new-${Date.now()}`,
                titulo: { ptBR: 'Novo Título', en: 'New Title', es: 'Nuevo Título' },
                descricao: { ptBR: 'Nova Descrição', en: 'New Description', es: 'Nueva Descripción' },
                categoria: 'geral',
                imagemUrl: ''
            };
            return { ...prev, portfolio: { ...prev.portfolio, items: [newItem, ...prev.portfolio.items] } };
        });
        toast.info("Novo item adicionado!");
    };

    const removePortfolioItem = (id: string) => {
        setSiteData(prev => prev ? ({ ...prev, portfolio: { ...prev.portfolio, items: prev.portfolio.items.filter((item) => item.id !== id) } }) : null);
        toast.success("Item removido da lista (salve para confirmar).");
    };

    const handleSave = async () => {
        if (!user || !siteData) return;
        setIsSaving(true);
        try {
            const docRef = doc(db, "clientes", user.uid);
            await updateDoc(docRef, { siteData });
            const clientSiteUrl = process.env.NEXT_PUBLIC_CLIENT_SITE_URL;
            const revalidateToken = process.env.NEXT_PUBLIC_REVALIDATE_TOKEN;
            if (clientSiteUrl && revalidateToken) {
                await fetch(`${clientSiteUrl}/api/revalidate?secret=${revalidateToken}`);
                toast.success("Dados salvos e site atualizado!");
            } else {
                toast.success("Dados salvos! (Revalidação não configurada)");
            }
        } catch (err) {
            console.error(err);
            toast.error("Erro ao salvar os dados.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = async () => { await signOut(auth); router.push('/login'); };

    if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    if (error) return <div className="flex h-screen items-center justify-center p-4"><div className="bg-destructive/10 p-6 rounded-lg text-destructive font-bold">{error}<Button onClick={handleLogout} variant="destructive" className="mt-4 w-full">Sair</Button></div></div>;
    if (!siteData) return null;

    const languages: LanguageKey[] = ['ptBR', 'en', 'es'];

    return (
        <div className="bg-muted min-h-screen pb-20">
            <div className="container mx-auto p-4 md:p-8">
                <header className="flex flex-wrap gap-4 justify-between items-center mb-8 pb-4 border-b bg-card p-6 rounded-lg shadow-sm">
                    <div><h1 className="text-3xl font-bold">Painel de Gerenciamento</h1><p className="text-muted-foreground">{user?.email}</p></div>
                    <div className="flex gap-2"><Button onClick={handleSave} disabled={isSaving}>{isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Salvar e Publicar</Button><Button variant="outline" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" /> Sair</Button></div>
                </header>

                <Accordion type="single" collapsible defaultValue="hero" className="w-full space-y-4">
                    <AccordionItem value="hero" className="border-none rounded-lg overflow-hidden shadow-sm"><AccordionTrigger className="px-6 py-4 bg-card hover:no-underline">Seção Hero (Início)</AccordionTrigger><AccordionContent className="bg-card px-6 pb-6 pt-2">
                        <div className="space-y-6">
                            <ImageUploader label="Imagem de Fundo" imageUrl={siteData.hero.backgroundImage} onImageUpload={handleImageUpload} onImageRemove={onImageRemove} path="hero.backgroundImage" />
                            <Tabs defaultValue="ptBR"><TabsList className="w-full grid grid-cols-3">{languages.map(lang => <TabsTrigger key={lang} value={lang}>{lang.toUpperCase()}</TabsTrigger>)}</TabsList>
                                {languages.map(lang => (<TabsContent key={lang} value={lang} className="mt-4"><div><Label>Textos Animados (separados por vírgula)</Label><Input value={siteData.hero.typedItems[lang].join(', ')} onChange={(e) => handleInputChange(e, `hero.typedItems.${lang}`)} /></div></TabsContent>))}
                            </Tabs>
                        </div>
                    </AccordionContent></AccordionItem>

                    <AccordionItem value="sobre" className="border-none rounded-lg overflow-hidden shadow-sm"><AccordionTrigger className="px-6 py-4 bg-card hover:no-underline">Seção Sobre</AccordionTrigger><AccordionContent className="bg-card px-6 pb-6 pt-2">
                        <div className="space-y-6">
                            <ImageUploader label="Imagem de Perfil" imageUrl={siteData.sobre.imagemPerfilUrl} onImageUpload={handleImageUpload} onImageRemove={onImageRemove} path="sobre.imagemPerfilUrl" />
                            <Tabs defaultValue="ptBR"><TabsList className="w-full grid grid-cols-3">{languages.map(lang => <TabsTrigger key={lang} value={lang}>{lang.toUpperCase()}</TabsTrigger>)}</TabsList>
                                {languages.map(lang => (<TabsContent key={lang} value={lang} className="space-y-4 mt-4">
                                    <div><Label>Título</Label><Input value={siteData.sobre.titulo[lang]} onChange={(e) => handleInputChange(e, `sobre.titulo.${lang}`)} /></div>
                                    <div><Label>Subtítulo</Label><Input value={siteData.sobre.subtitulo[lang]} onChange={(e) => handleInputChange(e, `sobre.subtitulo.${lang}`)} /></div>
                                    <div><Label>Texto Principal</Label><Textarea value={siteData.sobre.texto[lang]} onChange={(e) => handleInputChange(e, `sobre.texto.${lang}`)} rows={10} /></div>
                                </TabsContent>))}
                            </Tabs>
                        </div>
                    </AccordionContent></AccordionItem>

                    <AccordionItem value="portfolio" className="border-none rounded-lg overflow-hidden shadow-sm"><AccordionTrigger className="px-6 py-4 bg-card hover:no-underline">Seção Portfólio</AccordionTrigger><AccordionContent className="bg-card px-6 pb-6 pt-2">
                        <div className="flex justify-between items-center mb-6"><CardDescription>Gerencie seus trabalhos.</CardDescription><Button size="sm" onClick={addPortfolioItem}><PlusCircle className="mr-2 h-4 w-4" />Adicionar Item</Button></div>
                        <div className="space-y-6">
                            {siteData.portfolio.items.map((item, index) => (
                                <Card key={item.id} className="relative bg-muted/30"><CardHeader className="pb-2"><CardTitle className="text-lg">Item {index + 1}</CardTitle><AlertDialog><AlertDialogTrigger asChild><Button variant="destructive" size="icon" className="absolute top-4 right-4 h-8 w-8"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Excluir Item?</AlertDialogTitle><AlertDialogDescription>Isso removerá o item do painel. Salve para confirmar.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => removePortfolioItem(item.id)}>Excluir</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></CardHeader><CardContent className="space-y-4">
                                    <ImageUploader label="Imagem" imageUrl={item.imagemUrl} onImageUpload={handleImageUpload} onImageRemove={onImageRemove} path={`portfolio.items.${index}.imagemUrl`} />
                                    <div><Label>Categoria</Label><Input value={item.categoria} onChange={(e) => handleInputChange(e, `portfolio.items.${index}.categoria`)} placeholder="ex: character-design, editorial..." /></div>
                                    <Tabs defaultValue="ptBR"><TabsList className="w-full grid grid-cols-3">{languages.map(lang => <TabsTrigger key={lang} value={lang}>{lang.toUpperCase()}</TabsTrigger>)}</TabsList>
                                        {languages.map(lang => (<TabsContent key={lang} value={lang} className="space-y-4 mt-4">
                                            <div><Label>Título ({lang})</Label><Input value={item.titulo[lang]} onChange={(e) => handleInputChange(e, `portfolio.items.${index}.titulo.${lang}`)} /></div>
                                            <div><Label>Descrição ({lang})</Label><Textarea value={item.descricao[lang]} onChange={(e) => handleInputChange(e, `portfolio.items.${index}.descricao.${lang}`)} /></div>
                                        </TabsContent>))}
                                    </Tabs>
                                </CardContent></Card>
                            ))}
                        </div>
                    </AccordionContent></AccordionItem>

                    <AccordionItem value="contato" className="border-none rounded-lg overflow-hidden shadow-sm"><AccordionTrigger className="px-6 py-4 bg-card hover:no-underline">Seção Contato e Redes Sociais</AccordionTrigger><AccordionContent className="bg-card px-6 pb-6 pt-2">
                        <div className="space-y-6">
                            <Card className="bg-muted/30"><CardHeader><CardTitle>Redes Sociais & Links</CardTitle></CardHeader><CardContent className="space-y-4">
                                <div><Label>Instagram</Label><Input value={siteData.social.instagram} onChange={(e) => handleInputChange(e, `social.instagram`)} /></div>
                                <div><Label>WhatsApp (Link Completo)</Label><Input value={siteData.social.whatsapp} onChange={(e) => handleInputChange(e, `social.whatsapp`)} /></div>
                                <div><Label>LinkedIn</Label><Input value={siteData.social.linkedin} onChange={(e) => handleInputChange(e, `social.linkedin`)} /></div>
                                <div><Label>Behance</Label><Input value={siteData.social.behance} onChange={(e) => handleInputChange(e, `social.behance`)} /></div>
                            </CardContent></Card>
                            <Card className="bg-muted/30"><CardHeader><CardTitle>Informações de Contato</CardTitle></CardHeader><CardContent className="space-y-4">
                                <div><Label>Telefone (Visível no site)</Label><Input value={siteData.contato.telefone} onChange={(e) => handleInputChange(e, `contato.telefone`)} /></div>
                                <div><Label>Email</Label><Input value={siteData.contato.email} onChange={(e) => handleInputChange(e, `contato.email`)} /></div>
                                <div><Label>Localização</Label><Input value={siteData.contato.localizacao} onChange={(e) => handleInputChange(e, `contato.localizacao`)} /></div>
                                <Tabs defaultValue="ptBR" className="mt-4"><TabsList className="w-full grid grid-cols-3">{languages.map(lang => <TabsTrigger key={lang} value={lang}>{lang.toUpperCase()}</TabsTrigger>)}</TabsList>
                                    {languages.map(lang => (<TabsContent key={lang} value={lang} className="mt-4"><div><Label>Título da Seção ({lang})</Label><Input value={siteData.contato.titulo[lang]} onChange={(e) => handleInputChange(e, `contato.titulo.${lang}`)} /></div></TabsContent>))}
                                </Tabs>
                            </CardContent></Card>
                        </div>
                    </AccordionContent></AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}