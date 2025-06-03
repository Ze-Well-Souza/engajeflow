
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [segment, setSegment] = useState<"general" | "beauty" | "home" | "food" | "education" | "events">("general");
  const navigate = useNavigate();

  const handlePlanSelect = (planName: string) => {
    // Simulando redirecionamento para checkout
    toast.info(`Selecionando plano ${planName}...`);
    setTimeout(() => {
      navigate("/store/stripe-integration", { 
        state: { 
          selectedPlan: planName,
          billingCycle: billingCycle
        } 
      });
    }, 1000);
  };

  const calculateDiscount = (price: number) => {
    return billingCycle === "annual" ? Math.floor(price * 0.8) : price;
  };

  const getSegmentSpecificFeatures = () => {
    switch(segment) {
      case "beauty":
        return [
          "Templates específicos para beleza",
          "Galeria de antes e depois",
          "Sistema de agendamentos avançado"
        ];
      case "food":
        return [
          "Cardápio digital interativo",
          "Integração com apps de delivery",
          "Templates para fotografias gastronômicas"
        ];
      case "home":
        return [
          "Gestão de orçamentos",
          "Catálogo de serviços",
          "Análise de satisfação pós-serviço"
        ];
      case "education":
        return [
          "Sala de aula virtual",
          "Sistema de avaliações",
          "Biblioteca de conteúdo"
        ];
      case "events":
        return [
          "Galerias personalizadas",
          "Contratos digitais",
          "Timelines de eventos"
        ];
      default:
        return [
          "Templates versáteis",
          "Personalizações por segmento",
          "Análises de desempenho"
        ];
    }
  };

  const segmentSpecificFeatures = getSegmentSpecificFeatures();

  return (
    <div className="container py-10">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Escolha o plano ideal para o seu negócio</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Todas as ferramentas que você precisa para gerenciar sua presença digital e agendamentos
        </p>
        
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={billingCycle === "monthly" ? "font-semibold" : "text-muted-foreground"}>
            Mensal
          </span>
          <Switch 
            checked={billingCycle === "annual"}
            onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
            className="data-[state=checked]:bg-primary"
          />
          <span className={billingCycle === "annual" ? "font-semibold" : "text-muted-foreground"}>
            Anual <span className="text-sm text-green-600 font-semibold">(Economize 20%)</span>
          </span>
        </div>

        <Tabs defaultValue="general" className="mb-12">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
            <TabsTrigger 
              value="general" 
              onClick={() => setSegment("general")}
              className="text-xs sm:text-sm"
            >
              Geral
            </TabsTrigger>
            <TabsTrigger 
              value="beauty" 
              onClick={() => setSegment("beauty")}
              className="text-xs sm:text-sm"
            >
              Beleza
            </TabsTrigger>
            <TabsTrigger 
              value="food" 
              onClick={() => setSegment("food")}
              className="text-xs sm:text-sm"
            >
              Gastronomia
            </TabsTrigger>
            <TabsTrigger 
              value="home" 
              onClick={() => setSegment("home")}
              className="text-xs sm:text-sm"
            >
              Serviços Domésticos
            </TabsTrigger>
            <TabsTrigger 
              value="education" 
              onClick={() => setSegment("education")}
              className="text-xs sm:text-sm"
            >
              Educação
            </TabsTrigger>
            <TabsTrigger 
              value="events" 
              onClick={() => setSegment("events")}
              className="text-xs sm:text-sm"
            >
              Eventos
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Plano Basic */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Básico</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold">Grátis</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Para experimentar nossas ferramentas
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <PlanFeature included text="Até 3 posts/semana" />
              <PlanFeature included text="1 rede social" />
              <PlanFeature included text="5 agendamentos/mês" />
              <PlanFeature included text="Modelos básicos" />
              <PlanFeature included={false} text="Analytics avançados" />
              <PlanFeature included={false} text={segmentSpecificFeatures[0]} />
              <PlanFeature included={false} text={segmentSpecificFeatures[1]} />
              <PlanFeature included={false} text={segmentSpecificFeatures[2]} />
              <PlanFeature included={false} text="Suporte prioritário" />
              <PlanFeature included={false} text="Personalização avançada" />
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => handlePlanSelect("Básico")} 
              variant="outline" 
              className="w-full"
            >
              Começar Grátis
            </Button>
          </CardFooter>
        </Card>

        {/* Plano Essencial */}
        <Card className="border-primary shadow-lg relative">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg">
            Mais Popular
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Essencial</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold">
                R${calculateDiscount(49)}/mês
              </span>
              {billingCycle === "annual" && (
                <span className="text-sm text-muted-foreground ml-2">
                  <s>R$49/mês</s>
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {billingCycle === "annual" ? "Faturado anualmente" : "Faturado mensalmente"}
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <PlanFeature included text="Até 15 posts/semana" />
              <PlanFeature included text="3 redes sociais" />
              <PlanFeature included text="Agendamentos ilimitados" />
              <PlanFeature included text="Todos os modelos" />
              <PlanFeature included text="Analytics avançados" />
              <PlanFeature included text={segmentSpecificFeatures[0]} />
              <PlanFeature included text={segmentSpecificFeatures[1]} />
              <PlanFeature included={false} text={segmentSpecificFeatures[2]} />
              <PlanFeature included text="Suporte prioritário" />
              <PlanFeature included={false} text="Personalização avançada" />
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => handlePlanSelect("Essencial")} 
              className="w-full"
            >
              Assinar Agora
            </Button>
          </CardFooter>
        </Card>

        {/* Plano Profissional */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Profissional</CardTitle>
            <div className="mt-4">
              <span className="text-4xl font-bold">
                R${calculateDiscount(99)}/mês
              </span>
              {billingCycle === "annual" && (
                <span className="text-sm text-muted-foreground ml-2">
                  <s>R$99/mês</s>
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {billingCycle === "annual" ? "Faturado anualmente" : "Faturado mensalmente"}
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <PlanFeature included text="Posts ilimitados" />
              <PlanFeature included text="Todas as redes sociais" />
              <PlanFeature included text="Agendamentos ilimitados" />
              <PlanFeature included text="Modelos premium exclusivos" />
              <PlanFeature included text="Analytics avançados" />
              <PlanFeature included text={segmentSpecificFeatures[0]} />
              <PlanFeature included text={segmentSpecificFeatures[1]} />
              <PlanFeature included text={segmentSpecificFeatures[2]} />
              <PlanFeature included text="Suporte prioritário 24/7" />
              <PlanFeature included text="Personalização avançada" />
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => handlePlanSelect("Profissional")} 
              variant="outline" 
              className="w-full"
            >
              Assinar Agora
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">Precisa de uma solução personalizada?</h2>
        <p className="text-lg mb-6">
          Contate nossa equipe para uma solução sob medida para seu negócio
        </p>
        <Button size="lg" variant="outline" onClick={() => navigate("/landing/contact")}>
          Falar com Especialista
        </Button>
      </div>

      <div className="mt-16 border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">Perguntas Frequentes</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-medium mb-2">Posso mudar de plano a qualquer momento?</h4>
            <p className="text-muted-foreground">
              Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entrarão em vigor imediatamente.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Como funciona o período de testes?</h4>
            <p className="text-muted-foreground">
              Todos os planos pagos incluem 7 dias de teste grátis. Você não será cobrado até o final desse período.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Existe alguma taxa de cancelamento?</h4>
            <p className="text-muted-foreground">
              Não, você pode cancelar seu plano a qualquer momento sem taxas adicionais.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Os recursos específicos por segmento custam mais?</h4>
            <p className="text-muted-foreground">
              Não, todos os recursos específicos do seu segmento estão incluídos nos planos pagos conforme descrito.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlanFeature = ({ included, text }: { included: boolean; text: string }) => {
  return (
    <li className="flex items-start">
      {included ? (
        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
      ) : (
        <X className="h-5 w-5 text-gray-300 dark:text-gray-600 mr-2 shrink-0" />
      )}
      <span className={included ? "" : "text-muted-foreground"}>{text}</span>
    </li>
  );
};

export default PricingPage;
