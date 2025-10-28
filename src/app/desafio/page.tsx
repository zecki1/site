"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

import { quizData } from '@/lib/quizData';
import TextTranslator from '@/components/layout/TextTranslator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { UnicChoice, DraginDrop, TrueOrFalse } from '@/components/ui/exerciciosdePassagem';

import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ArcElement } from 'chart.js';
import { Radar, Doughnut } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ArcElement);

const useWindowSize = () => {
    const [size, setSize] = useState({ width: 0, height: 0 });
    useEffect(() => {
        const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return size;
};

const sectionAnimation = { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8, ease: "easeOut" } };

const initialAnswersState = {
    design: Array(quizData.design.length).fill(null),
    code: Array(quizData.code.length).fill(null),
    marketing: Array(quizData.marketing.length).fill(null),
};

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export default function SkillsTestPage() {
    const [shuffledQuiz, setShuffledQuiz] = useState(quizData);
    const [answers, setAnswers] = useState(initialAnswersState);
    const [showRulesModal, setShowRulesModal] = useState(false);
    const [showResultsModal, setShowResultsModal] = useState(false);
    const [scores, setScores] = useState({ design: 0, code: 0, marketing: 0 });
    const [quizResetKey, setQuizResetKey] = useState(0);
    const { width, height } = useWindowSize();

    useEffect(() => {
        const savedScores = localStorage.getItem('quizFinalScores');
        if (savedScores) {
            setScores(JSON.parse(savedScores));
            setShowResultsModal(true);
        } else {
            const newAnswers = { ...initialAnswersState };
            let hasSavedAnswers = false;
            (Object.keys(quizData) as Array<keyof typeof quizData>).forEach(category => {
                quizData[category].forEach((q, index) => {
                    const baseId = q.question.ptBR?.replace(/\s+/g, '-');
                    const componentIds = [
                        `exercicio-${baseId}`,
                        `exercicio-drag-${baseId}`,
                        `exercicio-tf-${baseId}`
                    ];
                    for (const id of componentIds) {
                        const savedData = localStorage.getItem(id);
                        if (savedData) {
                            hasSavedAnswers = true;
                            newAnswers[category][index] = JSON.parse(savedData).savedResult;
                            break;
                        }
                    }
                });
            });
            if (hasSavedAnswers) setAnswers(newAnswers);
            setShowRulesModal(true);
        }
    }, []);

    useEffect(() => {
        setShuffledQuiz({
            design: shuffleArray(quizData.design),
            code: shuffleArray(quizData.code),
            marketing: shuffleArray(quizData.marketing),
        });
    }, [quizResetKey]);

    const handleQuestionComplete = useCallback((category: keyof typeof quizData, index: number, isCorrect: boolean) => {
        setAnswers(prev => {
            const newCategoryAnswers = [...prev[category]];
            newCategoryAnswers[index] = isCorrect;
            return { ...prev, [category]: newCategoryAnswers };
        });
    }, []);

    const isTestFinished = useMemo(() => Object.values(answers).flat().every(a => a !== null), [answers]);

    const calculateAndShowResults = () => {
        const finalScores = {
            design: answers.design.filter(Boolean).length,
            code: answers.code.filter(Boolean).length,
            marketing: answers.marketing.filter(Boolean).length,
        };
        setScores(finalScores);
        localStorage.setItem('quizFinalScores', JSON.stringify(finalScores));
        setShowResultsModal(true);
    };

    const resetQuiz = () => {
        localStorage.clear();
        setAnswers(initialAnswersState);
        setShowResultsModal(false);
        setQuizResetKey(prevKey => prevKey + 1);
        setShowRulesModal(true);
    };

    const renderQuestionComponent = (question: any, category: keyof typeof quizData, index: number) => {
        const commonProps = {
            question: question.question,
            onComplete: (isCorrect: boolean) => handleQuestionComplete(category, index, isCorrect),
            feedback: {
                positive: { text: { ptBR: "Correto!", en: "Correct!", es: "¡Correcto!" } },
                negative: { text: { ptBR: "Ops! A resposta correta era: {correct}", en: "Oops! The correct answer was: {correct}", es: "¡Ups! La respuesta correcta era: {correct}" } },
                retry: { text: { ptBR: "Incorreto. Você tem mais {attempts} tentativa.", en: "Incorrect. You have {attempts} more attempt.", es: "Incorrecto. Tienes {attempts} intento más." } }
            }
        };

        const key = `${category}-${index}-${quizResetKey}`;

        switch (question.type) {
            case 'UnicChoice':
                return <UnicChoice key={key} {...commonProps} attempts={2} options={question.options} correctAnswer={question.correctAnswer} prefixType="alphabetical" />;
            case 'DraginDrop':
                return <DraginDrop key={key} {...commonProps} attempts={2} sentences={question.sentences} words={question.words} />;
            case 'TrueOrFalse':
                const { retry, ...tfFeedback } = commonProps.feedback;
                return <TrueOrFalse key={key} {...commonProps} feedback={tfFeedback} options={question.options} correctAnswer={question.correctAnswer} />;
            default:
                return <p key={key}>Tipo de questão não suportado: {question.type}</p>;
        }
    };

    const totalQuestions = Object.values(quizData).flat().length;
    const correctAnswersCount = Object.values(scores).reduce((a, b) => a + b, 0);
    const incorrectAnswersCount = totalQuestions - correctAnswersCount;

    const doughnutData = {
        labels: ['Acertos', 'Erros'],
        datasets: [{
            data: [correctAnswersCount, incorrectAnswersCount],
            backgroundColor: ['#10B981', '#EF4444'],
            borderColor: ['#059669', '#DC2626'],
            borderWidth: 1,
        }]
    };

    const radarData = {
        labels: ['Design', 'Código', 'Marketing'],
        datasets: [{
            label: 'Pontos por Habilidade',
            data: [scores.design, scores.code, scores.marketing],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
        }]
    };

    return (
        <>
            {showResultsModal && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} style={{ zIndex: 40, position: 'fixed' }} />}

            <Dialog open={showRulesModal} onOpenChange={setShowRulesModal}>
                <DialogContent className="bg-background/80 backdrop-blur border-primary/30 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-bold">Bem-vindo ao Desafio de Habilidades!</DialogTitle>
                        <DialogDescription className="text-center text-lg text-balance">Teste seus conhecimentos em Design, Código e Marketing.</DialogDescription>
                    </DialogHeader>
                    <div className="my-4 space-y-2 text-muted-foreground">
                        <p><strong>Regras:</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Questões de múltipla escolha e de arrastar têm <strong>2 tentativas</strong>.</li>
                            <li>Questões de verdadeiro ou falso são de <strong>resposta única e imediata</strong>.</li>
                            <li>Responda todas as questões para ver seu resultado.</li>
                        </ul>
                        <p className="pt-2">Boa sorte!</p>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setShowRulesModal(false)} className="w-full">Entendi, começar!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showResultsModal} onOpenChange={setShowResultsModal}>
                <DialogContent className="bg-background backdrop-blur border-primary/30 text-black dark:text-white max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-bold text-balance sm:text-3xl">Parabéns! Aqui estão seus resultados.</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center my-4">
                        <div className="relative w-full h-64 sm:w-1/2 sm:h-80">
                            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'top', labels: { color: '#808080' } } } }} />
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center my-4'>
                        <div className="relative w-full h-64 sm:w-1/2 sm:h-80">
                            <Radar data={radarData} options={{ maintainAspectRatio: false, scales: { r: { beginAtZero: true, max: 5, pointLabels: { color: '#808080', font: { size: 14 } }, grid: { color: 'rgba(255, 255, 255, 0.2)' }, ticks: { backdropColor: 'transparent', color: '#808080', stepSize: 1 } } }, plugins: { legend: { labels: { color: '#808080' } } } }} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="destructive" onClick={resetQuiz} className="w-full text-white">
                            Refazer o Teste
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <section className="py-24 md:py-32 container mx-auto">
                {/* ✨ CORREÇÃO CRÍTICA:
                    - O 'div' com a classe 'u-container' agora envolve todo o conteúdo da seção.
                */}
                <div className="u-container">
                    <motion.header {...sectionAnimation} className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                            <TextTranslator ignoreCheck={true}>{{ ptBR: "Teste suas Habilidades", en: "Test Your Skills", es: "Prueba tus Habilidades" }}</TextTranslator>
                        </h1>
                    </motion.header>

                    <div className="space-y-16" key={quizResetKey}>
                        {(Object.keys(shuffledQuiz) as Array<keyof typeof shuffledQuiz>).map(category => (
                            <motion.section {...sectionAnimation} key={category}>
                                <Card className="bg-background/70 backdrop-blur border-primary/20">
                                    <CardHeader><CardTitle className="capitalize">{category} ({shuffledQuiz[category].length} questões)</CardTitle></CardHeader>
                                    <CardContent className="space-y-8">
                                        {shuffledQuiz[category].map((q, index) => renderQuestionComponent(q, category, index))}
                                    </CardContent>
                                </Card>
                            </motion.section>
                        ))}

                        <div className="text-center py-8">
                            <Button size="lg" onClick={calculateAndShowResults} disabled={!isTestFinished}>
                                Ver Meus Resultados
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}