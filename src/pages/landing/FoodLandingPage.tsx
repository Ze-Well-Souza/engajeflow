
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Globe, ArrowRight, Utensils } from "lucide-react";

const FoodLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-orange-500" />
            <h1 className="text-2xl font-bold">EngageFlow <span className="text-orange-500">Gastronomia</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost">Início</Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link to="/register">
              <Button variant="default" className="bg-orange-500 hover:bg-orange-600">Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Impulsione seu negócio gastronômico nas redes</h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Aumente sua presença online, atraia mais clientes e gerencie pedidos com facilidade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 gap-2">
                Começar grátis <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 border-orange-300 text-orange-600">
              Ver demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold text-center mb-12">Soluções para <span className="text-orange-500">gastronomia</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            title="Cardápios digitais" 
            description="Crie cardápios interativos com fotos e descrições detalhadas dos pratos"
            icon={<Utensils className="h-10 w-10 text-orange-500" />}
          />
          <FeatureCard 
            title="Promoções automáticas" 
            description="Agende posts de ofertas e promoções para datas específicas"
            icon={<Utensils className="h-10 w-10 text-orange-500" />}
          />
          <FeatureCard 
            title="Gestão de delivery" 
            description="Integração com aplicativos de entrega e sistema de pedidos próprio"
            icon={<Utensils className="h-10 w-10 text-orange-500" />}
          />
          <FeatureCard 
            title="Fotos profissionais" 
            description="Dicas e templates para fotografar seus pratos com qualidade profissional"
            icon={<Utensils className="h-10 w-10 text-orange-500" />}
          />
          <FeatureCard 
            title="Fidelização de clientes" 
            description="Programa de pontos e benefícios para clientes frequentes"
            icon={<Utensils className="h-10 w-10 text-orange-500" />}
          />
          <FeatureCard 
            title="Análise de desempenho" 
            description="Relatórios detalhados sobre seus pratos mais populares e picos de movimento"
            icon={<Utensils className="h-10 w-10 text-orange-500" />}
          />
        </div>
      </section>

      {/* Pacote específico */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Pacote Gastronomia</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12">
          Desenvolvido especialmente para restaurantes, confeitarias, food trucks e serviços de catering
        </p>
        <div className="max-w-md mx-auto">
          <Card className="border-orange-300">
            <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
              <CardTitle className="text-2xl flex items-center">
                <Utensils className="h-5 w-5 text-orange-500 mr-2" />
                Pacote Gastronomia Premium
              </CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">R$69,90/mês</span>
              </div>
              <CardDescription className="mt-2">A solução completa para seu negócio gastronômico</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-orange-500 mr-2 shrink-0" />
                  <span>Cardápio digital interativo</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-orange-500 mr-2 shrink-0" />
                  <span>Integração com iFood, Uber Eats e Rappi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-orange-500 mr-2 shrink-0" />
                  <span>Sistema de reservas online</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-orange-500 mr-2 shrink-0" />
                  <span>Templates para posts de gastronomia</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-orange-500 mr-2 shrink-0" />
                  <span>Programa de fidelidade para clientes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-orange-500 mr-2 shrink-0" />
                  <span>Geração de conteúdo para gastronomia com IA</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-orange-500 mr-2 shrink-0" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600">
                Começar agora
              </Button>
              <p className="text-center text-sm text-gray-500 mt-4">7 dias grátis, cancele quando quiser</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12">Depoimentos de clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TestimonialCard 
            quote="O EngageFlow transformou nossa presença online. Agora conseguimos gerenciar nosso Instagram e as promoções de forma muito mais eficiente."
            author="Marcelo Oliveira"
            role="Proprietário de Restaurante"
          />
          <TestimonialCard 
            quote="As postagens automáticas e o cardápio digital aumentaram nossas vendas em 40% em apenas três meses. Um investimento que valeu muito a pena."
            author="Fernanda Lima"
            role="Confeiteira"
          />
          <TestimonialCard 
            quote="A integração com apps de delivery e o sistema de pedidos próprio facilitou muito nossa operação. Recomendo para todos da área gastronômica."
            author="Ricardo Mendes"
            role="Food Truck"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Eleve seu negócio gastronômico ao próximo nível</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Comece hoje mesmo e veja a diferença em seu negócio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 gap-2">
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
            <Globe className="h-6 w-6 text-orange-500" />
            <h3 className="text-xl font-bold">EngageFlow <span className="text-orange-500">Gastronomia</span></h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Potencializando negócios gastronômicos com tecnologia
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
  <Card className="h-full border-orange-100 dark:border-orange-900/20 hover:shadow-md transition-shadow duration-300">
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
  <Card className="h-full border-orange-100 dark:border-orange-900/20">
    <CardContent className="pt-6">
      <p className="italic mb-4">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </CardContent>
  </Card>
);

export default FoodLandingPage;
