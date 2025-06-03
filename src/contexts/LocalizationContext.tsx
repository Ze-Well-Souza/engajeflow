
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definição de tipos
type SupportedLocale = 'pt' | 'en' | 'es' | 'fr' | 'de';

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
  availableLocales: LocaleOption[]; // Alias para compatibilidade
  changeLocale: (locale: SupportedLocale) => void;
  formatCurrency: (value: number) => string;
}

// Dados de localização
const localeOptions: LocaleOption[] = [
  { value: 'pt', label: 'Português', flag: '🇧🇷' },
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' }
];

// Dicionários de traduções
const translations: Record<SupportedLocale, Record<string, string>> = {
  'pt': {
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
  'en': {
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
  'es': {
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
  'fr': {
    'common.dashboard': 'Tableau de bord',
    'common.settings': 'Paramètres',
    'common.profile': 'Profil',
    'common.logout': 'Déconnexion',
    'common.language': 'Langue',
    'common.calendar': 'Calendrier',
    'common.welcome': 'Bienvenue',
    'common.close': 'Fermer',
    'common.save': 'Sauvegarder',
    'common.cancel': 'Annuler',
    'common.loading': 'Chargement...',
    'common.success': 'Succès',
    'common.error': 'Erreur',
    'common.notifications': 'Notifications',
  },
  'de': {
    'common.dashboard': 'Dashboard',
    'common.settings': 'Einstellungen',
    'common.profile': 'Profil',
    'common.logout': 'Abmelden',
    'common.language': 'Sprache',
    'common.calendar': 'Kalender',
    'common.welcome': 'Willkommen',
    'common.close': 'Schließen',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.loading': 'Laden...',
    'common.success': 'Erfolg',
    'common.error': 'Fehler',
    'common.notifications': 'Benachrichtigungen',
  },
};

// Criação do contexto
const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

// Provider do contexto
export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<SupportedLocale>(() => {
    const savedLocale = localStorage.getItem('userLocale');
    if (savedLocale === 'pt' || savedLocale === 'en' || savedLocale === 'es' || savedLocale === 'fr' || savedLocale === 'de') {
      return savedLocale;
    }
    return 'pt';
  });

  const t = (key: string): string => {
    return translations[locale][key] || key;
  };

  const formatCurrency = (value: number): string => {
    const localeMap = {
      'pt': 'pt-BR',
      'en': 'en-US',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'de': 'de-DE'
    };
    
    const currencyMap = {
      'pt': 'BRL',
      'en': 'USD',
      'es': 'EUR',
      'fr': 'EUR',
      'de': 'EUR'
    };

    return new Intl.NumberFormat(localeMap[locale], {
      style: 'currency',
      currency: currencyMap[locale]
    }).format(value);
  };

  const changeLocale = (newLocale: SupportedLocale) => {
    setLocale(newLocale);
    localStorage.setItem('userLocale', newLocale);
  };

  useEffect(() => {
    localStorage.setItem('userLocale', locale);
  }, [locale]);

  return (
    <LocalizationContext.Provider value={{ 
      locale, 
      setLocale,
      t,
      localeOptions,
      availableLocales: localeOptions, // Alias para compatibilidade
      changeLocale,
      formatCurrency
    }}>
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
