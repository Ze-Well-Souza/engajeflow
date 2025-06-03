import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PartyPopper, ArrowRight, Calendar } from "lucide-react";

const EventsLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PartyPopper className="h-6 w-6 text-purple-500" />
            <h1 className="text-2xl font-bold">Organizadores de Eventos</h1>
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
      <section className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900 dark:to-indigo-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Transforme a organização dos seus eventos com automação inteligente</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Gerencie convites, confirmações, divulgação e muito mais em uma única plataforma
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700">
                  Começar grátis <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/demo/events">
                <Button size="lg" variant="outline" className="gap-2 border-purple-500 text-purple-600 hover:bg-purple-50">
                  Ver demonstração
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Soluções para organizadores de eventos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Calendar className="h-10 w-10 text-purple-500" />}
            title="Gestão de eventos"
            description="Organize todos os detalhes do seu evento em um só lugar, desde convites até check-in"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>}
            title="Portfólio de eventos"
            description="Mostre seus trabalhos anteriores com fotos profissionais e depoimentos de clientes"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>}
            title="Automação de mensagens"
            description="Envie convites, confirmações e lembretes automaticamente via WhatsApp e e-mail"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
            title="Gestão de convidados"
            description="Controle lista de convidados, confirmações e check-in no dia do evento"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="m4.93 4.93 2.83 2.83"></path><path d="m16.24 16.24 2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="m4.93 19.07 2.83-2.83"></path><path d="m16.24 7.76 2.83-2.83"></path></svg>}
            title="Divulgação multicanal"
            description="Compartilhe seus eventos em grupos de WhatsApp, Facebook e Instagram com um clique"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>}
            title="Análise de resultados"
            description="Acompanhe métricas de engajamento, presença e satisfação dos convidados"
          />
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Portfólio de eventos</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Mostre a qualidade do seu trabalho com um portfólio profissional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <EventCard 
              title="Casamento Jardim"
              category="Casamento"
              guests="150 convidados"
              location="Espaço Verde - São Paulo"
            />
            <EventCard 
              title="Conferência Tech 2025"
              category="Corporativo"
              guests="500 participantes"
              location="Centro de Convenções - Rio de Janeiro"
            />
            <EventCard 
              title="Festa de 15 Anos"
              category="Aniversário"
              guests="200 convidados"
              location="Buffet Estrela - Belo Horizonte"
            />
          </div>
        </div>
      </section>

      {/* WhatsApp Integration */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Automação de comunicação</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Automatize o envio de convites, confirmações e lembretes para seus convidados através de múltiplos canais.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-purple-100 dark:bg-purple-900 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Convites personalizados</h3>
                    <p className="text-gray-600 dark:text-gray-400">Envie convites personalizados com nome e informações específicas</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-purple-100 dark:bg-purple-900 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Confirmação automática</h3>
                    <p className="text-gray-600 dark:text-gray-400">Receba e processe confirmações de presença automaticamente</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-purple-100 dark:bg-purple-900 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Lembretes programados</h3>
                    <p className="text-gray-600 dark:text-gray-400">Envie lembretes antes do evento para aumentar a presença</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 h-80 flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-purple-500"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                <p className="text-gray-500 dark:text-gray-400">Visualização da automação de mensagens</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Integration */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Integração com mídias sociais</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Divulgue seus eventos em todas as plataformas com apenas alguns cliques
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">O que nossos clientes dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="A plataforma revolucionou a forma como organizo eventos. A automação de convites e confirmações economiza horas do meu trabalho."
            author="Fernanda Lima"
            role="Organizadora de Casamentos"
          />
          <TestimonialCard 
            quote="O portfólio digital com fotos profissionais me ajudou a conquistar clientes corporativos. A integração com WhatsApp é simplesmente fantástica."
            author="Roberto Santos"
            role="Produtor de Eventos"
          />
          <TestimonialCard 
            quote="Consegui aumentar minha taxa de presença em 30% com os lembretes automáticos. Ferramenta indispensável para qualquer organizador de eventos."
            author="Carla Oliveira"
            role="Cerimonialista"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-purple-600 dark:bg-purple-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Pronto para transformar seus eventos?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de organizadores que já estão usando nossa plataforma para criar eventos memoráveis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="default" className="bg-white text-purple-600 hover:bg-gray-100">
                Começar agora
              </Button>
            </Link>
            <Link to="/demo/events">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-purple-500">
                Ver demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <PartyPopper className="h-6 w-6 text-purple-500" />
                <h3 className="text-xl font-bold">EngageFlow</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                Soluções digitais para organizadores de eventos desde 2025.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Produto</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Funcionalidades</Link></li>
                  <li><Link to="/landing/pricing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Preços</Link></li>
                  <li><Link to="/demo/events" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Demonstração</Link></li>
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

// Componente para eventos
const EventCard = ({
  title,
  category,
  guests,
  location
}: {
  title: string;
  category: string;
  guests: string;
  location: string;
}) => (
  <Card className="overflow-hidden">
    <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
      <PartyPopper className="h-12 w-12 text-gray-400" />
    </div>
    <CardHeader>
      <div className="flex justify-between items-start">
        <CardTitle>{title}</CardTitle>
        <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">{category}</span>
      </div>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          {guests}
        </li>
        <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          {location}
        </li>
      </ul>
    </CardContent>
  </Card>
);

export default EventsLandingPage;
