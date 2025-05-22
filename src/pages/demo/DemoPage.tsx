import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Globe } from "lucide-react";
import DemoFluxos from "@/pages/demo/DemoFluxos";

const DemoPage: React.FC = () => {
  const { segment } = useParams<{ segment: string }>();
  
  // Mapear segmentos para títulos e descrições amigáveis
  const segmentInfo: Record<string, { title: string; description: string; color: string }> = {
    beauty: {
      title: "Beleza e Estética",
      description: "Demonstração para salões, barbearias e profissionais de estética",
      color: "text-pink-500"
    },
    food: {
      title: "Alimentação",
      description: "Demonstração para restaurantes, confeitarias e food trucks",
      color: "text-orange-500"
    },
    freelancer: {
      title: "Serviços Domésticos",
      description: "Demonstração para diaristas, eletricistas e reformas em geral",
      color: "text-blue-500"
    },
    "content-creator": {
      title: "Eventos e Criadores de Conteúdo",
      description: "Demonstração para fotógrafos, decoradores e organizadores",
      color: "text-purple-500"
    },
    education: {
      title: "Educação",
      description: "Demonstração para professores particulares e treinadores",
      color: "text-green-500"
    },
    hr: {
      title: "Recursos Humanos",
      description: "Demonstração para empresas de RH e recrutamento",
      color: "text-indigo-500"
    },
    accounting: {
      title: "Contabilidade e Advocacia",
      description: "Demonstração para contadores e advogados",
      color: "text-gray-500"
    },
    ecommerce: {
      title: "E-commerce",
      description: "Demonstração para lojas online e marketplaces",
      color: "text-yellow-500"
    },
    default: {
      title: "Demonstração do EngageFlow",
      description: "Explore as funcionalidades da nossa plataforma",
      color: "text-primary"
    }
  };

  // Obter informações do segmento atual ou usar padrão
  const info = segment && segmentInfo[segment] ? segmentInfo[segment] : segmentInfo.default;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className={`h-6 w-6 ${info.color}`} />
            <h1 className="text-2xl font-bold">EngageFlow Demo</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to={segment ? `/landing/${segment}` : "/landing"}>
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${info.color}`}>{info.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {info.description}
          </p>

          {/* Demo Fluxos Component */}
          <DemoFluxos />

          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Experimente o EngageFlow gratuitamente por 14 dias, sem necessidade de cartão de crédito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="gap-2">
                  Começar gratuitamente
                </Button>
              </Link>
              <Link to="/landing/pricing">
                <Button size="lg" variant="outline">
                  Ver planos e preços
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} EngageFlow. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DemoPage;
