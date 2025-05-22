import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, ArrowRight, ChefHat } from "lucide-react";

const ChefLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-orange-500" />
            <h1 className="text-2xl font-bold">Cozinheiras e Buffets</h1>
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
      <section className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Transforme sua paixão pela culinária em um negócio de sucesso</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              Gerencie pedidos, divulgue seu cardápio e aumente suas vendas com automação inteligente
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="gap-2 bg-orange-600 hover:bg-orange-700">
                  Começar grátis <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/demo/chef">
                <Button size="lg" variant="outline" className="gap-2 border-orange-500 text-orange-600 hover:bg-orange-50">
                  Ver demonstração
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Soluções para cozinheiras e buffets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M4 19h16"></path><path d="M4 15h16"></path><path d="M4 11h16"></path><path d="M4 7h16"></path></svg>}
            title="Cardápio digital"
            description="Crie e compartilhe seu cardápio digital com fotos profissionais e descrições detalhadas"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>}
            title="Galeria de pratos"
            description="Mostre a qualidade do seu trabalho com uma galeria organizada de suas criações culinárias"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
            title="Gestão de clientes"
            description="Organize pedidos recorrentes, preferências e restrições alimentares de cada cliente"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>}
            title="Automação de pedidos"
            description="Receba pedidos via WhatsApp e confirme automaticamente com detalhes e prazos"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="m4.93 4.93 2.83 2.83"></path><path d="m16.24 16.24 2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="m4.93 19.07 2.83-2.83"></path><path d="m16.24 7.76 2.83-2.83"></path></svg>}
            title="Divulgação multicanal"
            description="Compartilhe promoções e novidades em grupos de WhatsApp, Facebook e Instagram"
          />
          <FeatureCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>}
            title="Controle financeiro"
            description="Acompanhe receitas, despesas e lucros com relatórios detalhados e gráficos"
          />
        </div>
      </section>

      {/* Menu Showcase */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cardápio digital atraente</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Apresente seus pratos de forma profissional e compartilhe facilmente com seus clientes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <MenuItemCard 
              title="Feijoada Completa"
              price="R$ 120,00"
              description="Tradicional feijoada com todas as carnes, acompanha arroz, couve, farofa e laranja."
              serves="Serve 4 pessoas"
            />
            <MenuItemCard 
              title="Bolo de Chocolate"
              price="R$ 65,00"
              description="Bolo caseiro de chocolate com cobertura de brigadeiro e granulado."
              serves="10 fatias"
            />
            <MenuItemCard 
              title="Coxinha de Frango"
              price="R$ 45,00"
              description="Coxinha de frango com catupiry, massa crocante por fora e macia por dentro."
              serves="25 unidades"
            />
          </div>
        </div>
      </section>

      {/* Social Media Integration */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Integração com mídias sociais</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Divulgue seu cardápio e promoções em todas as plataformas com apenas alguns cliques
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
            quote="Meu negócio de marmitas cresceu 50% depois que comecei a usar o sistema. A automação de pedidos por WhatsApp facilitou muito minha vida."
            author="Márcia Oliveira"
            role="Chef de Cozinha"
          />
          <TestimonialCard 
            quote="O cardápio digital com fotos profissionais fez toda diferença nas minhas vendas. Agora os clientes podem ver exatamente o que estão comprando."
            author="Paulo Santos"
            role="Proprietário de Buffet"
          />
          <TestimonialCard 
            quote="A divulgação automática nos grupos de WhatsApp me trouxe muitos clientes novos. É como ter um assistente de marketing trabalhando 24 horas."
            author="Fernanda Lima"
            role="Confeiteira"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-600 dark:bg-orange-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Pronto para expandir seu negócio culinário?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de profissionais da gastronomia que já estão usando nossa plataforma
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="default" className="bg-white text-orange-600 hover:bg-gray-100">
                Começar agora
              </Button>
            </Link>
            <Link to="/demo/chef">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-orange-500">
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
                <ChefHat className="h-6 w-6 text-orange-500" />
                <h3 className="text-xl font-bold">EngageFlow</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                Soluções digitais para profissionais da gastronomia desde 2025.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Produto</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Funcionalidades</Link></li>
                  <li><Link to="/landing/pricing" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Preços</Link></li>
                  <li><Link to="/demo/chef" className="text-gray-600 dark:text-gray-400 hover:text-gray-500">Demonstração</Link></li>
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

// Componente para itens do cardápio
const MenuItemCard = ({
  title,
  price,
  description,
  serves
}: {
  title: string;
  price: string;
  description: string;
  serves: string;
}) => (
  <Card className="overflow-hidden">
    <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
      <Utensils className="h-12 w-12 text-gray-400" />
    </div>
    <CardHeader>
      <div className="flex justify-between items-start">
        <CardTitle>{title}</CardTitle>
        <span className="font-bold text-orange-500">{price}</span>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 dark:text-gray-300 mb-2">{description}</p>
      <p className="text-sm text-gray-500">{serves}</p>
    </CardContent>
  </Card>
);

export default ChefLandingPage;
