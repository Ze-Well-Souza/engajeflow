import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, FileText } from "lucide-react";

const AccountingLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-gray-500" />
            <h1 className="text-2xl font-bold">Contadores / Advogados</h1>
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
      <section className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Menos WhatsApp manual, mais foco nos seus clientes e prazos</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Automatize comunicações, organize documentos e gerencie prazos com eficiência para escritórios contábeis e jurídicos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="gap-2 bg-gray-700 hover:bg-gray-800">
                  Começar grátis <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/demo/accounting">
                <Button size="lg" variant="outline" className="gap-2 border-gray-500 text-gray-700 hover:bg-gray-100">
                  Ver demonstração
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Soluções para profissionais</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FileText className="h-10 w-10 text-gray-500" />}
            title="Comunicação automatizada"
            description="Envio automático de lembretes, solicitações de documentos e atualizações de status"
          />
          <FeatureCard 
            icon={<FileText className="h-10 w-10 text-gray-500" />}
            title="Gestão de documentos"
            description="Organização e compartilhamento seguro de documentos com clientes"
          />
          <FeatureCard 
            icon={<FileText className="h-10 w-10 text-gray-500" />}
            title="Controle de prazos"
            description="Alertas automáticos para obrigações fiscais, audiências e entregas"
          />
          <FeatureCard 
            icon={<FileText className="h-10 w-10 text-gray-500" />}
            title="Agendamento inteligente"
            description="Sistema de agendamento de reuniões com confirmação automática"
          />
          <FeatureCard 
            icon={<FileText className="h-10 w-10 text-gray-500" />}
            title="Gestão financeira"
            description="Controle de honorários, faturamento e cobrança automatizada"
          />
          <FeatureCard 
            icon={<FileText className="h-10 w-10 text-gray-500" />}
            title="Relatórios personalizados"
            description="Dashboards e relatórios para acompanhamento de desempenho e produtividade"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-700 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Pronto para transformar seu escritório?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de profissionais que já estão usando nossa plataforma para otimizar processos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="default" className="bg-white text-gray-700 hover:bg-gray-100">
                Começar agora
              </Button>
            </Link>
            <Link to="/demo/accounting">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-gray-600">
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
            quote="Reduzimos em 70% o tempo gasto com comunicações e lembretes para clientes. A automação transformou nosso escritório."
            author="Roberto Mendes"
            role="Contador, RM Contabilidade"
          />
          <TestimonialCard 
            quote="O controle de prazos eliminou atrasos em entregas e nos ajudou a manter um relacionamento mais transparente com os clientes."
            author="Juliana Alves"
            role="Advogada, Alves & Associados"
          />
          <TestimonialCard 
            quote="A gestão de documentos simplificou nossos processos e melhorou significativamente a experiência dos clientes."
            author="Carlos Santos"
            role="Contador, Santos Consultoria"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-6 w-6 text-gray-500" />
                <h3 className="text-xl font-bold">EngageFlow</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                Soluções digitais para escritórios contábeis e jurídicos desde 2025.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Produto</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Funcionalidades</Link></li>
                  <li><Link to="/landing/pricing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Preços</Link></li>
                  <li><Link to="/demo/accounting" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Demonstração</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Empresa</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Sobre</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Contato</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Termos</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Privacidade</Link></li>
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

export default AccountingLandingPage;
