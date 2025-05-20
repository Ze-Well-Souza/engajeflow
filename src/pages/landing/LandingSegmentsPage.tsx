
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Utensils, Sparkles, Camera, Book, Users, Globe, ArrowRight } from "lucide-react";

const LandingSegmentsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/landing" className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">EngageFlow</h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link to="/register">
              <Button variant="default">Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Soluções por Segmento</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Oferecemos soluções personalizadas para diversos tipos de negócios. Escolha o seu segmento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SegmentCard 
            title="Beleza e Estética" 
            description="Perfeito para salões, barbearias e profissionais de estética"
            icon={<Sparkles className="h-10 w-10 text-pink-500" />}
            href="/landing/beauty" 
            tags={["Agendamento", "Fidelização", "Gestão de Equipe"]}
          />
          
          <SegmentCard 
            title="Serviços Domésticos" 
            description="Ideal para diaristas, eletricistas e reformas em geral"
            icon={<Home className="h-10 w-10 text-blue-500" />}
            href="/landing/home" 
            tags={["Orçamentos", "Lembretes", "Avaliações"]}
          />
          
          <SegmentCard 
            title="Alimentação" 
            description="Perfeito para restaurantes, confeitarias e food trucks"
            icon={<Utensils className="h-10 w-10 text-orange-500" />}
            href="/landing/food" 
            tags={["Cardápio", "Delivery", "Reservas"]}
          />
          
          <SegmentCard 
            title="Eventos" 
            description="Ideal para fotógrafos, decoradores e organizadores"
            icon={<Camera className="h-10 w-10 text-purple-500" />}
            href="/landing/events" 
            tags={["Galeria", "Contratos", "Calendário"]}
          />
          
          <SegmentCard 
            title="Educação" 
            description="Perfeito para professores particulares e treinadores"
            icon={<Book className="h-10 w-10 text-green-500" />}
            href="/landing/education" 
            tags={["Aulas", "Material", "Progresso"]}
          />
          
          <SegmentCard 
            title="Outros Serviços" 
            description="Soluções personalizáveis para seu tipo de negócio"
            icon={<Users className="h-10 w-10 text-gray-500" />}
            href="/landing/others" 
            tags={["Personalizável", "Flexível", "Adaptável"]}
          />
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Não encontrou seu segmento?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Entre em contato conosco para uma solução personalizada para o seu negócio.
          </p>
          <Link to="/landing/pricing">
            <Button size="lg" variant="default">Ver planos e preços</Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">EngageFlow</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                Simplificando a gestão de presença digital para prestadores de serviço desde 2025.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Produto</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing/features" className="text-gray-600 dark:text-gray-400 hover:text-primary">Funcionalidades</Link></li>
                  <li><Link to="/landing/pricing" className="text-gray-600 dark:text-gray-400 hover:text-primary">Preços</Link></li>
                  <li><Link to="/landing/segments" className="text-gray-600 dark:text-gray-400 hover:text-primary">Segmentos</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Empresa</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing/about" className="text-gray-600 dark:text-gray-400 hover:text-primary">Sobre</Link></li>
                  <li><Link to="/landing/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary">Contato</Link></li>
                  <li><Link to="/landing/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary">Termos</Link></li>
                  <li><Link to="/landing/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary">Privacidade</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>© {new Date().getFullYear()} EngageFlow. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Componente de cartão de segmento
interface SegmentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  tags: string[];
}

const SegmentCard: React.FC<SegmentCardProps> = ({ title, description, icon, href, tags }) => (
  <Card className="h-full hover:shadow-md transition-shadow duration-300">
    <CardHeader>
      <div className="mb-4">{icon}</div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary">{tag}</Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Link to={href} className="w-full">
        <Button variant="secondary" className="w-full gap-2">
          Ver soluções
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

export default LandingSegmentsPage;
