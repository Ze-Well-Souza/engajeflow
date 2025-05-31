
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Rocket, 
  Zap, 
  TrendingUp, 
  MessageSquare, 
  Calendar, 
  BarChart3, 
  Users, 
  Sparkles,
  Bot,
  Share2,
  ArrowRight
} from 'lucide-react';
import SpaceAnimatedBackground from '@/components/ui/space-animated-background';

const InitialPage: React.FC = () => {
  const services = [
    {
      icon: Bot,
      title: 'Automação Inteligente',
      description: 'IA avançada para automatizar suas interações e vendas',
      badge: 'IA'
    },
    {
      icon: Calendar,
      title: 'Agendamento Smart',
      description: 'Agendamento automático com análise de melhor horário',
      badge: 'Popular'
    },
    {
      icon: Share2,
      title: 'Gestão Multi-Canal',
      description: 'Gerencie todas suas redes sociais em um só lugar',
      badge: 'Novo'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Avançado',
      description: 'Relatórios detalhados de performance e engajamento',
      badge: 'Pro'
    },
    {
      icon: MessageSquare,
      title: 'Chatbot 24/7',
      description: 'Atendimento automatizado que nunca para',
      badge: 'IA'
    },
    {
      icon: Sparkles,
      title: 'Geração de Conteúdo',
      description: 'Crie posts, legendas e hashtags automaticamente',
      badge: 'IA'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      <SpaceAnimatedBackground />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header with Auth Buttons */}
        <header className="flex justify-between items-center p-6">
          <div className="flex items-center gap-2">
            <Rocket className="h-8 w-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Engajeflow
            </h1>
          </div>
          
          <div className="flex gap-4">
            <Link to="/auth/login">
              <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10">
                Entrar
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Cadastrar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30 px-4 py-1">
                <Zap className="mr-2 h-4 w-4" />
                Powered by AI
              </Badge>
              
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
                Automação que
                <br />
                <span className="text-white">Gera Resultados</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Transforme suas redes sociais em uma máquina de vendas com nossa plataforma 
                de automação inteligente. IA, engajamento e conversões em um só lugar.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">+245%</div>
                <div className="text-gray-400">Engajamento</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">12.5K</div>
                <div className="text-gray-400">Leads Gerados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">89%</div>
                <div className="text-gray-400">Mais Conversões</div>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <Link to="/auth/register">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
                  <Rocket className="mr-2 h-5 w-5" />
                  Começar Agora Grátis
                </Button>
              </Link>
              <p className="text-sm text-gray-400">
                Sem cartão de crédito • Configuração em 2 minutos
              </p>
            </div>
          </div>
        </main>

        {/* Services Section */}
        <section className="px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Nossos Serviços
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Descubra como nossa plataforma pode revolucionar seu negócio digital
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="bg-gray-800/30 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 rounded-lg bg-purple-600/20">
                        <service.icon className="h-6 w-6 text-purple-400" />
                      </div>
                      <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                        {service.badge}
                      </Badge>
                    </div>
                    <h3 className="text-white font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InitialPage;
