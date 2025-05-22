import { useState } from 'react';

// Importar as traduções
import translations from '@/i18n/translations';

// Tipo para as chaves de tradução
type TranslationKey = string;

// Hook de tradução simplificado
export const useTranslation = () => {
  // Estado para o idioma atual (padrão: pt-BR)
  const [language] = useState<string>('pt-BR');

  // Função para traduzir uma chave
  const t = (key: TranslationKey): string => {
    // Dividir a chave por pontos para acessar objetos aninhados
    const keys = key.split('.');
    
    // Começar com as traduções do idioma atual
    let translation: any = translations[language] || translations['pt-BR'];
    
    // Percorrer as chaves para encontrar a tradução
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        // Se não encontrar, retornar a chave
        return key;
      }
    }
    
    // Retornar a tradução encontrada ou a chave original
    return typeof translation === 'string' ? translation : key;
  };

  return {
    t,
    language
  };
};

export default useTranslation;
