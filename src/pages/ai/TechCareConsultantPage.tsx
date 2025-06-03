
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

import SalesConsultantWidget from "@/components/techcare/ai/SalesConsultantWidget";
import MediaConsultantWidget from "@/components/techcare/ai/MediaConsultantWidget";
import DropshippingPlanWidget from "@/components/techcare/ai/DropshippingPlanWidget";
import FinancialAdvisorWidget from "@/components/techcare/ai/FinancialAdvisorWidget";

const TechCareConsultantPage: React.FC = () => {
  const [businessType, setBusinessType] = useState<string>("varejo");
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">TechCare Consultant - Consultoria com IA</h1>
      <p className="text-muted-foreground mb-6">
        Ferramentas de consultoria inteligente para impulsionar seu negócio
      </p>
      
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Ambiente de demonstração</AlertTitle>
        <AlertDescription>
          Esta é uma demonstração que simula o funcionamento das ferramentas de IA. Em produção, você terá acesso a análises personalizadas com base nos seus dados reais.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="sales">Consultor de Vendas</TabsTrigger>
          <TabsTrigger value="media">Estratégia de Mídias</TabsTrigger>
          <TabsTrigger value="dropshipping">Plano Dropshipping</TabsTrigger>
          <TabsTrigger value="financial">Consultoria Fiscal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales">
          <div className="grid md:grid-cols-2 gap-6">
            <SalesConsultantWidget />
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Sobre o Consultor de Vendas</h3>
                <p className="text-muted-foreground mb-4">
                  O Consultor de Vendas com IA analisa seu catálogo de produtos e identifica oportunidades estratégicas para aumentar seu faturamento.
                </p>
                <h4 className="font-medium mt-4 mb-2">Principais benefícios:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Identificação de produtos populares com maior potencial de venda</li>
                  <li>Sugestões de venda cruzada (cross-sell) e venda incremental (up-sell)</li>
                  <li>Detecção de tendências emergentes no seu segmento</li>
                  <li>Recomendações personalizadas com base no seu histórico de vendas</li>
                  <li>Estratégias de precificação e pacotes promocionais</li>
                </ul>
                <h4 className="font-medium mt-4 mb-2">Exemplo:</h4>
                <p className="text-sm italic text-muted-foreground">
                  "Você vende capinhas de celular? Nossa análise mostra que 78% dos clientes
                  que compram capas também se interessam por películas de proteção. Considere 
                  oferecer um combo com desconto para aumentar o ticket médio."
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="media">
          <div className="grid md:grid-cols-2 gap-6">
            <MediaConsultantWidget />
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Sobre o Consultor de Mídias</h3>
                <p className="text-muted-foreground mb-4">
                  O Consultor de Mídias e Alcance utiliza IA para otimizar sua estratégia de conteúdo em diferentes plataformas sociais.
                </p>
                <h4 className="font-medium mt-4 mb-2">Principais benefícios:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Sugestões de conteúdo personalizado para cada plataforma</li>
                  <li>Recomendações de hashtags relevantes para seu segmento</li>
                  <li>Análise dos melhores horários para publicação</li>
                  <li>Formatos de conteúdo que geram mais engajamento</li>
                  <li>Estratégias para atingir novos públicos</li>
                </ul>
                <h4 className="font-medium mt-4 mb-2">Exemplo:</h4>
                <p className="text-sm italic text-muted-foreground">
                  "Use esse carrossel no Instagram para mostrar seus 5 produtos mais vendidos com este texto otimizado para engajamento. 
                  Publique terças e quintas entre 18h e 20h para maior alcance no seu segmento."
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="dropshipping">
          <div className="grid md:grid-cols-2 gap-6">
            <DropshippingPlanWidget />
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Sobre o Plano de Dropshipping</h3>
                <p className="text-muted-foreground mb-4">
                  O Plano de Dropshipping com IA ajuda você a estruturar um negócio online rentável, 
                  identificando nichos promissores e fornecedores confiáveis.
                </p>
                <h4 className="font-medium mt-4 mb-2">Principais benefícios:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Análise de nichos em alta com baixa competição</li>
                  <li>Sugestões de fornecedores com melhores avaliações</li>
                  <li>Plano de negócio detalhado em etapas práticas</li>
                  <li>Estimativas de investimento inicial e potencial de lucro</li>
                  <li>Estratégias de marketing para lançamento</li>
                </ul>
                <h4 className="font-medium mt-4 mb-2">Exemplo:</h4>
                <p className="text-sm italic text-muted-foreground">
                  "Seu perfil combina com produtos para pet. Este nicho tem crescido 24% ao ano, 
                  com alta margem de lucro e competição média. Monte uma landing page com este template 
                  e use o fornecedor PetGlobal pelo AliExpress para começar."
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="financial">
          <div className="grid md:grid-cols-2 gap-6">
            <FinancialAdvisorWidget />
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Sobre a Consultoria Fiscal</h3>
                <p className="text-muted-foreground mb-4">
                  A Consultoria Fiscal com IA oferece orientação personalizada para empreendedores,
                  ajudando a organizar suas finanças e cumprir obrigações fiscais.
                </p>
                <h4 className="font-medium mt-4 mb-2">Principais benefícios:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Lembretes de prazos fiscais importantes (DAS-MEI, IRPF)</li>
                  <li>Análise simplificada de fluxo de caixa</li>
                  <li>Sugestões para economia de impostos</li>
                  <li>Orientação para transição entre regimes tributários</li>
                  <li>Respostas para dúvidas fiscais comuns</li>
                </ul>
                <h4 className="font-medium mt-4 mb-2">Exemplo:</h4>
                <p className="text-sm italic text-muted-foreground">
                  "Este mês você teve R$ 7.850 em vendas e R$ 3.250 em despesas. Seu lucro estimado foi de R$ 4.600. 
                  Lembre-se que o DAS-MEI vence dia 20 e separe R$ 66,00 para pagamento."
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TechCareConsultantPage;
