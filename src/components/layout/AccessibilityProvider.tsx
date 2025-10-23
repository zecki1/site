"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  isDyslexicFont: boolean;
  toggleDyslexicFont: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);

  useEffect(() => {
    // Carrega a preferência do localStorage ao iniciar
    const savedPreference = localStorage.getItem('dyslexicFont') === 'true';
    setIsDyslexicFont(savedPreference);
  }, []);

  useEffect(() => {
    // Aplica ou remove a classe no corpo do documento
    if (isDyslexicFont) {
      document.body.classList.add('font-dyslexic');
    } else {
      document.body.classList.remove('font-dyslexic');
    }
    // Salva a preferência no localStorage
    localStorage.setItem('dyslexicFont', String(isDyslexicFont));
  }, [isDyslexicFont]);

  const toggleDyslexicFont = () => {
    setIsDyslexicFont(prev => !prev);
  };

  return (
    <AccessibilityContext.Provider value={{ isDyslexicFont, toggleDyslexicFont }}>
      {children}
    </AccessibilityContext.Provider>
  );
};