
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations, SupportedLocale, DefaultLocale } from '@/i18n/translations';

type TranslationTree = {
  [key: string]: string | TranslationTree;
};

interface LocalizationContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string) => string;
  formatCurrency: (value: number, options?: Intl.NumberFormatOptions) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState<SupportedLocale>(() => {
    // Tenta recuperar o idioma salvo no localStorage
    const savedLocale = localStorage.getItem('locale') as SupportedLocale;
    if (savedLocale && Object.keys(translations).includes(savedLocale)) {
      return savedLocale;
    }

    // Verifica o idioma do navegador
    const browserLang = navigator.language.split('-')[0] as SupportedLocale;
    if (browserLang && Object.keys(translations).includes(browserLang)) {
      return browserLang;
    }

    // Volta para o idioma padrão
    return DefaultLocale;
  });

  useEffect(() => {
    // Salva o idioma escolhido no localStorage
    localStorage.setItem('locale', locale);
  }, [locale]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let currentObj: TranslationTree = translations[locale];
    
    for (const k of keys) {
      if (currentObj && typeof currentObj === 'object' && k in currentObj) {
        const value = currentObj[k];
        currentObj = value as TranslationTree;
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    // Garantir que o valor final é uma string
    if (typeof currentObj !== 'string') {
      console.warn(`Translation key "${key}" does not resolve to a string value`);
      return key;
    }
    
    return currentObj;
  };

  const formatCurrency = (value: number, options?: Intl.NumberFormatOptions): string => {
    const defaultOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: locale === 'pt' ? 'BRL' : locale === 'en' ? 'USD' : locale === 'es' ? 'EUR' : 'USD',
      minimumFractionDigits: 2,
    };

    const mergedOptions = { ...defaultOptions, ...options };
    
    return new Intl.NumberFormat(locale, mergedOptions).format(value);
  };

  return (
    <LocalizationContext.Provider value={{ locale, setLocale, t, formatCurrency }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
