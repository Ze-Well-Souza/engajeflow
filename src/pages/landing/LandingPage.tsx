import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Globe, ArrowRight, Users, Home, Utensils, Sparkles, Camera, Book } from "lucide-react";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">EngageFlow</h1>
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

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Gerencie sua presença digital com o EngageFlow</h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Plataforma completa de gestão de conteúdo e agendamentos para prestadores de serviço
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Começar grátis <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/landing/segments">
              <Button size="lg" variant="outline" className="gap-2">
                Conhecer planos por segmento
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="container mx-auto px-4 py-16 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold text-center mb-12">Soluções por segmento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SegmentCard 
            title="Beleza e Estética" 
            description="Perfeito para salões, barbearias e profissionais de estética"
            icon={<Sparkles className="h-10 w-10 text-pink-500" />}
            href="/landing/beauty" 
          />
          <SegmentCard 
            title="Serviços Domésticos" 
            description="Ideal para diaristas, eletricistas e reformas em geral"
            icon={<Home className="h-10 w-10 text-blue-500" />}
            href="/landing/home" 
          />
          <SegmentCard 
            title="Alimentação" 
            description="Perfeito para restaurantes, confeitarias e food trucks"
            icon={<Utensils className="h-10 w-10 text-orange-500" />}
            href="/landing/food" 
          />
          <SegmentCard 
            title="Eventos" 
            description="Ideal para fotógrafos, decoradores e organizadores"
            icon={<Camera className="h-10 w-10 text-purple-500" />}
            href="/landing/events" 
          />
          <SegmentCard 
            title="Educação" 
            description="Perfeito para professores particulares e treinadores"
            icon={<Book className="h-10 w-10 text-green-500" />}
            href="/landing/education" 
          />
          <SegmentCard 
            title="Outros Serviços" 
            description="Soluções personalizáveis para seu tipo de negócio"
            icon={<Users className="h-10 w-10 text-gray-500" />}
            href="/landing/others" 
          />
        </div>
      </section>

      {/* Plans */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Planos flexíveis para seu negócio</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12">
          Escolha o plano que mais se adapta às suas necessidades
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PlanCard 
            title="Básico"
            price="Grátis"
            description="Para quem está começando"
            features={[
              "Até 3 posts/semana",
              "1 rede social",
              "Analytics básicos",
              "Agendamentos limitados"
            ]}
            buttonText="Começar grátis"
            buttonVariant="outline"
          />
          <PlanCard 
            title="Essencial"
            price="R$49/mês"
            description="Para profissionais autônomos"
            features={[
              "Até 15 posts/semana",
              "3 redes sociais",
              "Analytics completos",
              "Agendamentos ilimitados",
              "Suporte prioritário"
            ]}
            buttonText="Assinar agora"
            buttonVariant="default"
            highlighted={true}
          />
          <PlanCard 
            title="Profissional"
            price="R$99/mês"
            description="Para empresas e equipes"
            features={[
              "Posts ilimitados",
              "Todas as redes sociais",
              "Analytics avançados",
              "Agendamentos ilimitados",
              "Suporte 24/7",
              "API de integração"
            ]}
            buttonText="Contatar vendas"
            buttonVariant="secondary"
          />
        </div>

        <div className="text-center mt-8">
          <Link to="/landing/pricing">
            <Button variant="link" className="gap-1">
              Ver todos os planos e detalhes <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

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

// Componente auxiliar para card de segmento
const SegmentCard = ({ 
  title, 
  description, 
  icon,
  href 
}: { 
  title: string; 
  description: string;
  icon: React.ReactNode;
  href: string;
}) => (
  <Link to={href}>
    <Card className="h-full hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="ghost" className="gap-2">
          Saiba mais <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  </Link>
);

// Componente auxiliar para card de plano
const PlanCard = ({ 
  title, 
  price, 
  description, 
  features,
  buttonText,
  buttonVariant,
  highlighted = false
}: { 
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline" | "secondary";
  highlighted?: boolean;
}) => (
  <Card className={`h-full ${highlighted ? 'border-primary shadow-lg dark:shadow-primary/20' : ''}`}>
    <CardHeader>
      <CardTitle className="text-2xl">{title}</CardTitle>
      <div className="mt-2">
        <span className="text-3xl font-bold">{price}</span>
      </div>
      <CardDescription className="mt-2">{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button variant={buttonVariant} className="w-full">
        {buttonText}
      </Button>
    </CardFooter>
  </Card>
);

export default LandingPage;
