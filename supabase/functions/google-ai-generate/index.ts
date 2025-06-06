
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, type, platform, context } = await req.json();
    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    
    if (!apiKey) {
      throw new Error('Google AI API key não configurada');
    }

    let systemPrompt = '';
    
    switch (type) {
      case 'post':
        systemPrompt = `Você é um especialista em criação de conteúdo para ${platform}. Crie um post envolvente e criativo baseado no prompt do usuário. O conteúdo deve ser apropriado para a plataforma ${platform} e incluir elementos que geram engajamento.`;
        break;
      case 'response':
        systemPrompt = `Você é um assistente de atendimento ao cliente. Crie uma resposta profissional, amigável e útil baseada no contexto da conversa: ${context}`;
        break;
      case 'hashtags':
        systemPrompt = `Gere hashtags relevantes e populares para o conteúdo relacionado a: ${prompt}. Retorne apenas as hashtags separadas por espaços, sem numeração.`;
        break;
      case 'caption':
        systemPrompt = `Crie uma legenda atrativa para ${platform} sobre: ${prompt}. A legenda deve ser envolvente e incluir call-to-action quando apropriado.`;
        break;
      default:
        systemPrompt = 'Você é um assistente especializado em marketing digital e redes sociais.';
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nPrompt do usuário: ${prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Google AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Extrair hashtags se for do tipo hashtags
    let hashtags = [];
    if (type === 'hashtags') {
      hashtags = generatedContent.split(/\s+/).filter(tag => tag.startsWith('#'));
    }

    return new Response(JSON.stringify({ 
      content: generatedContent,
      hashtags: hashtags,
      type: type,
      platform: platform
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in google-ai-generate function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Erro interno do servidor' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
