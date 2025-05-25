
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ConsultantAIService from '../../services/techcare/ConsultantAIService';

// Mock da função fetch
global.fetch = vi.fn();

describe('ConsultantAIService', () => {
  const mockFetch = vi.mocked(fetch);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('generateFinancialConsulting', () => {
    it('should analyze financial data successfully', async () => {
      const mockResponse = {
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                summary: 'Análise financeira completa',
                recommendations: ['Reduzir custos', 'Aumentar receita'],
                projections: {
                  revenue: 100000,
                  expenses: 80000,
                  profit: 20000
                }
              })
            }]
          }
        }]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await ConsultantAIService.generateFinancialConsulting(
        { revenue: 50000, expenses: 40000 },
        'test prompt'
      );

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.summary).toBe('Análise financeira completa');
        expect(result.data.recommendations).toHaveLength(2);
        expect(result.data.projections.profit).toBe(20000);
      }
    });

    it('should handle API errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('API Error'));

      const result = await ConsultantAIService.generateFinancialConsulting(
        { revenue: 50000, expenses: 40000 },
        'test prompt'
      );

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain('Erro ao gerar consultoria financeira');
      }
    });

    it('should return successful analysis with valid data', async () => {
      const mockResponse = {
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                summary: 'Test summary',
                recommendations: ['Test recommendation'],
                projections: { revenue: 100, expenses: 80, profit: 20 }
              })
            }]
          }
        }]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await ConsultantAIService.generateFinancialConsulting(
        { revenue: 50000, expenses: 40000 },
        'test prompt'
      );

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.summary).toBeDefined();
        expect(result.data.recommendations).toBeDefined();
        expect(result.data.projections).toBeDefined();
      }
    });
  });
});
