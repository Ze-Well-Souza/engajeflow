import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { googleAI } from '@/config/environment';

/**
 * Serviço para integração com Google Gemini API
 */

export interface GeminiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface GeminiGenerationConfig {
  temperature?: number;
  topK?: number;
  topP?: number;
  maxOutputTokens?: number;
  stopSequences?: string[];
}

// Configure safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Generation config
const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

export interface ContentGenerationOptions {
  platform: 'facebook' | 'instagram' | 'whatsapp' | 'youtube' | 'linkedin' | 'twitter';
  contentType: 'post' | 'story' | 'reel' | 'caption' | 'description';
  tone: 'professional' | 'casual' | 'friendly' | 'humorous' | 'inspiring' | 'informative';
  targetAudience: string;
  keywords?: string[];
  maxLength?: number;
  includeHashtags?: boolean;
  includeCTA?: boolean;
}

export interface HashtagSuggestion {
  hashtag: string;
  popularity: 'high' | 'medium' | 'low';
  relevance: number;
  category: string;
}

export interface SentimentAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number; // -1 to 1
  emotions: {
    joy: number;
    anger: number;
    fear: number;
    surprise: number;
    sadness: number;
  };
  confidence: number;
}

export interface ContentOptimization {
  suggestedChanges: string[];
  engagement_score: number;
  readability_score: number;
  optimal_posting_times: string[];
  recommended_hashtags: HashtagSuggestion[];
}

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    if (!googleAI.apiKey) {
      throw new Error('Google AI API key não configurada');
    }

    this.genAI = new GoogleGenerativeAI(googleAI.apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-pro',
      generationConfig,
      safetySettings,
    });
  }

  /**
   * Gera conteúdo para redes sociais baseado nos parâmetros
   */
  async generateContent(
    prompt: string,
    options: ContentGenerationOptions
  ): Promise<string> {
    try {
      const enhancedPrompt = this.buildContentPrompt(prompt, options);
      
      const result = await this.model.generateContent(enhancedPrompt);
      const response = await result.response;
      const text = response.text();

      return this.formatContent(text, options);
    } catch (error) {
      console.error('Erro ao gerar conteúdo:', error);
      throw new Error('Falha na geração de conteúdo com IA');
    }
  }

  /**
   * Gera legendas otimizadas para posts com imagem
   */
  async generateCaption(
    imageDescription: string,
    options: ContentGenerationOptions
  ): Promise<string> {
    const prompt = `Crie uma legenda ${options.tone} para uma imagem que mostra: ${imageDescription}. 
    A legenda deve ser adequada para ${options.platform} e direcionada para ${options.targetAudience}.`;

    return this.generateContent(prompt, {
      ...options,
      contentType: 'caption',
      includeHashtags: true,
      includeCTA: true
    });
  }

  /**
   * Sugere hashtags relevantes baseado no conteúdo
   */
  async suggestHashtags(
    content: string,
    platform: string,
    niche: string,
    count: number = 10
  ): Promise<HashtagSuggestion[]> {
    try {
      const prompt = `
        Analise o seguinte conteúdo e sugira ${count} hashtags relevantes para ${platform}:
        
        Conteúdo: "${content}"
        Nicho: ${niche}
        
        Para cada hashtag, forneça:
        1. A hashtag (sem #)
        2. Popularidade (high/medium/low)
        3. Relevância (0-100)
        4. Categoria
        
        Responda em formato JSON:
        {
          "hashtags": [
            {
              "hashtag": "exemplo",
              "popularity": "medium",
              "relevance": 85,
              "category": "geral"
            }
          ]
        }
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed.hashtags.map((h: any) => ({
          ...h,
          relevance: h.relevance / 100 // Convert to 0-1 scale
        }));
      }

      // Fallback if JSON parsing fails
      return this.extractHashtagsFromText(text);
    } catch (error) {
      console.error('Erro ao gerar hashtags:', error);
      return [];
    }
  }

  /**
   * Analisa o sentimento de comentários ou mensagens
   */
  async analyzeSentiment(texts: string[]): Promise<SentimentAnalysis[]> {
    try {
      const prompt = `
        Analise o sentimento dos seguintes textos e responda em JSON:
        
        Textos: ${texts.map((t, i) => `${i + 1}. "${t}"`).join('\n')}
        
        Para cada texto, forneça:
        1. sentiment: "positive", "negative", ou "neutral"
        2. score: número de -1 (muito negativo) a 1 (muito positivo)
        3. emotions: objeto com joy, anger, fear, surprise, sadness (0-1)
        4. confidence: confiança da análise (0-1)
        
        Formato JSON:
        {
          "analyses": [
            {
              "sentiment": "positive",
              "score": 0.8,
              "emotions": {"joy": 0.7, "anger": 0.1, "fear": 0.0, "surprise": 0.2, "sadness": 0.0},
              "confidence": 0.9
            }
          ]
        }
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return parsed.analyses;
      }

      return texts.map(() => ({
        sentiment: 'neutral' as const,
        score: 0,
        emotions: { joy: 0, anger: 0, fear: 0, surprise: 0, sadness: 0 },
        confidence: 0.5
      }));
    } catch (error) {
      console.error('Erro na análise de sentimento:', error);
      return [];
    }
  }

  /**
   * Otimiza conteúdo existente para melhor engajamento
   */
  async optimizeContent(
    content: string,
    platform: string,
    targetAudience: string
  ): Promise<ContentOptimization> {
    try {
      const prompt = `
        Analise e otimize o seguinte conteúdo para ${platform}:
        
        Conteúdo: "${content}"
        Público-alvo: ${targetAudience}
        
        Forneça:
        1. suggestedChanges: array de sugestões de melhorias
        2. engagement_score: pontuação de potencial de engajamento (0-100)
        3. readability_score: pontuação de legibilidade (0-100)
        4. optimal_posting_times: melhores horários para postar
        5. recommended_hashtags: hashtags recomendadas
        
        Responda em JSON válido.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          suggestedChanges: parsed.suggestedChanges || [],
          engagement_score: parsed.engagement_score || 50,
          readability_score: parsed.readability_score || 50,
          optimal_posting_times: parsed.optimal_posting_times || [],
          recommended_hashtags: parsed.recommended_hashtags || []
        };
      }

      // Fallback response
      return {
        suggestedChanges: ['Adicionar call-to-action', 'Incluir emojis', 'Melhorar título'],
        engagement_score: 60,
        readability_score: 70,
        optimal_posting_times: ['08:00', '12:00', '18:00'],
        recommended_hashtags: []
      };
    } catch (error) {
      console.error('Erro na otimização de conteúdo:', error);
      throw new Error('Falha na otimização de conteúdo');
    }
  }

  /**
   * Gera ideias de conteúdo baseadas em tendências
   */
  async generateContentIdeas(
    niche: string,
    contentTypes: string[],
    count: number = 5
  ): Promise<string[]> {
    try {
      const prompt = `
        Gere ${count} ideias criativas de conteúdo para o nicho "${niche}".
        
        Tipos de conteúdo desejados: ${contentTypes.join(', ')}
        
        Cada ideia deve incluir:
        - Título/conceito principal
        - Breve descrição do conteúdo
        - Sugestão de formato/abordagem
        
        Liste as ideias numeradas.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Extract numbered ideas
      const ideas = text
        .split('\n')
        .filter(line => /^\d+\./.test(line.trim()))
        .map(line => line.replace(/^\d+\.\s*/, '').trim())
        .slice(0, count);

      return ideas.length > 0 ? ideas : ['Ideia de conteúdo não pôde ser gerada'];
    } catch (error) {
      console.error('Erro ao gerar ideias de conteúdo:', error);
      return ['Erro na geração de ideias'];
    }
  }

  /**
   * Traduz conteúdo para diferentes idiomas
   */
  async translateContent(
    content: string,
    targetLanguage: string,
    context?: string
  ): Promise<string> {
    try {
      const prompt = `
        Traduza o seguinte conteúdo para ${targetLanguage}, mantendo o tom e contexto original:
        
        ${context ? `Contexto: ${context}` : ''}
        
        Conteúdo: "${content}"
        
        Forneça apenas a tradução, sem explicações adicionais.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Erro na tradução:', error);
      throw new Error('Falha na tradução do conteúdo');
    }
  }

  // Private helper methods

  private buildContentPrompt(prompt: string, options: ContentGenerationOptions): string {
    let enhancedPrompt = `
      Crie um ${options.contentType} ${options.tone} para ${options.platform}.
      
      Solicitação: ${prompt}
      
      Público-alvo: ${options.targetAudience}
      ${options.keywords ? `Palavras-chave: ${options.keywords.join(', ')}` : ''}
      ${options.maxLength ? `Limite de caracteres: ${options.maxLength}` : ''}
      
      Diretrizes:
      - Tom: ${options.tone}
      - Plataforma: ${options.platform}
      - ${options.includeHashtags ? 'Inclua hashtags relevantes' : 'Não inclua hashtags'}
      - ${options.includeCTA ? 'Inclua call-to-action' : 'Não inclua call-to-action'}
      
      Responda apenas com o conteúdo solicitado, sem explicações.
    `;

    return enhancedPrompt;
  }

  private formatContent(content: string, options: ContentGenerationOptions): string {
    let formatted = content.trim();

    // Apply platform-specific formatting
    switch (options.platform) {
      case 'twitter':
        // Ensure Twitter character limit
        if (formatted.length > 280) {
          formatted = formatted.substring(0, 277) + '...';
        }
        break;
      case 'instagram':
        // Add line breaks for better Instagram formatting
        formatted = formatted.replace(/\. /g, '.\n\n');
        break;
      case 'linkedin':
        // Professional formatting for LinkedIn
        if (!formatted.match(/^[A-Z]/)) {
          formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
        }
        break;
    }

    return formatted;
  }

  private extractHashtagsFromText(text: string): HashtagSuggestion[] {
    const hashtagRegex = /#(\w+)/g;
    const hashtags: HashtagSuggestion[] = [];
    let match;

    while ((match = hashtagRegex.exec(text)) !== null) {
      hashtags.push({
        hashtag: match[1],
        popularity: 'medium',
        relevance: 0.7,
        category: 'geral'
      });
    }

    return hashtags;
  }
}

// Singleton instance
export const geminiService = new GeminiService();

// Utility functions for easy access
export const generateContent = (prompt: string, options: ContentGenerationOptions) => 
  geminiService.generateContent(prompt, options);

export const generateCaption = (imageDescription: string, options: ContentGenerationOptions) =>
  geminiService.generateCaption(imageDescription, options);

export const suggestHashtags = (content: string, platform: string, niche: string, count?: number) =>
  geminiService.suggestHashtags(content, platform, niche, count);

export const analyzeSentiment = (texts: string[]) =>
  geminiService.analyzeSentiment(texts);

export const optimizeContent = (content: string, platform: string, targetAudience: string) =>
  geminiService.optimizeContent(content, platform, targetAudience);

export const generateContentIdeas = (niche: string, contentTypes: string[], count?: number) =>
  geminiService.generateContentIdeas(niche, contentTypes, count);

export const translateContent = (content: string, targetLanguage: string, context?: string) =>
  geminiService.translateContent(content, targetLanguage, context);
