
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, contentType, contentId, userId } = await req.json();
    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    
    if (!apiKey) {
      throw new Error('Google AI API key não configurada');
    }

    // Analisar sentimento com Google AI
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analise o sentimento do seguinte texto e retorne APENAS um JSON com os campos: score (número entre -1 e 1), label (positive, negative ou neutral), confidence (número entre 0 e 1). Texto: "${text}"`
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          topK: 1,
          topP: 0.1,
          maxOutputTokens: 100,
        }
      })
    });

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    let sentimentData;
    try {
      sentimentData = JSON.parse(aiResponse);
    } catch (e) {
      // Fallback se a IA não retornar JSON válido
      sentimentData = {
        score: 0,
        label: 'neutral',
        confidence: 0.5
      };
    }

    // Salvar no banco de dados
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: dbError } = await supabase
      .from('sentiment_analysis')
      .insert({
        user_id: userId,
        content_id: contentId,
        content_type: contentType,
        content_text: text,
        sentiment_score: sentimentData.score,
        sentiment_label: sentimentData.label,
        confidence_score: sentimentData.confidence,
        analyzed_by: 'google_ai'
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    return new Response(JSON.stringify({
      sentiment: sentimentData,
      success: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in sentiment-analysis function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Erro interno do servidor' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
