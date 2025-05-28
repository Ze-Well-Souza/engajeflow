
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, MessageSquare, BarChart3, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">TechCare Connect</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/auth/login">
                <Button variant="outline">Entrar</Button>
              </Link>
              <Link to="/auth/register">
                <Button>Começar Agora</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Automatize Seu Negócio com IA
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plataforma completa para gerenciar agendamentos, criar conteúdo para redes sociais
            e automatizar processos usando inteligência artificial.
          </p>
          <Link to="/auth/register">
            <Button size="lg" className="text-lg px-8 py-4">
              Começar Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Funcionalidades Principais
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Calendar className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Agendamentos</CardTitle>
                <CardDescription>
                  Sistema completo de agendamento online com confirmação automática
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Conteúdo IA</CardTitle>
                <CardDescription>
                  Geração automática de posts para redes sociais usando IA avançada
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-purple-600 mb-4" />
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Relatórios detalhados e insights sobre o desempenho do seu negócio
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-yellow-600 mb-4" />
                <CardTitle>Automação</CardTitle>
                <CardDescription>
                  Automatize tarefas repetitivas e foque no que realmente importa
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Soluções por Segmento
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/beauty" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-pink-600">Salões de Beleza</CardTitle>
                  <CardDescription>
                    Agendamento online, gestão de profissionais e marketing digital
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/restaurant" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-orange-600">Restaurantes</CardTitle>
                  <CardDescription>
                    Reservas, cardápio digital e promoções automáticas
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/realestate" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-blue-600">Imobiliárias</CardTitle>
                  <CardDescription>
                    Gestão de propriedades, leads e marketing imobiliário
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/freelancer" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-green-600">Freelancers</CardTitle>
                  <CardDescription>
                    Gestão de projetos, clientes e portfólio digital
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold mb-6">
            Pronto para Transformar Seu Negócio?
          </h3>
          <p className="text-xl mb-8">
            Junte-se a centenas de empresas que já automatizaram seus processos
          </p>
          <Link to="/auth/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Comece Sua Jornada Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 TechCare Connect. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
