
import { supabase } from '@/integrations/supabase/client';

export interface AIGenerationRequest {
  prompt: string;
  type: 'post' | 'response' | 'hashtags' | 'caption';
  platform: string;
  context?: string;
}

export interface AIGenerationResponse {
  content: string;
  hashtags?: string[];
  type: string;
  platform: string;
}

export interface SentimentAnalysisRequest {
  text: string;
  contentType: string;
  contentId?: string;
}

export interface SentimentResult {
  score: number; // -1 a 1
  label: 'positive' | 'negative' | 'neutral';
  confidence: number; // 0 a 1
}

export class GoogleAIService {
  static async generateContent(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    const { data, error } = await supabase.functions.invoke('google-ai-generate', {
      body: request
    });

    if (error) {
      throw new Error(`Erro na geração de conteúdo: ${error.message}`);
    }

    // Salvar conteúdo gerado no histórico
    const user = await supabase.auth.getUser();
    if (user.data.user) {
      await supabase.from('ai_generated_content').insert({
        user_id: user.data.user.id,
        content_type: request.type,
        prompt: request.prompt,
        generated_content: data.content,
        metadata: {
          platform: request.platform,
          context: request.context
        }
      });
    }

    return data;
  }

  static async analyzeSentiment(request: SentimentAnalysisRequest): Promise<SentimentResult> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      throw new Error('Usuário não autenticado');
    }

    const { data, error } = await supabase.functions.invoke('sentiment-analysis', {
      body: {
        ...request,
        userId: user.data.user.id
      }
    });

    if (error) {
      throw new Error(`Erro na análise de sentimento: ${error.message}`);
    }

    return data.sentiment;
  }

  static async getSentimentHistory(contentType?: string) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      throw new Error('Usuário não autenticado');
    }

    let query = supabase
      .from('sentiment_analysis')
      .select('*')
      .eq('user_id', user.data.user.id)
      .order('created_at', { ascending: false });

    if (contentType) {
      query = query.eq('content_type', contentType);
    }

    const { data, error } = await query;
    
    if (error) {
      throw error;
    }

    return data;
  }

  static async getAIContentHistory(contentType?: string) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      throw new Error('Usuário não autenticado');
    }

    let query = supabase
      .from('ai_generated_content')
      .select('*')
      .eq('user_id', user.data.user.id)
      .order('created_at', { ascending: false });

    if (contentType) {
      query = query.eq('content_type', contentType);
    }

    const { data, error } = await query;
    
    if (error) {
      throw error;
    }

    return data;
  }
}
