
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ShoppingBag, Loader2, AlertTriangle, RefreshCcw, TrendingUp, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AIService from '@/services/techcare/AIService';

interface SalesConsultantWidgetProps {
  products?: string[];
  storeCategory?: string;
  onSuggestionGenerated?: (suggestion: string) => void;
}

type SuggestionType = "popular" | "upsell" | "trend";

interface ProductSuggestion {
  name: string;
  description: string;
  type: SuggestionType;
  reasoning: string;
}

const SalesConsultantWidget: React.FC<SalesConsultantWidgetProps> = ({
  products = [],
  storeCategory = "geral",
  onSuggestionGenerated
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<ProductSuggestion[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const generateSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Em produção, isso seria uma chamada real à API de IA
      // Dados simulados para demonstração
      setTimeout(() => {
        const demoSuggestions: ProductSuggestion[] = [
          {
            name: "Películas de proteção premium",
            description: "Películas de vidro temperado com proteção anti-impacto e anti-riscos",
            type: "upsell",
            reasoning: "Clientes que compram capas de celular geralmente também se interessam por películas de proteção. É um complemento natural para proteção completa do dispositivo."
          },
          {
            name: "Carregador portátil 10.000mAh",
            description: "Carregador portátil compacto com duas saídas USB",
            type: "upsell",
            reasoning: "Este item é frequentemente comprado junto com acessórios para celular, pois resolve o problema da bateria fraca durante o dia."
          },
          {
            name: "Suporte veicular para smartphone",
            description: "Suporte magnético para painel ou saída de ar",
            type: "trend",
            reasoning: "Este produto está em alta no mercado devido ao aumento de pessoas que usam aplicativos de navegação no carro."
          }
        ];
        
        setSuggestions(demoSuggestions);
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      setError("Erro ao gerar sugestões de produtos");
      setIsLoading(false);
    }
  };
  
  const getBadgeColorForType = (type: SuggestionType) => {
    switch (type) {
      case "popular":
        return "bg-blue-100 text-blue-800";
      case "upsell":
        return "bg-green-100 text-green-800";
      case "trend":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getTypeLabel = (type: SuggestionType) => {
    switch (type) {
      case "popular":
        return "Popular";
      case "upsell":
        return "Venda adicional";
      case "trend":
        return "Tendência";
      default:
        return type;
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Consultor de Vendas IA
        </CardTitle>
        <CardDescription>
          Sugestões inteligentes para aumentar suas vendas
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Analisando seu catálogo e mercado...</p>
          </div>
        ) : error ? (
          <div className="text-center py-6">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-sm text-destructive font-medium">{error}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={generateSuggestions}>
              Tentar novamente
            </Button>
          </div>
        ) : suggestions ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Com base na análise do seu catálogo de produtos e tendências do mercado, 
              identificamos estas oportunidades para aumentar suas vendas:
            </p>
            
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{suggestion.name}</h4>
                  <Badge className={getBadgeColorForType(suggestion.type)}>
                    {getTypeLabel(suggestion.type)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Lightbulb className="h-3 w-3" />
                  <span>{suggestion.reasoning}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 space-y-4">
            <ShoppingBag className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-lg font-medium">Descubra novas oportunidades de vendas</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Nossa IA analisará seu catálogo e identificará produtos populares, 
              oportunidades de venda casada (cross-sell) e tendências de mercado.
            </p>
            <Button onClick={generateSuggestions}>
              Gerar sugestões de produtos
            </Button>
          </div>
        )}
      </CardContent>
      {suggestions && (
        <>
          <Separator />
          <CardFooter className="pt-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={generateSuggestions}
            >
              <RefreshCcw className="h-4 w-4 mr-2" /> Atualizar sugestões
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default SalesConsultantWidget;
