
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { DefaultLocale, SupportedLocale, translations } from "@/i18n/translations";

interface LocalizationContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  formatCurrency: (amount: number, currency?: string) => string;
  availableLocales: SupportedLocale[];
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
};

interface LocalizationProviderProps {
  children: ReactNode;
  defaultLocale?: SupportedLocale;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ 
  children, 
  defaultLocale = DefaultLocale 
}) => {
  const [locale, setLocale] = useState<SupportedLocale>(() => {
    // Verificar se há uma preferência salva
    const savedLocale = localStorage.getItem('preferredLocale') as SupportedLocale;
    // Verificar se o navegador tem uma preferência
    const browserLocale = navigator.language.split('-')[0] as SupportedLocale;
    
    if (savedLocale && translations[savedLocale]) {
      return savedLocale;
    } else if (browserLocale && translations[browserLocale]) {
      return browserLocale;
    }
    return defaultLocale;
  });

  // Salvar preferência quando mudar
  useEffect(() => {
    localStorage.setItem('preferredLocale', locale);
    document.documentElement.lang = locale;
    console.log(`Idioma alterado para: ${locale}`);
  }, [locale]);

  // Função para traduzir textos
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value = translations[locale];
    
    // Navegar pela árvore de chaves
    for (const k of keys) {
      if (!value || typeof value !== 'object') {
        console.warn(`Chave de tradução não encontrada: ${key}`);
        return key; // Fallback para a própria chave
      }
      value = value[k];
    }
    
    if (typeof value !== 'string') {
      console.warn(`Valor de tradução não é uma string para: ${key}`);
      return key;
    }
    
    // Substituir parâmetros
    if (params) {
      return Object.entries(params).reduce(
        (str, [paramKey, paramValue]) => 
          str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue)),
        value
      );
    }
    
    return value;
  };

  // Função para formatar moeda
  const formatCurrency = (amount: number, currency = 'BRL'): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(amount);
  };

  // Lista de idiomas disponíveis
  const availableLocales: SupportedLocale[] = Object.keys(translations) as SupportedLocale[];

  const value: LocalizationContextType = {
    locale,
    setLocale,
    t,
    formatCurrency,
    availableLocales
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};
