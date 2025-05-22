import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Broom, ArrowRight, Home } from "lucide-react";

const HousekeeperLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Broom className="h-6 w-6 text-teal-500" />
            <h1 className="text-2xl font-bold">Diaristas e Limpeza</h1>
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
      <section className="bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-900 dark:to-green-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Organize sua agenda e conquiste mais clientes</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Automatize agendamentos, compartilhe seu portfólio de antes e depois, e receba mais indicações
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="gap-2 bg-teal-600 hover:bg-teal-700">
                  Começar grátis <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/demo/housekeeper">
                <Button size="lg" variant="outline" className="gap-2 border-teal-500 text-teal-600 hover:bg-teal-50">
                  Ver demonstração
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Soluções para diaristas e profissionais de limpeza</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>}
            title="Agenda inteligente"
            description="Gerencie seus compromissos, evite conflitos de horário e receba lembretes automáticos"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>}
            title="Portfólio antes e depois"
            description="Mostre a qualidade do seu trabalho com fotos organizadas de antes e depois da limpeza"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
            title="Gestão de clientes"
            description="Mantenha um histórico de cada cliente, com preferências, endereços e observações"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>}
            title="Automação de mensagens"
            description="Envie confirmações, lembretes e agradecimentos automaticamente via WhatsApp"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="m4.93 4.93 2.83 2.83"></path><path d="m16.24 16.24 2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="m4.93 19.07 2.83-2.83"></path><path d="m16.24 7.76 2.83-2.83"></path></svg>}
            title="Divulgação multicanal"
            description="Compartilhe seu trabalho em grupos de WhatsApp, Facebook e Instagram com um clique"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>}
            title="Controle financeiro"
            description="Acompanhe seus ganhos, despesas e gere relatórios mensais para organizar suas finanças"
          />
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mostre a qualidade do seu trabalho</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Impressione seus clientes com fotos organizadas de antes e depois da limpeza
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <BeforeAfterCard 
              title="Cozinha"
              beforeImage="/images/kitchen-before.jpg"
              afterImage="/images/kitchen-after.jpg"
            />
            <BeforeAfterCard 
              title="Sala de Estar"
              beforeImage="/images/living-before.jpg"
              afterImage="/images/living-after.jpg"
            />
          </div>
        </div>
      </section>

      {/* Social Media Integration */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Integração com mídias sociais</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Compartilhe seu trabalho e receba mais indicações através das redes sociais
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 justify-items-center">
          <SocialIcon name="WhatsApp" color="#25D366" />
          <SocialIcon name="Telegram" color="#0088cc" />
          <SocialIcon name="Facebook" color="#1877F2" />
          <SocialIcon name="Instagram" color="#E4405F" />
          <SocialIcon name="TikTok" color="#000000" />
          <SocialIcon name="YouTube" color="#FF0000" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">O que nossos clientes dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="Consegui organizar melhor minha agenda e aumentei minha clientela em 30%. As fotos de antes e depois são um diferencial que meus clientes adoram."
            author="Maria Silva"
            role="Diarista Autônoma"
          />
          <TestimonialCard 
            quote="O sistema de mensagens automáticas me economiza muito tempo. Agora não esqueço de confirmar agendamentos e os clientes sempre recebem lembretes."
            author="João Oliveira"
            role="Proprietário de Empresa de Limpeza"
          />
          <TestimonialCard 
            quote="A divulgação nos grupos de WhatsApp me trouxe vários clientes novos. O aplicativo facilita muito compartilhar meu trabalho nas redes sociais."
            author="Ana Santos"
            role="Diarista e Passadeira"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-600 dark:bg-teal-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Pronto para organizar seu negócio?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de profissionais que já estão usando nossa plataforma para crescer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="default" className="bg-white text-teal-600 hover:bg-gray-100">
                Começar agora
              </Button>
            </Link>
            <Link to="/demo/housekeeper">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-teal-500">
                Ver demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Broom className="h-6 w-6 text-teal-500" />
                <h3 className="text-xl font-bold">EngageFlow</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                Soluções digitais para profissionais de limpeza desde 2025.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Produto</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Funcionalidades</Link></li>
                  <li><Link to="/landing/pricing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Preços</Link></li>
                  <li><Link to="/demo/housekeeper" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Demonstração</Link></li>
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

// Componente para ícones de mídias sociais
const SocialIcon = ({
  name,
  color
}: {
  name: string;
  color: string;
}) => (
  <div className="flex flex-col items-center">
    <div 
      className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
      style={{ backgroundColor: `${color}20` }}
    >
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
        style={{ backgroundColor: color }}
      >
        {name.charAt(0)}
      </div>
    </div>
    <span className="text-sm font-medium">{name}</span>
  </div>
);

// Componente para mostrar antes e depois
const BeforeAfterCard = ({
  title,
  beforeImage,
  afterImage
}: {
  title: string;
  beforeImage: string;
  afterImage: string;
}) => (
  <Card className="overflow-hidden">
    <CardHeader>
      <CardTitle className="text-center">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <div className="grid grid-cols-2">
        <div className="p-4 border-r">
          <p className="text-center font-medium mb-2 text-gray-500">Antes</p>
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
          </div>
        </div>
        <div className="p-4">
          <p className="text-center font-medium mb-2 text-teal-500">Depois</p>
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default HousekeeperLandingPage;
