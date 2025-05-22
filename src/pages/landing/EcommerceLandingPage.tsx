import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Globe } from "lucide-react";

const EcommerceLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-yellow-500" />
            <h1 className="text-2xl font-bold">E-commerce</h1>
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
      <section className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Potencialize seu e-commerce com automação inteligente</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Aumente suas vendas, fidelize clientes e otimize operações com nossa plataforma completa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="gap-2 bg-yellow-500 hover:bg-yellow-600">
                  Começar grátis <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/demo/ecommerce">
                <Button size="lg" variant="outline" className="gap-2 border-yellow-500 text-yellow-500 hover:bg-yellow-50">
                  Ver demonstração
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Soluções para e-commerce</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Globe className="h-10 w-10 text-yellow-500" />}
            title="Marketing automatizado"
            description="Campanhas personalizadas baseadas no comportamento do cliente e histórico de compras"
          />
          <FeatureCard 
            icon={<Globe className="h-10 w-10 text-yellow-500" />}
            title="Gestão de estoque"
            description="Controle inteligente de estoque com alertas e previsões de demanda"
          />
          <FeatureCard 
            icon={<Globe className="h-10 w-10 text-yellow-500" />}
            title="Atendimento ao cliente"
            description="Chatbots e automação de respostas para dúvidas frequentes"
          />
          <FeatureCard 
            icon={<Globe className="h-10 w-10 text-yellow-500" />}
            title="Recuperação de carrinhos"
            description="Estratégias automáticas para recuperar carrinhos abandonados"
          />
          <FeatureCard 
            icon={<Globe className="h-10 w-10 text-yellow-500" />}
            title="Integração multicanal"
            description="Gerencie vendas em marketplaces, redes sociais e loja própria em um só lugar"
          />
          <FeatureCard 
            icon={<Globe className="h-10 w-10 text-yellow-500" />}
            title="Analytics avançados"
            description="Relatórios detalhados sobre vendas, clientes e comportamento de compra"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-yellow-500 dark:bg-yellow-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Pronto para transformar seu e-commerce?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de lojistas que já estão usando nossa plataforma para crescer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="default" className="bg-white text-yellow-500 hover:bg-gray-100">
                Começar agora
              </Button>
            </Link>
            <Link to="/demo/ecommerce">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-yellow-600">
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
            quote="Aumentamos nossas vendas em 40% no primeiro trimestre após implementar as automações de marketing e recuperação de carrinhos."
            author="Marcelo Alves"
            role="CEO, TechStore"
          />
          <TestimonialCard 
            quote="A gestão de estoque inteligente eliminou problemas de ruptura e excesso, otimizando nosso capital de giro."
            author="Juliana Mendes"
            role="COO, Fashion Mall"
          />
          <TestimonialCard 
            quote="O atendimento automatizado reduziu nosso tempo de resposta em 80% e melhorou a satisfação dos clientes."
            author="Ricardo Santos"
            role="Diretor, Mundo Pet"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-6 w-6 text-yellow-500" />
                <h3 className="text-xl font-bold">EngageFlow</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                Soluções digitais para e-commerce desde 2025.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Produto</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500">Funcionalidades</Link></li>
                  <li><Link to="/landing/pricing" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500">Preços</Link></li>
                  <li><Link to="/demo/ecommerce" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500">Demonstração</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Empresa</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500">Sobre</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500">Contato</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500">Termos</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-yellow-500">Privacidade</Link></li>
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

export default EcommerceLandingPage;
