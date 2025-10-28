"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import Image from 'next/image';
import TextTranslator from '@/components/layout/TextTranslator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

<<<<<<< HEAD
const projectsData = [
    { imageSrc: '/img/projects/dashboard-zecki.png', url: 'https://dashboard-zecki.vercel.app/login', titlePT: 'Dashboard de Gestão', titleEN: 'Management Dashboard', titleES: 'Panel de Gestión', descPT: 'Plataforma de visualização de dados.', descEN: 'Data visualization platform.', descES: 'Plataforma de visualización de datos.' },
    { imageSrc: '/img/projects/gesso-porto-seguro.png', url: 'https://gessoportoseguro.com.br', titlePT: 'Gesso Porto Seguro', titleEN: 'Gesso Porto Seguro', titleES: 'Gesso Porto Seguro', descPT: 'Site institucional focado em SEO.', descEN: 'Institutional website focused on SEO.', descES: 'Sitio web institucional centrado en SEO.' },
    { imageSrc: '/img/projects/agendamento-salao.png', url: 'https://agendamento-salao.vercel.app/login', titlePT: 'Agendamento de Salão', titleEN: 'Salon Scheduling', titleES: 'Citas para Salón', descPT: 'Aplicação web completa para agendamentos.', descEN: 'Complete web application for scheduling.', descES: 'Aplicación web completa para citas.' },
    { imageSrc: '/img/projects/calendario.png', url: 'https://calendario-alpha-drab.vercel.app/login', titlePT: 'Calendário de Eventos', titleEN: 'Event Calendar', titleES: 'Calendario de Eventos', descPT: 'Sistema de calendário com autenticação.', descEN: 'Calendar system with authentication.', descES: 'Sistema de calendario con autenticación.' },
];

export const ProjectsCarousel = () => {
=======
interface Project {
    imageSrc: string;
    url: string;
    altText: string;
    titlePT: string;
    titleEN: string;
    titleES: string;
    descPT: string;
    descEN: string;
    descES: string;
}

interface ProjectsCarouselProps {
    projects: Project[];
}

export const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ projects }) => {
>>>>>>> refazendo-header
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative w-full max-w-7xl mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
<<<<<<< HEAD
                    {projectsData.map((project, index) => (
                        <div key={index} className="flex-[0_0_80%] md:flex-[0_0_40%] lg:flex-[0_0_33.33%] min-w-0 pl-4">
                            <Link href={project.url} target="_blank" rel="noopener noreferrer" className="block cursor-hover-target">
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                                    <Image src={project.imageSrc} alt={project.titlePT} fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 ease-in-out group-hover:scale-105" />
=======
                    {projects.map((project, index) => (
                        <div key={index} className="flex-[0_0_80%] md:flex-[0_0_40%] lg:flex-[0_0_33.33%] min-w-0 pl-4">
                            <Link href={project.url} target="_blank" rel="noopener noreferrer" className="block cursor-hover-target">
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                                    <Image
                                        src={project.imageSrc}
                                        alt={project.altText}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-500 ease-in-out group-hover:scale-105"
                                        priority={index === 0}
                                        // CORREÇÃO: Adicionada a propriedade 'sizes'
                                        sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 33.33vw"
                                    />
>>>>>>> refazendo-header
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                                        <h3 className="text-xl md:text-2xl font-bold">
                                            <TextTranslator>{{ ptBR: project.titlePT, en: project.titleEN, es: project.titleES }}</TextTranslator>
                                        </h3>
                                        <p className="text-sm md:text-base opacity-90 mt-1">
                                            <TextTranslator>{{ ptBR: project.descPT, en: project.descEN, es: project.descES }}</TextTranslator>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

<<<<<<< HEAD
            {/* Botões de Navegação */}
=======
>>>>>>> refazendo-header
            <div className="flex justify-center gap-4 mt-8">
                <Button variant="outline" size="icon" onClick={scrollPrev}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={scrollNext}>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};