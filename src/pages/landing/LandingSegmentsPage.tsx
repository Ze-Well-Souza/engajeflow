
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LandingSegmentsPage = () => {
  const segments = [
    {
      id: "ecommerce",
      title: "Lojistas Online",
      description: "Otimize o atendimento da sua loja com automações e inteligência artificial.",
      features: [
        "Atendimento pós-venda automatizado",
        "Rastreamento inteligente de pedidos",
        "Suporte via chat com IA",
        "Resposta automática às perguntas frequentes"
      ],
      cta: "Impulsione suas vendas",
      icon: "🏪"
    },
    {
      id: "content-creators",
      title: "Criadores de Conteúdo",
      description: "Responda fãs e parceiros sem perder tempo. Automatize seu inbox.",
      features: [
        "Agendamento de mensagens",
        "Respostas automáticas para seguidores",
        "Gestão de parcerias e patrocínios",
        "Métricas de engajamento"
      ],
      cta: "Potencialize seu alcance",
      icon: "🎥"
    },
    {
      id: "freelancers",
      title: "Freelancers",
      description: "Ganhe tempo com automações e concentre-se no que realmente importa: criar.",
      features: [
        "Suporte a clientes automatizado",
        "Sistemas de cobrança inteligentes",
        "Lembretes de prazos e entregas",
        "Gestão de projetos integrada"
      ],
      cta: "Foque no seu trabalho",
      icon: "🧑‍💻"
    },
    {
      id: "education",
      title: "Educadores",
      description: "Automatize a comunicação com alunos e aumente a retenção.",
      features: [
        "Resposta automática a dúvidas comuns",
        "Distribuição inteligente de materiais",
        "Organização de listas de alunos",
        "Lembretes de aulas e eventos"
      ],
      cta: "Revolucione seu ensino",
      icon: "📚"
    },
    {
      id: "recruitment",
      title: "RH e Recrutamento",
      description: "Transforme o contato com candidatos em uma experiência moderna e eficiente.",
      features: [
        "Agendamento automático de entrevistas",
        "Feedback personalizado automático",
        "Triagem inicial de currículos",
        "Acompanhamento do pipeline de contratação"
      ],
      cta: "Modernize seu recrutamento",
      icon: "🏢"
    },
    {
      id: "legal",
      title: "Advogados e Contadores",
      description: "Menos WhatsApp manual, mais foco nos seus clientes e prazos.",
      features: [
        "Atualizações automáticas de processos",
        "Envio programado de documentos",
        "Lembretes de prazos importantes",
        "Atendimento preliminar com IA"
      ],
      cta: "Otimize seu escritório",
      icon: "🧾"
    }
  ];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Soluções EngageFlow por Segmento</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Descubra como nossa plataforma se adapta perfeitamente às necessidades específicas do seu setor
        </p>
      </div>

      <Tabs defaultValue="ecommerce" className="w-full mb-8">
        <TabsList className="flex flex-wrap justify-center mb-8">
          {segments.map(segment => (
            <TabsTrigger key={segment.id} value={segment.id} className="text-lg px-4 py-3">
              <span className="mr-2">{segment.icon}</span>
              {segment.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {segments.map(segment => (
          <TabsContent key={segment.id} value={segment.id} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl flex items-center">
                  <span className="text-4xl mr-3">{segment.icon}</span>
                  {segment.title}
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  {segment.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-medium mb-4">Funcionalidades específicas para {segment.title}</h3>
                  <ul className="space-y-3">
                    {segment.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-primary mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Automatize seu atendimento com IA</h3>
                  <p className="mb-4">Você perde horas respondendo mensagens iguais todos os dias?</p>
                  <p>Nossa plataforma usa inteligência artificial para automatizar tarefas repetitivas, 
                  permitindo que você se concentre no que realmente importa para seu negócio.</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link to="/landing/pricing">
                  <Button size="lg" className="w-full sm:w-auto">
                    {segment.cta}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Comece grátis
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-6">Pronto para revolucionar sua comunicação?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/landing/pricing">
            <Button size="lg">Ver planos e preços</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg">Fale com um especialista</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingSegmentsPage;
