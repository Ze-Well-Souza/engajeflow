
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Globe, ArrowRight, Sparkles } from "lucide-react";

const BeautyLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-pink-500" />
            <h1 className="text-2xl font-bold">EngageFlow <span className="text-pink-500">Beleza</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost">Início</Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link to="/register">
              <Button variant="default" className="bg-pink-500 hover:bg-pink-600">Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">A solução completa para profissionais de beleza</h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Gerencie agendamentos, fotos do seu trabalho e comunicação com clientes em uma só plataforma
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 gap-2">
                Começar grátis <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 border-pink-300 text-pink-600">
              Agendar demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold text-center mb-12">Solução específica para <span className="text-pink-500">beleza e estética</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            title="Portfolio digital" 
            description="Exiba fotos do antes e depois dos seus trabalhos organizados por categoria"
            icon={<Sparkles className="h-10 w-10 text-pink-500" />}
          />
          <FeatureCard 
            title="Agendamento online" 
            description="Permita que seus clientes marquem horários diretamente pelo seu perfil"
            icon={<Sparkles className="h-10 w-10 text-pink-500" />}
          />
          <FeatureCard 
            title="Automação de lembretes" 
            description="Envie lembretes automáticos de consultas e retornos para seus clientes"
            icon={<Sparkles className="h-10 w-10 text-pink-500" />}
          />
          <FeatureCard 
            title="Gestão de produtos" 
            description="Controle seu estoque de produtos e receba alertas de reposição"
            icon={<Sparkles className="h-10 w-10 text-pink-500" />}
          />
          <FeatureCard 
            title="Avaliações de clientes" 
            description="Colete e exiba avaliações dos seus serviços para atrair novos clientes"
            icon={<Sparkles className="h-10 w-10 text-pink-500" />}
          />
          <FeatureCard 
            title="Marketing personalizado" 
            description="Crie e agende posts para suas redes sociais com templates específicos para beleza"
            icon={<Sparkles className="h-10 w-10 text-pink-500" />}
          />
        </div>
      </section>

      {/* Pacote específico */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Pacote Beleza</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12">
          Desenvolvido especialmente para profissionais de estética, cabelo, maquiagem e afins
        </p>
        <div className="max-w-md mx-auto">
          <Card className="border-pink-300">
            <CardHeader className="bg-pink-50 dark:bg-pink-900/20">
              <CardTitle className="text-2xl flex items-center">
                <Sparkles className="h-5 w-5 text-pink-500 mr-2" />
                Pacote Beleza Premium
              </CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">R$59,90/mês</span>
              </div>
              <CardDescription className="mt-2">Tudo que você precisa para seu salão ou atendimento</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-pink-500 mr-2 shrink-0" />
                  <span>Templates específicos para beleza e estética</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-pink-500 mr-2 shrink-0" />
                  <span>Gestão de clientes com histórico de atendimentos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-pink-500 mr-2 shrink-0" />
                  <span>Sistema de agendamento avançado</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-pink-500 mr-2 shrink-0" />
                  <span>Galeria de antes e depois</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-pink-500 mr-2 shrink-0" />
                  <span>Integração com WhatsApp</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-pink-500 mr-2 shrink-0" />
                  <span>Geração de conteúdo com IA para o seu nicho</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-pink-500 mr-2 shrink-0" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-pink-500 hover:bg-pink-600">
                Começar agora
              </Button>
              <p className="text-center text-sm text-gray-500 mt-4">7 dias grátis, cancele quando quiser</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16 bg-pink-50 dark:bg-pink-900/10 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12">O que dizem nossos usuários</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TestimonialCard 
            quote="Desde que comecei a usar o EngageFlow, meu salão aumentou em 30% o número de clientes. A facilidade de gerenciar as redes sociais e os agendamentos fez toda a diferença."
            author="Roberta Silva"
            role="Cabeleireira"
          />
          <TestimonialCard 
            quote="Os templates específicos para beleza me ajudam muito na criação de conteúdo. Economizo horas por semana e ainda tenho posts mais bonitos."
            author="Carlos Eduardo"
            role="Barbeiro"
          />
          <TestimonialCard 
            quote="A possibilidade de os clientes agendarem online direto pelo Instagram revolucionou meu atendimento. Recomendo para todos os profissionais de estética."
            author="Amanda Souza"
            role="Esteticista"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para transformar seu negócio de beleza?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Comece hoje mesmo e veja a diferença em seu atendimento e presença digital
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 gap-2">
                Criar conta grátis <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12 mt-16 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="h-6 w-6 text-pink-500" />
            <h3 className="text-xl font-bold">EngageFlow <span className="text-pink-500">Beleza</span></h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Transformando a gestão digital para profissionais de beleza
          </p>
          <div className="flex justify-center gap-4 mb-6">
            <Link to="/">Início</Link>
            <Link to="/landing/pricing">Preços</Link>
            <Link to="/landing/about">Sobre</Link>
            <Link to="/landing/contact">Contato</Link>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} EngageFlow. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

// Componente auxiliar para card de feature
const FeatureCard = ({ 
  title, 
  description, 
  icon,
}: { 
  title: string; 
  description: string;
  icon: React.ReactNode;
}) => (
  <Card className="h-full border-pink-100 dark:border-pink-900/20 hover:shadow-md transition-shadow duration-300">
    <CardHeader>
      <div className="mb-4">{icon}</div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  </Card>
);

// Componente auxiliar para testimonial
const TestimonialCard = ({ 
  quote, 
  author, 
  role,
}: { 
  quote: string;
  author: string;
  role: string;
}) => (
  <Card className="h-full border-pink-100 dark:border-pink-900/20">
    <CardContent className="pt-6">
      <p className="italic mb-4">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </CardContent>
  </Card>
);

export default BeautyLandingPage;
