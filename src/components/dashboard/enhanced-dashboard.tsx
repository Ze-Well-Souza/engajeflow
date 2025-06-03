
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Rocket, 
  TrendingUp, 
  MessageSquare, 
  Calendar, 
  BarChart3, 
  Users, 
  Sparkles,
  Target,
  Zap,
  ArrowRight
} from 'lucide-react';
import AnimatedBackground from '@/components/ui/animated-background';

const EnhancedDashboard: React.FC = () => {
  const metrics = [
    { icon: TrendingUp, label: 'Engajamento', value: '+ 245%', color: 'text-green-400' },
    { icon: Users, label: 'Seguidores', value: '12.5K', color: 'text-blue-400' },
    { icon: MessageSquare, label: 'Mensagens', value: '1.2K', color: 'text-purple-400' },
    { icon: Target, label: 'Conversões', value: '+ 89%', color: 'text-orange-400' }
  ];

  const features = [
    {
      icon: Rocket,
      title: 'IA Avançada',
      description: 'Automação inteligente com Google AI para máximo engajamento',
      badge: 'Novo'
    },
    {
      icon: Calendar,
      title: 'Agendamento Smart',
      description: 'Poste no momento perfeito com análise de audiência em tempo real',
      badge: 'Popular'
    },
    {
      icon: BarChart3,
      title: 'Analytics Profundo',
      description: 'Insights detalhados sobre performance e tendências de mercado',
      badge: 'Pro'
    },
    {
      icon: Sparkles,
      title: 'Conteúdo Automático',
      description: 'Geração de posts, hashtags e legendas com IA generativa',
      badge: 'IA'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Rocket className="h-8 w-8 text-purple-400 animate-bounce" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Engajeflow
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Sua jornada para o sucesso digital começa aqui. 
            Automação inteligente, engajamento máximo, resultados extraordinários.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
              <Zap className="mr-2 h-5 w-5" />
              Acelerar Vendas
            </Button>
            <Button variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 px-8 py-3">
              Explorar Recursos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{metric.label}</p>
                    <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                  </div>
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-800/30 border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-600/20">
                      <feature.icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </div>
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                    {feature.badge}
                  </Badge>
                </div>
                <CardDescription className="text-gray-300 text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Journey Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Sua Jornada Digital Começa Agora
              </h2>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                Junte-se a milhares de empresas que já transformaram seus resultados 
                com nossa plataforma de automação inteligente.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3">
                  <Rocket className="mr-2 h-5 w-5" />
                  Iniciar Missão
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
