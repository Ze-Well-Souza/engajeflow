
import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Globe, Building } from "lucide-react";
import DemoFluxos from "@/pages/demo/DemoFluxos";

const DemoPage: React.FC = () => {
  const { segment } = useParams<{ segment: string }>();
  const navigate = useNavigate();
  
  // Redirecionar para a página específica de demonstração para imobiliária
  React.useEffect(() => {
    if (segment === "realestate") {
      navigate("/demo/realestate");
    }
  }, [segment, navigate]);
  
  // Mapear segmentos para títulos e descrições amigáveis
  const segmentInfo: Record<string, { title: string; description: string; color: string; icon: React.ReactNode }> = {
    beauty: {
      title: "Beleza e Estética",
      description: "Demonstração para salões, barbearias e profissionais de estética",
      color: "text-pink-500",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-pink-500"><path d="m13.6 16.7 2.5-5.7c.4-.9-.5-1.8-1.4-1.4l-5.7 2.5c-.7.3-1.2.8-1.4 1.4l-2.5 5.7c-.4.9.5 1.8 1.4 1.4l5.7-2.5c.6-.2 1.1-.7 1.4-1.4Z"></path><circle cx="18.5" cy="5.5" r="2.5"></circle></svg>
    },
    food: {
      title: "Alimentação",
      description: "Demonstração para restaurantes, confeitarias e food trucks",
      color: "text-orange-500",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-orange-500"><path d="M15 11v.01M10 11v.01M15 15v.01M10 15v.01M12 2a8 8 0 0 0-8 8v12h16V10a8 8 0 0 0-8-8z"></path><path d="M4 14h16"></path><path d="M12 2v4"></path></svg>
    },
    freelancer: {
      title: "Serviços Domésticos",
      description: "Demonstração para diaristas, eletricistas e reformas em geral",
      color: "text-blue-500",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-500"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"></path><path d="M17.64 15 22 10.64"></path><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"></path></svg>
    },
    "content-creator": {
      title: "Eventos e Criadores de Conteúdo",
      description: "Demonstração para fotógrafos, decoradores e organizadores",
      color: "text-purple-500",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-purple-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
    },
    education: {
      title: "Educação",
      description: "Demonstração para professores particulares e treinadores",
      color: "text-green-500",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-green-500"><path d="m5 3 16 10L5 23V3z"></path></svg>
    },
    hr: {
      title: "Recursos Humanos",
      description: "Demonstração para empresas de RH e recrutamento",
      color: "text-indigo-500",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-indigo-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    },
    accounting: {
      title: "Contabilidade e Advocacia",
      description: "Demonstração para contadores e advogados",
      color: "text-gray-500",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gray-500"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
    },
    ecommerce: {
      title: "E-commerce",
      description: "Demonstração para lojas online e marketplaces",
      color: "text-yellow-500",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-yellow-500"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
    },
    realestate: {
      title: "Corretor de Imóveis",
      description: "Demonstração para corretores e imobiliárias",
      color: "text-blue-500",
      icon: <Building className="h-6 w-6 text-blue-500" />
    },
    default: {
      title: "Demonstração do EngageFlow",
      description: "Explore as funcionalidades da nossa plataforma",
      color: "text-primary",
      icon: <Globe className="h-6 w-6 text-primary" />
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
            {info.icon}
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
