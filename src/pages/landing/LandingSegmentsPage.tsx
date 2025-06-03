
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Camera, 
  Code, 
  BookOpen, 
  Users, 
  FileText, 
  ArrowRight 
} from "lucide-react";

const LandingSegmentsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const segments = [
    {
      id: "ecommerce",
      name: "Lojistas Online",
      icon: <ShoppingCart className="h-8 w-8 mb-4 text-blue-500" />,
      description: "Otimize o atendimento da sua loja com automações e inteligência artificial.",
      path: "/landing/ecommerce",
      className: "border-blue-200 hover:border-blue-500",
    },
    {
      id: "creators",
      name: "Criadores de Conteúdo",
      icon: <Camera className="h-8 w-8 mb-4 text-pink-500" />,
      description: "Responda fãs e parceiros sem perder tempo. Automatize seu inbox.",
      path: "/landing/content-creator",
      className: "border-pink-200 hover:border-pink-500",
    },
    {
      id: "freelancers",
      name: "Freelancers",
      icon: <Code className="h-8 w-8 mb-4 text-purple-500" />,
      description: "Ganhe tempo com automações e concentre-se no que realmente importa: criar.",
      path: "/landing/freelancer",
      className: "border-purple-200 hover:border-purple-500",
    },
    {
      id: "education",
      name: "Educadores / Cursos Online",
      icon: <BookOpen className="h-8 w-8 mb-4 text-blue-600" />,
      description: "Automatize a comunicação com alunos e aumente a retenção.",
      path: "/landing/education",
      className: "border-blue-200 hover:border-blue-600",
    },
    {
      id: "hr",
      name: "Empresas de RH",
      icon: <Users className="h-8 w-8 mb-4 text-purple-600" />,
      description: "Transforme o contato com candidatos em uma experiência moderna e eficiente.",
      path: "/landing/hr",
      className: "border-purple-200 hover:border-purple-600",
    },
    {
      id: "accounting",
      name: "Contadores / Advogados",
      icon: <FileText className="h-8 w-8 mb-4 text-green-600" />,
      description: "Menos WhatsApp manual, mais foco nos seus clientes e prazos.",
      path: "/landing/accounting",
      className: "border-green-200 hover:border-green-600",
    },
  ];
  
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Soluções personalizadas para o seu negócio</h1>
          <p className="text-lg text-gray-600">
            Escolha o segmento que melhor representa sua área de atuação e descubra como podemos ajudar.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {segments.map((segment) => (
            <Card 
              key={segment.id} 
              className={`p-6 border-2 transition-all hover:shadow-lg ${segment.className}`}
            >
              <div className="text-center mb-4">
                {segment.icon}
                <h2 className="text-xl font-bold mb-2">{segment.name}</h2>
                <p className="text-gray-600 mb-6">{segment.description}</p>
              </div>
              <Button 
                className="w-full flex items-center justify-center" 
                onClick={() => navigate(segment.path)}
              >
                Ver solução <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Não encontrou seu segmento?</h2>
          <p className="text-gray-600 mb-6">
            Entre em contato com nossa equipe para uma solução personalizada para o seu negócio.
          </p>
          <Button size="lg" variant="outline">
            Fale com um especialista
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingSegmentsPage;

