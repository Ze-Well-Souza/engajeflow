
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AIService from '../../services/techcare/AIService';

describe('AI Integration Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    
    // Configurar AIService para testes
    AIService.configure({
      apiKey: 'test-integration-key',
      useGemini: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should complete full sentiment analysis workflow', async () => {
    const testText = 'Estou muito satisfeito com o atendimento, foi excelente!';
    
    const result = await AIService.analyzeSentiment(testText);
    
    expect(result.success).toBe(true);
    expect(result.data?.sentiment).toBe('positive');
    expect(result.data?.score).toBeGreaterThan(0);
    expect(result.data?.confidence).toBeGreaterThan(0.5);
  });

  it('should complete full ticket classification workflow', async () => {
    const testTicket = 'Não consigo acessar minha conta, esqueci minha senha';
    
    const result = await AIService.classifyTicket(testTicket);
    
    expect(result.success).toBe(true);
    expect(result.data?.category).toBe('suporte_tecnico');
    expect(result.data?.confidence).toBeGreaterThan(0.5);
  });

  it('should complete full response generation workflow', async () => {
    const context = 'Cliente com problema de login que não recebe e-mail de redefinição';
    
    const result = await AIService.generateResponse('Ajudar cliente', { context });
    
    expect(result.success).toBe(true);
    expect(result.data?.text).toContain('login');
    expect(result.data?.variations.length).toBeGreaterThan(0);
  });

  it('should complete full text summarization workflow', async () => {
    const conversation = `
      Cliente: Olá, estou com problema para acessar
      Atendente: Olá! Vou ajudar você
      Cliente: Não consigo fazer login
      Atendente: Vou verificar sua conta
      Cliente: Muito obrigado, resolveu!
    `;
    
    const result = await AIService.summarizeText(conversation);
    
    expect(result.success).toBe(true);
    expect(result.data?.summary).toContain('login');
    expect(result.data?.keyPoints).toContain('Problema de acesso à conta');
  });

  it('should handle multiple AI operations in sequence', async () => {
    const testText = 'Problema urgente com pagamento, preciso de ajuda imediata!';
    
    // 1. Analisar sentimento
    const sentimentResult = await AIService.analyzeSentiment(testText);
    expect(sentimentResult.success).toBe(true);
    
    // 2. Classificar ticket
    const classificationResult = await AIService.classifyTicket(testText);
    expect(classificationResult.success).toBe(true);
    
    // 3. Gerar resposta baseada na classificação
    const responseResult = await AIService.generateResponse('Responder', { context: testText });
    expect(responseResult.success).toBe(true);
    
    // Verificar que os resultados fazem sentido em conjunto
    expect(sentimentResult.data?.sentiment).toBe('negative');
    expect(classificationResult.data?.category).toBe('cobranca');
    expect(responseResult.data?.text).toContain('pagamento');
  });
});
