
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definição de tipos
type SupportedLocale = 'pt-BR' | 'en-US' | 'es-ES';

interface LocaleOption {
  value: SupportedLocale;
  label: string;
  flag: string;
}

interface LocalizationContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string) => string;
  localeOptions: LocaleOption[];
  changeLocale: (locale: SupportedLocale) => void;
}

// Dados de localização
const localeOptions: LocaleOption[] = [
  { value: 'pt-BR', label: 'Português', flag: '🇧🇷' },
  { value: 'en-US', label: 'English', flag: '🇺🇸' },
  { value: 'es-ES', label: 'Español', flag: '🇪🇸' }
];

// Dicionários de traduções
const translations: Record<SupportedLocale, Record<string, string>> = {
  'pt-BR': {
    'common.dashboard': 'Painel',
    'common.settings': 'Configurações',
    'common.profile': 'Perfil',
    'common.logout': 'Sair',
    'common.language': 'Idioma',
    'common.calendar': 'Calendário',
    'common.welcome': 'Bem-vindo',
    'common.close': 'Fechar',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.loading': 'Carregando...',
    'common.success': 'Sucesso',
    'common.error': 'Erro',
    'common.notifications': 'Notificações',
  },
  'en-US': {
    'common.dashboard': 'Dashboard',
    'common.settings': 'Settings',
    'common.profile': 'Profile',
    'common.logout': 'Logout',
    'common.language': 'Language',
    'common.calendar': 'Calendar',
    'common.welcome': 'Welcome',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
    'common.success': 'Success',
    'common.error': 'Error',
    'common.notifications': 'Notifications',
  },
  'es-ES': {
    'common.dashboard': 'Panel',
    'common.settings': 'Configuración',
    'common.profile': 'Perfil',
    'common.logout': 'Cerrar sesión',
    'common.language': 'Idioma',
    'common.calendar': 'Calendario',
    'common.welcome': 'Bienvenido',
    'common.close': 'Cerrar',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.loading': 'Cargando...',
    'common.success': 'Éxito',
    'common.error': 'Error',
    'common.notifications': 'Notificaciones',
  },
};

// Criação do contexto
const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

// Provider do contexto
export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<SupportedLocale>(() => {
    // Tentar recuperar a preferência do usuário do localStorage
    const savedLocale = localStorage.getItem('userLocale');
    // Verificar se é uma locale suportada
    if (savedLocale === 'pt-BR' || savedLocale === 'en-US' || savedLocale === 'es-ES') {
      return savedLocale;
    }
    // Default para português do Brasil
    return 'pt-BR';
  });

  // Função para traduzir
  const t = (key: string): string => {
    return translations[locale][key] || key;
  };

  // Função para mudar o idioma
  const changeLocale = (newLocale: SupportedLocale) => {
    setLocale(newLocale);
    localStorage.setItem('userLocale', newLocale);
    // Você pode adicionar mais lógica aqui, como formatação de datas, etc.
  };

  // Salvar preferência de idioma no localStorage
  useEffect(() => {
    localStorage.setItem('userLocale', locale);
  }, [locale]);

  return (
    <LocalizationContext.Provider value={{ 
      locale, 
      setLocale,
      t,
      localeOptions,
      changeLocale
    }}>
      {children}
    </LocalizationContext.Provider>
  );
};

// Hook para usar o contexto
export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
