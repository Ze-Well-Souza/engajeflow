
/**
 * Serviço para integração com Google AI/Gemini
 */
import { toast } from "sonner";

interface GoogleAIConfig {
  apiKey: string;
  model: string;
}

interface ContentGenerationRequest {
  prompt: string;
  segment: string;
  platform: string;
  tone?: 'professional' | 'casual' | 'friendly' | 'formal';
  maxTokens?: number;
}

interface ContentGenerationResponse {
  content: string;
  hashtags: string[];
  bestTime: string;
  success: boolean;
  error?: string;
}

class GoogleAIService {
  private config: GoogleAIConfig;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';

  constructor() {
    this.config = {
      apiKey: 'AIzaSyA5-poSVcry1lqivwoNazFbWr2n3Q_VFtE',
      model: 'gemini-pro'
    };
  }

  /**
   * Gera conteúdo para redes sociais usando Gemini
   */
  async generateContent(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    try {
      const prompt = this.buildPrompt(request);
      
      const response = await fetch(
        `${this.baseUrl}/${this.config.model}:generateContent?key=${this.config.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: request.maxTokens || 1000,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Erro da API: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) {
        throw new Error('Resposta inválida da API');
      }

      return this.parseGeneratedContent(generatedText);
    } catch (error) {
      console.error('Erro ao gerar conteúdo:', error);
      toast.error('Erro ao gerar conteúdo com IA');
      return {
        content: '',
        hashtags: [],
        bestTime: '',
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  /**
   * Analisa sentimento de texto
   */
  async analyzeSentiment(text: string): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
    suggestions: string[];
  }> {
    try {
      const prompt = `
        Analise o sentimento do seguinte texto em português brasileiro:
        "${text}"
        
        Retorne no formato JSON:
        {
          "sentiment": "positive|negative|neutral",
          "confidence": 0.85,
          "suggestions": ["sugestão 1", "sugestão 2"]
        }
      `;

      const response = await fetch(
        `${this.baseUrl}/${this.config.model}:generateContent?key=${this.config.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        }
      );

      const data = await response.json();
      const result = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      return JSON.parse(result);
    } catch (error) {
      console.error('Erro na análise de sentimento:', error);
      return {
        sentiment: 'neutral',
        confidence: 0,
        suggestions: []
      };
    }
  }

  /**
   * Traduz texto para diferentes idiomas
   */
  async translateText(text: string, targetLanguage: string): Promise<string> {
    try {
      const prompt = `
        Traduza o seguinte texto para ${targetLanguage}:
        "${text}"
        
        Retorne apenas a tradução, sem explicações adicionais.
      `;

      const response = await fetch(
        `${this.baseUrl}/${this.config.model}:generateContent?key=${this.config.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        }
      );

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || text;
    } catch (error) {
      console.error('Erro na tradução:', error);
      return text;
    }
  }

  /**
   * Constrói o prompt personalizado baseado no contexto
   */
  private buildPrompt(request: ContentGenerationRequest): string {
    const segmentContext = {
      beauty: 'salão de beleza, estética, cabeleireiro',
      restaurant: 'restaurante, gastronomia, culinária',
      realestate: 'imóveis, corretor, vendas',
      retail: 'varejo, loja, produtos',
      services: 'serviços profissionais'
    };

    const platformContext = {
      instagram: 'visual, stories, reels, engajamento',
      facebook: 'comunidade, compartilhamento, eventos',
      linkedin: 'profissional, networking, B2B',
      twitter: 'conciso, trending, hashtags'
    };

    return `
      Você é um especialista em marketing digital brasileiro. 
      
      Contexto:
      - Segmento: ${segmentContext[request.segment as keyof typeof segmentContext] || request.segment}
      - Plataforma: ${platformContext[request.platform as keyof typeof platformContext] || request.platform}
      - Tom: ${request.tone || 'profissional mas acessível'}
      
      Prompt: ${request.prompt}
      
      Por favor, gere:
      1. Um texto envolvente para a postagem (máximo 280 caracteres se for Twitter, 500 se for outras plataformas)
      2. 5-8 hashtags relevantes em português
      3. Melhor horário para postar (formato HH:MM)
      
      Formato de resposta:
      CONTEÚDO: [texto da postagem]
      HASHTAGS: #hashtag1 #hashtag2 #hashtag3
      HORÁRIO: HH:MM
    `;
  }

  /**
   * Processa a resposta da IA
   */
  private parseGeneratedContent(text: string): ContentGenerationResponse {
    try {
      const lines = text.split('\n');
      let content = '';
      let hashtags: string[] = [];
      let bestTime = '12:00';

      for (const line of lines) {
        if (line.startsWith('CONTEÚDO:')) {
          content = line.replace('CONTEÚDO:', '').trim();
        } else if (line.startsWith('HASHTAGS:')) {
          const hashtagsText = line.replace('HASHTAGS:', '').trim();
          hashtags = hashtagsText.split(' ').filter(tag => tag.startsWith('#'));
        } else if (line.startsWith('HORÁRIO:')) {
          bestTime = line.replace('HORÁRIO:', '').trim();
        }
      }

      return {
        content: content || text.substring(0, 300),
        hashtags: hashtags.length > 0 ? hashtags : ['#marketing', '#negócios'],
        bestTime,
        success: true
      };
    } catch (error) {
      return {
        content: text.substring(0, 300),
        hashtags: ['#marketing', '#negócios'],
        bestTime: '12:00',
        success: true
      };
    }
  }
}

export default new GoogleAIService();
