"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// ============================================
// Tipos e Interfaces Comuns
// ============================================
interface Option { text: { [key: string]: string }; }
interface Feedback { text: { [key: string]: string }; }
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// ============================================
// 1. ESCOLHA ÚNICA (DIFÍCIL) - LÓGICA CORRIGIDA
// ============================================
interface UnicChoiceProps {
    question: { [key: string]: string };
    options: Option[];
    correctAnswer: string;
    attempts: number;
    feedback: { positive: Feedback; negative: Feedback; retry: Feedback; };
    onComplete: (isCorrect: boolean) => void;
    prefixType?: "alphabetical" | "numerical" | null;
}

export const UnicChoice: React.FC<UnicChoiceProps> = ({ question, options, correctAnswer, attempts, feedback, onComplete, prefixType }) => {
    const { i18n } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);
    const selectedLanguage = isMounted ? i18n.language : "ptBR";

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [remainingAttempts, setRemainingAttempts] = useState(attempts);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [finalResult, setFinalResult] = useState<boolean | null>(null);

    const componentId = `exercicio-${question.ptBR?.replace(/\s+/g, '-')}`;

    useEffect(() => {
        const savedData = localStorage.getItem(componentId);
        if (savedData) {
            try {
                const { savedResult, savedSelection } = JSON.parse(savedData);
                setFinalResult(savedResult);
                setSelectedAnswer(savedSelection);
                setIsCompleted(true);
            } catch (error) {
                console.error("Falha ao carregar dados do UnicChoice:", error);
            }
        }
    }, [componentId]);

    const getOptionLabel = (index: number) => {
        if (prefixType === "alphabetical") return `${alphabet[index]})`;
        if (prefixType === "numerical") return `${index + 1})`;
        return "";
    };

    const handleOptionClick = (optionIndex: number) => {
        if (isCompleted) return;

        setSelectedAnswer(optionIndex);
        const isAnswerCorrect = optionIndex.toString() === correctAnswer;
        const newAttempts = remainingAttempts - 1;

        if (isAnswerCorrect) {
            setFinalResult(true);
            setIsCompleted(true);
            setFeedbackMessage(feedback.positive.text[selectedLanguage]);
            localStorage.setItem(componentId, JSON.stringify({ savedResult: true, savedSelection: optionIndex }));
            onComplete(true);
        } else {
            setRemainingAttempts(newAttempts);
            if (newAttempts > 0) {
                setFeedbackMessage(feedback.retry.text[selectedLanguage]?.replace("{attempts}", newAttempts.toString()));
                // Não reseta a seleção para o usuário ver o que clicou
            } else {
                setFinalResult(false);
                setIsCompleted(true);
                const correctText = options[parseInt(correctAnswer)].text[selectedLanguage];
                setFeedbackMessage(feedback.negative.text[selectedLanguage]?.replace("{correct}", correctText));
                localStorage.setItem(componentId, JSON.stringify({ savedResult: false, savedSelection: optionIndex }));
                onComplete(false);
            }
        }
    };

    return (
        <div className="p-2 rounded border border-border">
            <p className="p-4 text-justify font-semibold">{question[selectedLanguage]}</p>
            <div className="flex flex-col items-center p-4">
                <div className="space-y-4 w-full">
                    {options.map((option, index) => {
                        let optionStateClasses = "border-muted-foreground/20 hover:border-primary";
                        if (isCompleted) {
                            if (index.toString() === correctAnswer) optionStateClasses = "border-green-500 bg-green-500/10 text-green-300 cursor-not-allowed";
                            else if (finalResult === false && selectedAnswer === index) optionStateClasses = "border-red-500 bg-red-500/10 text-red-300 cursor-not-allowed";
                            else optionStateClasses = "border-muted-foreground/20 cursor-not-allowed opacity-50";
                        } else if (selectedAnswer === index) {
                            optionStateClasses = "border-primary ring-2 ring-primary/50";
                        }
                        return (
                            <div key={index} className={`border ${optionStateClasses} rounded-lg p-3 transition-all ${!isCompleted ? 'cursor-pointer' : ''}`} onClick={() => handleOptionClick(index)}>
                                <span>{getOptionLabel(index)} </span>
                                {option.text[selectedLanguage]}
                            </div>
                        );
                    })}
                </div>

                {!isCompleted && remainingAttempts < attempts && (
                    <p className="text-sm text-muted-foreground mt-4">Tentativas restantes: {remainingAttempts}</p>
                )}

                {feedbackMessage && (
                    <div className={`mt-4 text-left border-l-4 p-3 rounded-r-lg w-full ${finalResult === true ? "border-green-500 bg-green-500/10" : finalResult === false ? "border-red-500 bg-red-500/10" : "border-gray-500 bg-gray-500/10"}`}>
                        <div className="flex items-center gap-3">
                            {finalResult === true && <FaRegCheckCircle className="text-green-500 h-5 w-5" />}
                            {finalResult === false && <FaRegTimesCircle className="text-red-500 h-5 w-5" />}
                            <p className={`${finalResult === true ? "text-green-300" : finalResult === false ? "text-red-300" : "text-muted-foreground"}`}>{feedbackMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ============================================
// 2. DRAG AND DROP (INTERMEDIÁRIO)
// ============================================
interface DraginDropProps {
    question: Record<string, string>;
    sentences: { text: Record<string, string>; correctOrder: number[]; wordsPerSentence: number; }[];
    words: { id: number; text: Record<string, string>; }[];
    attempts: number;
    feedback: { positive: Feedback; negative: Feedback; retry: Feedback; };
    onComplete: (isCorrect: boolean) => void;
}
export const DraginDrop: React.FC<DraginDropProps> = ({ question, sentences, words, attempts, feedback, onComplete }) => {
    const { i18n } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);
    const selectedLanguage = isMounted ? i18n.language : "ptBR";

    const totalGaps = sentences.reduce((acc, sentence) => acc + sentence.wordsPerSentence, 0);
    const [selectedWords, setSelectedWords] = useState<(number | null)[]>(Array(totalGaps).fill(null));
    const [remainingAttempts, setRemainingAttempts] = useState(attempts);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [finalResult, setFinalResult] = useState<boolean | null>(null);

    const componentId = `exercicio-drag-${question.ptBR?.replace(/\s+/g, '-')}`;

    useEffect(() => {
        const savedData = localStorage.getItem(componentId);
        if (savedData) {
            try {
                const { savedResult, savedSelection } = JSON.parse(savedData);
                setFinalResult(savedResult);
                setSelectedWords(savedSelection);
                setIsCompleted(true);
            } catch (error) {
                console.error("Falha ao carregar dados do DraginDrop:", error);
            }
        }
    }, [componentId]);

    const handleSelectWord = (wordId: number) => {
        if (isCompleted) return;
        const emptyIndex = selectedWords.indexOf(null);
        if (emptyIndex !== -1) {
            const newSelection = [...selectedWords];
            newSelection[emptyIndex] = wordId;
            setSelectedWords(newSelection);
        }
    };

    const handleClearWord = (index: number) => {
        if (isCompleted) return;
        const newSelection = [...selectedWords];
        newSelection[index] = null;
        setSelectedWords(newSelection);
    };

    const handleValidate = () => {
        if (isCompleted || selectedWords.includes(null)) return;
        const isAnswerCorrect = sentences.every(s => s.correctOrder.every((id, idx) => selectedWords[idx] === id));
        const newAttempts = remainingAttempts - 1;
        setRemainingAttempts(newAttempts);

        if (isAnswerCorrect) {
            setFinalResult(true);
            setIsCompleted(true);
            setFeedbackMessage(feedback.positive.text[selectedLanguage]);
            localStorage.setItem(componentId, JSON.stringify({ savedResult: true, savedSelection: selectedWords }));
            onComplete(true);
        } else {
            if (newAttempts > 0) {
                setFeedbackMessage(feedback.retry.text[selectedLanguage]?.replace("{attempts}", newAttempts.toString()));
                setSelectedWords(Array(totalGaps).fill(null));
            } else {
                setFinalResult(false);
                setIsCompleted(true);
                const correctText = sentences.map(s => s.correctOrder.map(id => words.find(w => w.id === id)?.text[selectedLanguage]).join(' ')).join(', ');
                setFeedbackMessage(feedback.negative.text[selectedLanguage]?.replace("{correct}", correctText));
                localStorage.setItem(componentId, JSON.stringify({ savedResult: false, savedSelection: selectedWords }));
                onComplete(false);
            }
        }
    };

    return (
        <div className="p-2 rounded border border-border">
            <p className="p-4 text-justify font-semibold">{question[selectedLanguage]}</p>
            <div className="flex flex-col items-center p-4">
                <div className="mb-4 p-4 border rounded-md w-full text-center">
                    {sentences[0].text[selectedLanguage].split('____').map((part, i) => (
                        <React.Fragment key={i}>
                            {part}
                            {i < sentences[0].wordsPerSentence && (
                                <span onClick={() => handleClearWord(i)} className={`inline-block bg-muted text-muted-foreground min-w-[100px] h-8 p-1 mx-1 border-b-2 border-dashed text-center ${!isCompleted ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                                    {selectedWords[i] !== null ? words.find(w => w.id === selectedWords[i])?.text[selectedLanguage] : '...'}
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {words.map(word => (
                        <Button key={word.id} variant="outline" onClick={() => handleSelectWord(word.id)} disabled={isCompleted || selectedWords.includes(word.id)}>
                            {word.text[selectedLanguage]}
                        </Button>
                    ))}
                </div>
                {!isCompleted && (
                    <div className="text-center w-full">
                        <Button onClick={handleValidate} disabled={selectedWords.includes(null)}>
                            Validar Resposta
                        </Button>
                        <p className="text-sm text-muted-foreground mt-2">Tentativas restantes: {remainingAttempts}</p>
                    </div>
                )}
                {feedbackMessage && (
                    <div className={`mt-4 text-left border-l-4 p-3 rounded-r-lg w-full ${finalResult === true ? "border-green-500 bg-green-500/10" : finalResult === false ? "border-red-500 bg-red-500/10" : "border-gray-500 bg-gray-500/10"}`}>
                        <div className="flex items-center gap-3">
                            {finalResult === true && <FaRegCheckCircle className="text-green-500 h-5 w-5" />}
                            {finalResult === false && <FaRegTimesCircle className="text-red-500 h-5 w-5" />}
                            <p className={`${finalResult === true ? "text-green-300" : finalResult === false ? "text-red-300" : "text-muted-foreground"}`}>{feedbackMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ============================================
// 3. VERDADEIRO OU FALSO (FÁCIL)
// ============================================
interface TrueOrFalseProps {
    question: { [key: string]: string };
    correctAnswer: boolean;
    options: { true: { text: { [key: string]: string } }; false: { text: { [key: string]: string } }; };
    feedback: { positive: Feedback; negative: Feedback; };
    onComplete: (isCorrect: boolean) => void;
}
export const TrueOrFalse: React.FC<TrueOrFalseProps> = ({ question, correctAnswer, options, feedback, onComplete }) => {
    const { i18n } = useTranslation();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);
    const selectedLanguage = isMounted ? i18n.language : "ptBR";

    const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [finalResult, setFinalResult] = useState<boolean | null>(null);

    const componentId = `exercicio-tf-${question.ptBR?.replace(/\s+/g, '-')}`;

    useEffect(() => {
        const savedData = localStorage.getItem(componentId);
        if (savedData) {
            try {
                const { savedResult, savedSelection } = JSON.parse(savedData);
                setFinalResult(savedResult);
                setSelectedAnswer(savedSelection);
                setIsCompleted(true);
            } catch (error) {
                console.error("Falha ao carregar dados do TrueOrFalse:", error);
            }
        }
    }, [componentId]);

    const handleOptionClick = (value: boolean) => {
        if (isCompleted) return;

        setSelectedAnswer(value);
        const isAnswerCorrect = value === correctAnswer;

        setFinalResult(isAnswerCorrect);
        setIsCompleted(true);

        if (isAnswerCorrect) {
            setFeedbackMessage(feedback.positive.text[selectedLanguage]);
        } else {
            const correctText = correctAnswer ? options.true.text[selectedLanguage] : options.false.text[selectedLanguage];
            setFeedbackMessage(feedback.negative.text[selectedLanguage]?.replace("{correct}", correctText));
        }

        localStorage.setItem(componentId, JSON.stringify({ savedResult: isAnswerCorrect, savedSelection: value }));
        onComplete(isAnswerCorrect);
    };

    return (
        <div className="p-2 rounded border border-border">
            <p className="p-4 text-justify font-semibold">{question[selectedLanguage]}</p>
            <div className="flex flex-col items-center p-4">
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    {[true, false].map(value => {
                        const optionText = value ? options.true.text[selectedLanguage] : options.false.text[selectedLanguage];
                        let optionStateClasses = "border-muted-foreground/20 hover:border-primary";
                        if (isCompleted) {
                            if (value === correctAnswer) optionStateClasses = "border-green-500 bg-green-500/10 text-green-300 cursor-not-allowed";
                            else if (finalResult === false && selectedAnswer === value) optionStateClasses = "border-red-500 bg-red-500/10 text-red-300 cursor-not-allowed";
                            else optionStateClasses = "border-muted-foreground/20 cursor-not-allowed opacity-50";
                        }
                        return (
                            <Card key={String(value)} onClick={() => handleOptionClick(value)} className={`w-full border p-4 text-center transition-all ${!isCompleted ? 'cursor-pointer' : ''} ${optionStateClasses}`}>
                                <CardContent className="p-0">{optionText}</CardContent>
                            </Card>
                        )
                    })}
                </div>
                {feedbackMessage && (
                    <div className={`mt-4 text-left border-l-4 p-3 rounded-r-lg w-full ${finalResult === true ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}`}>
                        <div className="flex items-center gap-3">
                            {finalResult === true && <FaRegCheckCircle className="text-green-500 h-5 w-5" />}
                            {finalResult === false && <FaRegTimesCircle className="text-red-500 h-5 w-5" />}
                            <p className={`${finalResult === true ? "text-green-300" : "text-red-300"}`}>{feedbackMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};