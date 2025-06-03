```tsx
import { render, screen } from '@testing-library/react';
import SalesForecastPage from './SalesForecastPage';
import { useLocalization } from '@/contexts/LocalizationContext';
import { vi } from 'vitest';

vi.mock('@/contexts/LocalizationContext', () => ({
  useLocalization: () => ({
    formatCurrency: vi.fn(),
    t: (key: string) => key, // Mock simples para tradução
  }),
}));

describe('SalesForecastPage', () => {
  it('should render the page title', () => {
    render(<SalesForecastPage />);
    expect(screen.getByRole('heading', { name: /Previsão de Vendas com Machine Learning/i })).toBeInTheDocument();
  });

  it('should render the alert message initially', () => {
    render(<SalesForecastPage />);
    expect(screen.getByText(/Novos dados disponíveis/i)).toBeInTheDocument();
    expect(screen.getByText(/Novos dados de vendas foram importados/i)).toBeInTheDocument();
  });

  it('should hide the alert message after clicking "Ignorar"', () => {
    render(<SalesForecastPage />);
    const ignoreButton = screen.getByRole('button', { name: /Ignorar/i });
    fireEvent.click(ignoreButton);
    expect(screen.queryByText(/Novos dados disponíveis/i)).not.toBeInTheDocument();
  });

  // 1. Testar a renderização do gráfico de previsão diária (LineChart) - este teste precisará de mocks para o componente recharts ou a função que gera os dados.
  // 2. Testar a renderização do gráfico de previsão mensal (AreaChart) - similar ao teste 1.
  // 3. Testar a funcionalidade dos seletores de intervalo de tempo (Select components) - simular a mudança do valor de estado e verificar se os gráficos são atualizados (requer mocks para o recharts ou dados).
  // 4. Testar a funcionalidade do botão "Recalcular" (verificar se o estado `showAlert` é alterado e se os gráficos são atualizados após o clique).
  // 5. Testar o uso do `formatCurrency` (requer mocks mais elaborados para o `useLocalization`).
  // 6. Adicionar testes de acessibilidade com getByRole para garantir roles semânticos apropriados.  Ex: `screen.getByRole('alert', {name: /Novos dados disponíveis/i})`


});

```