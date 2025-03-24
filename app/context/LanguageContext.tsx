"use client";

import { createContext, useState, useContext, useEffect } from 'react';

// Definimos tipos explícitos
export type LanguageType = 'en' | 'es';

export interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  toggleLanguage: () => void;
  isEnglish: boolean;
  isSpanish: boolean;
}

// Creamos el contexto con un valor inicial
const LanguageContext = createContext < LanguageContextType | undefined > (undefined);

// Hook personalizado para usar el contexto
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Estado principal para el idioma
  const [language, setLanguageInternal] = useState < LanguageType > ('es');

  // Efecto para cargar el idioma desde localStorage al inicio
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return;

    try {
      const savedLanguage = localStorage.getItem('language') as LanguageType;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
        setLanguageInternal(savedLanguage);
        document.documentElement.lang = savedLanguage;
      }
    } catch (error) {
      console.error('Error loading language from localStorage:', error);
    }
  }, []);

  // Función para cambiar el idioma
  const setLanguage = (lang: LanguageType) => {
    if (lang !== 'en' && lang !== 'es') return;

    setLanguageInternal(lang);

    // Actualizamos localStorage y el atributo lang del HTML
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;

        // Forzamos un evento personalizado para notificar a los componentes 
        // que necesitan reaccionar al cambio de idioma
        window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
      } catch (error) {
        console.error('Error saving language to localStorage:', error);
      }
    }
  };

  // Función para alternar entre idiomas
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguage(newLang);
  };

  // Valor para el contexto
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    isEnglish: language === 'en',
    isSpanish: language === 'es'
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
} 