```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LocalizationProvider, useLocalization } from '@/contexts/LocalizationContext';
import { describe, it, expect, jest } from '@jest/globals';


// Componente de teste para acessar o contexto
const TestComponent = () => {
  const { locale, setLocale, t, formatCurrency, localeOptions } = useLocalization();
  
  return (
    <div>
      <div data-testid="current-locale">{locale}</div>
      <div data-testid="available-locales">{localeOptions.map(opt => opt.value).join(',')}</div>
      <div data-testid="translated-text">{t('common.welcome')}</div>
      <div data-testid="formatted-currency">{formatCurrency(1234.56)}</div>
      
      <select 
        data-testid="locale-selector"
        value={locale}
        onChange={(e) => setLocale(e.target.value as 'pt' | 'en' | 'es' | 'fr' | 'de')} //Corrected type
      >
        {localeOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

describe('LocalizationContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  
  it('fornece o idioma padrão quando não há preferência salva', () => {
    render(
      <LocalizationProvider>
        <TestComponent />
      </LocalizationProvider>
    );
    
    expect(screen.getByTestId('current-locale')).toHaveTextContent('pt');
  });
  
  it('disponibiliza os idiomas disponíveis', () => {
    render(
      <LocalizationProvider>
        <TestComponent />
      </LocalizationProvider>
    );
    
    const availableLocales = screen.getByTestId('available-locales').textContent;
    expect(availableLocales).toContain('pt');
    expect(availableLocales).toContain('en');
    expect(availableLocales).toContain('es');
    expect(availableLocales).toContain('fr');
    expect(availableLocales).toContain('de');
  });
  
  it('permite mudar o idioma', () => {
    render(
      <LocalizationProvider>
        <TestComponent />
      </LocalizationProvider>
    );
    
    const localeSelector = screen.getByTestId('locale-selector');
    
    fireEvent.change(localeSelector, { target: { value: 'en' } });
    expect(screen.getByTestId('current-locale')).toHaveTextContent('en');
    expect(localStorage.getItem('userLocale')).toBe('en');

    fireEvent.change(localeSelector, { target: { value: 'es' } });
    expect(screen.getByTestId('current-locale')).toHaveTextContent('es');
    expect(localStorage.getItem('userLocale')).toBe('es');
  });
  
  it('formata corretamente valores de moeda com base no idioma', () => {
    render(
      <LocalizationProvider>
        <TestComponent />
      </LocalizationProvider>
    );
    
    let formattedCurrency = screen.getByTestId('formatted-currency').textContent;
    expect(formattedCurrency).toMatch(/R\$ 1\.234,56/i); //Using regex for better matching

    const localeSelector = screen.getByTestId('locale-selector');
    fireEvent.change(localeSelector, { target: { value: 'en' } });
    formattedCurrency = screen.getByTestId('formatted-currency').textContent;
    expect(formattedCurrency).toMatch(/\$1\,234\.56/i);

    fireEvent.change(localeSelector, { target: { value: 'es' } });
    formattedCurrency = screen.getByTestId('formatted-currency').textContent;
    expect(formattedCurrency).toMatch(/€1\.234,56/i);

    fireEvent.change(localeSelector, { target: { value: 'fr' } });
    formattedCurrency = screen.getByTestId('formatted-currency').textContent;
    expect(formattedCurrency).toMatch(/€1\.234,56/i);

    fireEvent.change(localeSelector, { target: { value: 'de' } });
    formattedCurrency = screen.getByTestId('formatted-currency').textContent;
    expect(formattedCurrency).toMatch(/€1\.234,56/i);
  });

  it('traduz corretamente os textos com base no idioma', () => {
    render(
      <LocalizationProvider>
        <TestComponent />
      </LocalizationProvider>
    );

    let translatedText = screen.getByTestId('translated-text').textContent;
    expect(translatedText).toBe('Bem-vindo');

    const localeSelector = screen.getByTestId('locale-selector');
    fireEvent.change(localeSelector, { target: { value: 'en' } });
    translatedText = screen.getByTestId('translated-text').textContent;
    expect(translatedText).toBe('Welcome');
  });

  //1. Testar o cenário de erro quando `useLocalization` é chamado fora do `LocalizationProvider`.
  //2. Testar a persistência do idioma selecionado após o reload da página.
  //3. Testar a internacionalização com mais idiomas e cenários de edge cases.

});
```