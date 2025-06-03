
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ShoppingCart, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  NicheInfo,
  SupplierInfo,
  BusinessPlan,
  DropshippingPlanWidgetProps
} from './dropshipping-plan/types';
import LoadingState from './dropshipping-plan/LoadingState';
import ErrorState from './dropshipping-plan/ErrorState';
import EmptyState from './dropshipping-plan/EmptyState';
import NichesTab from './dropshipping-plan/NichesTab';
import SuppliersTab from './dropshipping-plan/SuppliersTab';
import PlanTab from './dropshipping-plan/PlanTab';

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
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} onRetry={generatePlan} />
        ) : niches && suppliers && businessPlan ? (
          <div>
            <Tabs defaultValue="niches" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-4">
                <TabsTrigger value="niches">Nichos</TabsTrigger>
                <TabsTrigger value="suppliers">Fornecedores</TabsTrigger>
                <TabsTrigger value="plan">Plano de negócio</TabsTrigger>
              </TabsList>
              
              <NichesTab niches={niches} />
              <SuppliersTab suppliers={suppliers} />
              <PlanTab businessPlan={businessPlan} />
            </Tabs>
          </div>
        ) : (
          <EmptyState onGenerate={generatePlan} />
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
