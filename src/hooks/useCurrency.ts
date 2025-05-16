
import { useState } from "react";
import { useLocalization } from "@/contexts/LocalizationContext";

export type SupportedCurrency = 'BRL' | 'USD' | 'EUR' | 'GBP' | 'JPY';

// Mapeamento de moedas para símbolos
const currencySymbols: Record<SupportedCurrency, string> = {
  BRL: 'R$',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥'
};

// Mapeamento de locales para moedas padrão
const localeDefaultCurrency: Record<string, SupportedCurrency> = {
  'pt': 'BRL',
  'en': 'USD',
  'es': 'EUR',
  'fr': 'EUR',
  'de': 'EUR'
};

interface CurrencyOptions {
  defaultCurrency?: SupportedCurrency;
  useLocaleCurrency?: boolean;
}

export const useCurrency = (options: CurrencyOptions = {}) => {
  const { locale } = useLocalization();
  
  // Determinar moeda padrão baseada nas opções
  const getDefaultCurrency = (): SupportedCurrency => {
    if (options.defaultCurrency) {
      return options.defaultCurrency;
    }
    
    if (options.useLocaleCurrency) {
      return localeDefaultCurrency[locale] || 'USD';
    }
    
    return 'USD';
  };
  
  const [currency, setCurrency] = useState<SupportedCurrency>(getDefaultCurrency());
  
  // Formatação baseada na moeda atual e no locale
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  };
  
  // Simplificar para exibição compacta (ex: R$ 1.2K)
  const formatCompact = (amount: number): string => {
    const symbol = currencySymbols[currency];
    const formatted = new Intl.NumberFormat(locale, {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
    
    return `${symbol} ${formatted}`;
  };
  
  // Converter valor entre moedas
  // Esta é uma simulação simples - em produção, usaria uma API de taxas de câmbio
  const convertCurrency = (amount: number, from: SupportedCurrency, to: SupportedCurrency): number => {
    if (from === to) return amount;
    
    // Taxas de câmbio simuladas (para demonstração)
    const rates: Record<SupportedCurrency, number> = {
      USD: 1.0,
      EUR: 0.93,
      BRL: 5.12,
      GBP: 0.79,
      JPY: 150.25
    };
    
    // Converter para USD primeiro (como moeda base) e então para a moeda alvo
    const inUSD = amount / rates[from];
    return inUSD * rates[to];
  };
  
  // Lista de moedas disponíveis para seleção
  const availableCurrencies: SupportedCurrency[] = ['BRL', 'USD', 'EUR', 'GBP', 'JPY'];
  
  // Informações sobre o sistema de pagamento adequado para a moeda
  const getPaymentSystemInfo = (selectedCurrency: SupportedCurrency = currency) => {
    switch (selectedCurrency) {
      case 'BRL':
        return {
          name: 'PIX / Cartão de Crédito',
          description: 'Sistema de pagamento instantâneo brasileiro',
          icon: '🇧🇷'
        };
      case 'USD':
        return {
          name: 'Credit Card / ACH',
          description: 'US payment methods',
          icon: '🇺🇸'
        };
      case 'EUR':
        return {
          name: 'SEPA / Credit Card',
          description: 'European payment system',
          icon: '🇪🇺'
        };
      case 'GBP':
        return {
          name: 'BACS / Credit Card',
          description: 'UK payment methods',
          icon: '🇬🇧'
        };
      case 'JPY':
        return {
          name: 'Credit Card / Konbini',
          description: 'Japanese payment methods',
          icon: '🇯🇵'
        };
    }
  };
  
  return {
    currency,
    setCurrency,
    formatCurrency,
    formatCompact,
    convertCurrency,
    availableCurrencies,
    getPaymentSystemInfo
  };
};
