import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Camera } from "lucide-react";

const ContentCreatorLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-purple-500" />
            <h1 className="text-2xl font-bold">Eventos e Criadores de Conteúdo</h1>
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
      <section className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Responda fãs e parceiros sem perder tempo. Automatize seu inbox.</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Gerencie mensagens, agende conteúdo e mantenha relacionamentos com seguidores e marcas sem comprometer sua criatividade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="gap-2 bg-purple-500 hover:bg-purple-600">
                  Potencialize sua criação <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/demo/content-creator">
                <Button size="lg" variant="outline" className="gap-2 border-purple-500 text-purple-500 hover:bg-purple-50">
                  Agendar demonstração
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Soluções para criadores de conteúdo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Camera className="h-10 w-10 text-purple-500" />}
            title="Gestão de mensagens"
            description="Organize mensagens de fãs, seguidores e parceiros em um único lugar com respostas automáticas"
          />
          <FeatureCard 
            icon={<Camera className="h-10 w-10 text-purple-500" />}
            title="Agendamento de conteúdo"
            description="Planeje e agende posts para múltiplas plataformas com nossa interface intuitiva"
          />
          <FeatureCard 
            icon={<Camera className="h-10 w-10 text-purple-500" />}
            title="Gestão de parcerias"
            description="Acompanhe propostas, contratos e entregas para marcas e parceiros comerciais"
          />
          <FeatureCard 
            icon={<Camera className="h-10 w-10 text-purple-500" />}
            title="Analytics de engajamento"
            description="Relatórios detalhados sobre o desempenho do seu conteúdo em todas as plataformas"
          />
          <FeatureCard 
            icon={<Camera className="h-10 w-10 text-purple-500" />}
            title="Automação de eventos"
            description="Gerencie inscrições, confirmações e lembretes para seus eventos online e presenciais"
          />
          <FeatureCard 
            icon={<Camera className="h-10 w-10 text-purple-500" />}
            title="Monetização inteligente"
            description="Ferramentas para otimizar suas fontes de receita e identificar novas oportunidades"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-purple-500 dark:bg-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Pronto para elevar sua presença digital?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de criadores que já estão usando nossa plataforma para crescer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="default" className="bg-white text-purple-500 hover:bg-gray-100">
                Começar agora
              </Button>
            </Link>
            <Link to="/demo/content-creator">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-purple-600">
                Ver demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">O que nossos criadores dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="Economizo pelo menos 15 horas por semana com as automações. Agora posso focar mais na criação e menos na administração."
            author="Mariana Costa"
            role="Fotógrafa e Influencer"
          />
          <TestimonialCard 
            quote="A gestão de parcerias simplificou meu relacionamento com marcas e aumentou minha receita em 35%."
            author="Lucas Mendes"
            role="Criador de conteúdo digital"
          />
          <TestimonialCard 
            quote="O sistema de agendamento de eventos revolucionou meu trabalho como organizadora. Tudo mais simples e profissional."
            author="Camila Oliveira"
            role="Organizadora de eventos"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Camera className="h-6 w-6 text-purple-500" />
                <h3 className="text-xl font-bold">EngageFlow</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                Soluções digitais para criadores de conteúdo desde 2025.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Produto</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-purple-500">Funcionalidades</Link></li>
                  <li><Link to="/landing/pricing" className="text-gray-600 dark:text-gray-400 hover:text-purple-500">Preços</Link></li>
                  <li><Link to="/demo/content-creator" className="text-gray-600 dark:text-gray-400 hover:text-purple-500">Demonstração</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Empresa</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-purple-500">Sobre</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-purple-500">Contato</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-purple-500">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-purple-500">Termos</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-purple-500">Privacidade</Link></li>
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

export default ContentCreatorLandingPage;
