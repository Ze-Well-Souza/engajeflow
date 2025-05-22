import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Utensils } from "lucide-react";

const FoodLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-orange-500" />
            <h1 className="text-2xl font-bold">Gastronomia</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/landing">
              <Button variant="ghost">Início</Button>
            </Link>
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
      <section className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Impulsione seu negócio gastronômico</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Aumente sua presença online, atraia mais clientes e gerencie pedidos com facilidade
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="gap-2 bg-orange-500 hover:bg-orange-600">
                  Começar grátis <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/demo/food">
                <Button size="lg" variant="outline" className="gap-2 border-orange-500 text-orange-500 hover:bg-orange-50">
                  Ver demonstração
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Soluções para gastronomia</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Utensils className="h-10 w-10 text-orange-500" />}
            title="Cardápios digitais"
            description="Crie cardápios interativos com fotos e descrições detalhadas dos pratos"
          />
          <FeatureCard 
            icon={<Utensils className="h-10 w-10 text-orange-500" />}
            title="Promoções automáticas"
            description="Agende posts de ofertas e promoções para datas específicas"
          />
          <FeatureCard 
            icon={<Utensils className="h-10 w-10 text-orange-500" />}
            title="Gestão de delivery"
            description="Integração com aplicativos de entrega e sistema de pedidos próprio"
          />
          <FeatureCard 
            icon={<Utensils className="h-10 w-10 text-orange-500" />}
            title="Reservas online"
            description="Sistema de reservas com confirmação automática e lembretes"
          />
          <FeatureCard 
            icon={<Utensils className="h-10 w-10 text-orange-500" />}
            title="Fidelização de clientes"
            description="Programas de fidelidade e cupons personalizados"
          />
          <FeatureCard 
            icon={<Utensils className="h-10 w-10 text-orange-500" />}
            title="Analytics avançados"
            description="Relatórios detalhados sobre vendas, pratos mais populares e horários de pico"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 dark:bg-orange-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Pronto para transformar seu negócio?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de estabelecimentos que já estão usando nossa plataforma para crescer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="default" className="bg-white text-orange-500 hover:bg-gray-100">
                Começar agora
              </Button>
            </Link>
            <Link to="/demo/food">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-orange-600">
                Ver demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">O que nossos clientes dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="Aumentamos nossas vendas em 30% no primeiro mês usando a plataforma. O sistema de cardápio digital foi um sucesso!"
            author="Ana Silva"
            role="Proprietária, Cantina Bella"
          />
          <TestimonialCard 
            quote="A integração com aplicativos de delivery simplificou nossa operação. Agora gerenciamos tudo em um só lugar."
            author="Carlos Oliveira"
            role="Gerente, Burger House"
          />
          <TestimonialCard 
            quote="O sistema de reservas online reduziu drasticamente as faltas e melhorou nossa previsibilidade."
            author="Mariana Costa"
            role="Chef, Restaurante Aroma"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="h-6 w-6 text-orange-500" />
                <h3 className="text-xl font-bold">EngageFlow</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                Soluções digitais para o setor gastronômico desde 2025.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Produto</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-orange-500">Funcionalidades</Link></li>
                  <li><Link to="/landing/pricing" className="text-gray-600 dark:text-gray-400 hover:text-orange-500">Preços</Link></li>
                  <li><Link to="/demo/food" className="text-gray-600 dark:text-gray-400 hover:text-orange-500">Demonstração</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Empresa</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-orange-500">Sobre</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-orange-500">Contato</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-orange-500">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-orange-500">Termos</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-orange-500">Privacidade</Link></li>
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

// Componente auxiliar para card de funcionalidade
const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <Card className="h-full hover:shadow-md transition-shadow duration-300">
    <CardHeader>
      <div className="mb-4">{icon}</div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  </Card>
);

// Componente auxiliar para card de depoimento
const TestimonialCard = ({ 
  quote, 
  author, 
  role 
}: { 
  quote: string; 
  author: string; 
  role: string;
}) => (
  <Card className="h-full hover:shadow-md transition-shadow duration-300">
    <CardContent className="pt-6">
      <p className="italic text-gray-600 dark:text-gray-300 mb-4">"{quote}"</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </CardContent>
  </Card>
);

export default FoodLandingPage;
