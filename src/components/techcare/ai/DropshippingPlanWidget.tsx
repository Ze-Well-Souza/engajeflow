
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Loader2, AlertTriangle, RefreshCcw, TrendingUp, Calendar, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DropshippingPlanWidgetProps {
  interests?: string[];
  onPlanGenerated?: (plan: any) => void;
}

interface NicheInfo {
  name: string;
  description: string;
  growthRate: number;
  competition: "baixa" | "média" | "alta";
  profit: "baixa" | "média" | "alta";
}

interface SupplierInfo {
  name: string;
  platform: string;
  minOrderValue: string;
  shippingTime: string;
  rating: number;
  advantages: string[];
}

interface BusinessPlan {
  steps: {
    title: string;
    description: string;
    estimatedTime: string;
  }[];
}

const DropshippingPlanWidget: React.FC<DropshippingPlanWidgetProps> = ({
  interests = [],
  onPlanGenerated
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [niches, setNiches] = useState<NicheInfo[] | null>(null);
  const [suppliers, setSuppliers] = useState<SupplierInfo[] | null>(null);
  const [businessPlan, setBusinessPlan] = useState<BusinessPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const generatePlan = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Em produção, isso seria uma chamada real à API de IA
      // Dados simulados para demonstração
      setTimeout(() => {
        const demoNiches: NicheInfo[] = [
          {
            name: "Produtos Pet",
            description: "Acessórios, brinquedos e itens de cuidado para animais de estimação",
            growthRate: 24,
            competition: "média",
            profit: "alta"
          },
          {
            name: "Itens de Organização para Casa",
            description: "Organizadores, caixas e soluções de armazenamento para o lar",
            growthRate: 18,
            competition: "baixa",
            profit: "média"
          },
          {
            name: "Gadgets Ecológicos",
            description: "Produtos sustentáveis e inovadores para o dia a dia",
            growthRate: 32,
            competition: "baixa",
            profit: "alta"
          }
        ];
        
        const demoSuppliers: SupplierInfo[] = [
          {
            name: "PetGlobal",
            platform: "AliExpress",
            minOrderValue: "US$ 5,00",
            shippingTime: "15-30 dias",
            rating: 4.7,
            advantages: ["Grande variedade", "Fotos de qualidade", "Frete grátis em vários itens"]
          },
          {
            name: "EcoShop BR",
            platform: "Shopify",
            minOrderValue: "R$ 100,00",
            shippingTime: "3-5 dias úteis",
            rating: 4.5,
            advantages: ["Estoque no Brasil", "Entrega rápida", "Atendimento em português"]
          },
          {
            name: "Casa & Cia Distribuidora",
            platform: "NuvemShop",
            minOrderValue: "R$ 200,00",
            shippingTime: "5-7 dias úteis",
            rating: 4.3,
            advantages: ["Produtos com nota fiscal", "Garantia nacional", "Kits promocionais"]
          }
        ];
        
        const demoPlan: BusinessPlan = {
          steps: [
            {
              title: "Definição do nicho",
              description: "Escolha um dos nichos recomendados com base no seu interesse e potencial de mercado",
              estimatedTime: "1 semana"
            },
            {
              title: "Pesquisa de fornecedores",
              description: "Avalie os fornecedores sugeridos, solicite amostras e verifique a qualidade dos produtos",
              estimatedTime: "2 semanas"
            },
            {
              title: "Criação da loja online",
              description: "Monte sua loja usando plataformas como Shopify, NuvemShop ou WooCommerce",
              estimatedTime: "1-2 semanas"
            },
            {
              title: "Configuração de pagamentos",
              description: "Integre gateways de pagamento e configure métodos de envio",
              estimatedTime: "2-3 dias"
            },
            {
              title: "Marketing inicial",
              description: "Crie suas redes sociais, campanha inicial no Google e anúncios no Facebook/Instagram",
              estimatedTime: "1 semana"
            }
          ]
        };
        
        setNiches(demoNiches);
        setSuppliers(demoSuppliers);
        setBusinessPlan(demoPlan);
        setIsLoading(false);
        
        if (onPlanGenerated) {
          onPlanGenerated({
            niches: demoNiches,
            suppliers: demoSuppliers,
            plan: demoPlan
          });
        }
      }, 2500);
      
    } catch (error) {
      setError("Erro ao gerar plano de dropshipping");
      setIsLoading(false);
    }
  };
  
  const getCompetitionBadge = (level: "baixa" | "média" | "alta") => {
    switch (level) {
      case "baixa":
        return <Badge className="bg-green-100 text-green-800">Baixa</Badge>;
      case "média":
        return <Badge className="bg-yellow-100 text-yellow-800">Média</Badge>;
      case "alta":
        return <Badge className="bg-red-100 text-red-800">Alta</Badge>;
    }
  };
  
  const getProfitBadge = (level: "baixa" | "média" | "alta") => {
    switch (level) {
      case "baixa":
        return <Badge className="bg-red-100 text-red-800">Baixa</Badge>;
      case "média":
        return <Badge className="bg-yellow-100 text-yellow-800">Média</Badge>;
      case "alta":
        return <Badge className="bg-green-100 text-green-800">Alta</Badge>;
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Plano de Dropshipping IA
        </CardTitle>
        <CardDescription>
          Seu negócio online personalizado em etapas simples
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Analisando tendências de mercado e montando seu plano...</p>
          </div>
        ) : error ? (
          <div className="text-center py-6">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-sm text-destructive font-medium">{error}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={generatePlan}>
              Tentar novamente
            </Button>
          </div>
        ) : niches && suppliers && businessPlan ? (
          <div>
            <Tabs defaultValue="niches" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-4">
                <TabsTrigger value="niches">Nichos</TabsTrigger>
                <TabsTrigger value="suppliers">Fornecedores</TabsTrigger>
                <TabsTrigger value="plan">Plano de negócio</TabsTrigger>
              </TabsList>
              
              <TabsContent value="niches" className="space-y-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Nichos de mercado em alta com potencial para seu negócio de dropshipping:
                </p>
                
                {niches.map((niche, index) => (
                  <div key={index} className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{niche.name}</h4>
                      <Badge className="bg-blue-100 text-blue-800">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {niche.growthRate}% crescimento
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{niche.description}</p>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">Competição:</span>
                        {getCompetitionBadge(niche.competition)}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">Margem:</span>
                        {getProfitBadge(niche.profit)}
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="suppliers" className="space-y-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Fornecedores recomendados para os nichos sugeridos:
                </p>
                
                {suppliers.map((supplier, index) => (
                  <div key={index} className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{supplier.name}</h4>
                      <Badge className="bg-purple-100 text-purple-800">
                        {supplier.platform}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div>
                        <span className="text-muted-foreground">Pedido mínimo:</span>
                        <span className="font-medium ml-1">{supplier.minOrderValue}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Prazo de entrega:</span>
                        <span className="font-medium ml-1">{supplier.shippingTime}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avaliação:</span>
                        <span className="font-medium ml-1">{supplier.rating}/5</span>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <h5 className="text-xs font-medium mb-1">Vantagens:</h5>
                      <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-0.5">
                        {supplier.advantages.map((advantage, aIndex) => (
                          <li key={aIndex}>{advantage}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="plan" className="space-y-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Plano de implementação passo a passo:
                </p>
                
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-3 border-l-2 border-dashed border-primary/30"></div>
                  
                  <div className="space-y-4">
                    {businessPlan.steps.map((step, index) => (
                      <div key={index} className="pl-8 relative">
                        <div className="absolute left-0 top-0 bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                        
                        <div className="bg-muted p-3 rounded-lg">
                          <h4 className="font-medium text-sm mb-1">{step.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs">{step.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 bg-amber-50 p-3 rounded-md">
                  <div className="flex items-center gap-1 mb-1 text-sm font-medium text-amber-700">
                    <Store className="h-4 w-4" />
                    <span>Investimento inicial estimado</span>
                  </div>
                  <p className="text-xs text-amber-700">
                    Para começar seu negócio de dropshipping, preveja um investimento inicial 
                    de R$ 1.000 a R$ 3.000, incluindo amostras de produtos, criação da loja 
                    e marketing inicial. O retorno pode começar a partir do primeiro mês 
                    com as estratégias certas.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-10 space-y-4">
            <ShoppingCart className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-lg font-medium">Monte seu negócio de dropshipping</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Nossa IA analisará tendências de mercado e criará um plano personalizado 
              com nichos promissores, fornecedores confiáveis e um passo a passo para 
              iniciar seu negócio online.
            </p>
            <Button onClick={generatePlan}>
              Gerar plano de negócio
            </Button>
          </div>
        )}
      </CardContent>
      {niches && suppliers && businessPlan && (
        <>
          <Separator />
          <CardFooter className="pt-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={generatePlan}
            >
              <RefreshCcw className="h-4 w-4 mr-2" /> Atualizar plano
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default DropshippingPlanWidget;
