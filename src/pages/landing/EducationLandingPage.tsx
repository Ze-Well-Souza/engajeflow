import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Book } from "lucide-react";

const EducationLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Book className="h-6 w-6 text-green-500" />
            <h1 className="text-2xl font-bold">Educação</h1>
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
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Automatize a comunicação com alunos e aumente a retenção</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              A plataforma completa para educadores e criadores de cursos online responderem dúvidas, enviarem materiais e organizarem listas de alunos - tudo com automação inteligente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="gap-2 bg-green-500 hover:bg-green-600">
                  Começar gratuitamente <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/demo/education">
                <Button size="lg" variant="outline" className="gap-2 border-green-500 text-green-500 hover:bg-green-50">
                  Agendar demonstração
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Soluções para educadores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Book className="h-10 w-10 text-green-500" />}
            title="Automação de respostas"
            description="Pare de responder as mesmas perguntas sobre datas, materiais e acesso. Automatize as respostas frequentes."
          />
          <FeatureCard 
            icon={<Book className="h-10 w-10 text-green-500" />}
            title="Engajamento de alunos"
            description="Mantenha seus alunos engajados com lembretes personalizados e acompanhamento automático do progresso."
          />
          <FeatureCard 
            icon={<Book className="h-10 w-10 text-green-500" />}
            title="Distribuição de materiais"
            description="Envie materiais complementares, links de acesso e lembretes automaticamente para cada etapa do curso."
          />
          <FeatureCard 
            icon={<Book className="h-10 w-10 text-green-500" />}
            title="Gestão de turmas"
            description="Organize turmas, acompanhe o progresso individual e gerencie certificados com facilidade."
          />
          <FeatureCard 
            icon={<Book className="h-10 w-10 text-green-500" />}
            title="Integração com plataformas"
            description="Integre com as principais plataformas de ensino online e sistemas de pagamento."
          />
          <FeatureCard 
            icon={<Book className="h-10 w-10 text-green-500" />}
            title="Analytics educacionais"
            description="Relatórios detalhados sobre engajamento, conclusão e pontos de dificuldade dos alunos."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-500 dark:bg-green-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Pronto para transformar sua forma de ensinar?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de educadores que já estão usando nossa plataforma para melhorar a experiência de aprendizado
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="default" className="bg-white text-green-500 hover:bg-gray-100">
                Começar agora
              </Button>
            </Link>
            <Link to="/demo/education">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-green-600">
                Ver demonstração
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">O que nossos educadores dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="Economizo pelo menos 10 horas por semana com as automações. Agora posso focar mais no conteúdo e menos na administração."
            author="Prof. Ricardo Almeida"
            role="Professor de Matemática"
          />
          <TestimonialCard 
            quote="A taxa de conclusão dos meus cursos aumentou em 40% depois que implementei os lembretes automáticos e acompanhamento de progresso."
            author="Juliana Mendes"
            role="Criadora de cursos online"
          />
          <TestimonialCard 
            quote="A distribuição automática de materiais complementares melhorou significativamente a experiência dos meus alunos."
            author="Carlos Eduardo"
            role="Professor de Idiomas"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Book className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-bold">EngageFlow</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                Soluções digitais para educadores desde 2025.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Produto</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-green-500">Funcionalidades</Link></li>
                  <li><Link to="/landing/pricing" className="text-gray-600 dark:text-gray-400 hover:text-green-500">Preços</Link></li>
                  <li><Link to="/demo/education" className="text-gray-600 dark:text-gray-400 hover:text-green-500">Demonstração</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Empresa</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-green-500">Sobre</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-green-500">Contato</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-green-500">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-green-500">Termos</Link></li>
                  <li><Link to="/landing" className="text-gray-600 dark:text-gray-400 hover:text-green-500">Privacidade</Link></li>
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

export default EducationLandingPage;
