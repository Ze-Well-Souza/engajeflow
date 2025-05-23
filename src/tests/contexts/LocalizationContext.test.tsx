
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LocalizationProvider, useLocalization } from '@/contexts/LocalizationContext';

// Componente de teste para acessar o contexto
const TestComponent = () => {
  const { locale, setLocale, t, formatCurrency, availableLocales } = useLocalization();
  
  return (
    <div>
      <div data-testid="current-locale">{locale}</div>
      <div data-testid="available-locales">{availableLocales.join(',')}</div>
      <div data-testid="translated-text">{t('common.welcome')}</div>
      <div data-testid="formatted-currency">{formatCurrency(1234.56)}</div>
      
      <select 
        data-testid="locale-selector"
        value={locale}
        onChange={(e) => setLocale(e.target.value as 'pt' | 'en')}
      >
        {availableLocales.map(loc => (
          <option key={loc} value={loc}>{loc}</option>
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
    expect(localStorage.getItem('locale')).toBe('en');
  });
  
  it('formata corretamente valores de moeda com base no idioma', () => {
    render(
      <LocalizationProvider>
        <TestComponent />
      </LocalizationProvider>
    );
    
    const formattedCurrency = screen.getByTestId('formatted-currency').textContent;
    expect(formattedCurrency).toContain('R$');
    expect(formattedCurrency).toContain('1.234,56');
    
    const localeSelector = screen.getByTestId('locale-selector');
    fireEvent.change(localeSelector, { target: { value: 'en' } });
    
    const formattedCurrencyEn = screen.getByTestId('formatted-currency').textContent;
    expect(formattedCurrencyEn).toContain('$');
    expect(formattedCurrencyEn).toContain('1,234.56');
  });
});
