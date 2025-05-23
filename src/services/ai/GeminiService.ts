
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

class GeminiService {
  private apiKey: string = '';
  private baseUrl: string = 'https://generativelanguage.googleapis.com/v1beta';
  private model: string = 'gemini-1.5-flash';

  configure(config: { apiKey: string, model?: string }): void {
    this.apiKey = config.apiKey;
    if (config.model) {
      this.model = config.model;
    }
  }

  async generateContent(
    prompt: string, 
    config?: GeminiGenerationConfig
  ): Promise<GeminiResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`,
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
            generationConfig: config || {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data: {
          text: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
          finishReason: data.candidates?.[0]?.finishReason,
          safetyRatings: data.candidates?.[0]?.safetyRatings
        }
      };
    } catch (error) {
      console.error('Gemini API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido na API do Gemini'
      };
    }
  }

  async analyzeSentiment(text: string): Promise<GeminiResponse> {
    const prompt = `Analise o sentimento do seguinte texto e retorne um JSON com a estrutura:
{
  "sentiment": "positive" | "negative" | "neutral",
  "score": number between 0 and 1,
  "confidence": number between 0 and 1,
  "keyPhrases": ["array", "of", "key phrases"]
}

Texto para análise: "${text}"`;

    const result = await this.generateContent(prompt, {
      temperature: 0.3,
      maxOutputTokens: 512
    });

    if (result.success) {
      try {
        const jsonMatch = result.data.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedData = JSON.parse(jsonMatch[0]);
          return {
            success: true,
            data: parsedData
          };
        }
      } catch (parseError) {
        console.error('Erro ao parsear resposta do Gemini:', parseError);
      }
    }

    return result;
  }

  async classifyText(text: string): Promise<GeminiResponse> {
    const prompt = `Classifique o seguinte texto em uma categoria de atendimento e retorne um JSON:
{
  "category": "suporte_tecnico" | "cobranca" | "elogio" | "reclamacao" | "duvida" | "marketing" | "parceria",
  "confidence": number between 0 and 1,
  "subcategories": ["array", "of", "subcategories"]
}

Texto: "${text}"`;

    const result = await this.generateContent(prompt, {
      temperature: 0.2,
      maxOutputTokens: 256
    });

    if (result.success) {
      try {
        const jsonMatch = result.data.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedData = JSON.parse(jsonMatch[0]);
          return {
            success: true,
            data: parsedData
          };
        }
      } catch (parseError) {
        console.error('Erro ao parsear classificação do Gemini:', parseError);
      }
    }

    return result;
  }

  async summarizeText(text: string, maxLength?: number): Promise<GeminiResponse> {
    const prompt = `Resuma o seguinte texto de forma concisa e objetiva${maxLength ? ` em no máximo ${maxLength} caracteres` : ''}. 
Retorne um JSON:
{
  "summary": "resumo do texto",
  "originalLength": ${text.length},
  "summaryLength": number,
  "keyPoints": ["array", "of", "key points"]
}

Texto: "${text}"`;

    const result = await this.generateContent(prompt, {
      temperature: 0.3,
      maxOutputTokens: 512
    });

    if (result.success) {
      try {
        const jsonMatch = result.data.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedData = JSON.parse(jsonMatch[0]);
          return {
            success: true,
            data: parsedData
          };
        }
      } catch (parseError) {
        console.error('Erro ao parsear resumo do Gemini:', parseError);
      }
    }

    return result;
  }

  async generateResponse(prompt: string, context?: string): Promise<GeminiResponse> {
    const fullPrompt = `${context ? `Contexto: ${context}\n\n` : ''}Gere uma resposta profissional e empática para: "${prompt}"

Retorne um JSON:
{
  "text": "resposta principal",
  "variations": ["variação 1", "variação 2", "variação 3"],
  "reasoning": "explicação da abordagem escolhida"
}`;

    const result = await this.generateContent(fullPrompt, {
      temperature: 0.7,
      maxOutputTokens: 512
    });

    if (result.success) {
      try {
        const jsonMatch = result.data.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedData = JSON.parse(jsonMatch[0]);
          return {
            success: true,
            data: parsedData
          };
        }
      } catch (parseError) {
        console.error('Erro ao parsear resposta do Gemini:', parseError);
      }
    }

    return result;
  }

  async generateInsights(data: any): Promise<GeminiResponse> {
    const prompt = `Analise os seguintes dados e gere insights acionáveis:
${JSON.stringify(data, null, 2)}

Retorne um JSON com array de insights:
[
  {
    "title": "título do insight",
    "description": "descrição detalhada",
    "priority": "high" | "medium" | "low",
    "metrics": {"key": "value"},
    "recommendations": ["ação 1", "ação 2"]
  }
]`;

    const result = await this.generateContent(prompt, {
      temperature: 0.5,
      maxOutputTokens: 1024
    });

    if (result.success) {
      try {
        const jsonMatch = result.data.text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const parsedData = JSON.parse(jsonMatch[0]);
          return {
            success: true,
            data: parsedData
          };
        }
      } catch (parseError) {
        console.error('Erro ao parsear insights do Gemini:', parseError);
      }
    }

    return result;
  }
}

export default new GeminiService();
